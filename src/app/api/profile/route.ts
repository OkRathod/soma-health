import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, error: "Missing User ID" }, { status: 400 });
  }

  try {
    // 1. Fetch User Profile Data
    // We try to find the user. If they don't exist in your DB yet (fresh Clerk sign-up), 
    // we might return null or handle it gracefully.
    const userProfile = await prisma.user.findUnique({
      where: { id: userId }, 
    });

    if (!userProfile) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // 2. Fetch Logs (For Stats & Streak Calculation)
    const logs = await prisma.dailyLog.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' },
      select: { date: true, totalCaloriesOut: true } // Select only what we need for speed
    });

    // --- CALCULATE STREAK ---
    let streak = 0;
    if (logs.length > 0) {
      const today = new Date().setHours(0,0,0,0);
      const lastLogDate = new Date(logs[0].date).setHours(0,0,0,0);
      
      // Check if the most recent log is either today or yesterday
      // (86400000 ms = 1 day)
      const diffToLast = today - lastLogDate;

      if (diffToLast <= 86400000) {
          streak = 1; // They kept the streak alive
          
          for (let i = 0; i < logs.length - 1; i++) {
              const curr = new Date(logs[i].date).setHours(0,0,0,0);
              const next = new Date(logs[i+1].date).setHours(0,0,0,0);
              const diff = curr - next;

              if (diff === 86400000) { 
                  // Exactly 1 day difference -> Streak continues
                  streak++;
              } else if (diff > 86400000) {
                  // Gap of more than 1 day -> Streak broken
                  break; 
              }
              // If diff === 0 (multiple logs same day), continue loop without incrementing
          }
      }
    }

    // --- CALCULATE STATS ---
    const totalLogs = logs.length;
    const totalCaloriesBurned = logs.reduce((acc, log) => acc + log.totalCaloriesOut, 0);

    // --- DETERMINE BADGES ---
    const badges: string[] = [];
    if (streak >= 3) badges.push("Consistency King");
    if (streak >= 7) badges.push("Week Warrior");
    if (totalLogs >= 10) badges.push("Data Collector");
    if (totalLogs >= 50) badges.push("Journalist");
    if (totalCaloriesBurned > 5000) badges.push("Furnace");
    if (totalCaloriesBurned > 20000) badges.push("Supernova");

    return NextResponse.json({
      success: true,
      data: userProfile,
      stats: {
        streak,
        totalLogs,
        totalCaloriesBurned,
        badges
      }
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// SAVE PROFILE
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing User ID" }, { status: 400 });
    }

    // Since 'id' is the primary key in your schema, we update based on that.
    // Note: The user MUST exist first. Usually, a webhook creates the user 
    // when they sign up with Clerk. If not, you might need 'upsert'.
    // Here we use 'update' assuming the user exists.
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            // Physical
            age: data.age ? parseInt(data.age) : null, // Ensure numbers are parsed
            gender: data.gender,
            height: data.height ? parseFloat(data.height) : null,
            weight: data.weight ? parseFloat(data.weight) : null,
            
            // Lifestyle
            activityLevel: data.activityLevel,
            jobType: data.jobType,
            dietaryPreferences: data.dietaryPreferences,

            // Goals
            customPurpose: data.customPurpose,
            weightGoal: data.weightGoal,
            targetWeight: data.targetWeight ? parseFloat(data.targetWeight) : null,
            dailyCalorieGoal: data.dailyCalorieGoal ? parseInt(data.dailyCalorieGoal) : 2500,
            waterGoal: data.waterGoal ? parseInt(data.waterGoal) : 2500,
        }
    });

    return NextResponse.json({ success: true, data: updatedUser });

  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}