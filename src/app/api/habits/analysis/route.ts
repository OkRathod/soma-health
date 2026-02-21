import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust to your prisma instance path
import { calculateHabitStats } from "@/lib/streak-utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    // 1. Fetch all tasks that are recurring (habits)
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        isRecurring: true, // Filters only habits based on your schema
      },
      select: {
        title: true,
        date: true,
        isCompleted: true,
      },
      orderBy: { date: 'desc' }
    });

    // 2. Group by Title
    const groupedHabits: Record<string, Date[]> = {};
    
    tasks.forEach(task => {
      if (!groupedHabits[task.title]) {
        groupedHabits[task.title] = [];
      }
      // Only push the date if the habit was completed
      if (task.isCompleted) {
        groupedHabits[task.title].push(task.date);
      }
    });

    // 3. Process the stats for each habit
    const analysis = Object.entries(groupedHabits).map(([title, dates]) => {
      const stats = calculateHabitStats(dates);
      return {
        title,
        ...stats,
      };
    });

    return NextResponse.json({ success: true, habits: analysis });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}