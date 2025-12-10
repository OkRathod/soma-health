import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic ensures we always get fresh data, not cached old data
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    // 👇 FIXED: Using 'dailyLog' (matches your schema) instead of 'log'
    const logs = await prisma.dailyLog.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' }
    });

    if (logs.length === 0) {
        return NextResponse.json({ success: false, error: "No data found to export" }, { status: 404 });
    }

    // Headers
    const headers = ["Date", "Raw Input", "Calories In", "Calories Out", "Water (ml)", "AI Feedback"];
    
    const rows = logs.map((log) => {
      const date = new Date(log.date).toLocaleDateString();
      
      // 👇 FIXED: Using 'rawText' (matches your schema)
      // We escape quotes (") by replacing them with double quotes ("") so Excel reads it correctly.
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

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="soma_export_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}