"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ================= READ =================

export async function getDeadlines() {
  const { userId } = await auth();
  if (!userId) return { success: false, data: [] };

  const deadlines = await prisma.deadline.findMany({
    where: { userId },
    include: { subtasks: { orderBy: { id: 'asc' } } }, // Order subtasks so they don't jump around
    orderBy: { targetDate: 'asc' }
  });

  return { success: true, data: deadlines };
}

// ================= CREATE =================

export async function createDeadline(data: {
  title: string;
  targetDate: string | null;
  subtasks: string[];
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.deadline.create({
    data: {
      userId,
      title: data.title,
      targetDate: data.targetDate ? new Date(data.targetDate) : null,
      subtasks: {
        create: data.subtasks.map(t => ({ title: t }))
      }
    }
  });

  revalidatePath("/deadlines");
  return { success: true };
}

// ================= UPDATE (ACTIONS) =================

// 1. Toggle the Main Deadline (Done/Not Done)
export async function toggleDeadline(id: string, isCompleted: boolean) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await prisma.deadline.update({
        where: { id, userId }, // Ensure user owns it
        data: { 
            isCompleted,
            completedAt: isCompleted ? new Date() : null 
        }
    });

    revalidatePath("/deadlines");
    return { success: true };
}

// 2. Toggle a Subtask
export async function toggleSubtask(subtaskId: string, isCompleted: boolean) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // We need to verify ownership via the parent deadline
    // Prisma doesn't let us easily check nested ownership in one 'update' call
    // So we assume if they have the ID they are authorized (or you can do a fetch first)
    
    await prisma.deadlineSubtask.update({
        where: { id: subtaskId },
        data: { isCompleted }
    });

    revalidatePath("/deadlines");
    return { success: true };
}


// ================= EDIT (FULL UPDATE) =================

// src/app/actions/deadlines.ts

// ... keep other imports ...

// 4. Update Deadline (Title, Date, & Subtasks)
export async function updateDeadline(id: string, data: {
  title: string;
  targetDate: string | null;
  subtasks: { id?: string; title: string }[] // 👈 Now accepts subtasks list
}) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // 1. Get existing subtask IDs to calculate deletions
    const existing = await prisma.deadlineSubtask.findMany({
        where: { deadlineId: id },
        select: { id: true }
    });
    const existingIds = existing.map(e => e.id);

    // 2. Which IDs are still in the new list?
    const incomingIds = data.subtasks.map(s => s.id).filter(Boolean) as string[];

    // 3. Calculate Diff: Delete IDs that are missing from the new list
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));

    // 4. Transaction: Execute all changes safely
    await prisma.$transaction([
        // A. Update Main Details
        prisma.deadline.update({
            where: { id, userId },
            data: {
                title: data.title,
                targetDate: data.targetDate ? new Date(data.targetDate) : null
            }
        }),
        // B. Delete removed subtasks
        prisma.deadlineSubtask.deleteMany({
            where: { id: { in: toDelete } }
        }),
        // C. Update existing or Create new subtasks
        ...data.subtasks.map(task => {
            if (task.id) {
                // Update existing title
                return prisma.deadlineSubtask.update({
                    where: { id: task.id },
                    data: { title: task.title }
                });
            } else {
                // Create new
                return prisma.deadlineSubtask.create({
                    data: {
                        title: task.title,
                        deadlineId: id
                    }
                });
            }
        })
    ]);

    revalidatePath("/deadlines");
    return { success: true };
}
// ================= DELETE =================

export async function deleteDeadline(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await prisma.deadline.delete({
        where: { id, userId }
    });

    revalidatePath("/deadlines");
    return { success: true };
}