"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { startOfDay } from "date-fns";
import { clerkClient } from "@clerk/nextjs/server";

// 1. Get Steps for Today
// src/app/actions/steps.ts
export async function getDailySteps(date?: Date) { // Accept optional date
  const { userId } = await auth();
  if (!userId) return { steps: 0, source: "MANUAL" };

  // Use passed date OR today
  const targetDate = date ? startOfDay(date) : startOfDay(new Date());

  const metric = await prisma.dailyMetrics.findUnique({
    where: {
      userId_date: { userId, date: targetDate }
    }
  });

  return { steps: metric?.steps || 0, source: metric?.stepSource || "MANUAL" };
}

// 2. Update Steps (Manual or Google)
export async function updateDailySteps(count: number, source: "MANUAL" | "GOOGLE") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const today = startOfDay(new Date());

  await prisma.dailyMetrics.upsert({
    where: { userId_date: { userId, date: today } },
    update: { 
        steps: count, 
        stepSource: source 
    },
    create: { 
        userId, 
        date: today, 
        steps: count, 
        stepSource: source 
    }
  });

  return { success: true };
}


export async function syncGoogleSteps() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const client = await clerkClient();
    
    // 1. Try to get the token
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_google');
    
    // 2. CHECK IF TOKEN EXISTS
    const accessToken = tokenResponse.data[0]?.token;
    console.log("Access Token:", accessToken);
    
    if (!accessToken) {
      // This is the specific error case you are hitting right now
      return { success: false, error: "reauth_needed" };
    }

    // 3. Define Time Range
    const startTime = startOfDay(new Date()).getTime();
    const endTime = new Date().getTime();

    // 4. Call Google
    const googleResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
      }),
    });

    if (!googleResponse.ok) {
       const err = await googleResponse.text();
       console.error("Google API Error:", err);
       return { success: false, error: "google_api_error" };
    }

    const data = await googleResponse.json();
    const steps = data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;

    // 5. Save
    await updateDailySteps(steps, "GOOGLE");

    return { success: true, steps };

  } catch (e) {
    console.error("Sync Error:", e);
    // Return a clean error to the client instead of crashing (500)
    return { success: false, error: "internal_error" };
  }
}