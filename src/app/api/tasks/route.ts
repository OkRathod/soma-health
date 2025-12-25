import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfDay, endOfDay, subDays } from 'date-fns';


export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const queryDate = url.searchParams.get("date");
  const targetDate = queryDate ? new Date(queryDate) : new Date();
  const start = startOfDay(targetDate);
  const end = endOfDay(targetDate);


  if (from && to) {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId,
          date: { gte: new Date(from), lte: new Date(to) }
        },
        include: { subtasks: true },
        orderBy: { date: 'asc' }
      });
      return NextResponse.json({ success: true, tasks });
    } catch (e) {
      return NextResponse.json({ error: "Failed to fetch range" }, { status: 500 });
    }
  }

  try {
    const lastActiveTask = await prisma.task.findFirst({
      where: { userId, date: { lt: start } }, 
      orderBy: { date: 'desc' }
    });

    if (lastActiveTask) {
      const startOfLastDay = startOfDay(lastActiveTask.date);
      const endOfLastDay = endOfDay(lastActiveTask.date);
      const pastHabits = await prisma.task.findMany({
          where: {
              userId,
              date: { gte: startOfLastDay, lte: endOfLastDay },
              isRecurring: true 
          },
          include: { subtasks: true }
      });

      if (pastHabits.length > 0) {
        const todaysHabits = await prisma.task.findMany({
            where: {
                userId,
                date: { gte: start, lte: end },
                isRecurring: true
            },
            select: { title: true } 
        });

        const todaysHabitTitles = new Set(todaysHabits.map(t => t.title));
        const missingHabits = pastHabits.filter(h => !todaysHabitTitles.has(h.title));

        if (missingHabits.length > 0) {
            console.log(`♻️ Rollover: Creating ${missingHabits.length} missing habits for ${targetDate.toDateString()}`);

            for (const habit of missingHabits) {
                const alreadyExists = await prisma.task.findFirst({
                    where: {
                        userId,
                        date: start, 
                        title: habit.title 
                    },
                    select: { id: true } 
                });

                if (!alreadyExists) {
                    await prisma.task.create({
                        data: {
                            userId,
                            title: habit.title,
                            description: habit.description,
                            priority: "HABIT",
                            startTime: habit.startTime,
                            isRecurring: true,
                            date: start,
                            isCompleted: false,
                            durationMins: habit.durationMins,
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
      }
    }
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


export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, priority, date, startTime, isRecurring, subtasks, duration } = body;

  const targetDate = new Date(date);
  const start = startOfDay(targetDate);
  const end = endOfDay(targetDate);


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
        date: start, 
        
        startTime: startTime ? new Date(startTime) : null,
        durationMins: duration ? parseInt(duration) : 60,
        isRecurring: isRecurring || false,
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

export async function PATCH(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { 
        taskId, isCompleted, subtaskId, subtaskValue, 
        title, description, priority, startTime, isRecurring, 
        newSubtasks, duration 
    } = body;

    try {
        if (subtaskId) {
            await prisma.subTask.update({
                where: { id: subtaskId },
                data: { isCompleted, currentValue: subtaskValue }
            });
            return NextResponse.json({ success: true });
        }

        if (taskId) {
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
            
            if (newSubtasks && Array.isArray(newSubtasks) && newSubtasks.length > 0) {
                updateData.subtasks = {
                    create: newSubtasks.map((st: any) => ({
                        title: st.title,
                        targetValue: st.targetValue ? parseInt(st.targetValue) : null,
                        unit: st.unit
                    }))
                };
            }
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


export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");

  if (!taskId || typeof taskId !== 'string') {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  try {
    const result = await prisma.task.deleteMany({ 
        where: { 
            id: taskId, 
            userId: userId 
        } 
    });
    
    return NextResponse.json({ success: true, deleted: result.count > 0 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}