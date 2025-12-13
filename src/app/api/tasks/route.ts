import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfDay, endOfDay, subDays } from 'date-fns';

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  
  // 👇 NEW: Check if we are asking for a Range (for Charts)
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  if (from && to) {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(from),
                    lte: new Date(to)
                }
            },
            include: { subtasks: true },
            orderBy: { date: 'asc' }
        });
        // Return immediately. No need to check for rollovers on historical ranges.
        return NextResponse.json({ success: true, tasks });
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch range" }, { status: 500 });
    }
  }

  // --- EXISTING LOGIC STARTS HERE (For Daily Schedule Page) ---

  const queryDate = url.searchParams.get("date");
  const date = queryDate
  ? new Date(`${queryDate}T00:00:00`)
  : new Date();

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
                    priority: "HABIT", 
                    startTime: habit.startTime,
                    isRecurring: true, 
                    date: start, // Set to TODAY (Midnight)
                    isCompleted: false, 
                    
                    subtasks: {
                        create: habit.subtasks.map(st => ({
                            title: st.title,
                            targetValue: st.targetValue,
                            unit: st.unit,
                            isCompleted: false, 
                            currentValue: 0
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
  const { title, description, priority, date, startTime, isRecurring, subtasks, duration } = body;

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
        durationMins: duration ? parseInt(duration) : 60,
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

// src/app/api/tasks/route.ts
export async function PATCH(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { 
        taskId, isCompleted, subtaskId, subtaskValue, // Toggle fields
        title, description, priority, startTime, isRecurring, // Edit fields
        newSubtasks, duration // 👇 NEW FIELD
    } = body;

    try {
        // 1. Handle Subtask Updates (Simple Toggle)
        if (subtaskId) {
            await prisma.subTask.update({
                where: { id: subtaskId },
                data: { isCompleted, currentValue: subtaskValue }
            });
            return NextResponse.json({ success: true });
        }

        // 2. Handle Main Task Updates
        if (taskId) {
            // Check ownership first
            const existingTask = await prisma.task.findUnique({
                where: { id: taskId, userId }
            });
            
            if (!existingTask) {
                return NextResponse.json({ error: "Task not found" }, { status: 404 });
            }

            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (description !== undefined) updateData.description = description;
            if (priority !== undefined) updateData.priority = priority;
            if (startTime !== undefined) updateData.startTime = startTime ? new Date(startTime) : null;
            if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
            if (isRecurring !== undefined) updateData.isRecurring = isRecurring;
            if (duration !== undefined) updateData.durationMins = parseInt(duration);
            
            // 👇 NEW: Check if there are new subtasks to add
            if (newSubtasks && Array.isArray(newSubtasks) && newSubtasks.length > 0) {
                updateData.subtasks = {
                    create: newSubtasks.map((st: any) => ({
                        title: st.title,
                        targetValue: st.targetValue ? parseInt(st.targetValue) : null,
                        unit: st.unit
                    }))
                };
            }

            // Perform the update
            // We use .update() now because we verified ownership above with findUnique
            await prisma.task.update({
                where: { id: taskId },
                data: updateData
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    } catch (e) {
        console.error("Update error", e);
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