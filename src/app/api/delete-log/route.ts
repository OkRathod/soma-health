// src/app/api/delete-log/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const logId = new URL(req.url).searchParams.get("id");
  if (!logId) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

  try {
    // Ownership enforced by the where-clause using the SESSION userId.
    const result = await prisma.dailyLog.deleteMany({ where: { id: logId, userId } });
    if (result.count === 0) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Log Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}