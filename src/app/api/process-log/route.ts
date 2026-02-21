import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userText = body.userText || body.text;
    const { userId, date } = body;

    if (!userId) {
      console.error("Missing User ID in request");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    if (!userText) return NextResponse.json({ error: "Log text is missing" }, { status: 400 });

    const rawApiKey = process.env.GEMINI_API_KEY || "";

    if (!rawApiKey) {
      return NextResponse.json({ error: "Server API Key missing" }, { status: 500 });
    }

    // Fetch User Data - Ensure all fields are selected (Prisma does this by default on findUnique)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(rawApiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Ensure this matches your available model
      generationConfig: { responseMimeType: "application/json" }
    });

    // 👇 THE NEW HIGHLY PERSONALIZED PROMPT 👇
    const prompt = `
      SYSTEM ROLE:
      You are the "Global Health Architect," an elite, highly personalized, and culturally-intelligent fitness and nutrition coach. Your goal is to provide detailed, actionable, and encouraging guidance based strictly on the user's unique profile.

      USER PROFILE & GOALS:
      - Age/Gender: ${user.age || 'Not provided'} / ${user.gender || 'Not provided'}
      - Culture/Region: ${user.nationality || 'Not provided'}
      - Physical Stats: Height: ${user.height ? user.height + 'cm' : 'Not provided'}, Weight: ${user.weight ? user.weight + 'kg' : 'Not provided'}
      - Weight Goal: ${user.weightGoal || 'Not provided'} (Target: ${user.targetWeight ? user.targetWeight + 'kg' : 'Not provided'})
      - Daily Targets: ${user.dailyCalorieGoal} kcal, ${user.waterGoal} ml water
      - Lifestyle: Activity Level: ${user.activityLevel || 'Not provided'}, Job Type: ${user.jobType || 'Not provided'}
      - Diet Preferences: ${user.dietaryPreferences || 'Not provided'}
      - Core Motivation/Purpose: ${user.customPurpose || 'Not provided'}
      
      TASK:
      Analyze this daily log from the user: "${userText}"
      
      REQUIREMENTS:
      1. CULTURAL ACCURACY: Interpret food culturally (e.g., Indian "Dal" implies ghee/oil unless specified, account for typical regional portion sizes).
      2. DEEP PERSONALIZATION: Tie your feedback directly to their profile. 
         - If they have a "${user.jobType || 'desk'}" job, give relevant movement advice. 
         - Tie their daily choices back to their core motivation: "${user.customPurpose || 'health'}".
         - Respect their dietary preference: "${user.dietaryPreferences || 'none'}".
      3. DETAILED COACHING: "ai_feedback" MUST NOT be a generic short sentence. It must be a detailed, encouraging paragraph (3-5 sentences) that acts as a mini coaching session. Acknowledge what they did well today, calculate if they are on track for their calories/goals, and gently course-correct if needed.
      4. ACTIONABLE: "next_step" MUST be one clear, highly specific micro-habit they can execute today or tomorrow.
      5. FORMAT: Return ONLY valid JSON.
      
      JSON SCHEMA:
      {
        "foods": [{"name": "string", "calories": number, "protein": number, "carbs": number, "fats": number}],
        "exercises": [{"name": "string", "calories_burned": number, "duration_minutes": number}],
        "total_calories_in": number,
        "total_calories_out": number,
        "ai_feedback": "string (detailed, highly personalized coaching paragraph)",
        "next_step": "string (one specific, actionable tip tailored to their exact goals)"
      }
    `;

    // Send to AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const aiResponse = JSON.parse(text);
    console.log('AI Response:', aiResponse);

    // Save to Database
    const newLog = await prisma.dailyLog.create({
      data: {
        userId: user.id,
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

    const msg = error.message || "";

    if (msg.includes("API_KEY_INVALID") || msg.includes("400")) {
        return NextResponse.json({ error: "Configuration Error", details: "The System API Key is invalid or expired. Please contact support." }, { status: 401 });
    }
    if (msg.includes("429") || msg.includes("quota")) {
        return NextResponse.json({ error: "Traffic Overload", details: "The AI is receiving too many requests. Please wait 1 minute and try again." }, { status: 429 });
    }
    if (msg.includes("AI_INVALID_JSON") || msg.includes("SyntaxError")) {
        return NextResponse.json({ error: "AI Glitch", details: "The AI returned unreadable data. Please try rephrasing your log." }, { status: 500 });
    }
    if (msg.includes("User location is not supported")) {
        return NextResponse.json({ error: "Location Not Supported", details: "The AI model is not available in your current server region." }, { status: 403 });
    }

    return NextResponse.json({ error: "System Error", details: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}