// src/lib/habits.ts
import { prisma } from "@/lib/prisma";
import { localDayStart, dayOfWeek } from "@/lib/tz";

/**
 * Generate today's habit instances for a single user from their HabitTemplates.
 *
 * Design guarantees (this is the bug fix):
 *  - Reads ONLY from HabitTemplate. It never copies yesterday's Task rows,
 *    so one-off tasks and notes can never leak into habits.
 *  - Idempotent: safe to call any number of times per day. A per-template
 *    existence check plus the DB-level @@unique([userId, parentId, date])
 *    constraint means concurrent calls (e.g. the user opening two tabs, a
 *    prefetch, or cron overlapping the on-load safety net) cannot duplicate.
 *  - Respects daysOfWeek so a habit only appears on its scheduled days.
 */
export async function generateHabitsForUser(
  userId: string,
  timezone: string,
  now: Date = new Date()
): Promise<{ created: number }> {
  const dayStart = localDayStart(timezone, now);
  const dow = dayOfWeek(dayStart);

  const templates = await prisma.habitTemplate.findMany({
    where: { userId, isActive: true },
    include: { subtasks: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  const due = templates.filter((t) => t.daysOfWeek.includes(dow));
  if (due.length === 0) return { created: 0 };

  // Which templates already have an instance today? (one round-trip)
  const existing = await prisma.task.findMany({
    where: { userId, date: dayStart, parentId: { in: due.map((t) => t.id) } },
    select: { parentId: true },
  });
  const existingIds = new Set(existing.map((e) => e.parentId));

  let created = 0;
  for (const t of due) {
    if (existingIds.has(t.id)) continue;
    try {
      await prisma.task.create({
        data: {
          userId,
          title: t.title,
          description: t.description,
          priority: "HABIT",
          isRecurring: true,
          parentId: t.id, // links the instance to its template
          date: dayStart,
          startTime: t.startTime,
          durationMins: t.durationMins ?? 60,
          subtasks: {
            create: t.subtasks.map((st) => ({
              title: st.title,
              targetValue: st.targetValue,
              unit: st.unit,
              currentValue: 0,
            })),
          },
        },
      });
      created++;
    } catch (e: unknown) {
      // P2002 = unique constraint: another concurrent call already made it. Ignore.
      if ((e as { code?: string })?.code !== "P2002") throw e;
    }
  }

  return { created };
}

/** Generate for every user — used by the midnight/hourly cron. */
export async function generateHabitsForAllUsers(now: Date = new Date()) {
  const users = await prisma.user.findMany({
    where: { scheduledForDeletion: null },
    select: { id: true, timezone: true },
  });

  let totalCreated = 0;
  let processed = 0;
  for (const u of users) {
    const { created } = await generateHabitsForUser(u.id, u.timezone ?? "UTC", now);
    totalCreated += created;
    processed++;
  }
  return { processed, totalCreated };
}
