// src/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { startOfDay, endOfDay } from "date-fns";
import { TaskCreateSchema } from "@/lib/validation";

// GET is now a PURE READ. Habit generation happens via the cron + the
// ensureTodaysHabits() action — never as a side-effect of a fetch.
export async function GET(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const queryDate = url.searchParams.get("date");

  try {
    if (from && to) {
      const tasks = await prisma.task.findMany({
        where: { userId, date: { gte: new Date(from), lte: new Date(to) } },
        include: { subtasks: { orderBy: { id: "asc" } } },
        orderBy: { date: "asc" },
      });
      return NextResponse.json({ success: true, tasks });
    }

    const target = queryDate ? new Date(queryDate) : new Date();
    const tasks = await prisma.task.findMany({
      where: { userId, date: { gte: startOfDay(target), lte: endOfDay(target) } },
      include: { subtasks: { orderBy: { id: "asc" } } },
      orderBy: [{ startTime: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("GET Tasks Error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const parsed = TaskCreateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid task", details: parsed.error.flatten() }, { status: 400 });
  }
  const body = parsed.data;
  const target = new Date(body.date);
  const start = startOfDay(target);
  const end = endOfDay(target);

  try {
    // Enforce priority caps atomically to avoid races.
    const created = await prisma.$transaction(async (tx) => {
      if (!body.isRecurring && (body.priority === "HIGH" || body.priority === "MEDIUM")) {
        const count = await tx.task.count({
          where: { userId, priority: body.priority, isRecurring: false, date: { gte: start, lte: end } },
        });
        if (body.priority === "HIGH" && count >= 3) throw new Error("LIMIT_HIGH");
        if (body.priority === "MEDIUM" && count >= 5) throw new Error("LIMIT_MEDIUM");
      }
      return tx.task.create({
        data: {
          userId,
          title: body.title,
          description: body.description ?? null,
          priority: body.isRecurring ? "HABIT" : body.priority,
          date: start,
          startTime: body.startTime ? new Date(body.startTime) : null,
          durationMins: body.duration ?? 60,
          isRecurring: body.isRecurring,
          parentId: null,
          subtasks: {
            create: body.subtasks.map((st) => ({
              title: st.title,
              targetValue: st.targetValue ?? null,
              unit: st.unit ?? null,
              currentValue: 0,
            })),
          },
        },
        include: { subtasks: true },
      });
    });
    return NextResponse.json({ success: true, task: created });
  } catch (error) {
    const msg = (error as Error).message;
    if (msg === "LIMIT_HIGH") return NextResponse.json({ error: "High Priority limit (3) reached." }, { status: 400 });
    if (msg === "LIMIT_MEDIUM") return NextResponse.json({ error: "Medium Priority limit (5) reached." }, { status: 400 });
    console.error("POST Task Error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const body = await req.json();
  const { taskId, subtaskId, isCompleted, subtaskValue, title, description, priority, startTime, isRecurring, newSubtasks, duration } = body;

  try {
    if (subtaskId) {
      // Verify the subtask's parent task belongs to this user BEFORE writing.
      const sub = await prisma.subTask.findFirst({
        where: { id: subtaskId, task: { userId } },
        select: { id: true },
      });
      if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });

      await prisma.subTask.update({
        where: { id: subtaskId },
        data: {
          ...(isCompleted !== undefined ? { isCompleted } : {}),
          ...(subtaskValue !== undefined ? { currentValue: subtaskValue } : {}),
        },
      });
      return NextResponse.json({ success: true });
    }

    if (taskId) {
      const existing = await prisma.task.findFirst({ where: { id: taskId, userId }, select: { id: true } });
      if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

      const data: Record<string, unknown> = {};
      if (title !== undefined) data.title = title;
      if (description !== undefined) data.description = description;
      if (priority !== undefined) data.priority = priority;
      if (startTime !== undefined) data.startTime = startTime ? new Date(startTime) : null;
      if (isCompleted !== undefined) data.isCompleted = isCompleted;
      if (isRecurring !== undefined) data.isRecurring = isRecurring;
      if (duration !== undefined) data.durationMins = parseInt(duration, 10);
      if (Array.isArray(newSubtasks) && newSubtasks.length > 0) {
        data.subtasks = {
          create: newSubtasks.map((st: { title: string; targetValue?: string; unit?: string }) => ({
            title: st.title,
            targetValue: st.targetValue ? parseInt(st.targetValue, 10) : null,
            unit: st.unit,
            currentValue: 0,
          })),
        };
      }
      await prisma.task.update({ where: { id: taskId }, data });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  } catch (e) {
    console.error("PATCH Task Error:", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const taskId = new URL(req.url).searchParams.get("id");
  if (!taskId) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    const result = await prisma.task.deleteMany({ where: { id: taskId, userId } });
    return NextResponse.json({ success: true, deleted: result.count > 0 });
  } catch (error) {
    console.error("DELETE Task Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
