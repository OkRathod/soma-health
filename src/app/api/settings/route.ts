// src/app/api/settings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { encryptKey } from "@/lib/crypto";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { nationality, height, weight, apiKey, unitPreference } = await req.json();

    const data: Record<string, unknown> = {
      nationality: nationality ?? null,
      unitPreference: unitPreference || "metric",
    };
    if (height !== undefined && height !== "") data.height = parseFloat(height);
    if (weight !== undefined && weight !== "") data.weight = parseFloat(weight);

    if (apiKey && String(apiKey).trim() !== "") {
      const { encryptedData, iv } = encryptKey(String(apiKey).trim());
      data.encryptedApiKey = encryptedData;
      data.apiKeyIv = iv;
    }

    const updated = await prisma.user.update({ where: { id: userId }, data });
    // Never echo the key back.
    return NextResponse.json({
      success: true,
      user: { ...updated, encryptedApiKey: undefined, apiKeyIv: undefined },
    });
  } catch (error) {
    console.error("Settings Save Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      nationality: true,
      height: true,
      weight: true,
      encryptedApiKey: true,
      unitPreference: true,
      timezone: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      nationality: user?.nationality ?? "",
      height: user?.height ?? "",
      weight: user?.weight ?? "",
      unitPreference: user?.unitPreference ?? "metric",
      timezone: user?.timezone ?? "UTC",
      hasKey: !!user?.encryptedApiKey,
    },
  });
}