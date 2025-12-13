import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, height, weight, age, gender, activityLevel } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        height: parseFloat(height),
        weight: parseFloat(weight),
        age: parseInt(age),
        gender: gender,
        activityLevel: activityLevel,
        // Optional: Reset their daily calorie goal based on new stats?
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}