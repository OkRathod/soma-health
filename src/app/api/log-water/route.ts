import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    const log = await prisma.dailyLog.create({
      data: {
        userId: userId,
        date: new Date(),
        rawText: "Logged water",
        waterMl: amount,
        totalCaloriesIn: 0,
        totalCaloriesOut: 0,
        aiFeedback: "Hydration boost! 💧"
      }
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to log water" }, { status: 500 });
  }
}