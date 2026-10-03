"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateHabitsForUser } from "@/lib/habits";
import { HabitTemplateSchema, type HabitTemplateInput } from "@/lib/validation";
import { getSomaUser } from "@/lib/prisma"; 

// ---------- READ ----------
export async function getHabitTemplates() {
  const user = await getSomaUser();
  if (!user) return { success: false, data: [] as const };
  const data = await prisma.habitTemplate.findMany({
    where: { userId: user.id },
    include: { subtasks: { orderBy: { order: "asc" } } },
    orderBy: [{ isActive: "desc" }, { order: "asc" }],
  });
  return { success: true, data };
}

// ---------- CREATE / UPDATE ----------
export async function saveHabitTemplate(input: HabitTemplateInput) {
  const user = await getSomaUser();            // ensures the row exists
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;
  const data = HabitTemplateSchema.parse(input);

  const startTime = data.startTime ? new Date(data.startTime) : null;

  if (data.id) {
    // Verify ownership before touching anything.
    const owned = await prisma.habitTemplate.findFirst({
      where: { id: data.id, userId },
      select: { id: true },
    });
    if (!owned) throw new Error("Not found");

    // Replace subtasks wholesale (simple + predictable for templates).
    await prisma.$transaction([
      prisma.habitSubtaskTemplate.deleteMany({ where: { habitId: data.id } }),
      prisma.habitTemplate.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description ?? null,
          startTime,
          durationMins: data.durationMins ?? 60,
          daysOfWeek: data.daysOfWeek,
          isActive: data.isActive,
          subtasks: {
            create: data.subtasks.map((st, i) => ({
              title: st.title,
              targetValue: st.targetValue ?? null,
              unit: st.unit ?? null,
              order: i,
            })),
          },
        },
      }),
    ]);
  } else {
    const count = await prisma.habitTemplate.count({ where: { userId } });
    await prisma.habitTemplate.create({
      data: {
        userId,
        title: data.title,
        description: data.description ?? null,
        startTime,
        durationMins: data.durationMins ?? 60,
        daysOfWeek: data.daysOfWeek,
        isActive: data.isActive,
        order: count,
        subtasks: {
          create: data.subtasks.map((st, i) => ({
            title: st.title,
            targetValue: st.targetValue ?? null,
            unit: st.unit ?? null,
            order: i,
          })),
        },
      },
    });
  }

  revalidatePath("/tasks");
  revalidatePath("/habits");
  return { success: true };
}

export async function toggleHabitActive(id: string, isActive: boolean) {
  const user = await getSomaUser();            // ensures the row exists
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;
  await prisma.habitTemplate.updateMany({ where: { id, userId }, data: { isActive } });
  revalidatePath("/tasks");
  return { success: true };
}

export async function deleteHabitTemplate(id: string) {
  const user = await getSomaUser();            // ensures the row exists
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;
  // Ownership-scoped delete. Existing generated Task instances are left intact
  // (their parentId simply no longer resolves to a template).
  await prisma.habitTemplate.deleteMany({ where: { id, userId } });
  revalidatePath("/tasks");
  revalidatePath("/habits");
  return { success: true };
}

/**
 * Safety net called on dashboard/tasks load. Idempotent — generates today's
 * habit instances from templates if the midnight cron hasn't run yet.
 * Accepts the client's IANA timezone so the day boundary matches the user.
 */
export async function ensureTodaysHabits(clientTimezone?: string) {
  const user = await getSomaUser();            // ensures the row exists
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;

  // Keep the user's stored timezone fresh so the cron generates correctly too.
  let tz = clientTimezone;
  if (clientTimezone) {
    await prisma.user.update({ where: { id: userId }, data: { timezone: clientTimezone } }).catch(() => {});
  } else {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } });
    tz = u?.timezone ?? "UTC";
  }

  const { created } = await generateHabitsForUser(userId, tz ?? "UTC");
  if (created > 0) revalidatePath("/tasks");
  return { success: true, created };
}
