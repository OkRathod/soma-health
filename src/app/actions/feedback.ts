"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { subMonths } from "date-fns";

export async function submitFeedback(data: {
  rating: number;
  category: string;
  // 👇 FIX 1: Change specific fields to a generic object
  answers: Record<string, any>; 
}) {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: "You must be logged in." };
  }

  try {
    await prisma.feedback.create({
      data: {
        userId,
        rating: data.rating,
        category: data.category,
        // 👇 FIX 2: Save the entire object directly.
        // This works for ANY category (Bug, Feature, or General) automatically.
        answers: data.answers 
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Feedback Error:", error);
    return { success: false, error: "Database error." };
  }
}


export async function shouldRequestFeedback() {
  const { userId } = await auth();
  if (!userId) return false;

  try {
    // 1. Find the MOST RECENT feedback from this user
    const lastFeedback = await prisma.feedback.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true }
    });

    // 2. If NEVER submitted, return True
    if (!lastFeedback) return true;

    // 3. If submitted more than 2 MONTHS ago, return True
    const twoMonthsAgo = subMonths(new Date(), 2);
    
    // If last feedback is OLDER than 2 months ago
    if (lastFeedback.createdAt < twoMonthsAgo) {
      return true;
    }

    return false;
  } catch (error) {
    return false; // Fail silently (don't show prompt if error)
  }
}