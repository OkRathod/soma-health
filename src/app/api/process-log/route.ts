// src/app/api/process-log/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { decryptKey } from "@/lib/crypto";
import { parseAiLog } from "@/lib/validation";

export const maxDuration = 30;

// Lightweight per-instance rate limit. For multi-instance deployments, back
// this with Upstash/Redis; the shape stays the same.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();
function rateLimited(userId: string): boolean {
  const now = Date.now();
  const arr = (hits.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(userId, arr);
  return arr.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  if (rateLimited(userId)) {
    return NextResponse.json(
      { error: "Slow down", details: "You're logging very fast. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const userText: string = body.userText || body.text || "";
    const date: string | undefined = body.date;
    if (!userText.trim()) return NextResponse.json({ error: "Log text is missing" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Prefer the user's own key (the vault) if present, else the server key.
    let apiKey = process.env.GEMINI_API_KEY || "";
    if (user.encryptedApiKey && user.apiKeyIv) {
      try {
        apiKey = decryptKey(user.encryptedApiKey, user.apiKeyIv);
      } catch {
        /* fall back to server key */
      }
    }
    if (!apiKey) return NextResponse.json({ error: "Server API Key missing" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      SYSTEM ROLE: You are "Soma", an elite, culturally-intelligent nutrition & fitness coach.
      USER PROFILE:
      - Age/Gender: ${user.age ?? "N/A"} / ${user.gender ?? "N/A"}
      - Region: ${user.nationality ?? "N/A"}
      - Height/Weight: ${user.height ? user.height + "cm" : "N/A"} / ${user.weight ? user.weight + "kg" : "N/A"}
      - Goal: ${user.weightGoal ?? "N/A"} (Target ${user.targetWeight ? user.targetWeight + "kg" : "N/A"})
      - Daily targets: ${user.dailyCalorieGoal} kcal, ${user.waterGoal} ml
      - Activity/Job: ${user.activityLevel ?? "N/A"} / ${user.jobType ?? "N/A"}
      - Diet: ${user.dietaryPreferences ?? "none"}
      - Purpose: ${user.customPurpose ?? "general health"}

      TASK: Analyze this log: "${userText}"
      RULES: Interpret food culturally & by realistic portions. Tie feedback to the user's goal & purpose.
      "ai_feedback" = 3-5 encouraging, specific sentences. "next_step" = one concrete micro-habit.
      Return ONLY valid JSON:
      {"foods":[{"name":"string","calories":number,"protein":number,"carbs":number,"fats":number}],
       "exercises":[{"name":"string","calories_burned":number,"duration_minutes":number}],
       "total_calories_in":number,"total_calories_out":number,"ai_feedback":"string","next_step":"string"}
    `;

    const result = await model.generateContent(prompt);
    const raw = JSON.parse(result.response.text());
    const ai = parseAiLog(raw); // validated + totals repaired

    const newLog = await prisma.dailyLog.create({
      data: {
        userId,
        type: "MEAL",
        date: date ? new Date(date) : new Date(),
        rawText: userText,
        parsedData: ai,
        totalCaloriesIn: ai.total_calories_in,
        totalCaloriesOut: ai.total_calories_out,
        aiFeedback: ai.ai_feedback,
      },
    });

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    const msg = (error as Error).message || "";
    console.error("Processing Error:", msg);
    if (msg.includes("API_KEY_INVALID"))
      return NextResponse.json({ error: "Configuration Error", details: "The API key is invalid." }, { status: 401 });
    if (msg.includes("429") || msg.includes("quota"))
      return NextResponse.json({ error: "Traffic Overload", details: "The AI is busy. Try again shortly." }, { status: 429 });
    if (msg.includes("JSON"))
      return NextResponse.json({ error: "AI Glitch", details: "The AI returned unreadable data. Rephrase your log." }, { status: 502 });
    return NextResponse.json({ error: "System Error", details: "Unexpected error. Please try again." }, { status: 500 });
  }
}