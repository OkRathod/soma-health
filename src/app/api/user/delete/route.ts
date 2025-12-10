import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// 👇 CHANGED: Import 'currentUser' instead of 'auth'
import { currentUser } from "@clerk/nextjs/server"; 

export async function DELETE(request: Request) {
  try {
    // 1. Fetch the full user object
    const user = await currentUser();

    // 2. Strict Check: Ensure user and ID exist
    if (!user || !user.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Calculate date: Now + 15 days
    const gracePeriodEnd = new Date();
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 15);

    // 👇 SOFT DELETE using 'user.id'
    await prisma.user.update({
      where: { id: user.id }, // TypeScript now knows this is definitely a string
      data: { 
        scheduledForDeletion: gracePeriodEnd 
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Account scheduled for deletion in 15 days." 
    });

  } catch (error) {
    console.error("Soft Delete Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}