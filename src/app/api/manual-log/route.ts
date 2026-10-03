// src/app/api/manual-log/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { name, calories, protein } = await req.json();
    const cals = Math.max(0, Math.round(Number(calories) || 0));
    const pro = Math.max(0, Math.round(Number(protein) || 0));
    const foodName = String(name || "Meal").slice(0, 120);

    const log = await prisma.dailyLog.create({
      data: {
        userId,
        type: "MEAL",
        date: new Date(),
        rawText: `${foodName} (manual)`,
        parsedData: {
          foods: [{ name: foodName, calories: cals, protein: pro, carbs: 0, fats: 0 }],
          exercises: [],
        },
        totalCaloriesIn: cals,
        totalCaloriesOut: 0,
        aiFeedback: null,
      },
    });
    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Manual Log Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}