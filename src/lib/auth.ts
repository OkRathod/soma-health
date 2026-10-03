// src/lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Single source of truth for "who is calling".
 * NEVER trust a userId from the request body/query again — derive it here.
 *
 * Usage in a route:
 *   const gate = await requireUser();
 *   if (gate instanceof NextResponse) return gate;   // 401 already formed
 *   const { userId } = gate;
 */
export async function requireUser(): Promise<{ userId: string } | NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { userId };
}

/** Verifies a cron secret (constant-time-ish) for internal scheduled routes. */
export function isValidCron(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET) return false;
  if (header.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < header.length; i++) mismatch |= header.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0;
}
