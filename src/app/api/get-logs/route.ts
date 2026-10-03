// src/app/api/get-logs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    const logs = await prisma.dailyLog.findMany({
      where: {
        userId,
        ...(from && to ? { date: { gte: new Date(from), lte: new Date(to) } } : {}),
      },
      orderBy: { date: "desc" },
      ...(from && to ? {} : { take: 14 }),
    });
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Fetch Logs Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}