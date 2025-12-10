import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"; // 👈 Use 'currentUser' instead of 'auth'

export async function POST(request: Request) {
  try {
    // 1. Fetch the full user object (Async/Await)
    const user = await currentUser();

    // 2. Strict Check: If no user found, stop.
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Restore the account
    await prisma.user.update({
      where: { id: user.id }, // 👈 Now TypeScript knows this is definitely a string
      data: { scheduledForDeletion: null }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Restore Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}