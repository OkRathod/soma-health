/**
 * scripts/backfill-habits.ts
 * ---------------------------------------------------------------------------
 * ONE-OFF migration. Run once, AFTER `prisma db push` (schema live) and BEFORE
 * deploying the new habit engine.
 *
 * What it does, per user:
 *   1. Finds distinct recurring-habit titles seen in the last RECENT_DAYS days
 *      (so abandoned habits aren't resurrected).
 *   2. Creates one HabitTemplate per distinct title, copying description /
 *      start time / duration / subtasks from that habit's MOST RECENT instance.
 *   3. Re-points TODAY's existing habit Task instances onto their new template
 *      (preserving completion state) and removes exact same-day duplicates, so
 *      the new generator sees "already exists" and won't create a second copy
 *      on deploy day.
 *   4. Leaves all past history untouched.
 *
 * Idempotent: re-running skips users/titles that already have a template.
 *
 * ---------------------------------------------------------------------------
 * SETUP (once):
 *   npm i -D tsx dotenv
 *
 * PREVIEW (writes nothing):
 *   DRY_RUN=1 npx tsx scripts/backfill-habits.ts
 *
 * RUN FOR REAL:
 *   npx tsx scripts/backfill-habits.ts
 *
 * Optional knobs:
 *   RECENT_DAYS=21 npx tsx scripts/backfill-habits.ts
 * ---------------------------------------------------------------------------
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const RECENT_DAYS = parseInt(process.env.RECENT_DAYS ?? "14", 10);

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfToday(): Date {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

async function main() {
  const since = new Date();
  since.setDate(since.getDate() - RECENT_DAYS);

  console.log(
    `\n${DRY_RUN ? "🔍 DRY RUN — no writes" : "✍️  LIVE RUN"} | recent window: ${RECENT_DAYS} days\n`
  );

  const users = await prisma.user.findMany({ select: { id: true, email: true } });
  console.log(`Found ${users.length} users.\n`);

  let templatesCreated = 0;
  let subtasksCreated = 0;
  let instancesRepointed = 0;
  let dupInstancesRemoved = 0;
  let usersTouched = 0;

  for (const user of users) {
    // All recurring-habit instances for this user in the recent window.
    const recentHabits = await prisma.task.findMany({
      where: { userId: user.id, isRecurring: true, date: { gte: since } },
      select: { title: true },
      distinct: ["title"],
    });

    if (recentHabits.length === 0) continue;

    const titles = recentHabits.map((h) => h.title);
    let order = await prisma.habitTemplate.count({ where: { userId: user.id } });
    let userDidSomething = false;

    for (const title of titles) {
      // Skip if a template with this title already exists (idempotency).
      const already = await prisma.habitTemplate.findFirst({
        where: { userId: user.id, title },
        select: { id: true },
      });

      let templateId = already?.id ?? null;

      if (!templateId) {
        // Representative = most recent instance of this habit (carries current settings).
        const rep = await prisma.task.findFirst({
          where: { userId: user.id, isRecurring: true, title },
          orderBy: { date: "desc" },
          include: { subtasks: { orderBy: { id: "asc" } } },
        });
        if (!rep) continue;

        // Dedupe subtasks by title.
        const seen = new Set<string>();
        const subtaskData = rep.subtasks
          .filter((s) => (seen.has(s.title) ? false : (seen.add(s.title), true)))
          .map((s, i) => ({
            title: s.title,
            targetValue: s.targetValue ?? null,
            unit: s.unit ?? null,
            order: i,
          }));

        console.log(
          `  [${user.email}] + template "${title}"` +
            (subtaskData.length ? ` (${subtaskData.length} subtasks)` : "") +
            (rep.startTime ? ` @ ${rep.startTime.toISOString().slice(11, 16)} UTC` : "")
        );

        if (!DRY_RUN) {
          const created = await prisma.habitTemplate.create({
            data: {
              userId: user.id,
              title,
              description: rep.description ?? null,
              startTime: rep.startTime ?? null,
              durationMins: rep.durationMins ?? 60,
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // old system ran daily; default to every day
              isActive: true,
              order: order++,
              subtasks: { create: subtaskData },
            },
            select: { id: true },
          });
          templateId = created.id;
          subtasksCreated += subtaskData.length;
        }
        templatesCreated++;
        userDidSomething = true;
      }

      // ---- Transition-day handling: re-point TODAY's instances of this habit ----
      const todaysInstances = await prisma.task.findMany({
        where: {
          userId: user.id,
          isRecurring: true,
          title,
          date: { gte: startOfToday(), lte: endOfToday() },
        },
        orderBy: [{ isCompleted: "desc" }, { createdAt: "asc" }], // keep a completed one if any
        select: { id: true, parentId: true },
      });

      if (todaysInstances.length > 0 && templateId) {
        const keep = todaysInstances[0];
        const drop = todaysInstances.slice(1);

        if (keep.parentId !== templateId) {
          console.log(`  [${user.email}]   ↳ re-point today's "${title}" → template`);
          if (!DRY_RUN) {
            await prisma.task.update({ where: { id: keep.id }, data: { parentId: templateId } });
          }
          instancesRepointed++;
          userDidSomething = true;
        }

        if (drop.length > 0) {
          console.log(`  [${user.email}]   ↳ remove ${drop.length} duplicate(s) of "${title}" for today`);
          if (!DRY_RUN) {
            await prisma.task.deleteMany({ where: { id: { in: drop.map((d) => d.id) } } });
          }
          dupInstancesRemoved += drop.length;
          userDidSomething = true;
        }
      }
    }

    if (userDidSomething) usersTouched++;
  }

  console.log("\n────────── SUMMARY ──────────");
  console.log(`Users touched:            ${usersTouched}`);
  console.log(`Templates created:        ${templatesCreated}`);
  console.log(`Template subtasks:        ${subtasksCreated}`);
  console.log(`Today's instances linked: ${instancesRepointed}`);
  console.log(`Today's dups removed:     ${dupInstancesRemoved}`);
  console.log(DRY_RUN ? "\n(DRY RUN — nothing was written.)\n" : "\n✅ Done.\n");
}

main()
  .catch((e) => {
    console.error("\n❌ Backfill failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });