// src/app/api/process-log/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

// NOTE: You had 'prisma' imported twice (once from lib, once new Client). 
// Best practice is to use the singleton from your lib to avoid connection limits.
import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const userText = body.userText || body.text;

    // 👇 1. UPDATE: Extract 'date' from the request body
    const { userId, date } = body;

    // 👇 ADD THIS SAFETY CHECK
    // This prevents the "id: undefined" crash
    if (!userId) {
      console.error("Missing User ID in request");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    if (!userText) return NextResponse.json({ error: "Log text is missing" }, { status: 400 });

    // --- TEMPORARY: HARDCODED KEY FOR TESTING ---
    const rawApiKey = process.env.GEMINI_API_KEY || "";

    if (!rawApiKey) {
      return NextResponse.json({ error: "Server API Key missing" }, { status: 500 });
    }

    // 2. Fetch User Data
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Initialize Gemini
    const genAI = new GoogleGenerativeAI(rawApiKey);
    // Note: Updated model name to one that is widely available if '2.5' isn't yet.
    // Ensure "gemini-1.5-flash" or your specific model version is correct.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: { responseMimeType: "application/json" }
    });

    // 4. Construct the Prompt
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

    // 5. Send to AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const aiResponse = JSON.parse(text);

    // 6. Save to Database
    const newLog = await prisma.dailyLog.create({
      data: {
        userId: user.id,
        // 👇 2. UPDATE: Use passed date or default to Now
        date: date ? new Date(date) : new Date(), 
        rawText: userText,
        parsedData: aiResponse,
        totalCaloriesIn: aiResponse.total_calories_in || 0,
        totalCaloriesOut: aiResponse.total_calories_out || 0,
        aiFeedback: aiResponse.ai_feedback,
      },
    });

    return NextResponse.json({ success: true, log: newLog });

  } catch (error: any) {
    console.error('Processing Error:', error.message);

    // 👇 INTELLIGENT ERROR MAPPING
    // We check the error message string to see what went wrong
    const msg = error.message || "";

    if (msg.includes("API_KEY_INVALID") || msg.includes("400")) {
        return NextResponse.json({ 
            error: "Configuration Error", 
            details: "The System API Key is invalid or expired. Please contact support." 
        }, { status: 401 });
    }

    if (msg.includes("429") || msg.includes("quota")) {
        return NextResponse.json({ 
            error: "Traffic Overload", 
            details: "The AI is receiving too many requests. Please wait 1 minute and try again." 
        }, { status: 429 });
    }

    if (msg.includes("AI_INVALID_JSON")) {
        return NextResponse.json({ 
            error: "AI Glitch", 
            details: "The AI returned unreadable data. Please try rephrasing your log." 
        }, { status: 500 });
    }

    if (msg.includes("User location is not supported")) {
        return NextResponse.json({ 
            error: "Location Not Supported", 
            details: "The AI model is not available in your current server region." 
        }, { status: 403 });
    }

    // Default Fallback
    return NextResponse.json({ 
        error: "System Error", 
        details: "An unexpected error occurred. Please try again." 
    }, { status: 500 });
  }
}