// src/app/api/log-water/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { startOfDay, endOfDay } from "date-fns";

// Water lives on ONE row per day (type: "WATER"), incremented — so it never
// creates dozens of rows and never inflates streaks/badges.
export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { amount } = await req.json();
    const add = Math.max(0, Math.min(5000, parseInt(amount, 10) || 0));
    const now = new Date();

    const existing = await prisma.dailyLog.findFirst({
      where: { userId, type: "WATER", date: { gte: startOfDay(now), lte: endOfDay(now) } },
      select: { id: true, waterMl: true },
    });

    const log = existing
      ? await prisma.dailyLog.update({ where: { id: existing.id }, data: { waterMl: existing.waterMl + add } })
      : await prisma.dailyLog.create({
          data: { userId, type: "WATER", date: now, rawText: "Water", waterMl: add, aiFeedback: "Hydration boost" },
        });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Water Log Error:", error);
    return NextResponse.json({ success: false, error: "Failed to log water" }, { status: 500 });
  }
}