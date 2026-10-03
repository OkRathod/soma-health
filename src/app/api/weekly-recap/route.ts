// src/app/api/weekly-recap/route.ts
// On-demand weekly recap for the signed-in user. Mirrors the numbers the
// weekly-recap cron pushes as a notification, but returns them as JSON so the
// Analysis page can render them. Purely deterministic — no AI key required.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { subDays, startOfDay, format } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const since = startOfDay(subDays(new Date(), 6)); // last 7 calendar days incl. today

    const [logs, tasks, user] = await Promise.all([
      prisma.dailyLog.findMany({
        where: { userId, date: { gte: since }, type: { not: "WATER" } },
        select: { date: true, totalCaloriesIn: true, totalCaloriesOut: true },
      }),
      prisma.task.findMany({
        where: { userId, date: { gte: since } },
        select: { date: true, isCompleted: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { dailyCalorieGoal: true, weightGoal: true },
      }),
    ]);

    const caloriesIn = logs.reduce((a, l) => a + (l.totalCaloriesIn ?? 0), 0);
    const caloriesOut = logs.reduce((a, l) => a + (l.totalCaloriesOut ?? 0), 0);
    const net = caloriesIn - caloriesOut;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.isCompleted).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Per-day activity buckets (log count) → find the most active day.
    const byDay = new Map<string, number>();
    for (const l of logs) {
      const key = format(new Date(l.date), "EEEE");
      byDay.set(key, (byDay.get(key) ?? 0) + 1);
    }
    let mostActiveDay: string | null = null;
    let mostActiveCount = 0;
    for (const [day, count] of byDay.entries()) {
      if (count > mostActiveCount) {
        mostActiveDay = day;
        mostActiveCount = count;
      }
    }

    const avgDailyCalories = logs.length > 0 ? Math.round(caloriesIn / 7) : 0;

    return NextResponse.json({
      success: true,
      recap: {
        rangeStart: since,
        rangeEnd: new Date(),
        logCount: logs.length,
        caloriesIn,
        caloriesOut,
        net,
        avgDailyCalories,
        totalTasks,
        completedTasks,
        completionRate,
        mostActiveDay,
        weightGoal: user?.weightGoal ?? null,
        dailyCalorieGoal: user?.dailyCalorieGoal ?? null,
      },
    });
  } catch (error) {
    console.error("Weekly recap error:", error);
    return NextResponse.json({ error: "Failed to build recap" }, { status: 500 });
  }
}