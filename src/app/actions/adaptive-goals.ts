"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { subDays } from "date-fns";
import { adaptiveCalorieGoal } from "@/lib/nutrition";
import { revalidatePath } from "next/cache";

/**
 * Nudges the calorie goal (±100 kcal) based on the last 14 days of actual
 * intake and the weight trend. Only runs when the user opted into autoGoals.
 */
export async function recomputeAdaptiveGoal() {
  const { userId } = await auth();
  if (!userId) return { success: false };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.autoGoals) return { success: false };

  const logs = await prisma.dailyLog.findMany({
    where: { userId, type: { not: "WATER" }, date: { gte: subDays(new Date(), 14) } },
    select: { totalCaloriesIn: true, date: true },
  });
  if (logs.length < 5) return { success: false, reason: "not_enough_data" };

  const byDay = new Map<string, number>();
  for (const l of logs) {
    const k = l.date.toISOString().slice(0, 10);
    byDay.set(k, (byDay.get(k) ?? 0) + l.totalCaloriesIn);
  }
  const avgIntake = [...byDay.values()].reduce((a, b) => a + b, 0) / byDay.size;

  // Weight history isn't stored yet, so trend is null-safe for now.
  const next = adaptiveCalorieGoal(user.dailyCalorieGoal, avgIntake, null, user.weightGoal);
  if (next !== user.dailyCalorieGoal) {
    await prisma.user.update({ where: { id: userId }, data: { dailyCalorieGoal: next } });
    revalidatePath("/dashboard");
  }
  return { success: true, previous: user.dailyCalorieGoal, next };
}