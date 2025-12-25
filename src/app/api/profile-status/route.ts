import { getSomaUser } from "@/lib/prisma";
import { checkProfileCompleteness } from "@/lib/check-profile";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSomaUser();
  if (!user) {
    return NextResponse.json({ isComplete: true });
  }

  const status = await checkProfileCompleteness(user.id);
  return NextResponse.json(status);
}
