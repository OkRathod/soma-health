import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

// Force dynamic ensures we always get fresh data
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    // 1. Fetch Daily Logs (The Original Data: Calories, Water, etc.)
    const logs = await prisma.dailyLog.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' }
    });

    // 2. Fetch Tasks (The New Data: Habits, Schedule, Subtasks)
    const tasks = await prisma.task.findMany({
      where: { userId: userId },
      include: { subtasks: true },
      orderBy: { date: 'desc' }
    });

    if (logs.length === 0 && tasks.length === 0) {
        return NextResponse.json({ success: false, error: "No data found to export" }, { status: 404 });
    }

    // --- SECTION 1: GENERATE HEALTH LOGS CSV ---
    const logHeaders = ["Date", "Raw Input", "Calories In", "Calories Out", "Water (ml)", "AI Feedback"];
    
    const logRows = logs.map((log) => {
      const date = format(new Date(log.date), "yyyy-MM-dd");
      // Escape quotes to prevent CSV breakage
      const cleanText = `"${(log.rawText || "").replace(/"/g, '""')}"`;
      const cleanFeedback = `"${(log.aiFeedback || "").replace(/"/g, '""')}"`;

      return [
        date,
        cleanText,
        log.totalCaloriesIn || 0,
        log.totalCaloriesOut || 0,
        log.waterMl || 0,
        cleanFeedback
      ].join(",");
    });

    const logsSection = [
        "--- SECTION 1: DAILY HEALTH JOURNAL ---", 
        logHeaders.join(","), 
        ...logRows
    ].join("\n");


    // --- SECTION 2: GENERATE TASKS CSV ---
    const taskHeaders = ["Date", "Time", "Duration (mins)", "Title", "Description", "Priority", "Status", "Type", "Subtasks Summary"];
    
    const taskRows = tasks.map((task) => {
      const dateStr = format(new Date(task.date), "yyyy-MM-dd");
      const timeStr = task.startTime ? format(new Date(task.startTime), "h:mm a") : "N/A";
      
      const cleanTitle = `"${(task.title || "").replace(/"/g, '""')}"`;
      const cleanDesc = `"${(task.description || "").replace(/"/g, '""')}"`;
      
      const subtaskSummary = task.subtasks.length > 0 
        ? `"${task.subtasks.map(st => `${st.title} (${st.isCompleted ? 'Done' : 'Pending'})`).join(" | ").replace(/"/g, '""')}"` 
        : "None";

      return [
        dateStr,
        timeStr,
        task.durationMins || 60, 
        cleanTitle,
        cleanDesc,
        task.priority,
        task.isCompleted ? "Completed" : "Pending",
        task.isRecurring ? "Recurring Habit" : "One-time Task",
        subtaskSummary
      ].join(",");
    });

    const tasksSection = [
        "--- SECTION 2: TASKS & HABITS ---",
        taskHeaders.join(","),
        ...taskRows
    ].join("\n");

    // 3. COMBINE BOTH SECTIONS (Separated by newlines)
    const finalCsv = `${logsSection}\n\n\n${tasksSection}`;

    return new NextResponse(finalCsv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="soma_complete_export_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}