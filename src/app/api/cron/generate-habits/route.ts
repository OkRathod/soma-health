// src/app/api/cron/generate-habits/route.ts
// Runs on a schedule (recommend hourly so every timezone gets its local midnight).
// Idempotent, so overlapping runs / retries are harmless.
import { NextResponse } from "next/server";
import { isValidCron } from "@/lib/auth";
import { generateHabitsForAllUsers } from "@/lib/habits";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  if (!isValidCron(req)) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const result = await generateHabitsForAllUsers();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("generate-habits cron error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
