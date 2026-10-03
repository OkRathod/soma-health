// src/app/api/user/update-profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { height, weight, age, gender, activityLevel } = await req.json();
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(height ? { height: parseFloat(height) } : {}),
        ...(weight ? { weight: parseFloat(weight) } : {}),
        ...(age ? { age: parseInt(age, 10) } : {}),
        ...(gender ? { gender } : {}),
        ...(activityLevel ? { activityLevel } : {}),
      },
    });
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}