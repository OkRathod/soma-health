// src/app/api/process-log/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
// import { decryptKey } from '@/lib/crypto';  <-- We don't need this right now

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userText, userTimezone } = body;

    // --- TEMPORARY: HARDCODED KEY FOR TESTING ---
    // 🔴 WARNING: DO NOT COMMIT THIS FILE TO GITHUB WITH YOUR KEY!
    const rawApiKey = process.env.GEMINI_API_KEY || "";

    if (!rawApiKey) {
      return NextResponse.json({ error: "Server API Key missing" }, { status: 500 });
    }

    // 1. Fetch User Data (We still need this for context like weight/height)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(rawApiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // 3. Construct the Prompt
    const prompt = `
      SYSTEM ROLE:
      You are the "Global Health Architect," a culturally-intelligent fitness engine.
      
      USER CONTEXT:
      - Nationality: ${user.nationality || 'Unknown'}
      - Height: ${user.height}cm
      - Weight: ${user.weight}kg
      
      TASK:
      Analyze this user log: "${userText}"
      
      REQUIREMENTS:
      1. Interpret food culturally (e.g., "Dal" implies ghee/oil unless specified).
      2. Return ONLY valid JSON.
      
      JSON SCHEMA:
      {
        "foods": [{"name": "string", "calories": number, "protein": number, "carbs": number, "fats": number}],
        "exercises": [{"name": "string", "calories_burned": number, "duration_minutes": number}],
        "total_calories_in": number,
        "total_calories_out": number,
        "ai_feedback": "string (short, culturally relevant)",
        "next_step": "string (one actionable tip)"
      }
    `;

    // 4. Send to AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const aiResponse = JSON.parse(text);

    // 5. Save to Database
    const newLog = await prisma.dailyLog.create({
      data: {
        userId: user.id,
        rawText: userText,
        parsedData: aiResponse,
        totalCaloriesIn: aiResponse.total_calories_in || 0,
        totalCaloriesOut: aiResponse.total_calories_out || 0,
        aiFeedback: aiResponse.ai_feedback,
      },
    });

    return NextResponse.json({ success: true, log: newLog });

  } catch (error: any) {
    console.error('Processing Error:', error);
    return NextResponse.json(
      { error: 'Failed to process log', details: error.message },
      { status: 500 }
    );
  }
}