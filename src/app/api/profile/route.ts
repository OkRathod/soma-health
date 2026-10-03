// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { calorieGoal, waterGoal } from "@/lib/nutrition";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const userProfile = await prisma.user.findUnique({ where: { id: userId } });
    if (!userProfile) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    // Streaks/badges count MEAL logs only — water no longer inflates them.
    const logs = await prisma.dailyLog.findMany({
      where: { userId, type: { not: "WATER" } },
      orderBy: { date: "desc" },
      select: { date: true, totalCaloriesOut: true },
    });

    // Streak = consecutive days with at least one meal log, deduped per day.
    const dayKeys = Array.from(
      new Set(logs.map((l) => new Date(l.date).setHours(0, 0, 0, 0)))
    ).sort((a, b) => b - a);

    let streak = 0;
    if (dayKeys.length > 0) {
      const today = new Date().setHours(0, 0, 0, 0);
      const DAY = 86400000;
      if (today - dayKeys[0] <= DAY) {
        streak = 1;
        for (let i = 0; i < dayKeys.length - 1; i++) {
          if (dayKeys[i] - dayKeys[i + 1] === DAY) streak++;
          else break;
        }
      }
    }

    const totalLogs = dayKeys.length;
    const totalCaloriesBurned = logs.reduce((a, l) => a + l.totalCaloriesOut, 0);

    const badges: string[] = [];
    if (streak >= 3) badges.push("Consistency King");
    if (streak >= 7) badges.push("Week Warrior");
    if (streak >= 30) badges.push("Iron Habit");
    if (totalLogs >= 10) badges.push("Data Collector");
    if (totalLogs >= 50) badges.push("Journalist");
    if (totalCaloriesBurned > 5000) badges.push("Furnace");
    if (totalCaloriesBurned > 20000) badges.push("Supernova");

    return NextResponse.json({
      success: true,
      data: userProfile,
      stats: { streak, totalLogs, totalCaloriesBurned, badges, streakFreezes: userProfile.streakFreezes },
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const data = await req.json();

    const height = data.height ? parseFloat(data.height) : null;
    const weight = data.weight ? parseFloat(data.weight) : null;
    const age = data.age ? parseInt(data.age, 10) : null;

    // Auto goals: if enabled, derive calorie/water goals from stats,
    // otherwise honour whatever the user typed.
    const autoGoals = data.autoGoals ?? true;
    const inputs = {
      age,
      gender: data.gender,
      height,
      weight,
      activityLevel: data.activityLevel,
      weightGoal: data.weightGoal,
    };
    const derivedCalories = autoGoals ? calorieGoal(inputs) : null;
    const derivedWater = autoGoals ? waterGoal(inputs) : null;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        age,
        gender: data.gender ?? null,
        height,
        weight,
        activityLevel: data.activityLevel ?? null,
        jobType: data.jobType ?? null,
        dietaryPreferences: data.dietaryPreferences ?? null,
        customPurpose: data.customPurpose ?? null,
        weightGoal: data.weightGoal ?? null,
        targetWeight: data.targetWeight ? parseFloat(data.targetWeight) : null,
        autoGoals,
        dailyCalorieGoal: derivedCalories ?? (data.dailyCalorieGoal ? parseInt(data.dailyCalorieGoal, 10) : 2000),
        waterGoal: derivedWater ?? (data.waterGoal ? parseInt(data.waterGoal, 10) : 2500),
        ...(data.timezone ? { timezone: data.timezone } : {}),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}