// src/app/api/habits/analysis/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { calculateHabitStats } from "@/lib/streak-utils";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId, isRecurring: true },
      select: { title: true, date: true, isCompleted: true },
      orderBy: { date: "desc" },
    });

    const grouped: Record<string, Date[]> = {};
    for (const t of tasks) {
      if (!grouped[t.title]) grouped[t.title] = [];
      if (t.isCompleted) grouped[t.title].push(t.date);
    }

    const habits = Object.entries(grouped).map(([title, dates]) => ({ title, ...calculateHabitStats(dates) }));
    return NextResponse.json({ success: true, habits });
  } catch (error) {
    console.error("Habit Analysis Error:", error);
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}