import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const logId = searchParams.get("id");
    const userId = searchParams.get("userId"); // Extra security check

    if (!logId || !userId) {
      return NextResponse.json({ success: false, error: "Missing ID or UserID" }, { status: 400 });
    }

    // 1. Check if the log exists and belongs to this user
    const log = await prisma.dailyLog.findUnique({
      where: { id: logId },
    });

    if (!log) {
      return NextResponse.json({ success: false, error: "Log not found" }, { status: 404 });
    }

    if (log.userId !== userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    // 2. Delete the log
    await prisma.dailyLog.delete({
      where: { id: logId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}