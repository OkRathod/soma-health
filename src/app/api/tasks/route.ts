import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfDay, endOfDay, subDays } from 'date-fns';

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const queryDate = url.searchParams.get("date");
  const date = queryDate ? new Date(queryDate) : new Date();

  // Normalize "Today" to Midnight 00:00:00
  const start = startOfDay(date);
  const end = endOfDay(date);

  try {
    // 1. CHECK: Do ANY tasks exist for this specific date?
    const count = await prisma.task.count({
      where: { userId, date: { gte: start, lte: end } }
    });

    // 2. ROLLOVER LOGIC: If today is empty, copy habits from the past
    if (count === 0) {
      console.log("🌞 New Day Detected! Rolling over habits...");
      
      // Find the MOST RECENT day that had tasks
      const lastActiveTask = await prisma.task.findFirst({
        where: { userId, date: { lt: start } }, // Any task before today
        orderBy: { date: 'desc' }
      });

      if (lastActiveTask) {
        // We found the last active day. Fetch its habits.
        const startOfLastDay = startOfDay(lastActiveTask.date);
        const endOfLastDay = endOfDay(lastActiveTask.date);

        const habitsToCopy = await prisma.task.findMany({
            where: {
                userId,
                date: { gte: startOfLastDay, lte: endOfLastDay },
                isRecurring: true // Only copy tasks marked as Recurring
            },
            include: { subtasks: true }
        });

        // Copy them to TODAY
        for (const habit of habitsToCopy) {
            await prisma.task.create({
                data: {
                    userId,
                    title: habit.title,
                    description: habit.description,
                    priority: "HABIT", // Keep it grouped as a habit
                    startTime: habit.startTime,
                    isRecurring: true, // It remains recurring for tomorrow
                    date: start, // Set to TODAY (Midnight)
                    
                    // Reset Status
                    isCompleted: false, 
                    
                    // Copy Subtasks (Reset them too)
                    subtasks: {
                        create: habit.subtasks.map(st => ({
                            title: st.title,
                            targetValue: st.targetValue,
                            unit: st.unit,
                            isCompleted: false, // Reset subtask
                            currentValue: 0     // Reset count
                        }))
                    }
                }
            });
        }
      }
    }

    // 3. FETCH TASKS (Standard Fetch)
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        date: { gte: start, lte: end }
      },
      include: { subtasks: true },
      orderBy: { startTime: 'asc' }
    });

    return NextResponse.json({ success: true, tasks });

  } catch (error) {
    console.error("GET Tasks Error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST: Create a Task (No Master/Parent logic anymore)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, priority, date, startTime, isRecurring, subtasks } = body;

  const targetDate = new Date(date);
  const start = startOfDay(targetDate);
  const end = endOfDay(targetDate);

  // Priority Check (Only for Schedule)
  if (!isRecurring && priority !== "LOW") {
    const existingCount = await prisma.task.count({
      where: {
        userId,
        priority,
        date: { gte: start, lte: end },
        isRecurring: false
      }
    });

    if (priority === "HIGH" && existingCount >= 3) return NextResponse.json({ error: "High Priority limit (3) reached." }, { status: 400 });
    if (priority === "MEDIUM" && existingCount >= 5) return NextResponse.json({ error: "Medium Priority limit (5) reached." }, { status: 400 });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        description,
        priority: isRecurring ? "HABIT" : priority,
        
        // Normalize date to Midnight
        date: start, 
        
        startTime: startTime ? new Date(startTime) : null,
        isRecurring: isRecurring || false,
        
        // No parentId needed
        parentId: null,
        
        subtasks: {
          create: (subtasks || []).map((st: any) => ({
            title: st.title,
            targetValue: st.targetValue ? parseInt(st.targetValue) : null,
            unit: st.unit
          }))
        }
      },
      include: { subtasks: true }
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

// PATCH: Simple Update (Updates only the clicked task)
export async function PATCH(req: Request) {
    const { userId } = await auth();
    // Safety check again to satisfy Typescript
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { taskId, isCompleted, subtaskId, subtaskValue, title, description, priority, startTime, isRecurring } = body;

    try {
        if (subtaskId) {
            await prisma.subTask.update({
                where: { id: subtaskId },
                data: { isCompleted, currentValue: subtaskValue }
            });
            return NextResponse.json({ success: true });
        }

        if (taskId) {
            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (description !== undefined) updateData.description = description;
            if (priority !== undefined) updateData.priority = priority;
            if (startTime !== undefined) updateData.startTime = startTime ? new Date(startTime) : null;
            if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
            if (isRecurring !== undefined) updateData.isRecurring = isRecurring;

            // FIX: Ensure userId is not null in the where clause
            await prisma.task.updateMany({
                where: { 
                    id: taskId, 
                    userId: userId // Since we checked !userId at the top, this is safe
                },
                data: updateData
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    } catch (e) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// 👇 FIXED DELETE FUNCTION
export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");

  if (!taskId || typeof taskId !== 'string') {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  try {
    // FIX: Using deleteMany allows passing 'userId' safely in the where clause
    const result = await prisma.task.deleteMany({ 
        where: { 
            id: taskId, 
            userId: userId // Safe because of the check above
        } 
    });
    
    return NextResponse.json({ success: true, deleted: result.count > 0 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}