// src/app/api/export/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

/** Escapes a value for CSV and neutralizes formula-injection (=, +, -, @, tab, CR). */
function csv(value: unknown): string {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const [logs, tasks] = await Promise.all([
      prisma.dailyLog.findMany({ where: { userId }, orderBy: { date: "desc" } }),
      prisma.task.findMany({ where: { userId }, include: { subtasks: true }, orderBy: { date: "desc" } }),
    ]);

    if (logs.length === 0 && tasks.length === 0) {
      return NextResponse.json({ success: false, error: "No data found to export" }, { status: 404 });
    }

    const logHeaders = ["Date", "Type", "Raw Input", "Calories In", "Calories Out", "Water (ml)", "AI Feedback"];
    const logRows = logs.map((l) =>
      [
        csv(format(new Date(l.date), "yyyy-MM-dd")),
        csv(l.type),
        csv(l.rawText),
        csv(l.totalCaloriesIn),
        csv(l.totalCaloriesOut),
        csv(l.waterMl),
        csv(l.aiFeedback),
      ].join(",")
    );

    const taskHeaders = ["Date", "Time", "Duration (mins)", "Title", "Description", "Priority", "Status", "Type", "Subtasks"];
    const taskRows = tasks.map((t) =>
      [
        csv(format(new Date(t.date), "yyyy-MM-dd")),
        csv(t.startTime ? format(new Date(t.startTime), "h:mm a") : "N/A"),
        csv(t.durationMins ?? 60),
        csv(t.title),
        csv(t.description),
        csv(t.priority),
        csv(t.isCompleted ? "Completed" : "Pending"),
        csv(t.isRecurring ? "Recurring Habit" : "One-time Task"),
        csv(t.subtasks.map((s) => `${s.title} (${s.isCompleted ? "Done" : "Pending"})`).join(" | ")),
      ].join(",")
    );

    const finalCsv = [
      "--- SECTION 1: DAILY HEALTH JOURNAL ---",
      logHeaders.map(csv).join(","),
      ...logRows,
      "",
      "",
      "--- SECTION 2: TASKS & HABITS ---",
      taskHeaders.map(csv).join(","),
      ...taskRows,
    ].join("\n");

    return new NextResponse(finalCsv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="soma_export_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}