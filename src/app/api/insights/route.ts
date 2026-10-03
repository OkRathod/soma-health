// src/app/api/insights/route.ts
// Cheap, explainable correlations across steps / calories / tasks.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { subDays, startOfDay } from "date-fns";

function dayKey(d: Date) {
  return startOfDay(d).toISOString().slice(0, 10);
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const since = subDays(new Date(), 60);
  const [logs, tasks, metrics] = await Promise.all([
    prisma.dailyLog.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, totalCaloriesIn: true, type: true },
    }),
    prisma.task.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, isCompleted: true },
    }),
    prisma.dailyMetrics.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, steps: true },
    }),
  ]);

  const days: Record<string, { steps: number; calories: number; done: number; total: number }> = {};
  const touch = (k: string) => (days[k] ??= { steps: 0, calories: 0, done: 0, total: 0 });
  for (const m of metrics) touch(dayKey(m.date)).steps = m.steps;
  for (const l of logs) if (l.type !== "WATER") touch(dayKey(l.date)).calories += l.totalCaloriesIn;
  for (const t of tasks) {
    const d = touch(dayKey(t.date));
    d.total++;
    if (t.isCompleted) d.done++;
  }

  const rows = Object.values(days).filter((d) => d.total > 0 || d.steps > 0);
  const insights: string[] = [];

  const withSteps = rows.filter((r) => r.steps > 0 && r.total > 0);
  if (withSteps.length >= 6) {
    const median = withSteps.map((r) => r.steps).sort((a, b) => a - b)[Math.floor(withSteps.length / 2)];
    const hi = withSteps.filter((r) => r.steps >= median);
    const lo = withSteps.filter((r) => r.steps < median);
    const rate = (g: typeof hi) =>
      g.length ? g.reduce((a, r) => a + r.done / Math.max(1, r.total), 0) / g.length : 0;
    const diff = Math.round((rate(hi) - rate(lo)) * 100);
    if (Math.abs(diff) >= 10)
      insights.push(
        diff > 0
          ? `On your more active days (${median.toLocaleString()}+ steps) you complete about ${diff}% more of your tasks.`
          : `On your less active days you actually complete about ${Math.abs(diff)}% more tasks — worth a look.`
      );
  }

  const loggedDays = rows.filter((r) => r.calories > 0).length;
  if (loggedDays >= 10) insights.push(`You've logged meals on ${loggedDays} of the last 60 days.`);

  return NextResponse.json({ success: true, insights, sampleDays: rows.length });
}