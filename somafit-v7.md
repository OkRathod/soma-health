This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
prisma/
  migrations/
    0_init/
      migration.sql
  schema.prisma
public/
  guides/
    thumbnail/
      sleep.png
  icons/
    icon-192x192.png
    icon-512x512.png
  apple-touch-icon-180x180.png
  apple-touch-icon.png
  badge.png
  dashboard-preview.png
  favicon-16x16.png
  favicon.ico
  file.svg
  globe.svg
  icon.png
  logo-dark.webp
  logo-dark2.png
  logo.webp
  logo1.webp
  logo2.png
  logo2.webp
  next.svg
  og-image.png
  slide-analysis.png
  slide-dashboard-2.png
  slide-dashboard.png
  slide-deadlines-2.png
  slide-deadlines.png
  slide-notes-2.png
  slide-notes.png
  slide-tasks-2.png
  slide-tasks.png
  swe-worker-5c72df51bb1f6ee0.js
  vercel.svg
  window.svg
  worker-3fcb3030ed21522e.js
scripts/
  backfill-habits.ts
src/
  app/
    actions/
      adaptive-goals.ts
      deadlines.ts
      feedback.ts
      habits.ts
      notes.ts
      steps.ts
    analysis/
      page.tsx
    api/
      cron/
        generate-habits/
          route.ts
        notifications/
          subscribe/
            route.ts
          route.ts
        weekly-recap/
          route.ts
      delete-log/
        route.ts
      export/
        route.ts
      get-logs/
        route.ts
      habits/
        analysis/
          route.ts
      insights/
        route.ts
      log-water/
        route.ts
      manual-log/
        route.ts
      process-log/
        route.ts
      profile/
        route.ts
      profile-status/
        route.ts
      quote/
        route.ts
      settings/
        route.ts
      tasks/
        route.ts
      user/
        delete/
          route.ts
        restore/
          route.ts
        update-profile/
          route.ts
      weekly-recap/
        route.ts
    dashboard/
      dashboard-client.tsx
      page.tsx
    deadlines/
      page.tsx
    feedback/
      page.tsx
    fonts/
      Baskervville/
        static/
          Baskervville-Bold.ttf
          Baskervville-BoldItalic.ttf
          Baskervville-Italic.ttf
          Baskervville-Medium.ttf
          Baskervville-MediumItalic.ttf
          Baskervville-Regular.ttf
          Baskervville-SemiBold.ttf
          Baskervville-SemiBoldItalic.ttf
        Baskervville-Italic-VariableFont_wght.ttf
        Baskervville-VariableFont_wght.ttf
        OFL.txt
        README.txt
      BBH_Bogle/
        BBHBogle-Regular.ttf
        OFL.txt
      BBH_Hegarty/
        BBHHegarty-Regular.ttf
        OFL.txt
      EB_Garamond/
        static/
          EBGaramond-Bold.ttf
          EBGaramond-BoldItalic.ttf
          EBGaramond-ExtraBold.ttf
          EBGaramond-ExtraBoldItalic.ttf
          EBGaramond-Italic.ttf
          EBGaramond-Medium.ttf
          EBGaramond-MediumItalic.ttf
          EBGaramond-Regular.ttf
          EBGaramond-SemiBold.ttf
          EBGaramond-SemiBoldItalic.ttf
        EBGaramond-Italic-VariableFont_wght.ttf
        EBGaramond-VariableFont_wght.ttf
        OFL.txt
        README.txt
      Monoton/
        Monoton-Regular.ttf
        OFL.txt
      Wallpoet/
        OFL.txt
        Wallpoet-Regular.ttf
    guides/
      [slug]/
        page.tsx
      the-soma-protocol/
        page.tsx
      page.tsx
    habits/
      page.tsx
    history/
      page.tsx
    notes/
      page.tsx
    profile/
      page.tsx
    settings/
      page.tsx
    sign-in/
      [[...sign-in]]/
        page.tsx
    sign-up/
      [[...sign-up]]/
        page.tsx
    tasks/
      page.tsx
    actions.ts
    globals.css
    icon.png
    layout.tsx
    manifest.ts
    page.tsx
    robots.ts
    sitemap.ts
  components/
    account/
      profile-panel.tsx
    analysis/
      HabitAnalysisClient.tsx
    dashboard/
      CalorieRadialChart.tsx
      EnergyRing.tsx
      HydrationCard.tsx
      NetBalanceCard.tsx
      PendingTasksList.tsx
      QuickLog.tsx
      QuoteBanner.tsx
      StatCard.tsx
      step-tracker.tsx
    deadlines/
      add-deadline-dialog.tsx
      deadline-card.tsx
      edit-deadline-dialog.tsx
    guides/
      mark-read-button.tsx
    history/
      add-log-dialog.tsx
      history-log-card.tsx
      history-task-list.tsx
      history-timeline.tsx
    landing/
      FeaturesBento.tsx
      FeatureSlider.tsx
      Footer.tsx
      HeroSection.tsx
      Navbar.tsx
    notes/
      note-editor.tsx
    tasks/
      add-task-dialog.tsx
      task-card.tsx
      task-list.tsx
      timeline-view.tsx
    ui/
      badge.tsx
      button.tsx
      calendar.tsx
      card.tsx
      chart.tsx
      checkbox.tsx
      dialog.tsx
      dropdown-menu.tsx
      input.tsx
      label.tsx
      navbar.tsx
      popover.tsx
      progress.tsx
      select.tsx
      separator.tsx
      skeleton.tsx
      sonner.tsx
      switch.tsx
      tabs.tsx
      textarea.tsx
    command-bar.tsx
    complete-profile-modal.tsx
    dna-loader.tsx
    EnableNotifications.tsx
    feedback-prompt.tsx
    Habitanalysisclient.tsx
    install-pwa.tsx
    main-layout-client.tsx
    manual-log-fallback.tsx
    soma-loader.tsx
    theme-provider.tsx
    WeeklyChart.tsx
  hooks/
    use-countdown.ts
  lib/
    auth.ts
    check-profile.ts
    crypto.ts
    gsap.ts
    guides.ts
    habits.ts
    nutrition.ts
    prisma.ts
    streak-utils.ts
    tz.ts
    utils.ts
    validation.ts
  middleware.ts
worker/
  index.js
.gitignore
.npmrc
components.json
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="scripts/backfill-habits.ts">
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
</file>

<file path="src/app/actions/adaptive-goals.ts">
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { subDays } from "date-fns";
import { adaptiveCalorieGoal } from "@/lib/nutrition";
import { revalidatePath } from "next/cache";

/**
 * Nudges the calorie goal (±100 kcal) based on the last 14 days of actual
 * intake and the weight trend. Only runs when the user opted into autoGoals.
 */
export async function recomputeAdaptiveGoal() {
  const { userId } = await auth();
  if (!userId) return { success: false };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.autoGoals) return { success: false };

  const logs = await prisma.dailyLog.findMany({
    where: { userId, type: { not: "WATER" }, date: { gte: subDays(new Date(), 14) } },
    select: { totalCaloriesIn: true, date: true },
  });
  if (logs.length < 5) return { success: false, reason: "not_enough_data" };

  const byDay = new Map<string, number>();
  for (const l of logs) {
    const k = l.date.toISOString().slice(0, 10);
    byDay.set(k, (byDay.get(k) ?? 0) + l.totalCaloriesIn);
  }
  const avgIntake = [...byDay.values()].reduce((a, b) => a + b, 0) / byDay.size;

  // Weight history isn't stored yet, so trend is null-safe for now.
  const next = adaptiveCalorieGoal(user.dailyCalorieGoal, avgIntake, null, user.weightGoal);
  if (next !== user.dailyCalorieGoal) {
    await prisma.user.update({ where: { id: userId }, data: { dailyCalorieGoal: next } });
    revalidatePath("/dashboard");
  }
  return { success: true, previous: user.dailyCalorieGoal, next };
}
</file>

<file path="src/app/actions/habits.ts">
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
</file>

<file path="src/app/api/cron/generate-habits/route.ts">
// src/app/api/cron/generate-habits/route.ts
// Runs on a schedule (recommend hourly so every timezone gets its local midnight).
// Idempotent, so overlapping runs / retries are harmless.
import { NextResponse } from "next/server";
import { isValidCron } from "@/lib/auth";
import { generateHabitsForAllUsers } from "@/lib/habits";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  if (!isValidCron(req)) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const result = await generateHabitsForAllUsers();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("generate-habits cron error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/cron/weekly-recap/route.ts">
// src/app/api/cron/weekly-recap/route.ts
// Rolls the week's stored logs into one coaching recap and pushes it as a
// notification. Reuses existing per-log data + push infra.
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import webpush from "web-push";
import { prisma } from "@/lib/prisma";
import { isValidCron } from "@/lib/auth";
import { subDays } from "date-fns";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL || "support@somafit.in"}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET(req: Request) {
  if (!isValidCron(req)) return new NextResponse("Unauthorized", { status: 401 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "No AI key" }, { status: 500 });
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const since = subDays(new Date(), 7);
  const users = await prisma.user.findMany({
    where: { scheduledForDeletion: null, notifyEnabled: true, pushSubscriptions: { some: {} } },
    include: {
      pushSubscriptions: true,
      logs: {
        where: { date: { gte: since }, type: { not: "WATER" } },
        select: { totalCaloriesIn: true, totalCaloriesOut: true },
      },
      tasks: { where: { date: { gte: since } }, select: { isCompleted: true } },
    },
  });

  let sent = 0;
  for (const u of users) {
    if (u.logs.length === 0 && u.tasks.length === 0) continue;
    const inKcal = u.logs.reduce((a, l) => a + l.totalCaloriesIn, 0);
    const outKcal = u.logs.reduce((a, l) => a + l.totalCaloriesOut, 0);
    const done = u.tasks.filter((t) => t.isCompleted).length;

    let body = `This week: ${u.logs.length} logs, ${done}/${u.tasks.length} tasks done, ${inKcal.toLocaleString()} kcal in / ${outKcal.toLocaleString()} out.`;
    try {
      const r = await model.generateContent(
        `Write ONE encouraging sentence (<=180 chars) summarizing a user's week for a push notification. ` +
          `Goal: ${u.weightGoal ?? "health"}. Data: ${u.logs.length} meal logs, ${done}/${u.tasks.length} tasks completed, ` +
          `${inKcal} kcal consumed, ${outKcal} kcal burned. Be specific and positive.`
      );
      body = r.response.text().trim().slice(0, 180) || body;
    } catch {
      /* fall back to computed body */
    }

    const payload = JSON.stringify({ title: "Your Week in Soma", body });
    for (const sub of u.pushSubscriptions) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent++;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410)
          await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => {});
      }
    }
  }

  return NextResponse.json({ success: true, usersProcessed: users.length, notificationsSent: sent });
}
</file>

<file path="src/app/api/insights/route.ts">
// src/app/api/insights/route.ts
// Cheap, explainable correlations across steps / calories / tasks.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { subDays, startOfDay } from "date-fns";

function dayKey(d: Date) {
  return startOfDay(d).toISOString().slice(0, 10);
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const since = subDays(new Date(), 60);
  const [logs, tasks, metrics] = await Promise.all([
    prisma.dailyLog.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, totalCaloriesIn: true, type: true },
    }),
    prisma.task.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, isCompleted: true },
    }),
    prisma.dailyMetrics.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, steps: true },
    }),
  ]);

  const days: Record<string, { steps: number; calories: number; done: number; total: number }> = {};
  const touch = (k: string) => (days[k] ??= { steps: 0, calories: 0, done: 0, total: 0 });
  for (const m of metrics) touch(dayKey(m.date)).steps = m.steps;
  for (const l of logs) if (l.type !== "WATER") touch(dayKey(l.date)).calories += l.totalCaloriesIn;
  for (const t of tasks) {
    const d = touch(dayKey(t.date));
    d.total++;
    if (t.isCompleted) d.done++;
  }

  const rows = Object.values(days).filter((d) => d.total > 0 || d.steps > 0);
  const insights: string[] = [];

  const withSteps = rows.filter((r) => r.steps > 0 && r.total > 0);
  if (withSteps.length >= 6) {
    const median = withSteps.map((r) => r.steps).sort((a, b) => a - b)[Math.floor(withSteps.length / 2)];
    const hi = withSteps.filter((r) => r.steps >= median);
    const lo = withSteps.filter((r) => r.steps < median);
    const rate = (g: typeof hi) =>
      g.length ? g.reduce((a, r) => a + r.done / Math.max(1, r.total), 0) / g.length : 0;
    const diff = Math.round((rate(hi) - rate(lo)) * 100);
    if (Math.abs(diff) >= 10)
      insights.push(
        diff > 0
          ? `On your more active days (${median.toLocaleString()}+ steps) you complete about ${diff}% more of your tasks.`
          : `On your less active days you actually complete about ${Math.abs(diff)}% more tasks — worth a look.`
      );
  }

  const loggedDays = rows.filter((r) => r.calories > 0).length;
  if (loggedDays >= 10) insights.push(`You've logged meals on ${loggedDays} of the last 60 days.`);

  return NextResponse.json({ success: true, insights, sampleDays: rows.length });
}
</file>

<file path="src/app/api/manual-log/route.ts">
// src/app/api/manual-log/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { name, calories, protein } = await req.json();
    const cals = Math.max(0, Math.round(Number(calories) || 0));
    const pro = Math.max(0, Math.round(Number(protein) || 0));
    const foodName = String(name || "Meal").slice(0, 120);

    const log = await prisma.dailyLog.create({
      data: {
        userId,
        type: "MEAL",
        date: new Date(),
        rawText: `${foodName} (manual)`,
        parsedData: {
          foods: [{ name: foodName, calories: cals, protein: pro, carbs: 0, fats: 0 }],
          exercises: [],
        },
        totalCaloriesIn: cals,
        totalCaloriesOut: 0,
        aiFeedback: null,
      },
    });
    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Manual Log Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/weekly-recap/route.ts">
// src/app/api/weekly-recap/route.ts
// On-demand weekly recap for the signed-in user. Mirrors the numbers the
// weekly-recap cron pushes as a notification, but returns them as JSON so the
// Analysis page can render them. Purely deterministic — no AI key required.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { subDays, startOfDay, format } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const since = startOfDay(subDays(new Date(), 6)); // last 7 calendar days incl. today

    const [logs, tasks, user] = await Promise.all([
      prisma.dailyLog.findMany({
        where: { userId, date: { gte: since }, type: { not: "WATER" } },
        select: { date: true, totalCaloriesIn: true, totalCaloriesOut: true },
      }),
      prisma.task.findMany({
        where: { userId, date: { gte: since } },
        select: { date: true, isCompleted: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { dailyCalorieGoal: true, weightGoal: true },
      }),
    ]);

    const caloriesIn = logs.reduce((a, l) => a + (l.totalCaloriesIn ?? 0), 0);
    const caloriesOut = logs.reduce((a, l) => a + (l.totalCaloriesOut ?? 0), 0);
    const net = caloriesIn - caloriesOut;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.isCompleted).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Per-day activity buckets (log count) → find the most active day.
    const byDay = new Map<string, number>();
    for (const l of logs) {
      const key = format(new Date(l.date), "EEEE");
      byDay.set(key, (byDay.get(key) ?? 0) + 1);
    }
    let mostActiveDay: string | null = null;
    let mostActiveCount = 0;
    for (const [day, count] of byDay.entries()) {
      if (count > mostActiveCount) {
        mostActiveDay = day;
        mostActiveCount = count;
      }
    }

    const avgDailyCalories = logs.length > 0 ? Math.round(caloriesIn / 7) : 0;

    return NextResponse.json({
      success: true,
      recap: {
        rangeStart: since,
        rangeEnd: new Date(),
        logCount: logs.length,
        caloriesIn,
        caloriesOut,
        net,
        avgDailyCalories,
        totalTasks,
        completedTasks,
        completionRate,
        mostActiveDay,
        weightGoal: user?.weightGoal ?? null,
        dailyCalorieGoal: user?.dailyCalorieGoal ?? null,
      },
    });
  } catch (error) {
    console.error("Weekly recap error:", error);
    return NextResponse.json({ error: "Failed to build recap" }, { status: 500 });
  }
}
</file>

<file path="src/app/habits/page.tsx">
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Clock, X, CalendarDays, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import {
  getHabitTemplates,
  saveHabitTemplate,
  toggleHabitActive,
  deleteHabitTemplate,
} from "@/app/actions/habits";

// ---- Local types (avoid importing Prisma types into a client component) ----
interface SubtaskForm {
  id?: string;
  title: string;
  targetValue: string;
  unit: string;
}
interface HabitForm {
  id?: string;
  title: string;
  description: string;
  startTime: string; // "HH:mm"
  durationMins: string;
  daysOfWeek: number[];
  isActive: boolean;
  subtasks: SubtaskForm[];
}
interface HabitTemplate {
  id: string;
  title: string;
  description: string | null;
  startTime: string | null;
  durationMins: number | null;
  daysOfWeek: number[];
  isActive: boolean;
  subtasks: { id: string; title: string; targetValue: number | null; unit: string | null }[];
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

const EMPTY_FORM: HabitForm = {
  title: "",
  description: "",
  startTime: "",
  durationMins: "60",
  daysOfWeek: [...ALL_DAYS],
  isActive: true,
  subtasks: [],
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<HabitTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HabitForm>(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    try {
      const res = await getHabitTemplates();
      if (res.success) setHabits(res.data as unknown as HabitTemplate[]);
    } catch {
      toast.error("Couldn't load your habits.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm({ ...EMPTY_FORM, daysOfWeek: [...ALL_DAYS] });
    setDialogOpen(true);
  }

  function openEdit(h: HabitTemplate) {
    setForm({
      id: h.id,
      title: h.title,
      description: h.description ?? "",
      startTime: h.startTime ? format(new Date(h.startTime), "HH:mm") : "",
      durationMins: String(h.durationMins ?? 60),
      daysOfWeek: h.daysOfWeek?.length ? [...h.daysOfWeek] : [...ALL_DAYS],
      isActive: h.isActive,
      subtasks: h.subtasks.map((s) => ({
        id: s.id,
        title: s.title,
        targetValue: s.targetValue != null ? String(s.targetValue) : "",
        unit: s.unit ?? "",
      })),
    });
    setDialogOpen(true);
  }

  function toggleDay(d: number) {
    setForm((f) => ({
      ...f,
      daysOfWeek: f.daysOfWeek.includes(d)
        ? f.daysOfWeek.filter((x) => x !== d)
        : [...f.daysOfWeek, d].sort((a, b) => a - b),
    }));
  }

  function addSubtask() {
    setForm((f) => ({ ...f, subtasks: [...f.subtasks, { title: "", targetValue: "", unit: "" }] }));
  }
  function updateSubtask(i: number, patch: Partial<SubtaskForm>) {
    setForm((f) => ({
      ...f,
      subtasks: f.subtasks.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  }
  function removeSubtask(i: number) {
    setForm((f) => ({ ...f, subtasks: f.subtasks.filter((_, idx) => idx !== i) }));
  }

  async function save() {
    if (!form.title.trim()) {
      toast.error("Give your habit a name.");
      return;
    }
    if (form.daysOfWeek.length === 0) {
      toast.error("Pick at least one day.");
      return;
    }
    setSaving(true);

    // Match the existing task convention: new Date(`${date}T${time}`).
    const anchor = format(new Date(), "yyyy-MM-dd");
    const startTimeIso = form.startTime ? new Date(`${anchor}T${form.startTime}`).toISOString() : null;

    try {
      await saveHabitTemplate({
        id: form.id,
        title: form.title.trim(),
        description: form.description.trim() || null,
        startTime: startTimeIso,
        durationMins: form.durationMins ? parseInt(form.durationMins, 10) : 60,
        daysOfWeek: form.daysOfWeek,
        isActive: form.isActive,
        subtasks: form.subtasks
          .filter((s) => s.title.trim())
          .map((s) => ({
            id: s.id,
            title: s.title.trim(),
            targetValue: s.targetValue ? parseInt(s.targetValue, 10) : null,
            unit: s.unit.trim() || null,
          })),
      });
      toast.success(form.id ? "Habit updated" : "Habit created");
      setDialogOpen(false);
      await load();
    } catch (e) {
      toast.error((e as Error).message || "Couldn't save the habit.");
    } finally {
      setSaving(false);
    }
  }

  async function onToggleActive(h: HabitTemplate) {
    // optimistic
    setHabits((prev) => prev.map((x) => (x.id === h.id ? { ...x, isActive: !x.isActive } : x)));
    try {
      await toggleHabitActive(h.id, !h.isActive);
    } catch {
      setHabits((prev) => prev.map((x) => (x.id === h.id ? { ...x, isActive: h.isActive } : x)));
      toast.error("Couldn't update the habit.");
    }
  }

  async function onDelete(id: string) {
    setConfirmDelete(null);
    const prev = habits;
    setHabits((h) => h.filter((x) => x.id !== id)); // optimistic
    try {
      await deleteHabitTemplate(id);
      toast.success("Habit deleted");
    } catch {
      setHabits(prev);
      toast.error("Couldn't delete the habit.");
    }
  }

  function daysSummary(days: number[]): string {
    if (days.length === 7) return "Every day";
    if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return "Weekdays";
    if (days.length === 2 && days.includes(0) && days.includes(6)) return "Weekends";
    return days.map((d) => DAY_NAMES[d]).join(", ");
  }

  if (loading) return <DNALoader label="Loading your habits…" />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Habits</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your recurring routines. They appear automatically each morning — only on the days you choose.
          </p>
        </div>
        <Button onClick={openNew} className="shrink-0">
          <Plus className="mr-1.5 h-4 w-4" /> New habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
          <CalendarDays className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">No habits yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first habit — like “Drink 2L water” or “Morning walk” — and it’ll show up on your
            dashboard on the days you pick.
          </p>
          <Button onClick={openNew} variant="outline" className="mt-4">
            <Plus className="mr-1.5 h-4 w-4" /> Create a habit
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((h) => (
            <div
              key={h.id}
              className={cn(
                "rounded-xl border border-border bg-card p-4 transition",
                !h.isActive && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "var(--priority-habit)" }}
                    />
                    <h3 className="truncate font-semibold text-foreground">{h.title}</h3>
                  </div>
                  {h.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{h.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {daysSummary(h.daysOfWeek)}
                    </span>
                    {h.startTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(h.startTime), "h:mm a")}
                      </span>
                    )}
                    {h.subtasks.length > 0 && <span>{h.subtasks.length} step{h.subtasks.length > 1 ? "s" : ""}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Switch
                    checked={h.isActive}
                    onCheckedChange={() => onToggleActive(h)}
                    aria-label={h.isActive ? "Pause habit" : "Activate habit"}
                  />
                  <Button size="icon" variant="ghost" onClick={() => openEdit(h)} aria-label="Edit habit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {confirmDelete === h.id ? (
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="destructive" onClick={() => onDelete(h.id)}>
                        Delete
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setConfirmDelete(h.id)}
                      aria-label="Delete habit"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Day strip */}
              <div className="mt-3 flex gap-1">
                {DAY_LABELS.map((label, d) => (
                  <span
                    key={d}
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-md text-[11px] font-medium",
                      h.daysOfWeek.includes(d)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground/50"
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Add / Edit dialog ---------- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit habit" : "New habit"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="h-title">Name</Label>
              <Input
                id="h-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Morning walk"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="h-desc">Description (optional)</Label>
              <Textarea
                id="h-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Any notes or details…"
                rows={2}
              />
            </div>

            {/* Day picker */}
            <div className="space-y-1.5">
              <Label>Repeat on</Label>
              <div className="flex gap-1.5">
                {DAY_LABELS.map((label, d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    aria-pressed={form.daysOfWeek.includes(d)}
                    aria-label={DAY_NAMES[d]}
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition",
                      form.daysOfWeek.includes(d)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-1 text-xs">
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [...ALL_DAYS] })}>
                  Every day
                </button>
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [1, 2, 3, 4, 5] })}>
                  Weekdays
                </button>
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [0, 6] })}>
                  Weekends
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="h-time">Start time (optional)</Label>
                <Input
                  id="h-time"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="h-dur">Duration (mins)</Label>
                <Input
                  id="h-dur"
                  type="number"
                  inputMode="numeric"
                  value={form.durationMins}
                  onChange={(e) => setForm({ ...form, durationMins: e.target.value })}
                  placeholder="60"
                />
              </div>
            </div>

            {/* Subtasks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Steps (optional)</Label>
                <Button type="button" size="sm" variant="ghost" onClick={addSubtask}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add step
                </Button>
              </div>
              {form.subtasks.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Break the habit into checkable steps, e.g. “Fill bottle”, target 8 glasses.
                </p>
              )}
              <div className="space-y-2">
                {form.subtasks.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={s.title}
                      onChange={(e) => updateSubtask(i, { title: e.target.value })}
                      placeholder="Step name"
                      className="flex-1"
                    />
                    <Input
                      value={s.targetValue}
                      onChange={(e) => updateSubtask(i, { targetValue: e.target.value })}
                      placeholder="#"
                      type="number"
                      inputMode="numeric"
                      className="w-16"
                    />
                    <Input
                      value={s.unit}
                      onChange={(e) => updateSubtask(i, { unit: e.target.value })}
                      placeholder="unit"
                      className="w-20"
                    />
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeSubtask(i)} aria-label="Remove step">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">Paused habits stop appearing on your dashboard.</p>
              </div>
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              {form.id ? "Save changes" : "Create habit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
</file>

<file path="src/components/account/profile-panel.tsx">
"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Briefcase, Target, Flame, Trophy, Activity } from "lucide-react";
import { toast } from "sonner";

/**
 * The full Profile editor, extracted from the old /profile page so it can be
 * rendered inside the merged Account (Settings) hub. Keeps its own state and
 * talks to /api/profile exactly as before — no behaviour change.
 */
export function ProfilePanel() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState<{ streak: number; totalLogs: number; totalCaloriesBurned: number; badges: string[] }>(
    { streak: 0, totalLogs: 0, totalCaloriesBurned: 0, badges: [] }
  );

  const [form, setForm] = useState({
    plan: "Free",
    joinedAt: new Date(),
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    jobType: "",
    dietaryPreferences: "",
    customPurpose: "",
    weightGoal: "",
    targetWeight: "",
    dailyCalorieGoal: 2500,
    waterGoal: 2500,
  });

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/profile?userId=${user?.id}`);
      const data = await res.json();

      if (data.success && data.data) {
        const safeData = {
          ...data.data,
          gender: data.data.gender ?? "",
          activityLevel: data.data.activityLevel ?? "",
          jobType: data.data.jobType ?? "",
          dietaryPreferences: data.data.dietaryPreferences ?? "",
          customPurpose: data.data.customPurpose ?? "",
          weightGoal: data.data.weightGoal ?? "",
          plan: data.data.plan ?? "Free",
          age: data.data.age ?? "",
          height: data.data.height ?? "",
          weight: data.data.weight ?? "",
          targetWeight: data.data.targetWeight ?? "",
          dailyCalorieGoal: data.data.dailyCalorieGoal ?? 2500,
          waterGoal: data.data.waterGoal ?? 2500,
        };
        setForm((prev) => ({ ...prev, ...safeData }));
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Error fetching profile", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    const savePromise = fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, ...form }),
    });
    toast.promise(savePromise, {
      loading: "Saving changes...",
      success: "Profile updated successfully!",
      error: "Failed to save profile. Please try again.",
    });
    try {
      await savePromise;
    } catch {
      /* handled by toast */
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 rounded-2xl bg-secondary/50 shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-secondary/50 shimmer" />
          ))}
        </div>
        <div className="h-52 rounded-2xl bg-secondary/50 shimmer" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* IDENTITY */}
      <Card className="border-border bg-card shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5 min-w-0">
            <div className="h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0 ring-2 ring-primary/10">
              <img src={user?.imageUrl} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold leading-tight text-foreground truncate">
                {user?.fullName}
              </h2>
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-0.5 text-xs font-medium">
                  {form.plan} Plan
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Member since {new Date(form.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:justify-end justify-center border border-border/70 rounded-lg">
            <Button
              variant="ghost"
              onClick={() => {
                toast("Signed out");
                signOut();
              }}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 px-4 py-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-[var(--gradient-to)] text-primary-foreground border-none shadow-md h-full hover-lift">
          <CardContent className="p-6 text-center flex flex-col justify-center h-full items-center">
            <Flame className="w-10 h-10 opacity-90 mb-2" />
            <div className="text-4xl font-extrabold tracking-tight">{stats.streak}</div>
            <p className="text-sm opacity-90 font-medium">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="h-full border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">All-Time Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full"><Activity className="w-4 h-4 text-primary" /></div>
                <span className="text-sm font-medium">Total Logs</span>
              </div>
              <div className="text-xl font-bold">{stats.totalLogs}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full"><Flame className="w-4 h-4 text-destructive" /></div>
                <span className="text-sm font-medium">Burned</span>
              </div>
              <div className="text-xl font-bold">{(stats.totalCaloriesBurned / 1000).toFixed(1)}k</div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Earned Badges</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center justify-center">
            {stats.badges.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {stats.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="px-2 py-1 gap-1">
                    <Trophy className="w-3 h-3 text-yellow-600" /> {badge}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Trophy className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs">No badges yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FORMS */}
      <div className="space-y-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Physical Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Age</Label>
              <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="25" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <div className="relative">
                <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
                <div className="absolute right-2 top-2 bottom-2 w-8 opacity-20">
                  <svg viewBox="0 0 20 10" className="stroke-primary fill-none stroke-2"><path d="M0 5 L5 8 L10 4 L15 6 L20 2" /></svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Lifestyle & Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={form.activityLevel} onValueChange={(v) => setForm({ ...form, activityLevel: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Activity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedentary">Sedentary (Office Job)</SelectItem>
                    <SelectItem value="Moderate">Moderate (Light Exercise)</SelectItem>
                    <SelectItem value="Active">Active (Daily Training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input value={form.jobType || ""} onChange={(e) => setForm({ ...form, jobType: e.target.value })} placeholder="e.g. Software Engineer (Sedentary)" />
                <p className="text-xs text-muted-foreground">Your work hours affect your burn rate.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dietary Preferences</Label>
              <Input value={form.dietaryPreferences || ""} onChange={(e) => setForm({ ...form, dietaryPreferences: e.target.value })} placeholder="e.g. Vegetarian, Keto, No Dairy..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Goals & Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Your Main Purpose</Label>
              <Input value={form.customPurpose || ""} onChange={(e) => setForm({ ...form, customPurpose: e.target.value })} placeholder="e.g. Training for a marathon, Recovering from injury..." className="border-primary/20 bg-primary/5" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label>Weight Goal</Label>
                <Select value={form.weightGoal} onValueChange={(v) => setForm({ ...form, weightGoal: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lose">Lose Weight</SelectItem>
                    <SelectItem value="Maintain">Maintain</SelectItem>
                    <SelectItem value="Gain">Gain Muscle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target Weight (kg)</Label>
                <Input type="number" value={form.targetWeight} onChange={(e) => setForm({ ...form, targetWeight: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Daily Calorie Goal</Label>
                <Input type="number" value={form.dailyCalorieGoal} onChange={(e) => setForm({ ...form, dailyCalorieGoal: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Daily Water Goal (ml)</Label>
                <Input type="number" value={form.waterGoal} onChange={(e) => setForm({ ...form, waterGoal: Number(e.target.value) })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto shadow-sm hover-lift">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/components/command-bar.tsx">
"use client";

/**
 * Feature 5.4 — Unified "Today" command bar.
 * One natural-language input routes to the right action by intent:
 *   "drank 500ml"                  -> water
 *   "gym at 6pm"                   -> timed task
 *   "finish report by friday"      -> deadline
 *   "2 rotis, dal, 30 min walk"    -> AI food/exercise log (default)
 *
 * It calls your existing endpoints/actions, so it complements (doesn't replace)
 * the individual screens.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, CornerDownLeft } from "lucide-react";
import { createDeadline } from "@/app/actions/deadlines";

type Intent = "water" | "task" | "deadline" | "log";

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/\b(\d+)\s?(ml|l|glass|glasses|water)\b/.test(t) || /\bdrank\b/.test(t)) return "water";
  if (/\bby\s+(today|tomorrow|mon|tue|wed|thu|fri|sat|sun|\d)/.test(t) || /\bdeadline\b/.test(t)) return "deadline";
  if (/\bat\s+\d/.test(t) || /\b(\d{1,2})(:\d{2})?\s?(am|pm)\b/.test(t)) return "task";
  return "log";
}

function parseWaterMl(text: string): number {
  const l = text.match(/(\d+(?:\.\d+)?)\s?l\b/i);
  if (l) return Math.round(parseFloat(l[1]) * 1000);
  const ml = text.match(/(\d+)\s?ml/i);
  if (ml) return parseInt(ml[1], 10);
  const glasses = text.match(/(\d+)\s?glass/i);
  if (glasses) return parseInt(glasses[1], 10) * 250;
  return 250;
}

function parseTime(text: string): string | null {
  const m = text.match(/(\d{1,2})(?::(\d{2}))?\s?(am|pm)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const pm = m[3].toLowerCase() === "pm";
  if (pm && h < 12) h += 12;
  if (!pm && h === 12) h = 0;
  const d = new Date();
  d.setHours(h, min, 0, 0);
  return d.toISOString();
}

export function CommandBar({ onDone }: { onDone?: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const intent = text.trim() ? detectIntent(text) : null;

  async function run() {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    try {
      const kind = detectIntent(value);

      if (kind === "water") {
        const amount = parseWaterMl(value);
        const r = await fetch("/api/log-water", { method: "POST", body: JSON.stringify({ amount }) });
        if (!r.ok) throw new Error();
        toast.success(`Logged ${amount} ml of water 💧`);
      } else if (kind === "task") {
        const startTime = parseTime(value);
        const title = value.replace(/\bat\s+\d.*$/i, "").trim() || value;
        const r = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ title, priority: "MEDIUM", date: new Date().toISOString(), startTime }),
        });
        if (!r.ok) throw new Error();
        toast.success("Task added to today");
      } else if (kind === "deadline") {
        const title = value.replace(/\bby\s+.*$/i, "").trim() || value;
        await createDeadline({ title, targetDate: null, subtasks: [] });
        toast.success("Deadline created");
      } else {
        const r = await fetch("/api/process-log", {
          method: "POST",
          body: JSON.stringify({ userText: value, date: new Date().toISOString() }),
        });
        const data = await r.json();
        if (!r.ok || !data.success) throw new Error(data.details || data.error);
        toast.success("Logged & analyzed ✨");
      }

      setText("");
      onDone?.();
    } catch (e) {
      toast.error((e as Error).message || "Couldn't process that — try rephrasing.");
    } finally {
      setBusy(false);
    }
  }

  const hint =
    intent === "water" ? "Log water" :
    intent === "task" ? "Add a task" :
    intent === "deadline" ? "Create a deadline" :
    intent === "log" ? "Analyze with AI" : "";

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring transition">
        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          disabled={busy}
          placeholder="Tell Soma anything — “2 eggs and toast”, “drank 500ml”, “gym at 6pm”…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          aria-label="Command bar"
        />
        {hint && <span className="hidden sm:inline text-[11px] text-muted-foreground">{hint}</span>}
        <button
          onClick={run}
          disabled={busy || !text.trim()}
          className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition"
          aria-label="Submit"
        >
          <CornerDownLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/components/Habitanalysisclient.tsx">
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flame,
  Trophy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Activity,
  Sparkles,
  Utensils,
  Target,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isSameDay,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isFuture,
  isToday,
  isSameMonth,
} from "date-fns";
import { DNALoader } from "@/components/soma-loader";

export default function HabitAnalysisClient({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<any[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHabitData() {
      const res = await fetch(`/api/habits/analysis?userId=${userId}`);
      const data = await res.json();
      if (data.success && data.habits.length > 0) {
        setHabits(data.habits);
        setSelectedTitle(data.habits[0].title);
      }
      setLoading(false);
    }
    fetchHabitData();
  }, [userId]);

  if (loading) return <DNALoader />;

  const selectedHabit = habits.find((h) => h.title === selectedTitle);

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28 md:p-8 md:pb-8 space-y-8 animate-fade-in">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analysis</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Your week at a glance, plus streaks and history for every habit.
        </p>
      </div>

      {/* WEEKLY RECAP */}
      <WeeklyRecap />

      {/* HABIT SELECTOR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/50 pb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Habit Streaks
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select a habit to view its calendar and streaks.
          </p>
        </div>

        {habits.length > 0 && (
          <div className="w-full md:w-[250px]">
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Select Habit
            </label>
            <Select value={selectedTitle} onValueChange={setSelectedTitle}>
              <SelectTrigger className="w-full bg-card border-border/60 shadow-sm font-medium">
                <SelectValue placeholder="Choose a habit..." />
              </SelectTrigger>
              <SelectContent>
                {habits.map((habit, idx) => (
                  <SelectItem key={idx} value={habit.title} className="capitalize">
                    {habit.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* HABIT CALENDAR */}
      <div>
        {selectedHabit ? (
          <HabitAnalysisCard key={selectedHabit.title} habit={selectedHabit} />
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-muted-foreground bg-card border border-dashed border-border/60 rounded-xl shadow-sm animate-scale-in">
            <Activity className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-foreground">No habits tracked yet.</p>
            <p className="text-sm mt-1">Mark a task as a "Habit" to start analyzing your data!</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   WEEKLY RECAP CARD
============================================================ */
function WeeklyRecap() {
  const [recap, setRecap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/weekly-recap")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.success) setRecap(d.recap);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const headline = (() => {
    if (!recap) return "";
    if (recap.logCount === 0 && recap.totalTasks === 0)
      return "A quiet week — log a meal or complete a task to kick things off.";
    const parts: string[] = [];
    if (recap.completionRate >= 70) parts.push("You're crushing your tasks");
    else if (recap.completedTasks > 0) parts.push("Steady progress on your tasks");
    if (recap.logCount >= 5) parts.push("and staying consistent with logging");
    else if (recap.logCount > 0) parts.push("and keeping an eye on nutrition");
    const base = parts.join(" ") || "Here's how your last 7 days shaped up";
    return `${base}. Keep the momentum going!`;
  })();

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-card shadow-sm animate-scale-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
          </span>
          Weekly Recap
          <span className="ml-auto text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Last 7 days
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[86px] rounded-xl bg-secondary/50 shimmer" />
            ))}
          </div>
        ) : !recap ? (
          <p className="text-sm text-muted-foreground">Couldn't load your recap right now.</p>
        ) : (
          <>
            <p className="text-sm md:text-[15px] text-foreground/90 leading-relaxed italic">
              "{headline}"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
              <RecapStat
                icon={<Utensils className="w-4 h-4" />}
                tone="text-primary bg-primary/10"
                value={recap.logCount}
                label="Meals Logged"
              />
              <RecapStat
                icon={<CheckCircle2 className="w-4 h-4" />}
                tone="text-emerald-500 bg-emerald-500/10"
                value={`${recap.completedTasks}/${recap.totalTasks}`}
                label={`Tasks · ${recap.completionRate}%`}
              />
              <RecapStat
                icon={<Flame className="w-4 h-4" />}
                tone="text-orange-500 bg-orange-500/10"
                value={recap.caloriesOut.toLocaleString()}
                label="Kcal Burned"
              />
              <RecapStat
                icon={<TrendingUp className="w-4 h-4" />}
                tone={
                  recap.net >= 0
                    ? "text-rose-500 bg-rose-500/10"
                    : "text-emerald-500 bg-emerald-500/10"
                }
                value={`${recap.net >= 0 ? "+" : ""}${recap.net.toLocaleString()}`}
                label="Net Balance"
              />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Avg daily intake:{" "}
                <strong className="text-foreground">
                  {recap.avgDailyCalories.toLocaleString()} kcal
                </strong>
              </span>
              {recap.mostActiveDay && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Most active:{" "}
                  <strong className="text-foreground">{recap.mostActiveDay}</strong>
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RecapStat({
  icon,
  value,
  label,
  tone,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3.5 hover-lift">
      <div className={`grid place-items-center w-8 h-8 rounded-lg mb-2 ${tone}`}>{icon}</div>
      <p className="text-xl font-bold leading-none text-foreground">{value}</p>
      <p className="text-[11px] font-medium text-muted-foreground mt-1.5">{label}</p>
    </div>
  );
}

/* ============================================================
   HABIT CALENDAR CARD (unchanged logic, refreshed styling)
============================================================ */
function HabitAnalysisCard({ habit }: { habit: any }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = getDay(monthStart);
  const emptyDaysPadding = Array.from({ length: startingDayIndex }).map((_, i) => i);

  const isCompletedOnDate = (targetDate: Date) => {
    return (
      habit.completedDates?.some((completedDateString: string) =>
        isSameDay(new Date(completedDateString), targetDate)
      ) || false
    );
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm transition-all overflow-hidden animate-fade-up">
      <CardHeader className="pb-4 border-b border-border/40 bg-secondary/10">
        <CardTitle className="text-xl font-bold text-foreground capitalize tracking-tight flex items-center justify-between">
          {habit.title} Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

          {/* LEFT: STATS */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="relative group overflow-hidden rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.currentStreak}</p>
                <p className="text-xs uppercase font-bold text-orange-500/80 tracking-wider">Current Streak</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-violet-500/30 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Trophy className="w-6 h-6 text-violet-500 mb-2 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.longestStreak}</p>
                <p className="text-xs uppercase font-bold text-violet-500/80 tracking-wider">Longest Streak</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.totalCompletions}</p>
                <p className="text-xs uppercase font-bold text-emerald-500/80 tracking-wider">Total Done</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CALENDAR */}
          <div className="w-full md:w-2/3 flex justify-center md:justify-start">
            <div className="bg-background border border-border/50 rounded-2xl p-5 md:p-6 shadow-sm w-full max-w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-base text-foreground uppercase tracking-widest">
                  {format(currentDate, "MMMM yyyy")}
                </p>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={handleNextMonth}
                    disabled={isSameMonth(currentDate, new Date())}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {emptyDaysPadding.map((empty) => (
                  <div key={`empty-${empty}`} className="aspect-square rounded-lg opacity-0" />
                ))}
                {daysInMonth.map((date) => {
                  const completed = isCompletedOnDate(date);
                  const isFutureDate = isFuture(date) && !isToday(date);
                  const isTodayDate = isToday(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-xs md:text-sm transition-all relative font-bold
                        ${completed
                          ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_12px_var(--primary)] z-10"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 font-semibold"
                        }
                        ${isFutureDate ? "opacity-30 bg-transparent border border-dashed border-border/50 text-muted-foreground/50" : ""}
                        ${isTodayDate && !completed ? "border-2 border-primary/50 text-primary bg-primary/5" : ""}
                      `}
                    >
                      {format(date, "d")}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/components/manual-log-fallback.tsx">
"use client";

/**
 * Structured fallback so logging never hard-fails when the AI is rate-limited
 * (429) or down. Writes a MEAL log directly with user-entered numbers.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ManualLogFallback({ onSaved }: { onSaved?: () => void }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name.trim() || !calories) return;
    setSaving(true);
    try {
      const r = await fetch("/api/manual-log", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          calories: Number(calories) || 0,
          protein: Number(protein) || 0,
        }),
      });
      if (!r.ok) throw new Error();
      toast.success("Saved manually");
      setName(""); setCalories(""); setProtein("");
      onSaved?.();
    } catch {
      toast.error("Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
      <p className="text-sm text-muted-foreground">
        AI is busy right now — you can still log this meal by hand.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1 sm:col-span-1">
          <Label className="text-xs">Food</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dal & rice" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Calories</Label>
          <Input type="number" inputMode="numeric" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="450" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Protein (g)</Label>
          <Input type="number" inputMode="numeric" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="20" />
        </div>
      </div>
      <Button onClick={save} disabled={saving || !name.trim() || !calories} className="w-full sm:w-auto">
        {saving ? "Saving…" : "Save manually"}
      </Button>
    </div>
  );
}
</file>

<file path="src/components/soma-loader.tsx">
"use client";

/**
 * SomaLoader — "Pulse Core".
 * A breathing core with an orbiting tracer ring. Uses theme tokens (primary),
 * respects prefers-reduced-motion (via globals.css), and works inline or
 * fullscreen. Drop-in replacement for <DNALoader />.
 *
 * Usage:
 *   <SomaLoader />                       // fullscreen overlay
 *   <SomaLoader inline size={40} />      // inline spinner
 *   <SomaLoader label="Analyzing…" />
 */
export function SomaLoader({
  size = 72,
  inline = false,
  label,
}: {
  size?: number;
  inline?: boolean;
  label?: string;
}) {
  const core = (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
      aria-label={label ?? "Loading"}
    >
      {/* Orbiting tracer ring */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ animation: "soma-orbit 2.4s linear infinite" }}
      >
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="3" opacity="0.4" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60 300"
          style={{ animation: "soma-trace 2.4s ease-in-out infinite" }}
        />
      </svg>

      {/* Breathing core */}
      <span
        className="rounded-full"
        style={{
          width: size * 0.34,
          height: size * 0.34,
          background: "radial-gradient(circle at 30% 30%, var(--primary), color-mix(in srgb, var(--primary) 55%, transparent))",
          boxShadow: "0 0 24px color-mix(in srgb, var(--primary) 45%, transparent)",
          animation: "soma-pulse 1.6s ease-in-out infinite",
        }}
      />
    </div>
  );

  if (inline) {
    return (
      <span className="inline-flex items-center gap-3">
        {core}
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </span>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        {core}
        <p className="text-sm font-medium tracking-wide text-muted-foreground animate-pulse">
          {label ?? "Loading your day…"}
        </p>
      </div>
    </div>
  );
}

// Back-compat alias so existing imports of DNALoader keep working.
export const DNALoader = SomaLoader;
</file>

<file path="src/lib/auth.ts">
// src/lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Single source of truth for "who is calling".
 * NEVER trust a userId from the request body/query again — derive it here.
 *
 * Usage in a route:
 *   const gate = await requireUser();
 *   if (gate instanceof NextResponse) return gate;   // 401 already formed
 *   const { userId } = gate;
 */
export async function requireUser(): Promise<{ userId: string } | NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { userId };
}

/** Verifies a cron secret (constant-time-ish) for internal scheduled routes. */
export function isValidCron(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET) return false;
  if (header.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < header.length; i++) mismatch |= header.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0;
}
</file>

<file path="src/lib/habits.ts">
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
</file>

<file path="src/lib/nutrition.ts">
// src/lib/nutrition.ts
// Auto goals (Mifflin–St Jeor BMR + activity → TDEE) and adaptive re-tuning.

type Gender = "Male" | "Female" | "Other" | string | null | undefined;

const ACTIVITY_FACTORS: Record<string, number> = {
  Sedentary: 1.2,
  Moderate: 1.45,
  Active: 1.65,
};

export interface GoalInputs {
  age?: number | null;
  gender?: Gender;
  height?: number | null; // cm
  weight?: number | null; // kg
  activityLevel?: string | null;
  weightGoal?: string | null; // "Lose" | "Maintain" | "Gain"
}

/** Basal Metabolic Rate (kcal/day). Returns null if inputs are insufficient. */
export function bmr({ age, gender, height, weight }: GoalInputs): number | null {
  if (!age || !height || !weight) return null;
  const base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "Male") return base + 5;
  if (gender === "Female") return base - 161;
  return base - 78; // neutral midpoint when unspecified
}

/** Total Daily Energy Expenditure (kcal/day). */
export function tdee(inputs: GoalInputs): number | null {
  const b = bmr(inputs);
  if (b == null) return null;
  const factor = ACTIVITY_FACTORS[inputs.activityLevel ?? "Sedentary"] ?? 1.2;
  return Math.round(b * factor);
}

/** Suggested daily calorie goal, adjusted for the weight goal. */
export function calorieGoal(inputs: GoalInputs): number | null {
  const t = tdee(inputs);
  if (t == null) return null;
  let goal = t;
  if (inputs.weightGoal === "Lose") goal = t - 400; // ~0.4 kg/week deficit
  if (inputs.weightGoal === "Gain") goal = t + 300;
  return Math.max(1200, Math.round(goal / 10) * 10); // safety floor
}

/** Suggested water goal (ml) ≈ 35 ml per kg, clamped. */
export function waterGoal(inputs: GoalInputs): number | null {
  if (!inputs.weight) return null;
  return Math.min(4000, Math.max(1500, Math.round((inputs.weight * 35) / 100) * 100));
}

/**
 * Adaptive nudge: given the last 14 days of intake vs the current goal and the
 * weight trend, suggest a small correction (±100 kcal max).
 */
export function adaptiveCalorieGoal(
  currentGoal: number,
  avgIntake: number | null,
  weightTrendKgPerWeek: number | null,
  weightGoal: string | null
): number {
  if (avgIntake == null) return currentGoal;
  let delta = 0;

  if (weightGoal === "Lose" && (weightTrendKgPerWeek ?? 0) > -0.1) delta = -100;
  else if (weightGoal === "Gain" && (weightTrendKgPerWeek ?? 0) < 0.1) delta = +100;
  else if (weightGoal === "Maintain" && Math.abs(weightTrendKgPerWeek ?? 0) > 0.3)
    delta = (weightTrendKgPerWeek ?? 0) > 0 ? -100 : +100;

  return Math.max(1200, Math.round((currentGoal + delta) / 10) * 10);
}
</file>

<file path="src/lib/tz.ts">
// src/lib/tz.ts
// Timezone-aware day boundaries WITHOUT extra deps (uses Intl).
// We store per-day rows at the UTC-midnight of the user's LOCAL calendar day,
// which is consistent with how tasks/logs are already stored via startOfDay().

/** Returns the user's local calendar date as a UTC-midnight Date. */
export function localDayStart(timezone: string, now: Date = new Date()): Date {
  const tz = safeTz(timezone);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return new Date(`${y}-${m}-${d}T00:00:00.000Z`);
}

/** Day-of-week (0=Sun..6=Sat) for a UTC-midnight day-start produced above. */
export function dayOfWeek(dayStart: Date): number {
  return dayStart.getUTCDay();
}

/** Current local hour (0-23) in a timezone — used for quiet-hours checks. */
export function localHour(timezone: string, now: Date = new Date()): number {
  const tz = safeTz(timezone);
  const h = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    hour12: false,
  }).format(now);
  return parseInt(h, 10) % 24;
}

function safeTz(tz: string): string {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return "UTC";
  }
}
</file>

<file path="src/lib/validation.ts">
// src/lib/validation.ts
// Requires: npm i zod
import { z } from "zod";

// --- AI log parsing: never trust the model's shape blindly. ---
export const AiFoodSchema = z.object({
  name: z.string().default("Unknown"),
  calories: z.coerce.number().finite().nonnegative().default(0),
  protein: z.coerce.number().finite().nonnegative().default(0),
  carbs: z.coerce.number().finite().nonnegative().default(0),
  fats: z.coerce.number().finite().nonnegative().default(0),
});

export const AiExerciseSchema = z.object({
  name: z.string().default("Activity"),
  calories_burned: z.coerce.number().finite().nonnegative().default(0),
  duration_minutes: z.coerce.number().finite().nonnegative().default(0),
});

export const AiLogSchema = z.object({
  foods: z.array(AiFoodSchema).default([]),
  exercises: z.array(AiExerciseSchema).default([]),
  total_calories_in: z.coerce.number().finite().nonnegative().default(0),
  total_calories_out: z.coerce.number().finite().nonnegative().default(0),
  ai_feedback: z.string().default(""),
  next_step: z.string().default(""),
});
export type AiLog = z.infer<typeof AiLogSchema>;

/** Parse + repair AI JSON. Recomputes totals from items if the model's totals look wrong. */
export function parseAiLog(raw: unknown): AiLog {
  const data = AiLogSchema.parse(raw);
  const foodCals = data.foods.reduce((a, f) => a + f.calories, 0);
  const exCals = data.exercises.reduce((a, e) => a + e.calories_burned, 0);
  if (data.total_calories_in === 0 && foodCals > 0) data.total_calories_in = Math.round(foodCals);
  if (data.total_calories_out === 0 && exCals > 0) data.total_calories_out = Math.round(exCals);
  return data;
}

// --- Request body schemas ---
export const TaskCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW", "HABIT"]).default("MEDIUM"),
  date: z.string(),
  startTime: z.string().nullable().optional(),
  isRecurring: z.boolean().default(false),
  duration: z.coerce.number().int().positive().max(1440).optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        targetValue: z.coerce.number().int().optional().nullable(),
        unit: z.string().max(20).optional().nullable(),
      })
    )
    .default([]),
});

export const HabitTemplateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  startTime: z.string().nullable().optional(),
  durationMins: z.coerce.number().int().positive().max(1440).optional().nullable(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).default([0, 1, 2, 3, 4, 5, 6]),
  isActive: z.boolean().default(true),
  subtasks: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1).max(200),
        targetValue: z.coerce.number().int().optional().nullable(),
        unit: z.string().max(20).optional().nullable(),
      })
    )
    .default([]),
});
export type HabitTemplateInput = z.infer<typeof HabitTemplateSchema>;
</file>

<file path="prisma/migrations/0_init/migration.sql">
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "age" INTEGER,
    "gender" TEXT,
    "encryptedApiKey" TEXT,
    "apiKeyIv" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawText" TEXT NOT NULL,
    "parsedData" JSONB,
    "totalCaloriesIn" INTEGER NOT NULL DEFAULT 0,
    "totalCaloriesOut" INTEGER NOT NULL DEFAULT 0,
    "aiFeedback" TEXT,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
</file>

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/swe-worker-5c72df51bb1f6ee0.js">
(()=>{"use strict";self.onmessage=async e=>{switch(e.data.type){case"__START_URL_CACHE__":{let t=e.data.url,a=await fetch(t);if(!a.redirected)return(await caches.open("start-url")).put(t,a);return Promise.resolve()}case"__FRONTEND_NAV_CACHE__":{let t=e.data.url,a=await caches.open("pages");if(await a.match(t,{ignoreSearch:!0}))return;let s=await fetch(t);if(!s.ok)return;if(a.put(t,s.clone()),e.data.shouldCacheAggressively&&s.headers.get("Content-Type")?.includes("text/html"))try{let e=await s.text(),t=[],a=await caches.open("static-style-assets"),r=await caches.open("next-static-js-assets"),c=await caches.open("static-js-assets");for(let[s,r]of e.matchAll(/<link.*?href=['"](.*?)['"].*?>/g))/rel=['"]stylesheet['"]/.test(s)&&t.push(a.match(r).then(e=>e?Promise.resolve():a.add(r)));for(let[,a]of e.matchAll(/<script.*?src=['"](.*?)['"].*?>/g)){let e=/\/_next\/static.+\.js$/i.test(a)?r:c;t.push(e.match(a).then(t=>t?Promise.resolve():e.add(a)))}return await Promise.all(t)}catch{}return Promise.resolve()}default:return Promise.resolve()}}})();
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="public/worker-3fcb3030ed21522e.js">
self.addEventListener("push",function(i){if(i.data){let t=i.data.json(),n={body:t.body,icon:"/icon.png",badge:"/badge.png",vibrate:[200,100,200],requireInteraction:!0,data:{dateOfArrival:Date.now(),primaryKey:"2"}};i.waitUntil(self.registration.showNotification(t.title,n))}}),self.addEventListener("notificationclick",function(i){i.notification.close(),i.waitUntil(clients.openWindow("/"))});
</file>

<file path="src/app/actions/deadlines.ts">
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
</file>

<file path="src/app/actions/feedback.ts">
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
</file>

<file path="src/app/actions/notes.ts">
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNotes() {
  const { userId } = await auth();
  if (!userId) return { success: false, data: [] };

  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });

  return { success: true, data: notes };
}

export async function saveNote(data: { id?: string; title: string; content: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (data.id) {
    // Update existing
    await prisma.note.update({
      where: { id: data.id, userId },
      data: { 
        title: data.title, 
        content: data.content 
      }
    });
  } else {
    // Create new
    await prisma.note.create({
      data: {
        userId,
        title: data.title || "Untitled Note",
        content: data.content
      }
    });
  }

  revalidatePath("/notes");
  return { success: true };
}

export async function deleteNote(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.note.delete({
    where: { id, userId }
  });

  revalidatePath("/notes");
  return { success: true };
}
</file>

<file path="src/app/actions/steps.ts">
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { startOfDay } from "date-fns";
import { clerkClient } from "@clerk/nextjs/server";

// 1. Get Steps for Today
// src/app/actions/steps.ts
export async function getDailySteps(date?: Date) { // Accept optional date
  const { userId } = await auth();
  if (!userId) return { steps: 0, source: "MANUAL" };

  // Use passed date OR today
  const targetDate = date ? startOfDay(date) : startOfDay(new Date());

  const metric = await prisma.dailyMetrics.findUnique({
    where: {
      userId_date: { userId, date: targetDate }
    }
  });

  return { steps: metric?.steps || 0, source: metric?.stepSource || "MANUAL" };
}

// 2. Update Steps (Manual or Google)
export async function updateDailySteps(count: number, source: "MANUAL" | "GOOGLE") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const today = startOfDay(new Date());

  await prisma.dailyMetrics.upsert({
    where: { userId_date: { userId, date: today } },
    update: { 
        steps: count, 
        stepSource: source 
    },
    create: { 
        userId, 
        date: today, 
        steps: count, 
        stepSource: source 
    }
  });

  return { success: true };
}


export async function syncGoogleSteps() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const client = await clerkClient();
    
    // 1. Try to get the token
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_google');
    
    // 2. CHECK IF TOKEN EXISTS
    const accessToken = tokenResponse.data[0]?.token;
    console.log("Access Token:", accessToken);
    
    if (!accessToken) {
      // This is the specific error case you are hitting right now
      return { success: false, error: "reauth_needed" };
    }

    // 3. Define Time Range
    const startTime = startOfDay(new Date()).getTime();
    const endTime = new Date().getTime();

    // 4. Call Google
    const googleResponse = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
      }),
    });

    if (!googleResponse.ok) {
       const err = await googleResponse.text();
       console.error("Google API Error:", err);
       return { success: false, error: "google_api_error" };
    }

    const data = await googleResponse.json();
    const steps = data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;

    // 5. Save
    await updateDailySteps(steps, "GOOGLE");

    return { success: true, steps };

  } catch (e) {
    console.error("Sync Error:", e);
    // Return a clean error to the client instead of crashing (500)
    return { success: false, error: "internal_error" };
  }
}
</file>

<file path="src/app/analysis/page.tsx">
// app/analysis/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HabitAnalysisClient from "../../components/analysis/HabitAnalysisClient";

export default async function AnalysisPage() {
  // 1. Securely get the user ID from Clerk on the server
  const { userId } = await auth();

  // 2. Protect the route: if they aren't logged in, send them to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // 3. Render the client component and pass the userId as a prop
  return <HabitAnalysisClient userId={userId} />;
}
</file>

<file path="src/app/api/cron/notifications/subscribe/route.ts">
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // 👇 FIX: Added 'await' right here
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await req.json();

    // 1. Check if this exact device is already registered to avoid duplicates
    const existingSub = await prisma.pushSubscription.findFirst({
      where: { endpoint: subscription.endpoint }
    });

    if (!existingSub) {
      // 2. Save the new device subscription
      await prisma.pushSubscription.create({
        data: {
          userId: userId,
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the device endpoint we want to remove
    const { endpoint } = await req.json();

    if (endpoint) {
      // Delete this specific device subscription from the database
      await prisma.pushSubscription.deleteMany({
        where: { 
          userId: userId,
          endpoint: endpoint 
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe Error:", error);
    return NextResponse.json({ error: "Failed to remove subscription" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/delete-log/route.ts">
// src/app/api/delete-log/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const logId = new URL(req.url).searchParams.get("id");
  if (!logId) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

  try {
    // Ownership enforced by the where-clause using the SESSION userId.
    const result = await prisma.dailyLog.deleteMany({ where: { id: logId, userId } });
    if (result.count === 0) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Log Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/habits/analysis/route.ts">
// src/app/api/habits/analysis/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { calculateHabitStats } from "@/lib/streak-utils";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId, isRecurring: true },
      select: { title: true, date: true, isCompleted: true },
      orderBy: { date: "desc" },
    });

    const grouped: Record<string, Date[]> = {};
    for (const t of tasks) {
      if (!grouped[t.title]) grouped[t.title] = [];
      if (t.isCompleted) grouped[t.title].push(t.date);
    }

    const habits = Object.entries(grouped).map(([title, dates]) => ({ title, ...calculateHabitStats(dates) }));
    return NextResponse.json({ success: true, habits });
  } catch (error) {
    console.error("Habit Analysis Error:", error);
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/log-water/route.ts">
// src/app/api/log-water/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { startOfDay, endOfDay } from "date-fns";

// Water lives on ONE row per day (type: "WATER"), incremented — so it never
// creates dozens of rows and never inflates streaks/badges.
export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { amount } = await req.json();
    const add = Math.max(0, Math.min(5000, parseInt(amount, 10) || 0));
    const now = new Date();

    const existing = await prisma.dailyLog.findFirst({
      where: { userId, type: "WATER", date: { gte: startOfDay(now), lte: endOfDay(now) } },
      select: { id: true, waterMl: true },
    });

    const log = existing
      ? await prisma.dailyLog.update({ where: { id: existing.id }, data: { waterMl: existing.waterMl + add } })
      : await prisma.dailyLog.create({
          data: { userId, type: "WATER", date: now, rawText: "Water", waterMl: add, aiFeedback: "Hydration boost" },
        });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Water Log Error:", error);
    return NextResponse.json({ success: false, error: "Failed to log water" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile/route.ts">
// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { calorieGoal, waterGoal } from "@/lib/nutrition";

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const userProfile = await prisma.user.findUnique({ where: { id: userId } });
    if (!userProfile) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    // Streaks/badges count MEAL logs only — water no longer inflates them.
    const logs = await prisma.dailyLog.findMany({
      where: { userId, type: { not: "WATER" } },
      orderBy: { date: "desc" },
      select: { date: true, totalCaloriesOut: true },
    });

    // Streak = consecutive days with at least one meal log, deduped per day.
    const dayKeys = Array.from(
      new Set(logs.map((l) => new Date(l.date).setHours(0, 0, 0, 0)))
    ).sort((a, b) => b - a);

    let streak = 0;
    if (dayKeys.length > 0) {
      const today = new Date().setHours(0, 0, 0, 0);
      const DAY = 86400000;
      if (today - dayKeys[0] <= DAY) {
        streak = 1;
        for (let i = 0; i < dayKeys.length - 1; i++) {
          if (dayKeys[i] - dayKeys[i + 1] === DAY) streak++;
          else break;
        }
      }
    }

    const totalLogs = dayKeys.length;
    const totalCaloriesBurned = logs.reduce((a, l) => a + l.totalCaloriesOut, 0);

    const badges: string[] = [];
    if (streak >= 3) badges.push("Consistency King");
    if (streak >= 7) badges.push("Week Warrior");
    if (streak >= 30) badges.push("Iron Habit");
    if (totalLogs >= 10) badges.push("Data Collector");
    if (totalLogs >= 50) badges.push("Journalist");
    if (totalCaloriesBurned > 5000) badges.push("Furnace");
    if (totalCaloriesBurned > 20000) badges.push("Supernova");

    return NextResponse.json({
      success: true,
      data: userProfile,
      stats: { streak, totalLogs, totalCaloriesBurned, badges, streakFreezes: userProfile.streakFreezes },
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const data = await req.json();

    const height = data.height ? parseFloat(data.height) : null;
    const weight = data.weight ? parseFloat(data.weight) : null;
    const age = data.age ? parseInt(data.age, 10) : null;

    // Auto goals: if enabled, derive calorie/water goals from stats,
    // otherwise honour whatever the user typed.
    const autoGoals = data.autoGoals ?? true;
    const inputs = {
      age,
      gender: data.gender,
      height,
      weight,
      activityLevel: data.activityLevel,
      weightGoal: data.weightGoal,
    };
    const derivedCalories = autoGoals ? calorieGoal(inputs) : null;
    const derivedWater = autoGoals ? waterGoal(inputs) : null;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        age,
        gender: data.gender ?? null,
        height,
        weight,
        activityLevel: data.activityLevel ?? null,
        jobType: data.jobType ?? null,
        dietaryPreferences: data.dietaryPreferences ?? null,
        customPurpose: data.customPurpose ?? null,
        weightGoal: data.weightGoal ?? null,
        targetWeight: data.targetWeight ? parseFloat(data.targetWeight) : null,
        autoGoals,
        dailyCalorieGoal: derivedCalories ?? (data.dailyCalorieGoal ? parseInt(data.dailyCalorieGoal, 10) : 2000),
        waterGoal: derivedWater ?? (data.waterGoal ? parseInt(data.waterGoal, 10) : 2500),
        ...(data.timezone ? { timezone: data.timezone } : {}),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/profile-status/route.ts">
import { getSomaUser } from "@/lib/prisma";
import { checkProfileCompleteness } from "@/lib/check-profile";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSomaUser();
  if (!user) {
    return NextResponse.json({ isComplete: true });
  }

  const status = await checkProfileCompleteness(user.id);
  return NextResponse.json(status);
}
</file>

<file path="src/app/api/user/delete/route.ts">
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// 👇 CHANGED: Import 'currentUser' instead of 'auth'
import { currentUser } from "@clerk/nextjs/server"; 

export async function DELETE(request: Request) {
  try {
    // 1. Fetch the full user object
    const user = await currentUser();

    // 2. Strict Check: Ensure user and ID exist
    if (!user || !user.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Calculate date: Now + 15 days
    const gracePeriodEnd = new Date();
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 15);

    // 👇 SOFT DELETE using 'user.id'
    await prisma.user.update({
      where: { id: user.id }, // TypeScript now knows this is definitely a string
      data: { 
        scheduledForDeletion: gracePeriodEnd 
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Account scheduled for deletion in 15 days." 
    });

  } catch (error) {
    console.error("Soft Delete Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/user/restore/route.ts">
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"; // 👈 Use 'currentUser' instead of 'auth'

export async function POST(request: Request) {
  try {
    // 1. Fetch the full user object (Async/Await)
    const user = await currentUser();

    // 2. Strict Check: If no user found, stop.
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Restore the account
    await prisma.user.update({
      where: { id: user.id }, // 👈 Now TypeScript knows this is definitely a string
      data: { scheduledForDeletion: null }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Restore Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/user/update-profile/route.ts">
// src/app/api/user/update-profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { height, weight, age, gender, activityLevel } = await req.json();
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(height ? { height: parseFloat(height) } : {}),
        ...(weight ? { weight: parseFloat(weight) } : {}),
        ...(age ? { age: parseInt(age, 10) } : {}),
        ...(gender ? { gender } : {}),
        ...(activityLevel ? { activityLevel } : {}),
      },
    });
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
</file>

<file path="src/app/feedback/page.tsx">
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Bug, Lightbulb, MessageSquare, CheckCircle2, ArrowRight, Wand2, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/app/actions/feedback"; 
import { cn } from "@/lib/utils";
import Link from "next/link";

// ⚡ LCP OPTIMIZATION 1: Move heavy constants outside component to avoid re-creation
const QUESTION_BANK: any = {
  BUG: {
    title: "Report a Bug",
    q1: { label: "What exactly happened?", placeholder: "I clicked X and then Y crashed...", key: "bugDescription" },
    q2: { label: "Steps to reproduce (optional)", placeholder: "1. Go to settings\n2. Click save...", key: "bugSteps" },
    icon: AlertTriangle
  },
  FEATURE: {
    title: "Request a Feature",
    q1: { label: "What problem are you trying to solve?", placeholder: "I find it hard to track my water because...", key: "featureProblem" },
    q2: { label: "How do you imagine the solution?", placeholder: "It would be cool if there was a button that...", key: "featureSolution" },
    icon: Wand2
  },
  GENERAL: {
    title: "General Feedback",
    q1: { label: "Biggest daily challenge Soma doesn't solve yet?", placeholder: "e.g. I struggle to track my mood...", key: "generalChallenge" },
    q2: { label: "Magic Wand: One thing to change on Soma?", placeholder: "I wish the dashboard had...", key: "generalMagicWand" },
    icon: Heart
  }
};

export default function FeedbackPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<"BUG" | "FEATURE" | "GENERAL" | "">("");
  const [answers, setAnswers] = useState({
    bugDescription: "", bugSteps: "",
    featureProblem: "", featureSolution: "",
    generalChallenge: "", generalMagicWand: ""
  });

const handleSubmit = async () => {
    setIsSubmitting(true);
    const activeQuestions = QUESTION_BANK[category];
    const cleanAnswers = {
        [activeQuestions.q1.key]: (answers as any)[activeQuestions.q1.key],
        [activeQuestions.q2.key]: (answers as any)[activeQuestions.q2.key]
    };
    const relevantData = {
        rating,
        category,
        answers: cleanAnswers 
    };

    await submitFeedback(relevantData);
    setStep(4);
    setIsSubmitting(false);
  };

  const currentQ = category ? QUESTION_BANK[category] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md">
        
        {/* Static Content (LCP Candidate) - Renders instantly */}
        <div className="text-center mb-6 md:mb-10 space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Help us improve</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your feedback shapes Soma.</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden relative flex flex-col min-h-[350px] md:min-h-[450px]">
            
            {/* Progress Bar */}
            <div className="h-1 bg-secondary w-full">
                <motion.div 
                    className="h-full bg-primary" 
                    animate={{ width: `${(step / 3) * 100}%` }}
                    initial={false} // Disable initial animation for faster visual load
                />
            </div>

            <div className="p-5 md:p-8 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                
                {/* === STEP 1: RATING === */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        // ⚡ LCP OPTIMIZATION 2: initial={false} 
                        // This prevents the component from being hidden (opacity: 0) on load.
                        // It ensures the stars are visible in the initial HTML sent by the server.
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 text-center"
                    >
                        <h2 className="text-lg md:text-xl font-semibold">How is your experience?</h2>
                        <div className="flex justify-center gap-1 md:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                                >
                                    <Star 
                                        className={cn(
                                            "w-8 h-8 md:w-10 md:h-10 transition-colors", 
                                            rating >= star ? "fill-primary text-primary" : "text-muted-foreground/20"
                                        )} 
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="pt-2">
                            <Button disabled={rating === 0} onClick={() => setStep(2)} className="w-full h-10 md:h-12 text-base rounded-lg">
                                Next <ArrowRight className="ml-2 w-4 h-4"/>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* === STEP 2: CATEGORY === */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-center">What is this regarding?</h2>
                        <div className="grid grid-cols-1 gap-2.5">
                            {[
                                { id: "BUG", icon: Bug, label: "Bug Report", desc: "Something is broken" },
                                { id: "FEATURE", icon: Lightbulb, label: "Feature Request", desc: "I have an idea" },
                                { id: "GENERAL", icon: MessageSquare, label: "General", desc: "Feedback on experience" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setCategory(item.id as any); setStep(3); }}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-left active:scale-[0.98]"
                                >
                                    <div className="p-2.5 bg-secondary rounded-full">
                                        <item.icon className="w-4 h-4 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{item.label}</div>
                                        <div className="text-[10px] md:text-xs text-muted-foreground">{item.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="w-full text-muted-foreground">Back</Button>
                    </motion.div>
                )}

                {/* === STEP 3: DYNAMIC DETAILS === */}
                {step === 3 && currentQ && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                            <currentQ.icon className="w-4 h-4" />
                            {currentQ.title}
                        </div>

                        {/* Q1 */}
                        <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-medium">{currentQ.q1.label}</label>
                            <Textarea 
                                placeholder={currentQ.q1.placeholder}
                                className="bg-secondary/20 min-h-[80px] text-sm resize-none focus-visible:ring-1"
                                // @ts-ignore
                                value={answers[currentQ.q1.key]}
                                // @ts-ignore
                                onChange={(e) => setAnswers({...answers, [currentQ.q1.key]: e.target.value})}
                            />
                        </div>

                        {/* Q2 */}
                        <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-medium">{currentQ.q2.label}</label>
                            <Textarea 
                                placeholder={currentQ.q2.placeholder}
                                className="bg-secondary/20 min-h-[80px] text-sm resize-none focus-visible:ring-1"
                                // @ts-ignore
                                value={answers[currentQ.q2.key]}
                                // @ts-ignore
                                onChange={(e) => setAnswers({...answers, [currentQ.q2.key]: e.target.value})}
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Back</Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2]">
                                {isSubmitting ? "Sending..." : "Submit"}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* === STEP 4: SUCCESS === */}
                {step === 4 && (
                    <motion.div 
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4 py-4"
                    >
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold">Received!</h2>
                            <p className="text-xs text-muted-foreground">Thanks for helping us build Soma.</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4">
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard">Return to Dashboard</Link>
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                    setRating(0);
                                    setCategory("");
                                    setAnswers({
                                        bugDescription: "", bugSteps: "",
                                        featureProblem: "", featureSolution: "",
                                        generalChallenge: "", generalMagicWand: ""
                                    });
                                    setStep(1); 
                                }}
                                className="text-muted-foreground hover:text-primary"
                            >
                                Submit another response
                            </Button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/app/fonts/Baskervville/OFL.txt">
Copyright 2018 The Baskervville Project Authors (https://github.com/anrt-type/ANRT-Baskervville)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/fonts/Baskervville/README.txt">
Baskervville Variable Font
==========================

This download contains Baskervville as both variable fonts and static fonts.

Baskervville is a variable font with this axis:
  wght

This means all the styles are contained in these files:
  Baskervville/Baskervville-VariableFont_wght.ttf
  Baskervville/Baskervville-Italic-VariableFont_wght.ttf

If your app fully supports variable fonts, you can now pick intermediate styles
that aren’t available as static fonts. Not all apps support variable fonts, and
in those cases you can use the static font files for Baskervville:
  Baskervville/static/Baskervville-Regular.ttf
  Baskervville/static/Baskervville-Medium.ttf
  Baskervville/static/Baskervville-SemiBold.ttf
  Baskervville/static/Baskervville-Bold.ttf
  Baskervville/static/Baskervville-Italic.ttf
  Baskervville/static/Baskervville-MediumItalic.ttf
  Baskervville/static/Baskervville-SemiBoldItalic.ttf
  Baskervville/static/Baskervville-BoldItalic.ttf

Get started
-----------

1. Install the font files you want to use

2. Use your app's font picker to view the font family and all the
available styles

Learn more about variable fonts
-------------------------------

  https://developers.google.com/web/fundamentals/design-and-ux/typography/variable-fonts
  https://variablefonts.typenetwork.com
  https://medium.com/variable-fonts

In desktop apps

  https://theblog.adobe.com/can-variable-fonts-illustrator-cc
  https://helpx.adobe.com/nz/photoshop/using/fonts.html#variable_fonts

Online

  https://developers.google.com/fonts/docs/getting_started
  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide
  https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/variable-fonts

Installing fonts

  MacOS: https://support.apple.com/en-us/HT201749
  Linux: https://www.google.com/search?q=how+to+install+a+font+on+gnu%2Blinux
  Windows: https://support.microsoft.com/en-us/help/314960/how-to-install-or-remove-a-font-in-windows

Android Apps

  https://developers.google.com/fonts/docs/android
  https://developer.android.com/guide/topics/ui/look-and-feel/downloadable-fonts

License
-------
Please read the full license text (OFL.txt) to understand the permissions,
restrictions and requirements for usage, redistribution, and modification.

You can use them in your products & projects – print or digital,
commercial or otherwise.

This isn't legal advice, please consider consulting a lawyer and see the full
license for all details.
</file>

<file path="src/app/fonts/BBH_Bogle/OFL.txt">
Copyright 2025 The BBH Project Authors (https://github.com/Studio-DRAMA/BBH)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/fonts/BBH_Hegarty/OFL.txt">
Copyright 2025 The BBH Project Authors (https://github.com/Studio-DRAMA/BBH)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/fonts/EB_Garamond/OFL.txt">
Copyright 2017 The EB Garamond Project Authors (https://github.com/octaviopardo/EBGaramond12)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/fonts/EB_Garamond/README.txt">
EB Garamond Variable Font
=========================

This download contains EB Garamond as both variable fonts and static fonts.

EB Garamond is a variable font with this axis:
  wght

This means all the styles are contained in these files:
  EB_Garamond/EBGaramond-VariableFont_wght.ttf
  EB_Garamond/EBGaramond-Italic-VariableFont_wght.ttf

If your app fully supports variable fonts, you can now pick intermediate styles
that aren’t available as static fonts. Not all apps support variable fonts, and
in those cases you can use the static font files for EB Garamond:
  EB_Garamond/static/EBGaramond-Regular.ttf
  EB_Garamond/static/EBGaramond-Medium.ttf
  EB_Garamond/static/EBGaramond-SemiBold.ttf
  EB_Garamond/static/EBGaramond-Bold.ttf
  EB_Garamond/static/EBGaramond-ExtraBold.ttf
  EB_Garamond/static/EBGaramond-Italic.ttf
  EB_Garamond/static/EBGaramond-MediumItalic.ttf
  EB_Garamond/static/EBGaramond-SemiBoldItalic.ttf
  EB_Garamond/static/EBGaramond-BoldItalic.ttf
  EB_Garamond/static/EBGaramond-ExtraBoldItalic.ttf

Get started
-----------

1. Install the font files you want to use

2. Use your app's font picker to view the font family and all the
available styles

Learn more about variable fonts
-------------------------------

  https://developers.google.com/web/fundamentals/design-and-ux/typography/variable-fonts
  https://variablefonts.typenetwork.com
  https://medium.com/variable-fonts

In desktop apps

  https://theblog.adobe.com/can-variable-fonts-illustrator-cc
  https://helpx.adobe.com/nz/photoshop/using/fonts.html#variable_fonts

Online

  https://developers.google.com/fonts/docs/getting_started
  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide
  https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/variable-fonts

Installing fonts

  MacOS: https://support.apple.com/en-us/HT201749
  Linux: https://www.google.com/search?q=how+to+install+a+font+on+gnu%2Blinux
  Windows: https://support.microsoft.com/en-us/help/314960/how-to-install-or-remove-a-font-in-windows

Android Apps

  https://developers.google.com/fonts/docs/android
  https://developer.android.com/guide/topics/ui/look-and-feel/downloadable-fonts

License
-------
Please read the full license text (OFL.txt) to understand the permissions,
restrictions and requirements for usage, redistribution, and modification.

You can use them in your products & projects – print or digital,
commercial or otherwise.

This isn't legal advice, please consider consulting a lawyer and see the full
license for all details.
</file>

<file path="src/app/fonts/Monoton/OFL.txt">
Copyright (c) 2011 by vernon adams (vern@newtypography.co.uk),
with Reserved Font Names "Monoton"

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/fonts/Wallpoet/OFL.txt">
Copyright (c) 6 April 2011, Lars Berggren (lars@punktlars.se),
with Reserved Font Name Wallpoet.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</file>

<file path="src/app/notes/page.tsx">
"use client";

import { useState, useEffect } from "react";
import { getNotes, saveNote, deleteNote } from "@/app/actions/notes";
import { Plus, Search, Trash2, Edit2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { NoteEditor } from "@/components/notes/note-editor";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { SomaLoader as DNALoader } from "@/components/soma-loader";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const res = await getNotes();
    if (res.success) setNotes(res.data);
    setLoading(false);
  }

  function openNew() {
    setCurrentNote(null);
    setEditorTitle("");
    setEditorContent("");
    setIsEditorOpen(true);
  }

  function openEdit(note: any) {
    setCurrentNote(note);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setIsEditorOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveNote({
        id: currentNote?.id,
        title: editorTitle,
        content: editorContent
      });
      toast.success("Note saved");
      setIsEditorOpen(false);
      loadNotes();
    } catch (e) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    toast.success("Note deleted");
    loadNotes();
  }

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <DNALoader />;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          {/* <div>
             <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileText className="w-8 h-8 text-primary"/> Notes
             </h1>
             <p className="text-muted-foreground">Capture ideas, lists, and thoughts.</p>
          </div> */}
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                   placeholder="Search notes..." 
                   className="pl-9" 
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                />
             </div>
             <Button onClick={openNew} className="gap-2 shadow-lg">
                <Plus className="w-4 h-4"/> New Note
             </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
           {filtered.map(note => (
              <div 
                 key={note.id} 
                 onClick={() => openEdit(note)}
                 className="group relative bg-card hover:bg-muted/30 border border-border p-5 rounded-xl transition-all cursor-pointer hover:shadow-md h-[200px] flex flex-col"
              >
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg truncate pr-8">{note.title}</h3>
                    <button 
                       onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                       className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-all absolute top-4 right-4"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 
                  {/* Preview Content (Cleaned up) */}
                 <div className="flex-1 overflow-hidden relative mt-2">
                    <p className="text-sm text-muted-foreground line-clamp-5 break-words leading-relaxed">
                       {/* 👇 Fix: Replace tags with spaces, then trim. */}
                       {note.content.replace(/<[^>]+>/g, ' ').trim() || "No additional text"}
                    </p>
                    
                    {/* Optional: Adds a subtle fade-out effect at the bottom for a polished look */}
                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-card to-transparent" />
                 </div>

                 <div className="text-xs text-muted-foreground/60 mt-4 font-medium pt-3 border-t border-border/30 flex items-center gap-2">
                    <span>{formatDistanceToNow(new Date(note.updatedAt))} ago</span>
                 </div>
              </div>
           ))}
           
           {/* Empty State */}
           {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed rounded-xl">
                 No notes found. Create one!
              </div>
           )}
        </div>

      </div>

      {/* Editor Modal */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
      {/* 👇 FIXED: 
            1. w-[90vw] & h-[85vh]: Makes it a centered floating box on mobile (instead of full screen).
            2. rounded-xl: Adds curves to the mobile box.
            3. border: Adds a border back for the floating look.
            4. Desktop (md:) styles remain exactly the same. 
      */}
      <DialogContent className="w-[90vw] h-[85vh] md:max-w-4xl md:h-[90vh] rounded-xl flex flex-col p-0 gap-0 overflow-hidden bg-white text-black border shadow-xl">
            
            {/* Header Input */}
            <div className="p-4 md:p-6 pb-2 border-b border-gray-200 bg-white shrink-0">
               <Input 
               value={editorTitle}
               onChange={e => setEditorTitle(e.target.value)}
               className="text-xl md:text-3xl w-full/50 font-bold border-none shadow-none px-3 focus-visible:ring-0 h-auto bg-transparent text-black placeholder:text-gray-400"
               placeholder="Title"
            />
            </div>

            {/* Editor Area */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 bg-white">
               <NoteEditor content={editorContent} onChange={setEditorContent} />
            </div>

            {/* Footer */}
            <div className="p-3 md:p-4 pb-6 md:pb-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
               <Button variant="ghost" onClick={() => setIsEditorOpen(false)}>Close</Button>
               <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Note"}
               </Button>
            </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}
</file>

<file path="src/app/actions.ts">
// app/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markGuideAsRead(slug: string) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.userReadGuide.upsert({
    where: { 
      // This composite key name depends on how Prisma named it. 
      // It is usually `userId_guideSlug` based on your @@unique constraint.
      userId_guideSlug: { userId, guideSlug: slug } 
    },
    update: {}, // If it exists, do nothing
    create: { userId, guideSlug: slug },
  });

  // Refresh the UI instantly
  revalidatePath(`/guides/${slug}`);
  revalidatePath("/guides");
}
</file>

<file path="src/app/manifest.ts">
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soma Health",
    short_name: "Soma",
    description: "Your personal AI health and fitness companion",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
</file>

<file path="src/components/dashboard/CalorieRadialChart.tsx">
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { 
  Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, PolarAngleAxis 
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export function CalorieRadialChart({ current, goal }: { current: number; goal: number }) {
  const chartData = [{ activity: "calories", value: current, fill: "var(--color-calories)" }];
  
  const chartConfig = {
    calories: { label: "Calories", color: "hsl(24.6 95% 53.1%)" },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-card border-border/60 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">Calories In</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={450} innerRadius={80} outerRadius={110}>
            <PolarAngleAxis type="number" domain={[0, goal]} angleAxisId={0} tick={false} />
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted/20 last:fill-background" polarRadius={[86, 74]} />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {current.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          / {goal.toLocaleString()} kcal
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {current > goal ? (
            <span className="text-red-500 flex items-center gap-1">Over goal by {current - goal} <TrendingUp className="h-4 w-4" /></span>
          ) : (
            <span className="text-emerald-500 flex items-center gap-1">{goal - current} remaining</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
</file>

<file path="src/components/dashboard/EnergyRing.tsx">
"use client";

import { 
  Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, PolarAngleAxis 
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

interface EnergyRingProps {
  value: number;
  max: number;
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export function EnergyRing({ value, max, label, color, icon }: EnergyRingProps) {
  const chartData = [{ activity: "energy", value: value, fill: color }];
  const chartConfig = { energy: { label: label, color: color } } satisfies ChartConfig;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative z-10">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[140px] w-[140px]">
          <RadialBarChart 
            data={chartData} 
            startAngle={90} 
            endAngle={90 + 360} 
            innerRadius={55} 
            outerRadius={75}
          >
            {/* Background Track */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted/5 last:fill-background"
              polarRadius={[60, 50]} 
            />
            
            {/* Scale Axis */}
            <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
            
            {/* Data Bar */}
            <RadialBar 
              dataKey="value" 
              background 
              cornerRadius={20} 
              fill={color}
            />
            
            {/* Center Text */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        
                        {/* 1. Main Value */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) - 6} 
                            className="fill-foreground text-xl font-bold tracking-tighter"
                        >
                          {value.toLocaleString()}
                        </tspan>

                        {/* 2. Goal (New) */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) + 12} 
                            className="fill-muted-foreground text-[10px] font-medium"
                        >
                           / {max.toLocaleString()}
                        </tspan>

                        {/* 3. Label */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) + 26} 
                            className="fill-muted-foreground text-[9px] uppercase tracking-widest opacity-70"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>

      {/* Floating Icon */}
      {icon && (
        <div className="absolute -bottom-3 p-1.5 bg-card rounded-full shadow border border-border/50 text-muted-foreground/80">
            {icon}
        </div>
      )}
    </div>
  );
}
</file>

<file path="src/components/dashboard/HydrationCard.tsx">
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function HydrationCard({ total, onAdd }: { total: number; onAdd: () => void }) {
  const goal = 2500;
  const percentage = Math.min((total / goal) * 100, 100);

  return (
    <Card className="relative overflow-hidden border-border/60 shadow-sm group">
      
      {/* 🌊 Liquid Fill Animation Background */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-blue-500/10 z-0"
        initial={{ height: "0%" }}
        animate={{ height: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <CardContent className="p-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-600">
                <Droplets className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground tracking-tight flex items-baseline gap-1">
                    {total} <span className="text-sm font-normal text-muted-foreground">/ {goal}ml</span>
                </div>
                <p className="text-xs text-blue-600 font-medium">Daily Hydration</p>
            </div>
        </div>

        <Button 
          onClick={onAdd} 
          size="sm" 
          className="h-10 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/components/dashboard/NetBalanceCard.tsx">
"use client";
import { Card } from "@/components/ui/card";
import { Activity, BatteryCharging, BatteryWarning, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface NetBalanceProps {
  inVal: number;
  outVal: number;
  goal: number;
}

export function NetBalanceCard({ inVal, outVal, goal }: NetBalanceProps) {
  const net = inVal - outVal;
  
  // 🧠 AI VERDICT ENGINE
  let status = "Balanced";
  // Default: Blue theme
  let statusColor = "bg-blue-500/10 text-blue-600 border-blue-500/20";
  let Icon = Activity;
  let message = "You're balanced today. Maintain this for optimal recovery.";

  // Logic: 
  if (net < -600) {
    status = "Under-Fueled";
    statusColor = "bg-orange-500/10 text-orange-600 border-orange-500/20";
    Icon = BatteryWarning;
    message = "Output is high. A small carb-rich meal would stabilize energy.";
  } else if (inVal > goal + 300) {
    status = "Surplus";
    statusColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    Icon = Zap;
    message = "You've exceeded intake. Light movement can help rebalance.";
  } else if (net > -200 && net < 400) {
     // Sweet spot
     statusColor = "bg-primary/10 text-primary border-primary/20";
     Icon = BatteryCharging;
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative z-20"
    >
        {/* Removed glowColor and shadow-xl, reverted to standard shadow-sm */}
        <Card className="relative overflow-hidden p-6 flex flex-col items-center justify-center text-center gap-2 border-2 border-border shadow-sm bg-card/50 backdrop-blur-md">
        
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Net Balance</span>
        
        <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-extrabold tracking-tighter ${net > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {net > 0 ? "+" : ""}{net}
                </span>
                <span className="text-sm text-muted-foreground font-medium">kcal</span>
            </div>
            
            <span className="text-[10px] font-medium text-muted-foreground/60 mt-1 uppercase tracking-wider">
                Goal: {goal.toLocaleString()}
            </span>
        </div>

        {/* Verdict Badge */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${statusColor} shadow-sm mt-2`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </div>

        {/* The Insight */}
        <p className="text-xs text-muted-foreground mt-1 max-w-[220px] leading-relaxed font-medium">
            {message}
        </p>
        </Card>
    </motion.div>
  );
}
</file>

<file path="src/components/dashboard/QuoteBanner.tsx">
"use client";

export function QuoteBanner({ quote }: { quote: { quote: string; author: string } }) {
  return (
    <div className="relative overflow-hidden border-2 border-border/60 rounded-2xl bg-[var(--quote-bg)] px-6 py-5 flex flex-row gap-4 shadow-sm transition-all hover:shadow-md w-full items-start">
      
      {/* Decorative Quote Mark - Smaller & Elegant */}
      <span className="text-7xl leading-none font-serif text-[var(--quote-accent)] select-none pointer-events-none -mt-1 shrink-0 opacity-90">
        “
      </span>

      {/* Text Content */}
      <div className="flex flex-col gap-3 z-10 w-full pt-1">
        <p className="text-xl font-serif text-[var(--quote-text)] leading-relaxed italic">
          {quote.quote}
        </p>
        
        {quote.author && (
          <p className="text-sm font-medium text-[var(--quote-author)] self-end uppercase tracking-wider opacity-90">
            — {quote.author}
          </p>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/components/dashboard/StatCard.tsx">
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: React.ReactNode;
  icon?: React.ReactNode;
  valueColor?: string;
}

export function StatCard({ title, value, subtext, icon, valueColor = "text-foreground" }: StatCardProps) {
  return (
    <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {icon && (
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          {icon}
        </div>
      )}
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold tracking-tight ${valueColor}`}>{value}</div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {subtext}
        </div>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/components/dashboard/step-tracker.tsx">
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footprints, RefreshCw, Link2, Link2Off, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner"; 
import { getDailySteps, updateDailySteps } from "@/app/actions/steps";
// import { syncGoogleSteps } from "@/app/actions/steps"; // 👈 COMMENTED OUT
// import { useClerk } from "@clerk/nextjs"; // 👈 COMMENTED OUT

export function StepTracker() {
//   const { client, session } = useClerk(); // 👈 COMMENTED OUT
//   const { openUserProfile } = useClerk(); // 👈 COMMENTED OUT
  const [steps, setSteps] = useState(0);
  const [source, setSource] = useState<string>("MANUAL");
  const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false); // 👈 COMMENTED OUT
  
  // Local state for the input field
  const [inputValue, setInputValue] = useState("");

  // 1. Load Data on Mount
  useEffect(() => {
    async function load() {
      const data = await getDailySteps();
      setSteps(data.steps);
      setSource(data.source);
      setInputValue(data.steps.toString());
      setLoading(false);
    }
    load();
  }, []);

/* 👈 GOOGLE SYNC LOGIC COMMENTED OUT START
const handleSync = async () => {
    setSyncing(true);
    try {
        const result = await syncGoogleSteps();
        
        if (!result.success) {
            // 👇 CASE 1: They logged in before you added the feature
            if (result.error === "reauth_needed") {
                await client.signIn.create({
                  strategy: "oauth_google",
                  redirectUrl: "/dashboard", // Come back here after
                  actionCompleteRedirectUrl: "/dashboard",
                });
                return;
            }
            // 👇 CASE 2: They explicitly denied permission (The 403 Error)
            if (result.error === "google_api_error") {
                toast.error("Permission missing.", {
                    description: "Please disconnect Google and reconnect it with the 'Physical Activity' checkbox checked.",
                    duration: 8000, // Show for longer
                    action: {
                        label: "Fix Now",
                        onClick: () => openUserProfile() 
                    }
                });
                return;
            }
            throw new Error(result.error);
        }
        
        setSteps(result.steps);
        setSource("GOOGLE");
        toast.success("Synced with Google Fit!");
        
    } catch (e) {
        toast.error("Failed to sync steps.");
    } finally {
        setSyncing(false);
    }
  };
GOOGLE SYNC LOGIC COMMENTED OUT END 👉 */

  // 3. Handle Manual Save
  const handleManualSave = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val) || val < 0) return;

    setSteps(val);
    setSource("MANUAL");
    await updateDailySteps(val, "MANUAL");
    toast.success("Steps updated");
  };

  // 4. Handle Disconnect (Switch back to Manual)
  const handleDisconnect = async () => {
    // We don't delete data, just switch mode to allow editing
    setSource("MANUAL");
    setInputValue(steps.toString()); 
    await updateDailySteps(steps, "MANUAL"); // Update DB to reflect mode change
    toast.info("Switched to Manual Mode");
  };

  if (loading) return <div className="h-32 bg-secondary/20 animate-pulse rounded-xl" />;

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm space-y-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Footprints className="w-24 h-24" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
             <Footprints className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Steps</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {/* {source === "GOOGLE" ? "Automated" : "Manual Entry"} */}
                Manual Entry {/* 👈 Force Manual Label */}
            </p>
          </div>
        </div>
        
        {/* Toggle Button (Already commented out by you) */}
        {/* {source === "GOOGLE" ? (
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDisconnect}
                className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
             >
                <Link2Off className="w-3 h-3 mr-1" /> Disconnect
             </Button>
        ) : (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSync}
                disabled={syncing}
                className="h-8 text-xs gap-1"
            >
                {syncing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Link2 className="w-3 h-3" />}
                Sync Google
            </Button>
        )} */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-2">
         {/* 👇 GOOGLE MODE UI COMMENTED OUT 
         {source === "GOOGLE" ? (
             // === GOOGLE MODE (READ ONLY) ===
             <div className="flex items-end justify-between">
                 <div>
                    <span className="text-3xl font-bold tracking-tight">{steps.toLocaleString()}</span>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" /> Verified by Google Fit
                    </p>
                 </div>
                 <Button variant="secondary" size="icon" onClick={handleSync} disabled={syncing} className="h-8 w-8">
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                 </Button>
             </div>
         ) : ( 
         */}
             {/* === MANUAL MODE (EDITABLE) - ALWAYS RENDERED NOW === */}
             <div className="flex gap-2">
                 <div className="relative flex-1">
                    <Input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-2xl font-bold h-12 pr-12"
                        placeholder="0"
                    />
                    <span className="absolute right-3 top-4 text-xs text-muted-foreground pointer-events-none">
                        steps
                    </span>
                 </div>
                 <Button onClick={handleManualSave} className="h-12 w-12 shrink-0 bg-primary/30 text-primary hover:bg-primary/60">
                    <Check className="w-5 h-5" />
                 </Button>
             </div>
         {/* )} 👈 END COMMENT */}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 relative z-10">
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div 
                className="h-full bg-orange-500 transition-all duration-1000" 
                style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }} 
            />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span>Goal: 10,000</span>
        </div>
      </div>

    </div>
  );
}
</file>

<file path="src/components/deadlines/add-deadline-dialog.tsx">
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Loader2, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { createDeadline } from "@/app/actions/deadlines";
import { updateDeadline } from "@/app/actions/deadlines";

interface AddDeadlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function AddDeadlineDialog({ open, onOpenChange, onSave }: AddDeadlineDialogProps) {
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [hasDeadline, setHasDeadline] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("23:59"); // Default to end of day
  
  // Subtasks State
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleAddSubtask = () => {
    if (!currentSubtask.trim()) return;
    setSubtasks([...subtasks, currentSubtask.trim()]);
    setCurrentSubtask("");
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setLoading(true);

    try {
      let targetDateISO = null;

      if (hasDeadline && date) {
        // Combine Date and Time into ISO string
        const combined = new Date(`${date}T${time}`);
        targetDateISO = combined.toISOString();
      }

      await createDeadline({
        title,
        targetDate: targetDateISO,
        subtasks,
      });

      toast.success("Deadline Created!");
      
      // Reset Form
      setTitle("");
      setSubtasks([]);
      setCurrentSubtask("");
      setHasDeadline(true);
      
      onSave(); // Refresh parent
      onOpenChange(false); // Close modal
    } catch (e) {
      toast.error("Failed to create deadline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-primary" />
            Create New Deadline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* 1. Title Input */}
          <div className="space-y-2">
            <Label>Goal / Task Title</Label>
            <Input 
              placeholder="e.g. Submit Project Report" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium"
            />
          </div>

          {/* 2. Deadline Toggle & Picker */}
          <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                   <Label>Set Specific Deadline?</Label>
                   <p className="text-xs text-muted-foreground">Disable for open-ended goals.</p>
                </div>
                <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
             </div>

             {hasDeadline && (
                <div className="grid grid-cols-2 gap-4 pt-2 animate-in slide-in-from-top-2">
                   <div className="space-y-2">
                      <Label className="text-xs">Date</Label>
                      <Input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs">Time</Label>
                      <Input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                   </div>
                </div>
             )}
          </div>

          {/* 3. Subtasks Manager */}
          <div className="space-y-3">
             <Label>Subtasks (Optional)</Label>
             
             {/* List of added subtasks */}
             {subtasks.length > 0 && (
                 <div className="space-y-2 mb-3">
                    {subtasks.map((task, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-secondary/50 px-3 py-2 rounded-md border border-border">
                           <span>{task}</span>
                           <button onClick={() => handleRemoveSubtask(i)} className="text-muted-foreground hover:text-destructive">
                              <X className="w-4 h-4" />
                           </button>
                        </div>
                    ))}
                 </div>
             )}

             {/* Add Input */}
             <div className="flex gap-2">
                <Input 
                   placeholder="Add a step..." 
                   value={currentSubtask}
                   onChange={(e) => setCurrentSubtask(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                />
                <Button variant="secondary" onClick={handleAddSubtask} type="button">
                   <Plus className="w-4 h-4" />
                </Button>
             </div>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
            Create Deadline
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/deadlines/edit-deadline-dialog.tsx">
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateDeadline } from "@/app/actions/deadlines";
import { format } from "date-fns";
import { Loader2, Edit, Plus, X, Trash2 } from "lucide-react";

export function EditDeadlineDialog({ open, onOpenChange, data, onSave }: any) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [hasDeadline, setHasDeadline] = useState(!!data.targetDate);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // 👇 New Subtasks State
  const [subtasks, setSubtasks] = useState<{ id?: string, title: string }[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  // Pre-fill data when opening
  useEffect(() => {
    if (open && data) {
        setTitle(data.title);
        setHasDeadline(!!data.targetDate);
        
        // 1. Fill Date/Time
        if (data.targetDate) {
            const d = new Date(data.targetDate);
            setDate(format(d, "yyyy-MM-dd"));
            setTime(format(d, "HH:mm"));
        } else {
            setDate("");
            setTime("23:59");
        }

        // 2. Fill Subtasks (Deep copy to avoid mutating props)
        if (data.subtasks) {
            setSubtasks(data.subtasks.map((s: any) => ({ id: s.id, title: s.title })));
        }
    }
  }, [open, data]);

  // --- Subtask Handlers ---
  const addSubtask = () => {
      if (!newSubtaskText.trim()) return;
      setSubtasks([...subtasks, { title: newSubtaskText.trim() }]); // No ID means "New"
      setNewSubtaskText("");
  };

  const removeSubtask = (index: number) => {
      const newRef = [...subtasks];
      newRef.splice(index, 1);
      setSubtasks(newRef);
  };

  const handleSubtaskChange = (index: number, val: string) => {
      const newRef = [...subtasks];
      newRef[index].title = val;
      setSubtasks(newRef);
  };
  // ------------------------

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let targetDateISO = null;
      if (hasDeadline && date) {
        targetDateISO = new Date(`${date}T${time}`).toISOString();
      }

      await updateDeadline(data.id, { 
          title, 
          targetDate: targetDateISO,
          subtasks // 👈 Sending the updated list
      });
      
      toast.success("Deadline Updated");
      onSave();
      onOpenChange(false);
    } catch (e) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" /> Edit Deadline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Date Picker */}
          <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
             <div className="flex items-center justify-between">
                <Label>Set Deadline?</Label>
                <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
             </div>
             {hasDeadline && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label className="text-xs">Date</Label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs">Time</Label>
                      <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                   </div>
                </div>
             )}
          </div>

          {/* Subtasks Section */}
          <div className="space-y-3">
             <Label>Subtasks</Label>
             
             {/* Existing List */}
             <div className="space-y-2">
                 {subtasks.map((task, i) => (
                    <div key={i} className="flex gap-2">
                        <Input 
                            value={task.title} 
                            onChange={(e) => handleSubtaskChange(i, e.target.value)}
                            className="h-9"
                        />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                            onClick={() => removeSubtask(i)}
                        >
                            <Trash2 className="w-4 h-4"/>
                        </Button>
                    </div>
                 ))}
             </div>

             {/* Add New */}
             <div className="flex gap-2 pt-2">
                 <Input 
                    placeholder="Add new subtask..." 
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                    className="h-9"
                 />
                 <Button type="button" size="sm" onClick={addSubtask} variant="secondary">
                    <Plus className="w-4 h-4" />
                 </Button>
             </div>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/guides/mark-read-button.tsx">
// components/guides/mark-read-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { markGuideAsRead } from "@/app/actions";
import { useTransition } from "react";

export function MarkReadButton({ slug, isRead }: { slug: string, isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  if (isRead) {
    return (
      <Button variant="outline" disabled className="gap-2 border-green-500/20 text-green-600 bg-green-500/10 opacity-100">
        <CheckCircle className="w-4 h-4" /> Protocol Completed
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => startTransition(() => markGuideAsRead(slug))} 
      disabled={isPending}
      className="gap-2"
    >
      {isPending ? <Circle className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
      Mark as Read
    </Button>
  );
}
</file>

<file path="src/components/history/add-log-dialog.tsx">
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PenLine } from "lucide-react";
import { format } from "date-fns";

interface AddLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  text: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function AddLogDialog({ isOpen, onOpenChange, date, text, onTextChange, onSave, isSaving }: AddLogDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            Add Entry for {date ? format(date, "MMM do") : ""}
          </DialogTitle>
          <DialogDescription>
            Type what you ate or how you exercised. AI will calculate the stats.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea 
            placeholder="E.g. I ate a cheese sandwich and ran 2km..." 
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[100px] resize-none bg-background focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            This will be processed by AI and added to your history without overwriting existing data.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={onSave} disabled={isSaving || !text.trim()}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Save Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/history/history-log-card.tsx">
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function HistoryLogCard({ log, onDelete }: { log: any, onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className={`bg-card border-border shadow-sm transition-all group relative cursor-pointer ${expanded ? 'ring-1 ring-primary/20' : 'hover:shadow-md'}`}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="flex gap-5 relative group transition-all">
        {/* TIME COLUMN */}
        <div className="flex flex-col items-center min-w-[70px] pr-5 border-r border-border/40">
          <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md shadow-sm">
            {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={`w-[3px] mt-3 rounded-full bg-gradient-to-b from-primary/40 to-primary/10 transition-all duration-300 ${expanded ? "h-24 opacity-100" : "h-10 opacity-70"}`} />
        </div>

        {/* CONTENT COLUMN */}
        <div className="flex-1 space-y-3 pr-10">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 shadow-sm">
                +{log.totalCaloriesIn} <span className="text-muted-foreground ml-1">kcal</span>
              </span>
              {log.totalCaloriesOut > 0 && (
                <span className="text-[11px] font-mono font-semibold text-success bg-success/10 px-2 py-1 rounded border border-success/20 shadow-sm">
                  -{log.totalCaloriesOut}
                </span>
              )}
              {log.waterMl > 0 && (
                <span className="text-[11px] font-mono font-semibold text-info bg-info/10 px-2 py-1 rounded border border-info/20 shadow-sm">
                  {log.waterMl}ml
                </span>
              )}
            </div>
          </div>

          {!expanded && (
            <p className="text-sm text-foreground/80 line-clamp-1 italic">"{log.rawText}"</p>
          )}

          {expanded && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-secondary/20 p-3 rounded-lg border border-border/40 text-sm leading-relaxed shadow-sm">
                "{log.rawText}"
              </div>
              {log.aiFeedback && (
                <div className="bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 text-xs italic text-muted-foreground shadow-sm">
                  <span className="font-semibold text-primary not-italic mr-1">Coach:</span>
                  {log.aiFeedback}
                </div>
              )}
            </div>
          )}
        </div>

        {/* DELETE BUTTON */}
        <div className={`absolute top-3 right-3 transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(log.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/components/history/history-task-list.tsx">
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Clock,Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function HistoryTaskList({ tasks, onToggle, onDelete }: { tasks: any[], onToggle: (id: string, status: boolean) => void, onDelete: (id: string) => void }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
        No tasks found for this day.
      </div>
    );
  }

  const badgeColors: any = {
    HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
    MEDIUM: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    LOW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    HABIT: "bg-violet-500/10 text-violet-500 border-violet-500/20"
  };

  return (
    <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
      {tasks.map(task => (
        
        <div 
          key={task.id} 
          className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg shadow-sm hover:border-primary/30 transition-colors group relative pr-10"
        >
          <div className="mt-1">
            <Checkbox 
              checked={task.isCompleted} 
              onCheckedChange={() => onToggle(task.id, task.isCompleted)}
              className={`w-4 h-4 rounded-full transition-all ${
                task.isCompleted 
                  ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
                  : "border-orange-500/50 data-[state=unchecked]:bg-orange-500/10"
              }`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className={`text-sm font-medium truncate transition-all ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </p>
              <span className={`text-[10px] uppercase font-bold tracking-wider text-muted-foreground border px-1.5 rounded ml-2 shrink-0 ${badgeColors[task.priority] || ""}`}>
                {task.priority}
              </span>
            </div>
            {task.startTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {new Date(task.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {task.durationMins && <span className="opacity-50">({task.durationMins}m)</span>}
              </div>
            )}
          </div>
          {/* 👇 DELETE BUTTON (Visible on Hover) */}
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent toggling the task
                    onDelete(task.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
</file>

<file path="src/components/history/history-timeline.tsx">
"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";

export function HistoryTimeline({ tasks }: { tasks: any[] }) {
   // 👇 NEW: Layout Engine for Timeline (Same as Tasks Page)
    const positionedTasks = useMemo(() => {
    if (tasks.length === 0) return [];

    // 1. Sort by Start Time
    const validTasks = tasks
      .filter(t => t.startTime)
      .map(t => ({
        ...t,
        start: new Date(t.startTime).getTime(),
        end: new Date(t.startTime).getTime() + (t.durationMins || 60) * 60000,
        duration: t.durationMins || 60
      }))
      .sort((a, b) => a.start - b.start);

    // 2. Assign Columns (Greedy Packing)
    const columns: number[] = [];
    const withColIndex = validTasks.map(task => {
      let colIndex = -1;
      for (let i = 0; i < columns.length; i++) {
        if (task.start >= columns[i]) {
          colIndex = i;
          columns[i] = task.end;
          break;
        }
      }
      if (colIndex === -1) {
        colIndex = columns.length;
        columns.push(task.end);
      }
      return { ...task, colIndex };
    });

    // 3. Group into Clusters & Calculate Widths
    const finalTasks: any[] = [];
    let currentCluster: any[] = [];
    let clusterEnd = 0;

    withColIndex.forEach((task) => {
       if (currentCluster.length > 0 && task.start >= clusterEnd) {
           const maxCol = Math.max(...currentCluster.map(t => t.colIndex));
           currentCluster.forEach(t => finalTasks.push({ ...t, totalCols: maxCol + 1 }));
           currentCluster = [task];
           clusterEnd = task.end;
       } else {
           currentCluster.push(task);
           if (task.end > clusterEnd) clusterEnd = task.end;
       }
    });

    if (currentCluster.length > 0) {
        const maxCol = Math.max(...currentCluster.map(t => t.colIndex));
        currentCluster.forEach(t => finalTasks.push({ ...t, totalCols: maxCol + 1 }));
    }

    return finalTasks;
  }, [tasks]);

  return (
    <div className="relative h-[1440px] border rounded-xl bg-card/30 overflow-hidden shadow-inner">
        {/* 24 Hour Grid Lines - Quieter */}
        {Array.from({length: 24}).map((_, i) => (
            <div key={i} className="absolute left-0 w-full border-t border-border/10 h-[60px]" style={{ top: `${i * 60}px` }}>
                <span className="text-[10px] text-muted-foreground/30 pl-2 pt-1 block font-mono">
                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i-12} PM`}
                </span>
            </div>
        ))}

        {/* Task Blocks */}
        {positionedTasks.map((task: any) => {
            const d = new Date(task.startTime);
            const topPos = (d.getHours() * 60) + d.getMinutes();
            const height = task.duration;
            const widthVal = `calc((100% - 5rem) / ${task.totalCols})`;
            const leftVal = `calc(4rem + ((100% - 5rem) / ${task.totalCols} * ${task.colIndex}))`;
            const styleVariant = 
            task.priority === 'HIGH' ? 'border-l-red-500/70 bg-red-500/5' : 
            task.priority === 'MEDIUM' ? 'border-l-orange-500/70 bg-orange-500/5' :
            task.priority === 'HABIT' ? 'border-l-violet-500/70 bg-violet-500/5' :
            'border-l-blue-500/70 bg-blue-500/5'; // Low

            return (
              <div 
                  key={task.id}
                  className={`
                      absolute rounded-r-sm border-l-[3px] px-3 py-1.5 text-xs 
                      transition-all hover:brightness-95 hover:z-20 cursor-pointer
                      ${styleVariant}
                      ${task.isCompleted ? 'opacity-50 grayscale-[0.5]' : 'opacity-90'}
                  `}
                  style={{ 
                      top: `${topPos}px`, 
                      height: `${Math.max(30, height)}px`, 
                      width: widthVal,
                      left: leftVal,
                      zIndex: 10 + task.colIndex
                  }} 
              >
                  <div className="flex flex-col h-full justify-between">
                      {/* Title - Darker text for readability */}
                      <span className="font-medium text-foreground/90 truncate leading-tight">
                          {task.title}
                      </span>
                      
                      {/* Time - Only show if tall enough */}
                      {(height > 40) && (
                          <span className="text-[9px] text-muted-foreground/60 font-mono">
                              {d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </span>
                      )}
                  </div>
              </div>
          )
        })}
    </div>
  );
}
</file>

<file path="src/components/landing/FeaturesBento.tsx">
"use client";

import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, CalendarClock, Flame, History, User, Timer, StickyNote, ArrowRight } from "lucide-react";
import { Pirata_One } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

// Upgraded feature array with EXPANDED professional copywriting
const features = [
  {
    num: "01",
    title: "Command Center",
    description: "Your daily overview. Instantly view calories consumed, macros, hydration, and your pending tasks. Eliminate the friction of context-switching by aggregating your most critical biological and productivity metrics into a single, unified dashboard.",
    icon: LayoutDashboard,
    colSpan: "md:col-span-2 md:row-span-2",
    color: "text-white",
    glow: "rgba(255, 255, 255, 0.15)",
  },
  {
    num: "02",
    title: "Daily Timeline",
    description: "Design your perfect day. Schedule tasks, habits, and routines in a powerful 24-hour visual timeline. Drag and drop your focus blocks, visualize your free time, and ensure your priorities are protected.",
    icon: CalendarClock,
    colSpan: "md:col-span-1 md:row-span-2",
    color: "text-sky-400",
    glow: "rgba(56, 189, 248, 0.15)",
  },
  {
    num: "03",
    title: "Deep Analysis",
    description: "Watch your consistency compound. Track habit streaks and view your activity on a beautiful monthly heatmap. Transform abstract effort into hard visual data, creating a psychological feedback loop that forces you to keep your momentum alive.",
    icon: Flame,
    colSpan: "md:col-span-1",
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  {
    num: "04",
    title: "Deadline Manager",
    description: "Beat the clock. Keep projects on track with visual countdown timers and subtask progression. Turn vague due dates into looming, ticking realities that naturally manufacture the urgency required to execute without hesitation.",
    icon: Timer,
    colSpan: "md:col-span-1",
    color: "text-red-500",
    glow: "rgba(239, 68, 68, 0.15)",
  },
  {
    num: "05",
    title: "Rich Notes",
    description: "Your second brain. Capture thoughts, routines, and ideas with our built-in rich text editor. Whether drafting a new workout split, journaling a breakthrough, or storing assets, your context stays perfectly integrated.",
    icon: StickyNote,
    colSpan: "md:col-span-1",
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    num: "06",
    title: "Complete History",
    description: "Your personal logbook. Scroll through a timeline of everything you've eaten, lifted, and accomplished. Access your chronological database instantly to analyze past performance and optimize your future trajectory.",
    icon: History,
    colSpan: "md:col-span-2",
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.15)",
  },
  {
    num: "07",
    title: "Digital Profile",
    description: "Track all-time stats, earn consistency badges, and manage your physical metrics in one place. Cultivate your digital identity as you level up in real life, turning personal development into a gamified experience.",
    icon: User,
    colSpan: "md:col-span-1",
    color: "text-pink-500",
    glow: "rgba(236, 72, 153, 0.15)",
  }
];

// --- 1. THE SPOTLIGHT CARD COMPONENT ---
function SpotlightCard({ feature }: { feature: typeof features[0] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Add will-change to force the browser to hardware-accelerate this element
      className={`bento-feature-card group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950/50 border border-white/5 transition-colors duration-500 hover:border-white/20 will-change-transform ${feature.colSpan}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${feature.glow}, transparent 40%)`,
        }}
      />
      
      {/* Inner Noise / Glass Overlay */}
      <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2rem-1px)] bg-zinc-950/80 backdrop-blur-xl z-0 transition-all duration-500 group-hover:bg-zinc-950/60" />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col h-full p-5 md:p-8 overflow-hidden">
        
        {/* Background Watermark Number (Pirata Font) */}
        <div className={`absolute -bottom-2 -right-2 md:-bottom-4 text-[8rem] md:text-[10rem] leading-none ${pirata.className} text-white/[0.03] select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4`}>
          {feature.num}
        </div>

        {/* Background Rotating Icon */}
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 scale-125 md:scale-150 -translate-y-1/4 translate-x-1/4 group-hover:rotate-12">
          <feature.icon className={`w-32 h-32 md:w-48 md:h-48 ${feature.color}`} />
        </div>
        
        {/* Top: Glowing Icon Pill */}
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 border border-white/10 bg-white/5 shadow-lg relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${feature.color} relative z-10`} />
        </div>
        
        {/* Bottom: Text Content */}
        <div className="mt-auto relative z-10 pt-4">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide transition-colors duration-300">
              {feature.title}
            </h3>
            <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 ${feature.color} opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0`} />
          </div>
          
          <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed max-w-[95%] md:max-w-[90%] font-medium group-hover:text-zinc-300 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

      </div>
    </div>
  );
}

// --- 2. MAIN BENTO SECTION ---
export function FeaturesBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  // OPTIMIZED, SNAPPY GSAP REVEAL USING SCROLLTRIGGER.BATCH
  useEffect(() => {
    const ctx = gsap.context(() => {
      // .batch perfectly groups items that appear on the screen at the exact same time
      ScrollTrigger.batch(".bento-feature-card", {
        interval: 0.1, // time window to group items
        batchMax: 3, // maximum items to group together
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { 
              y: 50, // Shorter travel distance feels faster
              opacity: 0, 
              scale: 0.95, 
              rotationX: 15 
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 0.8, // Shorter duration
              ease: "power3.out", // Snappier ease (doesn't drag out at the end)
              stagger: 0.1, // Staggers ONLY the items inside this specific batch
              overwrite: true, // Prevents glitches if scrolled rapidly
            }
          );
        },
        start: "top 85%", // Triggers slightly earlier
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
      
      {/* Background Subtle "Operating System" Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Architecture
          </div>
          
          <h2 className={`${pirata.className} text-[3.5rem] leading-[1] md:text-7xl lg:text-8xl tracking-widest mb-4 md:mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] uppercase`}>
            7 Tools. <br className="block md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient">
              1 Interface.
            </span>
          </h2>
          
          <p className="text-base md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            Everything you need to map your life, strictly organized into powerful, interconnected modules.
          </p>
        </div>

        {/* 3D Perspective Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: "1200px" }}>
          {features.map((feature, idx) => (
            <SpotlightCard key={idx} feature={feature} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
</file>

<file path="src/components/landing/HeroSection.tsx">
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Pirata_One } from "next/font/google";
import gsap from "gsap";
import { InstallPWA } from "@/components/install-pwa";

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // FORCE PLAY THE VIDEO
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Browser blocked autoplay:", error);
      });
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text-element",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.15 }
      );

      tl.fromTo(
        ".hero-buttons",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    // min-h-[100dvh] is better for mobile browsers to account for the address bar
    <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden pt-24 pb-16 md:pt-20 md:pb-20">
      
      {/* --- LAYER 1: BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-black">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80" 
        >
          <source src="https://somafit-01.s3.ap-south-1.amazonaws.com/hero-video+(1).mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* --- LAYER 2: TEXT CONTENT --- */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center mt-4 sm:mt-10">
        
        {/* Version Badge - Scaled down slightly for mobile */}
        <div className="hero-text-element inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50 text-secondary-foreground text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
          Somafit v4 is Now Live
        </div>

        {/* --- ADDED: GLASS FROST WRAPPER --- */}
        {/* Padding and border radius optimized for mobile view */}
        <div className="hero-text-element w-full max-w-5xl mx-auto mb-8 md:mb-12 p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.4)]">
          
          {/* Main Headline - Font size scales smoothly from 2.75rem (mobile) to 8xl (desktop) */}
          <h1 className={`${pirata.className} text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl tracking-widest mb-4 md:mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]`}>
            The Ultimate Operating System <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient block mt-1 sm:mt-0">
              For Your Life.
            </span>
          </h1>

          {/* Subheadline - Scaled to text-base for mobile readability */}
          <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] font-medium">
            More than just a tracker. Manage your nutrition, map your daily timeline, track project deadlines, and log your history in one unified, beautiful workspace.
          </p>
          
        </div>
        {/* --- END GLASS WRAPPER --- */}

        {/* CTAs - Buttons size reduced slightly on mobile so they don't overpower the screen */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto px-2 sm:px-0">
          <Button asChild size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all duration-300 group w-full sm:w-auto rounded-xl">
            <Link href="/sign-up">
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base bg-background/60 backdrop-blur-md border-border/50 hover:bg-secondary/80 w-full sm:w-auto transition-all duration-300 rounded-xl gap-2 shadow-lg">
            <Link href="/guides">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" /> View Guides
            </Link>
          </Button>
          <div className="w-full sm:w-auto flex justify-center mt-1 sm:mt-0">
            <InstallPWA />
          </div>
        </div>

      </div>
    </section>
  );
}
</file>

<file path="src/components/landing/Navbar.tsx">
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Monoton } from "next/font/google";
import { ArrowRight, BookOpen } from "lucide-react";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    // {/* UPGRADED WIDTH: Replaced md:w-auto md:min-w-[600px] with md:w-[85%] md:max-w-6xl */}
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-[420px] md:w-[85%] md:max-w-5xl rounded-2xl md:rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300">
      
      {/* Inner Content Wrapper */}
      <div className="flex items-center justify-between px-3 py-2.5 md:px-6 md:py-3 w-full">
        
        {/* LEFT SIDE: Logo & Links */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className={`${monoton.className} text-xl md:text-3xl text-white pt-1 tracking-wider hover:scale-105 transition-transform drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]`}>
            SOMAFIT
          </Link>
          <Link 
            href="/guides" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Guides
          </Link>
        </div>

        {/* RIGHT SIDE: Auth Buttons */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {isSignedIn ? (
            <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-6 text-sm md:text-base">
              <Link href="/dashboard">
                Dashboard <ArrowRight className="ml-1.5 md:ml-2 w-3.5 h-3.5 md:w-4 md:h-4" />
              </Link>
            </Button>
          ) : (
            <>
              {/* Premium Blue Sign In Button */}
              <Button asChild className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-5 text-sm md:text-base font-medium border border-blue-500/50">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              
              {/* Glow Get Started Button */}
              <Button asChild className="rounded-xl bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-6 text-sm md:text-base font-semibold">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
</file>

<file path="src/components/notes/note-editor.tsx">
"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, CheckSquare, 
  Heading1, Heading2, Quote, Link as LinkIcon,
  Undo, Redo 
} from 'lucide-react';

export function NoteEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start typing...' }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false, // User needs to Ctrl+Click to open
        autolink: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] text-black marker:text-black prose-headings:text-black prose-p:text-black prose-strong:text-black',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, icon: Icon }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        active 
          ? 'bg-black text-white' 
          : 'hover:bg-gray-200 text-gray-700'
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      
      {/* Frosted Glass Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-white/70 backdrop-blur-md rounded-lg border border-gray-200/50 items-center sticky top-0 z-50 transition-all shadow-sm">
        
        {/* History Group */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} />
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Formatting Group */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={Bold} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={Italic} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon={UnderlineIcon} />
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={LinkIcon} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={Heading1} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={Heading2} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={List} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={ListOrdered} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} icon={CheckSquare} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Extras */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={Quote} />

      </div>

      <EditorContent 
        editor={editor} 
        className="min-h-[500px] text-lg text-black [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:outline-none [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:p-0 [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:gap-2 [&_li[data-type='taskItem']]:items-start [&_input[type='checkbox']]:mt-1" 
      />
    </div>
  );
}
</file>

<file path="src/components/tasks/add-task-dialog.tsx">
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit2, Sparkles, Layers, Plus } from "lucide-react";

export function AddTaskDialog({ isOpen, onOpenChange, task, setTask, subtask, setSubtask, onSave, isEditing }: any) {
  
  const addSubtask = () => {
    if (!subtask.title) return;
    setTask({ ...task, subtasks: [...task.subtasks, { ...subtask }] });
    setSubtask({ title: "", targetValue: "", unit: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-lg bg-card border-border sm:rounded-xl max-h-[85vh] flex flex-col p-0 overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="p-6 pb-3 border-b border-border/40 bg-secondary/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
              {isEditing ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
          
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Title</label>
            <Input
              className="bg-secondary/30 border-transparent focus:border-primary transition-all"
              placeholder="What needs to be done?"
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
          </div>

          {/* Priority & Time Row */}
          <div className="grid grid-rows-2 gap-4">
            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground/80">Priority</label>
              <Select
                value={task.priority === "HABIT" && !task.isRecurring ? "LOW" : task.priority}
                onValueChange={v => setTask({ ...task, priority: v })}
                disabled={task.isRecurring}
              >
                <SelectTrigger className="bg-secondary/30 border-transparent focus:border-primary">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High (Max 3)</SelectItem>
                  <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date + Time */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground/80">Time</label>
                <div className="flex gap-2">
                    <Input
                        type="date"
                        className="bg-secondary/30 border-transparent focus:border-primary flex-1"
                        value={task.date}
                        onChange={e => setTask({ ...task, date: e.target.value })}
                    />
                    <Input
                        type="time"
                        className="bg-secondary/30 border-transparent focus:border-primary w-24"
                        value={task.startTime}
                        onChange={e => setTask({ ...task, startTime: e.target.value })}
                    />
                    <div className="flex items-center gap-2 bg-secondary/30 rounded-md px-3 border border-transparent focus-within:border-primary">
                        <Input 
                            className="w-12 h-9 border-none bg-transparent p-0 text-center focus-visible:ring-0"
                            type="number" 
                            placeholder="60"
                            value={task.duration} 
                            onChange={e => setTask({...task, duration: e.target.value})} 
                        />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">min</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-start gap-3 border border-border/50 bg-secondary/10 p-4 rounded-lg">
            <Checkbox
              id="recurring"
              className="mt-1 data-[state=checked]:bg-primary"
              checked={task.isRecurring}
              onCheckedChange={(c) => setTask({ ...task, isRecurring: !!c })}
            />
            <div className="space-y-0.5">
              <label htmlFor="recurring" className="text-sm font-medium cursor-pointer">Mark as Daily Habit</label>
              <p className="text-xs text-muted-foreground">Repeats every day automatically.</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Description</label>
            <Textarea
              className="bg-secondary/30 border-transparent focus:border-primary resize-none min-h-[80px]"
              placeholder="Add details..."
              value={task.description}
              onChange={e => setTask({ ...task, description: e.target.value })}
            />
          </div>

          {/* Subtasks Section */}
          <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 space-y-4">
            <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
              <Layers className="w-4 h-4 text-primary" /> Subtasks
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Name (e.g. Pushups)"
                className="h-9 text-sm bg-background border-transparent"
                value={subtask.title}
                onChange={e => setSubtask({ ...subtask, title: e.target.value })}
              />
              <Input
                placeholder="Target"
                type="number"
                className="h-9 w-20 text-sm bg-background border-transparent"
                value={subtask.targetValue}
                onChange={e => setSubtask({ ...subtask, targetValue: e.target.value })}
              />
              <Button size="sm" className="h-9" onClick={addSubtask}>Add</Button>
            </div>
            
            {task.subtasks.length > 0 && (
              <div className="space-y-2 mt-1">
                {task.subtasks.map((st: any, i: number) => (
                  <div key={i} className="text-xs flex justify-between items-center bg-background p-2 px-3 rounded-md border shadow-sm">
                    <span className="font-medium truncate max-w-[70%]">{st.title}</span>
                    {st.targetValue && (
                      <Badge variant="secondary" className="text-[10px] h-5">Target: {st.targetValue}</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 border-t border-border/40 bg-background">
            <Button className="w-full text-base font-semibold py-6 shadow-lg shadow-primary/20" onClick={onSave}>
                {isEditing ? "Save Changes" : "Create Task"}
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/tasks/task-card.tsx">
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";

export function TaskCard({ task, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
    const [expanded, setExpanded] = useState(false);

    // Dynamic Border Color
    const getPriorityColor = (p: string) => {
        if (p === 'HIGH') return 'border-l-destructive/60 hover:border-l-destructive';
        if (p === 'MEDIUM') return 'border-l-orange-500/60 hover:border-l-orange-500';
        if (p === 'HABIT') return 'border-l-violet-500/60 hover:border-l-violet-500';
        return 'border-l-primary/30 hover:border-l-primary';
    };

    // Semantic Badge Styles
    const getBadgeStyle = (p: string) => {
        if (p === 'HIGH') return 'bg-destructive/15 text-destructive border-destructive/20';
        if (p === 'MEDIUM') return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
        if (p === 'HABIT') return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20';
        return 'bg-secondary text-secondary-foreground border-border';
    };

    return (
        <Card className={`group relative overflow-hidden transition-all duration-300 border-l-[3px] shadow-sm hover:shadow-md ${task.isCompleted ? 'opacity-60 bg-muted/40' : 'bg-card'} ${getPriorityColor(task.priority)}`}>
            {/* 👇 CHANGED: Reduced padding from p-4 to p-3 */}
            <CardContent className="p-3">
                <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="pt-0.5">
                        <Checkbox 
                            checked={task.isCompleted} 
                            onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                            className="w-4 h-4 transition-transform active:scale-95 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5"> {/* 👇 Tighter vertical spacing */}
                                <h3 className={`font-semibold text-sm leading-tight transition-all ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                    {task.title}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {task.startTime && (
                                        <div className="flex items-center text-[10px] font-medium text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded-md">
                                            <Clock className="w-2.5 h-2.5 mr-1 opacity-70" />
                                            {format(new Date(task.startTime), "h:mm a")}
                                        </div>
                                    )}
                                    {/* 👇 Smaller Badge Padding */}
                                    <span className={`text-[9px] px-1.5 py-0 rounded border font-semibold tracking-wide uppercase ${getBadgeStyle(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Hover Actions - More compact buttons */}
                            <div className={`flex items-center gap-0.5 transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" onClick={() => onEdit(task)}>
                                    <Edit2 className="w-3 h-3"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => onDelete(task.id)}>
                                    <Trash2 className="w-3 h-3"/>
                                </Button>
                                {(task.description || task.subtasks.length > 0) && (
                                    <Button variant="ghost" size="icon" className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-180 bg-secondary' : ''}`} onClick={() => setExpanded(!expanded)}>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Expandable Content */}
                        {expanded && (
                            <div className="pt-2 mt-2 border-t border-border/40 animate-in slide-in-from-top-1">
                                {task.description && (
                                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed bg-secondary/20 p-2 rounded-md">
                                        {task.description}
                                    </p>
                                )}
                                
                                {task.subtasks.length > 0 && (
                                    <div className="space-y-2 pl-2 border-l-2 border-border/60">
                                        {task.subtasks.map((st: any) => (
                                            <div key={st.id} className="flex items-center gap-2 text-xs group/sub">
                                                <Checkbox 
                                                    className="w-3.5 h-3.5"
                                                    checked={st.isCompleted}
                                                    onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                                />
                                                <span className={`transition-all ${st.isCompleted ? "line-through opacity-50 text-muted-foreground" : "text-foreground"}`}>
                                                    {st.title}
                                                </span>
                                                
                                                {st.targetValue ? (
                                                    <div className="ml-auto flex items-center gap-1 bg-background border rounded px-1.5 py-0 shadow-sm" onClick={e => e.stopPropagation()}>
                                                        <input 
                                                            type="number"
                                                            // 👇 UPDATED: Increased width (w-12), height (h-6), and text size (text-xs)
                                                            className="w-12 h-6 text-xs text-center bg-transparent border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono transition-all"
                                                            value={st.currentValue || 0}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val)) onSubProgress(task.id, st.id, val);
                                                            }}
                                                            onClick={e => e.stopPropagation()} // Prevent card collapse when clicking input
                                                        />
                                                        <span className="text-xs text-muted-foreground border-l pl-1 font-medium">
                                                            / {st.targetValue} {st.unit}
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
</file>

<file path="src/components/tasks/task-list.tsx">
"use client";

import { Check } from "lucide-react";
import { TaskCard } from "@/components/tasks/task-card"; // Assuming you have this from earlier

export function TaskList({ loading, tasks, activeTab, onDragStart, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-3 custom-scrollbar">
      {loading ? (
        <div className="text-center py-10 text-muted-foreground animate-pulse">Loading tasks...</div>
      ) : (
        <>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm flex flex-col items-center gap-2">
              <div className="p-3 bg-secondary/20 rounded-full"><Check className="w-6 h-6 opacity-30" /></div>
              No {activeTab} for today.
            </div>
          )}
          {tasks.map((task: any) => (
            <div 
              key={task.id} 
              draggable 
              onDragStart={() => onDragStart(task.id)}
              className="cursor-move"
            >
              <TaskCard 
                task={task} 
                onToggle={onToggle} 
                onSubToggle={onSubToggle} 
                onSubProgress={onSubProgress} 
                onDelete={onDelete} 
                onEdit={onEdit} 
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
</file>

<file path="src/components/ui/badge.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
</file>

<file path="src/components/ui/button.tsx">
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/20 focus-visible:ring-destructive/30 dark:bg-destructive/70",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/30 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
</file>

<file path="src/components/ui/card.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border/70 py-6 shadow-sm transition-shadow duration-300",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
</file>

<file path="src/components/ui/chart.tsx">
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
</file>

<file path="src/components/ui/checkbox.tsx">
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
</file>

<file path="src/components/ui/dialog.tsx">
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
</file>

<file path="src/components/ui/dropdown-menu.tsx">
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
</file>

<file path="src/components/ui/input.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
</file>

<file path="src/components/ui/label.tsx">
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
</file>

<file path="src/components/ui/popover.tsx">
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
</file>

<file path="src/components/ui/select.tsx">
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
</file>

<file path="src/components/ui/separator.tsx">
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
</file>

<file path="src/components/ui/skeleton.tsx">
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
</file>

<file path="src/components/ui/sonner.tsx">
"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
</file>

<file path="src/components/ui/switch.tsx">
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
</file>

<file path="src/components/ui/tabs.tsx">
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
</file>

<file path="src/components/ui/textarea.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
</file>

<file path="src/components/complete-profile-modal.tsx">
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserCog } from "lucide-react";

export function CompleteProfileModal({ userId, missingFields }: { userId: string, missingFields: string[] }) {
  const [open, setOpen] = useState(true); // Always open if rendered
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "MALE", // Default
    activityLevel: "MODERATE",
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: JSON.stringify({ userId, ...formData }),
      });

      if (res.ok) {
        setOpen(false); // Close modal
        router.refresh(); // Refresh page to update context
      }
    } catch (e) {
      console.error("Failed to update", e);
    } finally {
      setLoading(false);
    }
  }

  // Prevent closing by clicking outside (Force completion)
  return (
    <Dialog open={open} onOpenChange={() => {}}> 
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" /> Setup Your Profile
          </DialogTitle>
          <DialogDescription>
            Soma needs your body metrics to calculate accurate calorie goals.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          
          {/* Only show inputs if field was missing (or show all for simplicity) */}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input 
                type="number" 
                placeholder="175" 
                onChange={(e) => setFormData({...formData, height: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input 
                type="number" 
                placeholder="70" 
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Age</Label>
              <Input 
                type="number" 
                placeholder="25" 
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select onValueChange={(val) => setFormData({...formData, gender: val})}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="FEMALE">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/EnableNotifications.tsx">
"use client";

import { useState, useEffect } from 'react';
import { Bell, BellRing, BellOff, Loader2 } from 'lucide-react'; // 👈 Added BellOff
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function EnableNotifications() {
    const [isSupported, setIsSupported] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            navigator.serviceWorker.register('/sw.js').then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub) setIsSubscribed(true);
                });
            });
        }
    }, []);

    async function handleSubscribe() {
        setIsLoading(true);
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                toast.error("Notification permission denied. Please enable in site settings.");
                setIsLoading(false);
                return;
            }

            const registration = await navigator.serviceWorker.ready;
            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!vapidPublicKey) throw new Error("Missing VAPID key");
            
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });

            // 👇 Make sure this path matches exactly where your route.ts is located
            const res = await fetch('/api/cron/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
            });

            if (res.ok) {
                setIsSubscribed(true);
                toast.success("Reminders enabled successfully! 🎉");
            } else {
                toast.error("Failed to connect device to server.");
            }
        } catch (error) {
            console.error("Subscription process failed:", error);
            toast.error("An error occurred while setting up notifications.");
        } finally {
            setIsLoading(false);
        }
    }

    // 👇 NEW: Function to handle turning off notifications
    async function handleUnsubscribe() {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // 1. Tell the browser to stop listening for pushes
                await subscription.unsubscribe();

                // 2. Tell the database to delete this device
                // 👇 Make sure this path matches exactly where your route.ts is located
                await fetch('/api/cron/notifications/subscribe', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: subscription.endpoint })
                });
            }

            setIsSubscribed(false);
            toast.success("Reminders disabled.");
        } catch (error) {
            console.error("Unsubscribe failed:", error);
            toast.error("Failed to disable notifications.");
        } finally {
            setIsLoading(false);
        }
    }

    if (!isSupported) {
        return (
            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50 text-sm text-muted-foreground flex items-center gap-3">
                <Bell className="w-5 h-5 opacity-50" />
                <p>Push notifications are not supported or are blocked in this browser.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card border border-border/60 rounded-2xl shadow-sm">
            <div className="space-y-1">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" /> Task Reminders
                </h4>
                <p className="text-sm text-muted-foreground">
                    Get pinged 5 mins before a task starts, and every 6 hours for un-timed habits.
                </p>
            </div>
            
            {/* 👇 UPDATED: Button now toggles between subscribe and unsubscribe */}
            <Button 
                onClick={isSubscribed ? handleUnsubscribe : handleSubscribe} 
                disabled={isLoading}
                variant={isSubscribed ? "outline" : "default"}
                className={`gap-2 shrink-0 transition-all ${isSubscribed ? 'text-destructive hover:bg-destructive/10 border-destructive/20 hover:text-destructive' : 'shadow-md'}`}
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 isSubscribed ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                
                {isSubscribed ? "Turn off Reminders" : "Turn on Reminders"}
            </Button>
        </div>
    );
}
</file>

<file path="src/components/feedback-prompt.tsx">
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { shouldRequestFeedback } from "@/app/actions/feedback"; // Import the action
import Link from "next/link";

export function FeedbackPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEligibility = async () => {
      // 1. Check LocalStorage (The "Snooze" Check)
      const snoozeUntil = localStorage.getItem("feedback_snooze_until");
      
      if (snoozeUntil) {
        const snoozeDate = new Date(parseInt(snoozeUntil));
        // If current date is BEFORE the snooze date, do nothing.
        if (new Date() < snoozeDate) return;
      }

      // 2. Check Server (The "Database" Check)
      // We add a small delay (e.g., 5 seconds) so it doesn't pop immediately on load
      setTimeout(async () => {
          const shouldShow = await shouldRequestFeedback();
          if (shouldShow) setIsOpen(true);
      }, 4000);
    };

    checkEligibility();
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    
    // 3. Set Snooze for 7 Days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    localStorage.setItem("feedback_snooze_until", sevenDaysFromNow.getTime().toString());
  };

  const handleAccept = () => {
    setIsOpen(false);
    // Optional: Set a smaller snooze (e.g., 1 hour) just in case they don't complete it
    // But usually, the server check will handle it once they submit.
    router.push("/feedback");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle>Enjoying Soma?</DialogTitle>
            <DialogDescription className="text-center pt-1">
                We noticed you've been using the app for a while. 
                We would love to hear your thoughts to help us improve.
            </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
            <Button onClick={handleAccept} className="w-full">
                Give Feedback
            </Button>
            <Button onClick={handleDismiss} variant="ghost" className="w-full text-muted-foreground">
                Maybe later
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="src/components/install-pwa.tsx">
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }

    // 2. Listen for the 'beforeinstallprompt' event (Android/Desktop Chrome)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event for later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Android/Desktop Install Click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // If already installed, don't show anything
  if (isStandalone) return null;

  return (
    <>
      {/* --- ANDROID / DESKTOP BUTTON --- */}
      {deferredPrompt && (
        <Button 
          onClick={handleInstallClick}
          variant="outline" 
          size="lg" 
          className="h-12 px-8 text-base border-input bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm gap-2 animate-in fade-in zoom-in duration-300"
        >
          <Download className="w-4 h-4 text-primary" /> Install App
        </Button>
      )}

      {/* --- iOS BUTTON (Triggers Tooltip) --- */}
      {isIOS && !deferredPrompt && (
        <div className="relative">
            <Button 
            onClick={() => setShowIOSHint(true)}
            variant="outline" 
            size="lg" 
            className="h-12 px-8 text-base border-input bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm gap-2"
            >
            <Download className="w-4 h-4 text-primary" /> Install App
            </Button>

            {/* iOS TOOLTIP OVERLAY */}
            <AnimatePresence>
                {showIOSHint && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-x-4 bottom-8 z-50 bg-card border border-border p-4 rounded-xl shadow-2xl md:absolute md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-4 md:w-64"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-semibold">Install for iOS</p>
                            <button onClick={() => setShowIOSHint(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            Apple doesn't support direct install buttons yet.
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                1. Tap the <Share className="w-4 h-4 text-blue-500" /> <strong>Share</strong> button.
                            </div>
                            <div className="flex items-center gap-2">
                                2. Scroll down and tap <span className="font-bold border border-border bg-secondary/50 px-1 rounded">Add to Home Screen</span>.
                            </div>
                        </div>
                        {/* Triangle pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-card md:block hidden"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      )}
    </>
  );
}
</file>

<file path="src/components/theme-provider.tsx">
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// 👇 Fix: Use React.ComponentProps to automatically get the correct types
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
</file>

<file path="src/hooks/use-countdown.ts">
import { useState, useEffect } from "react";
import { differenceInSeconds, intervalToDuration, formatDuration } from "date-fns";

export function useCountdown(targetDate: Date | null | string) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const now = new Date();
      const end = new Date(targetDate);
      const diff = differenceInSeconds(end, now);

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("00:00:00");
        return;
      }

      const duration = intervalToDuration({ start: now, end: end });

      // 👇 FIX: Added Years and Months to the display logic
      const formatted = [
        duration.years ? `${duration.years}y` : "",
        duration.months ? `${duration.months}mo` : "",
        duration.days ? `${duration.days}d` : "",
        duration.hours ? `${duration.hours}h` : "",
        duration.minutes ? `${duration.minutes}m` : "",
        `${duration.seconds || 0}s`
      ].filter(Boolean).join(" "); // Joins them with spaces

      setTimeLeft(formatted);
    };

    tick(); // Run immediately
    const timer = setInterval(tick, 1000); // Update every second

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isExpired };
}
</file>

<file path="src/lib/check-profile.ts">
import { prisma } from "@/lib/prisma";

export async function checkProfileCompleteness(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      height: true,
      weight: true,
      age: true,
      gender: true,
      activityLevel: true,
    },
  });

  if (!user) return { isComplete: false, missing: ["User Not Found"] };

  const missingFields = [];
  if (!user.height) missingFields.push("height");
  if (!user.weight) missingFields.push("weight");
  if (!user.age) missingFields.push("age");
  if (!user.gender) missingFields.push("gender");
  // Activity level usually has a default, but good to check
  if (!user.activityLevel) missingFields.push("activity level");

  return {
    isComplete: missingFields.length === 0,
    missing: missingFields,
  };
}
</file>

<file path="src/lib/crypto.ts">
// src/lib/crypto.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
// You must add this to your .env file later!
// It must be exactly 32 chars long
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''; 

export function encryptKey(text: string) {
  if (!ENCRYPTION_KEY) throw new Error("Server Encryption Key missing");
  
  // Create a random initialization vector
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { 
    encryptedData: encrypted.toString('hex'), 
    iv: iv.toString('hex') 
  };
}

export function decryptKey(encryptedData: string, ivString: string) {
  if (!ENCRYPTION_KEY) throw new Error("Server Encryption Key missing");

  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}
</file>

<file path="src/lib/gsap.ts">
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugin is registered on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
</file>

<file path="src/lib/streak-utils.ts">
// lib/streak-utils.ts
import { differenceInDays, isToday, isYesterday, startOfDay } from "date-fns";

export function calculateHabitStats(completedDates: Date[]) {
    if (completedDates.length === 0) {
    // 👇 Explicitly return an empty array so the UI never gets 'undefined'
    return { currentStreak: 0, longestStreak: 0, totalCompletions: 0, completedDates: [] };
    }

  // 1. Sort dates from newest to oldest & normalize to midnight
  const sortedDates = completedDates
    .map(d => startOfDay(new Date(d)))
    .sort((a, b) => b.getTime() - a.getTime());

  // Remove duplicates just in case
  const uniqueDates = Array.from(new Set(sortedDates.map(d => d.getTime())))
    .map(time => new Date(time));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // 2. Calculate Longest Streak
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const diff = differenceInDays(uniqueDates[i], uniqueDates[i + 1]);
    if (diff === 1) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 1;
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak;
  if (uniqueDates.length === 1) longestStreak = 1;

  // 3. Calculate Current Streak
  // A streak is "alive" if they completed it today OR yesterday.
  const newestDate = uniqueDates[0];
  if (isToday(newestDate) || isYesterday(newestDate)) {
    currentStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = differenceInDays(uniqueDates[i], uniqueDates[i + 1]);
      if (diff === 1) {
        currentStreak++;
      } else {
        break; // Streak broken
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalCompletions: uniqueDates.length,
    completedDates: uniqueDates // Pass this down for the calendar UI
  };
}
</file>

<file path="src/lib/utils.ts">
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
</file>

<file path="worker/index.js">
// worker/index.js

self.addEventListener('push', function(event) {
    if (event.data) {
      const data = event.data.json();
      
      const options = {
        body: data.body,
        icon: '/icon.png', 
        badge: '/badge.png', 
        vibrate: [200, 100, 200], // 👈 Made vibration slightly stronger
        requireInteraction: true, // 👈 NEW: Forces the banner to stay on screen
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2'
        }
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title, options)
      );
    }
});
  
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/') 
    );
});
</file>

<file path=".npmrc">
legacy-peer-deps=true
</file>

<file path="components.json">
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

<file path="src/app/api/cron/notifications/route.ts">
// src/app/api/cron/notifications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidCron } from "@/lib/auth";
import { localHour } from "@/lib/tz";
import webpush from "web-push";

export const dynamic = "force-dynamic";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_CONTACT_EMAIL || "support@somafit.in"}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

function inQuietHours(hour: number, start?: number | null, end?: number | null): boolean {
  if (start == null || end == null) return false;
  return start <= end ? hour >= start && hour < end : hour >= start || hour < end; // overnight windows
}

export async function GET(req: Request) {
  if (!isValidCron(req)) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const tasks = await prisma.task.findMany({
      where: { isCompleted: false, date: { gte: start, lte: end } },
      include: { user: { include: { pushSubscriptions: true } } },
    });

    const toNotify: Array<{
      id: string;
      title: string;
      timed: boolean;
      subs: { id: string; endpoint: string; p256dh: string; auth: string }[];
    }> = [];

    for (const task of tasks) {
      const u = task.user;
      if (!u.notifyEnabled || u.pushSubscriptions.length === 0) continue;
      if (inQuietHours(localHour(u.timezone ?? "UTC", now), u.quietHoursStart, u.quietHoursEnd)) continue;

      if (task.startTime) {
        const taskMin = task.startTime.getUTCHours() * 60 + task.startTime.getUTCMinutes();
        const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();
        let diff = taskMin - nowMin;
        if (diff < -720) diff += 1440;
        // Wider, cron-frequency-tolerant window (0–15 min out), de-duped via lastNotifiedAt.
        const recentlyNotified =
          task.lastNotifiedAt && now.getTime() - task.lastNotifiedAt.getTime() < 20 * 60_000;
        if (diff >= 0 && diff <= 15 && !recentlyNotified)
          toNotify.push({ id: task.id, title: task.title, timed: true, subs: u.pushSubscriptions });
      } else {
        const sixHoursAgo = new Date(now.getTime() - 6 * 3600_000);
        if (!task.lastNotifiedAt || task.lastNotifiedAt <= sixHoursAgo)
          toNotify.push({ id: task.id, title: task.title, timed: false, subs: u.pushSubscriptions });
      }
    }

    const notifiedIds: string[] = [];
    for (const t of toNotify) {
      const payload = JSON.stringify({
        title: t.timed ? "Upcoming Task" : "Friendly Reminder",
        body: t.timed ? `"${t.title}" is coming up soon.` : `Don't forget: "${t.title}".`,
      });
      for (const sub of t.subs) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            payload
          );
        } catch (e) {
          const code = (e as { statusCode?: number }).statusCode;
          if (code === 404 || code === 410)
            await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => {});
        }
      }
      notifiedIds.push(t.id);
    }

    if (notifiedIds.length)
      await prisma.task.updateMany({ where: { id: { in: notifiedIds } }, data: { lastNotifiedAt: now } });
    return NextResponse.json({ success: true, notifiedCount: notifiedIds.length });
  } catch (error) {
    console.error("Notifications cron error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/export/route.ts">
// src/app/api/export/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

/** Escapes a value for CSV and neutralizes formula-injection (=, +, -, @, tab, CR). */
function csv(value: unknown): string {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const [logs, tasks] = await Promise.all([
      prisma.dailyLog.findMany({ where: { userId }, orderBy: { date: "desc" } }),
      prisma.task.findMany({ where: { userId }, include: { subtasks: true }, orderBy: { date: "desc" } }),
    ]);

    if (logs.length === 0 && tasks.length === 0) {
      return NextResponse.json({ success: false, error: "No data found to export" }, { status: 404 });
    }

    const logHeaders = ["Date", "Type", "Raw Input", "Calories In", "Calories Out", "Water (ml)", "AI Feedback"];
    const logRows = logs.map((l) =>
      [
        csv(format(new Date(l.date), "yyyy-MM-dd")),
        csv(l.type),
        csv(l.rawText),
        csv(l.totalCaloriesIn),
        csv(l.totalCaloriesOut),
        csv(l.waterMl),
        csv(l.aiFeedback),
      ].join(",")
    );

    const taskHeaders = ["Date", "Time", "Duration (mins)", "Title", "Description", "Priority", "Status", "Type", "Subtasks"];
    const taskRows = tasks.map((t) =>
      [
        csv(format(new Date(t.date), "yyyy-MM-dd")),
        csv(t.startTime ? format(new Date(t.startTime), "h:mm a") : "N/A"),
        csv(t.durationMins ?? 60),
        csv(t.title),
        csv(t.description),
        csv(t.priority),
        csv(t.isCompleted ? "Completed" : "Pending"),
        csv(t.isRecurring ? "Recurring Habit" : "One-time Task"),
        csv(t.subtasks.map((s) => `${s.title} (${s.isCompleted ? "Done" : "Pending"})`).join(" | ")),
      ].join(",")
    );

    const finalCsv = [
      "--- SECTION 1: DAILY HEALTH JOURNAL ---",
      logHeaders.map(csv).join(","),
      ...logRows,
      "",
      "",
      "--- SECTION 2: TASKS & HABITS ---",
      taskHeaders.map(csv).join(","),
      ...taskRows,
    ].join("\n");

    return new NextResponse(finalCsv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="soma_export_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/get-logs/route.ts">
// src/app/api/get-logs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    const logs = await prisma.dailyLog.findMany({
      where: {
        userId,
        ...(from && to ? { date: { gte: new Date(from), lte: new Date(to) } } : {}),
      },
      orderBy: { date: "desc" },
      ...(from && to ? {} : { take: 14 }),
    });
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Fetch Logs Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
</file>

<file path="src/app/api/quote/route.ts">
import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const apiKey = process.env.NINJA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom", {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    
    // FIX: Check if data exists and has items
    if (!data || data.length === 0) {
      throw new Error("No quotes found");
    }

    return NextResponse.json(data[0]);
    
  } catch (error) {
    console.error("Quote fetch error:", error); // Helpful for debugging logs
    return NextResponse.json({ 
      quote: "The only bad workout is the one that didn't happen.", 
      author: "Unknown" 
    }, { status: 200 });
  }
}
</file>

<file path="src/app/api/settings/route.ts">
// src/app/api/settings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { encryptKey } from "@/lib/crypto";

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  try {
    const { nationality, height, weight, apiKey, unitPreference } = await req.json();

    const data: Record<string, unknown> = {
      nationality: nationality ?? null,
      unitPreference: unitPreference || "metric",
    };
    if (height !== undefined && height !== "") data.height = parseFloat(height);
    if (weight !== undefined && weight !== "") data.weight = parseFloat(weight);

    if (apiKey && String(apiKey).trim() !== "") {
      const { encryptedData, iv } = encryptKey(String(apiKey).trim());
      data.encryptedApiKey = encryptedData;
      data.apiKeyIv = iv;
    }

    const updated = await prisma.user.update({ where: { id: userId }, data });
    // Never echo the key back.
    return NextResponse.json({
      success: true,
      user: { ...updated, encryptedApiKey: undefined, apiKeyIv: undefined },
    });
  } catch (error) {
    console.error("Settings Save Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}

export async function GET() {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      nationality: true,
      height: true,
      weight: true,
      encryptedApiKey: true,
      unitPreference: true,
      timezone: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      nationality: user?.nationality ?? "",
      height: user?.height ?? "",
      weight: user?.weight ?? "",
      unitPreference: user?.unitPreference ?? "metric",
      timezone: user?.timezone ?? "UTC",
      hasKey: !!user?.encryptedApiKey,
    },
  });
}
</file>

<file path="src/app/deadlines/page.tsx">
"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle, LayoutGrid, List } from "lucide-react"; // 👈 Added layout icons
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDeadlineDialog } from "@/components/deadlines/add-deadline-dialog";
import { DeadlineCard } from "@/components/deadlines/deadline-card";
import { getDeadlines } from "@/app/actions/deadlines";
import { SomaLoader as DNALoader } from "@/components/soma-loader";

export default function DeadlinesPage() {
  const [activeTab, setActiveTab] = useState("running");
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // 👇 1. New State for Layout Preference
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false); // Prevents hydration mismatch

  useEffect(() => {
    // 👇 2. Load the saved preference from LocalStorage on mount
    const savedView = localStorage.getItem("deadlineViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
    loadData();
  }, []);

  async function loadData() {
    const res = await getDeadlines();
    if (res.success) setDeadlines(res.data);
    setLoading(false);
  }

  // 👇 3. Handle saving the preference when the user clicks the toggle
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("deadlineViewMode", mode);
  };

  const now = new Date();
  
  const running = deadlines.filter(d => {
    if (d.isCompleted) return false;
    if (!d.targetDate) return true; 
    return new Date(d.targetDate) > now;
  });

  const history = deadlines.filter(d => {
    if (d.isCompleted) return true;
    if (d.targetDate && new Date(d.targetDate) <= now) return true;
    return false;
  });

  // 👇 4. Dynamic CSS classes based on selected view
  const layoutClasses = viewMode === "list"
    ? "flex flex-col gap-4 w-full animate-in fade-in" // Removed max-w-3xl mx-auto
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full animate-in fade-in";

  // Don't render layout until client side is ready to prevent hydration flashes
  if (!isMounted) return null; 

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      {loading && <DNALoader />}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Deadlines
            </h1>
            <p className="text-muted-foreground mt-1">Track your projects against the clock.</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2 shadow-lg">
             <Plus className="w-4 h-4" /> New Deadline
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
           
           {/* 👇 Tabs & View Toggle Wrapper */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="running" className="gap-2">
                   <Clock className="w-4 h-4"/> Active ({running.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                   <CheckCircle className="w-4 h-4"/> Past / Done ({history.length})
                </TabsTrigger>
             </TabsList>

             {/* 👇 The Toggle Switch */}
             <div className="hidden md:flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
               <Button
                 variant={viewMode === "list" ? "secondary" : "ghost"}
                 size="sm"
                 className={`h-8 px-3 gap-2 ${viewMode === "list" ? 'shadow-sm' : 'text-muted-foreground'}`}
                 onClick={() => handleViewChange("list")}
               >
                 <List className="w-4 h-4" /> List
               </Button>
               <Button
                 variant={viewMode === "grid" ? "secondary" : "ghost"}
                 size="sm"
                 className={`h-8 px-3 gap-2 ${viewMode === "grid" ? 'shadow-sm' : 'text-muted-foreground'}`}
                 onClick={() => handleViewChange("grid")}
               >
                 <LayoutGrid className="w-4 h-4" /> Grid
               </Button>
             </div>
           </div>

           <TabsContent value="running" className={layoutClasses}>
              {running.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-muted-foreground bg-card border border-dashed rounded-xl shadow-sm">
                    No active deadlines. Start something new!
                 </div>
              ) : (
                 running.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} />
                 ))
              )}
           </TabsContent>

           <TabsContent value="history" className={layoutClasses}>
               {history.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-muted-foreground bg-card border border-dashed rounded-xl shadow-sm">
                    No completed deadlines yet.
                 </div>
               ) : (
                 history.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} isHistory />
                 ))
               )}
           </TabsContent>
        </Tabs>

      </div>

      <AddDeadlineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={loadData} />
    </div>
  );
}
</file>

<file path="src/app/guides/the-soma-protocol/page.tsx">
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, 
  Brain, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  Flame, 
  Smartphone, 
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SomaProtocolPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            
            {/* 1. BACK BUTTON (Floating) */}
            {/* <div className="fixed top-6 left-6 z-50">
                <Button asChild variant="ghost" size="sm" className="backdrop-blur-md bg-background/30 hover:bg-background/60 border border-border/50">
                    <Link href="/guides"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Guides</Link>
                </Button>
            </div> */}

            {/* 2. HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">
                {/* Background Gradient Mesh */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-[100%] blur-[100px] -z-10" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/5 rounded-[100%] blur-[120px] -z-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Official Guide
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        The Soma <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Protocol</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A blueprint for high-performance living. Optimize your biology, automate your decisions, and engineer your perfect day.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 text-sm text-muted-foreground"
                >
                    <span className="text-xs uppercase tracking-widest">Begin Protocol</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                </motion.div>
            </section>

            {/* 3. PHASE 0: ENVIRONMENT */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader 
                        phase="Phase 0" 
                        title="The Environment" 
                        desc="You don't rise to the level of your goals — you fall to the level of your systems. Soma removes friction so your habits execute automatically."
                    />

                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        <FeatureCard
                            icon={<Smartphone className="w-6 h-6 text-primary" />}
                            title="1. Install as a PWA"
                            desc="Remove the browser UI. Add Soma to your Home Screen to create a dedicated psychological trigger for logging."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-primary" />}
                            title="2. Zero-Click Mindset"
                            desc="We designed the Dashboard for speed. Treat it as your command center. Bypass menus, just log."
                        />
                    </div>
                </div>
            </section>

            {/* 4. PHASE 1: ARCHITECTURE */}
            <SplitSection
                phase="Phase 1"
                title="The Architecture of Tomorrow"
                desc="Decision fatigue is the enemy. By planning the night before, you wake up with a pre-loaded brain, ready to execute without hesitation."
                bullets={[
                    "Anchor Biology: Schedule Sleep, Gym, and Meals as 'Habits' first.",
                    "Deep Work Containers: Drag a 90-minute HIGH priority block to your peak energy time (9 AM).",
                    "Shallow Buffer: Batch emails and chores into low-energy windows (4 PM)."
                ]}
                icon={<CalendarCheck className="w-8 h-8 text-primary" />}
            />

            {/* 5. PHASE 2: MORNING */}
            <SplitSection
                phase="Phase 2"
                title="The Morning Launchpad"
                desc="How you start the first 30 minutes determines your dopamine trajectory. Prime your mind, hydrate your system, and fuel with intention."
                bullets={[
                    "Mindset Primer: Read the Daily Quote to trigger your Reticular Activating System.",
                    "Hydration Kickstart: Tap 'Add 250ml' before coffee to fix overnight dehydration.",
                    "Glucose Baseline: Log a savory, high-protein breakfast to prevent an 11 AM crash."
                ]}
                reverse
                icon={<Droplets className="w-8 h-8 text-blue-500" />}
            />

            {/* 6. PHASE 3: EXECUTION */}
            <SplitSection
                phase="Phase 3"
                title="The Execution Window"
                desc="Time, energy, and biology converge. Soma acts as your visual accountability partner, keeping you in flow and properly fueled."
                bullets={[
                    "Visual Forcing Function: The Timeline View creates urgency (Parkinson's Law).",
                    "Adaptive Fueling: Check Dashboard Stats before lunch. Low burn? Eat light. High burn? Refuel.",
                    "NEAT Optimization: Log small walks to validate your non-exercise activity."
                ]}
                icon={<Flame className="w-8 h-8 text-orange-500" />}
            />

            {/* 7. PHASE 4: AUDIT */}
            <SplitSection
                phase="Phase 4"
                title="The Evening Audit"
                desc="Close open loops to sleep better. Reviewing your data turns experience into strategy for tomorrow."
                bullets={[
                    "Zeigarnik Effect: Check off remaining tasks to release mental tension.",
                    "History Review: Compare your 'Planned' timeline vs 'Actual' reality.",
                    "AI Coach: Read the diet feedback. High sodium today? Adjust tomorrow."
                ]}
                reverse
                icon={<Clock className="w-8 h-8 text-purple-500" />}
            />

            {/* 8. CTA */}
            <section className="py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-card border border-border p-12 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />
                    
                    <h2 className="text-4xl font-bold mb-6">Ready to Optimize?</h2>
                    <p className="text-lg text-muted-foreground mb-10">
                        You have the protocol. You have the tool. Now, execute the plan.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25">
                            <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                            <Link href="/tasks">Open Planner</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}

/* --- SUBCOMPONENTS --- */

function SectionHeader({ phase, title, desc }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
        >
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">{phase}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
        >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function SplitSection({ phase, title, desc, bullets, reverse = false, icon }: any) {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
                
                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={reverse ? "lg:order-2" : ""}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-secondary rounded-xl">{icon}</div>
                        <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{phase}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {desc}
                    </p>

                    <ul className="space-y-4">
                        {bullets.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <span className="text-foreground/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Visual Side (Abstract Representation) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`
                        relative h-[500px] w-full rounded-3xl overflow-hidden border border-border shadow-2xl
                        ${reverse ? "lg:order-1" : ""}
                    `}
                >
                    {/* Abstract UI Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary/50" />
                    
                    {/* Decorative Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                    
                    {/* Content Placeholder (Simulates UI) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg p-6 flex flex-col gap-4">
                            <div className="h-8 w-1/3 bg-primary/10 rounded-lg animate-pulse" />
                            <div className="h-4 w-2/3 bg-secondary rounded animate-pulse delay-75" />
                            <div className="h-4 w-1/2 bg-secondary rounded animate-pulse delay-150" />
                            <div className="mt-auto h-32 bg-secondary/30 rounded-xl border border-dashed border-border" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
</file>

<file path="src/app/guides/page.tsx">
import Link from "next/link";
import { guides } from "@/lib/guides";
import { ArrowRight, BookOpen, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server"; // 👈 Import Server Auth
import { CheckCircle2 } from "lucide-react"; // Import Check Icon
import { prisma } from "@/lib/prisma"; // Import DB client
import Image from "next/image";


export const metadata: Metadata = {
  title: "Soma Guides | Health & Productivity Strategies",
  description: "Master your metabolism and productivity with our expert guides and protocols.",
};

// 👇 Make the component async to use await auth()
export default async function GuidesIndex() {
  // 👇 Check if user is signed in on the server
  const { userId } = await auth();
  
  // Define destination based on auth status
  const backLink = userId ? "/dashboard" : "/";
  const backLabel = userId ? "Back to Dashboard" : "Back to Home";

  // 👇 NEW: Fetch list of read guides for this user
  let readSlugs = new Set<string>();
  
  if (userId) {
    const readRecords = await prisma.userReadGuide.findMany({
      where: { userId },
      select: { guideSlug: true }
    });
    // Create a Set for instant O(1) lookups
    readSlugs = new Set(readRecords.map(r => r.guideSlug));
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* 👇 DYNAMIC BACK BUTTON */}
        {/* <div className="mb-12">
            <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground">
                <Link href={backLink}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> {backLabel}
                </Link>
            </Button>
        </div> */}

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="w-4 h-4" /> Knowledge Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Small Changes. Better Days.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Science for your body, your habits, and your everyday life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const isRead = readSlugs.has(guide.slug);
            return (
        <Link 
            key={guide.slug} 
            href={`/guides/${guide.slug}`}
            className={`group flex flex-col h-full bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 relative
                ${isRead ? 'border-primary/40 bg-primary/5' : 'border-border'} 
            `}
        >
            {/* 👇 "READ" BADGE (Absolute positioned) */}
            {isRead && (
                <div className="absolute top-4 right-4 z-10 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Read
                </div>
            )}
              {/* Image Placeholder */}
              <div className="relative h-48 bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-secondary/70 transition-colors overflow-hidden">
                {/* 👇 CONDITIONAL LOGIC */}
                 {guide.image ? (
                    <Image 
                      src={guide.image} 
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 ) : (
                    <span className="text-4xl">🧬</span>
                 )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{guide.date}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                  {guide.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                  Read Protocol <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
        </Link>
    );
      })}
        </div>

      </div>
    </div>
  );
}
</file>

<file path="src/app/profile/page.tsx">
import { redirect } from "next/navigation";

// Profile has been merged into the unified Account hub (Settings → Profile tab).
// Keep this route so old links/bookmarks land in the right place.
export default function ProfilePage() {
  redirect("/settings");
}
</file>

<file path="src/app/sign-in/[[...sign-in]]/page.tsx">
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SignIn path="/sign-in" />
    </div>
  );
}
</file>

<file path="src/app/sign-up/[[...sign-up]]/page.tsx">
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SignUp path="/sign-up" />
    </div>
  );
}
</file>

<file path="src/components/analysis/HabitAnalysisClient.tsx">
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, CheckCircle2, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  isSameDay, 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  addMonths, 
  subMonths, 
  isFuture, 
  isToday,
  isSameMonth
} from "date-fns";
import { DNALoader } from "../dna-loader";

export default function HabitAnalysisClient({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<any[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHabitData() {
      const res = await fetch(`/api/habits/analysis?userId=${userId}`);
      const data = await res.json();
      if (data.success && data.habits.length > 0) {
        setHabits(data.habits);
        setSelectedTitle(data.habits[0].title); 
      }
      setLoading(false);
    }
    fetchHabitData();
  }, [userId]);

  if (loading) return <DNALoader />;

  const selectedHabit = habits.find(h => h.title === selectedTitle);

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28 md:p-8 md:pb-8 space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER & DROPDOWN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-6">
          {/* <div>
              <h1 className="text-3xl font-bold tracking-tight">Habit Analysis</h1>
              <p className="text-muted-foreground mt-1">Select a habit to view your streaks and history.</p>
          </div> */}

          {habits.length > 0 && (
            <div className="w-full md:w-[250px]">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                Select Habit
              </label>
              <Select value={selectedTitle} onValueChange={setSelectedTitle}>
                <SelectTrigger className="w-full bg-card border-border/60 shadow-sm font-medium">
                  <SelectValue placeholder="Choose a habit..." />
                </SelectTrigger>
                <SelectContent>
                  {habits.map((habit, idx) => (
                    <SelectItem key={idx} value={habit.title} className="capitalize">
                      {habit.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
      </div>
      
      {/* MAIN CONTENT AREA */}
      <div>
        {selectedHabit ? (
          <HabitAnalysisCard key={selectedHabit.title} habit={selectedHabit} />
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-muted-foreground bg-card border border-dashed border-border/60 rounded-xl shadow-sm">
            <Activity className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-foreground">No habits tracked yet.</p>
            <p className="text-sm mt-1">Mark a task as a "Habit" to start analyzing your data!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HabitAnalysisCard({ habit }: { habit: any }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startingDayIndex = getDay(monthStart); 
  const emptyDaysPadding = Array.from({ length: startingDayIndex }).map((_, i) => i);

  const isCompletedOnDate = (targetDate: Date) => {
    return habit.completedDates?.some((completedDateString: string) => 
      isSameDay(new Date(completedDateString), targetDate)
    ) || false; 
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm transition-all overflow-hidden">
      <CardHeader className="pb-4 border-b border-border/40 bg-secondary/5">
        <CardTitle className="text-xl font-bold text-foreground capitalize tracking-wide flex items-center justify-between">
          {habit.title} Overview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            
          {/* LEFT SIDE: VERTICAL STATS WITH GLOW (Unchanged) */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* ... (Keep the existing glowing stats code here) ... */}
            <div className="relative group overflow-hidden rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.currentStreak}</p>
                <p className="text-xs uppercase font-bold text-orange-500/80 tracking-wider">Current Streak</p>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-violet-500/30 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
               <div className="relative z-10 p-5 flex flex-col items-center">
                <Trophy className="w-6 h-6 text-violet-500 mb-2 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.longestStreak}</p>
                <p className="text-xs uppercase font-bold text-violet-500/80 tracking-wider">Longest Streak</p>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
               <div className="relative z-10 p-5 flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.totalCompletions}</p>
                <p className="text-xs uppercase font-bold text-emerald-500/80 tracking-wider">Total Done</p>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: COMPACT CALENDAR WITH GLOW & SPARKLE */}
          <div className="w-full md:w-2/3 flex justify-center md:justify-start">
            <div className="bg-background border border-border/50 rounded-2xl p-5 md:p-6 shadow-sm w-full max-w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-base text-foreground uppercase tracking-widest">
                  {format(currentDate, "MMMM yyyy")}
                </p>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-foreground" 
                    onClick={handleNextMonth} 
                    disabled={isSameMonth(currentDate, new Date())} 
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {emptyDaysPadding.map(empty => (
                  <div key={`empty-${empty}`} className="aspect-square rounded-lg opacity-0" />
                ))}
                {daysInMonth.map(date => {
                  const completed = isCompletedOnDate(date);
                  const isFutureDate = isFuture(date) && !isToday(date);
                  const isTodayDate = isToday(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-xs md:text-sm transition-all relative font-bold
                        ${completed 
                          ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_12px_var(--primary)] z-10" 
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 font-semibold"
                        }
                        ${isFutureDate ? "opacity-30 bg-transparent border border-dashed border-border/50 text-muted-foreground/50" : ""}
                        ${isTodayDate && !completed ? "border-2 border-primary/50 text-primary bg-primary/5" : ""}
                      `}
                    >
                      {/* ✨ The Sparkle Animation ✨ */}
                      {/* {completed && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                        </span>
                      )} */}
                      {format(date, "d")}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/components/dashboard/PendingTasksList.tsx">
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Check, Clock, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export function PendingTasksList({ tasks, onToggle, onSubToggle }: { tasks: any[]; onToggle: any; onSubToggle: any }) {
  const pendingCount = tasks.filter(t => !t.isCompleted).length;

    // Inside PendingTasksList function
    const [activeTab, setActiveTab] = useState("tasks"); // Default to 'tasks'

    const habits = tasks.filter(t => t.priority === 'HABIT');
    const regularTasks = tasks.filter(t => t.priority !== 'HABIT');

    // Decide what to show based on the tab
    const displayedTasks = activeTab === "habits" ? habits : regularTasks;

  return (
    <div className="h-full">
      <Card className="bg-card border-2 border-border/60 shadow-sm h-full flex flex-col">
        <CardHeader className="pb-3 border-b border-border/40 bg-secondary/5 space-y-3">
            {/* Existing Title */}
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2"><ListTodo className="w-4 h-4 text-primary" /> Pending</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
                    {pendingCount}
                </span>
            </CardTitle>

            {/* 👇 NEW: Toggle Buttons (Segmented Control) */}
            <div className="flex p-1 bg-secondary/20 rounded-lg border border-border/50">
                <button 
                    onClick={() => setActiveTab("tasks")}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200 ${
                        activeTab === "tasks" 
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Tasks ({regularTasks.length})
                </button>
                <button 
                    onClick={() => setActiveTab("habits")}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200 ${
                        activeTab === "habits" 
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Habits ({habits.length})
                </button>
            </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60 p-8">
              <Check className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm font-medium text-center">All caught up!<br/>Enjoy your day.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
                {/* 👇 Show Empty State for specific tab if needed */}
                {displayedTasks.length === 0 && (
                    <div className="py-12 text-center text-xs text-muted-foreground italic">
                        No pending {activeTab}.
                    </div>
                )}
                
                {/* 👇 Map the filtered list */}
                {displayedTasks.map((task) => (
                    <DashboardTaskItem key={task.id} task={task} onToggle={onToggle} onSubToggle={onSubToggle} />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardTaskItem({ task, onToggle, onSubToggle }: any) {
    const [expanded, setExpanded] = useState(false);
    const badgeColors: any = {
        HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
        MEDIUM: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        LOW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        HABIT: "bg-violet-500/10 text-violet-500 border-violet-500/20"
    };

    return (
        <div className="p-3 hover:bg-secondary/30 transition-colors group">
            <div className="flex items-start gap-3">
                <Checkbox 
                    checked={task.isCompleted} 
                    onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                    className="mt-1 w-4 h-4 rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm font-medium leading-snug truncate pr-2 ${task.isCompleted ? "line-through text-muted-foreground opacity-70" : ""}`}>
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">

                                <span className="text-[10px] text-muted-foreground flex items-center bg-secondary/50 px-1.5 rounded">
                                    {/* You can use date-fns relative formatting like 'isToday' or simple formatting */}
                                    {format(new Date(task.date), "MMM d")}
                                </span>

                                {task.startTime && (
                                    <span className="text-[10px] text-muted-foreground flex items-center bg-secondary/50 px-1.5 rounded">
                                        <Clock className="w-2.5 h-2.5 mr-1" />
                                        {format(new Date(task.startTime), "h:mm a")}
                                    </span>
                                )}
                                <span className={`text-[9px] px-1.5 py-0 rounded border font-semibold tracking-wide uppercase ${badgeColors[task.priority] || badgeColors.LOW}`}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                        
                        {(task.description || task.subtasks.length > 0) && (
                            <button 
                                onClick={() => setExpanded(!expanded)}
                                className={`text-muted-foreground hover:text-foreground transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {expanded && task.subtasks.length > 0 && (
                        <div className="mt-3 space-y-2 pl-1 border-l-2 border-border/50 ml-1">
                            {task.subtasks.map((st: any) => (
                                <div key={st.id} className="flex items-center gap-2">
                                    <Checkbox 
                                        className="w-3 h-3 rounded-[2px]"
                                        checked={st.isCompleted}
                                        onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                    />
                                    <span className={`text-xs ${st.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                        {st.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {expanded && task.description && (
                        <p className="text-xs text-muted-foreground mt-2 bg-secondary/30 p-2 rounded">
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
</file>

<file path="src/components/dashboard/QuickLog.tsx">
"use client";
import { Button } from "@/components/ui/button";
import { Utensils, Loader2, Send, Mic } from "lucide-react";

interface QuickLogProps {
  value: string;
  onChange: (val: string) => void;
  onLog: () => void;
  isProcessing: boolean;
}

export function QuickLog({ value, onChange, onLog, isProcessing }: QuickLogProps) {
  return (
    <>
      {/* Desktop Version: Inline */}
      <div className="hidden md:block bg-card p-1 rounded-2xl shadow-sm border-2 border-border/50">
        <div className="p-4 space-y-3">
          <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md text-primary"><Utensils className="w-4 h-4"/></div>
            Quick Log
          </label>
          <div className="relative">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLog()}
              placeholder="Type '2 eggs and toast'..."
              className="w-full h-12 pl-4 pr-24 rounded-xl border border-border bg-background/50 focus:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
            <div className="absolute right-1 top-1 bottom-1 flex gap-1">
                <Button 
                onClick={onLog} 
                disabled={isProcessing || !value.trim()}
                size="sm"
                className="h-full px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version: Sticky Bottom */}
      <div className="md:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-45">
        <div className="relative flex items-center gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Log food or workout..."
                    className="w-full h-12 pl-4 pr-12 rounded-full border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg"
                />
                <Utensils className="absolute right-4 top-3.5 w-5 h-5 text-muted-foreground opacity-50" />
            </div>
            <Button 
                onClick={onLog} 
                disabled={isProcessing || !value.trim()}
                size="icon"
                className="h-12 w-12 rounded-full shrink-0 shadow-lg"
            >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
        </div>
      </div>
    </>
  );
}
</file>

<file path="src/components/landing/FeatureSlider.tsx">
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pirata_One } from "next/font/google";
import { LayoutDashboard, CalendarClock, Flame, Timer, StickyNote, History } from "lucide-react";

// Initialize the Pirata One font
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

// `media` array replaces `images` to support both video and images
const slides = [
  {
    id: 1,
    title: "Command Center",
    description: "Centralize your biological metrics. Monitor your exact caloric intake, macro breakdowns, and daily hydration targets in one unified, real-time dashboard.",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard.mp4", label: "Feature Video" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-3.png", label: "Main Overview" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-2.png", label: "AI Feedback" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-1.png", label: "Weekly Chart" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-4.png", label: "Steps Counter" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-5.png", label: "Tasks Preview" }, 
    ], 
    icon: LayoutDashboard,
    color: "text-primary",
    bgIcon: "bg-primary/10",
    borderActive: "border-primary/50 shadow-primary/20",
  },
  {
    id: 2,
    title: "24-Hour Timeline",
    description: "Take absolute control of your schedule. Seamlessly drag and drop your daily tasks, habits, and focus blocks to architect your perfect day.",
    media: [
      // { type: "video", url: "/hero-video.mp4", label: "Timeline Action" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/tasks-1.png", label: "Habit Blocks" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/tasks-2.png", label: "Tasks Blocks" },
    ],
    icon: CalendarClock,
    color: "text-violet-500",
    bgIcon: "bg-violet-500/10",
    borderActive: "border-violet-500/50 shadow-violet-500/20",
  },
  {
    id: 3,
    title: "Deep Analysis",
    description: "Turn daily discipline into visual momentum. Track your historical data through dynamic monthly heatmaps and watch your consistency compound.",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/analysis-video.mp4", label: "Consistency Heatmap" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/analysis.png", label: "Consistency Heatmap" }
    ],
    icon: Flame,
    color: "text-orange-500",
    bgIcon: "bg-orange-500/10",
    borderActive: "border-orange-500/50 shadow-orange-500/20",
  },
  {
    id: 4,
    title: "Deadline Manager",
    description: "Eliminate procrastination. Transform abstract due dates into striking, visual countdown timers that guarantee your highest-priority projects stay on track.",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadlines-video.mp4", label: "Active Projects" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadline-2.png", label: "Active Projects" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadline-1.png", label: "Countdown Timers" }
    ],
    icon: Timer,
    color: "text-destructive",
    bgIcon: "bg-destructive/10",
    borderActive: "border-destructive/50 shadow-destructive/20",
  },
  {
    id: 5,
    title: "Rich Notes",
    description: "Offload your mental clutter. Capture fleeting thoughts, document complex routines, and journal your progress with our frictionless, distraction-free editor.",
    media: [
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/notes.png", label: "Daily Journal" }, 
      // { type: "image", url: "/slide-notes-2.png", label: "Workout Log" }
    ],
    icon: StickyNote,
    color: "text-green-500",
    bgIcon: "bg-green-500/10",
    borderActive: "border-green-500/50 shadow-green-500/20",
  },
  {
    id: 6,
    title: "Complete History",
    description: "Your personal logbook. Scroll through a timeline of everything you've eaten, lifted, and accomplished. Access your chronological database instantly to analyze past performance and optimize your future trajectory.",
    media: [
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-2.png", label: "Chronological Log" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-1.png", label: "Chronological Log" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-3.png", label: "Chronological Log" }
    ],
    icon: History, // Make sure 'History' is imported from 'lucide-react' at the top of your file!
    color: "text-cyan-500",
    bgIcon: "bg-cyan-500/10",
    borderActive: "border-cyan-500/50 shadow-cyan-500/20",
  },
];

export function FeatureSlider() {
  const [activeId, setActiveId] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [innerIndex, setInnerIndex] = useState(0);
  
  const [videoProgress, setVideoProgress] = useState(0);

  const triggerNextSlide = () => {
    const currentSlide = slides.find(s => s.id === activeId);
    if (!currentSlide) return;

    if (innerIndex >= currentSlide.media.length - 1) {
      setActiveId((prevId) => (prevId === slides.length ? 1 : prevId + 1));
      setInnerIndex(0);
    } else {
      setInnerIndex((prev) => prev + 1);
    }
    setVideoProgress(0);
  };

  useEffect(() => {
    if (isHovered) return;

    const currentSlide = slides.find(s => s.id === activeId);
    if (!currentSlide) return;
    
    const currentMedia = currentSlide.media[innerIndex];

    if (currentMedia.type === "video") return;

    const timer = setTimeout(() => {
      triggerNextSlide();
    }, 4000); 

    return () => clearTimeout(timer);
  }, [isHovered, activeId, innerIndex]); 

  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        @keyframes fillImageProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className={`${pirata.className} text-4xl md:text-7xl font-bold tracking-tight mb-3 md:mb-4 text-foreground`}>
            Experience the <span className="text-primary">Interface.</span>
          </h2>
        </div>

        <div 
          className="flex flex-col md:flex-row gap-3 md:gap-4 w-full h-[700px] md:h-[600px] group/container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide) => {
            const isActive = activeId === slide.id;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if(!isActive) {
                     setActiveId(slide.id);
                     setInnerIndex(0);
                     setVideoProgress(0);
                  }
                }}
                className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] border-2
                  ${isActive 
                    ? `flex-[12] md:flex-[8] ${slide.borderActive} shadow-2xl bg-card` 
                    : `flex-[1] md:flex-[1] border-zinc-700/50 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 md:hover:-translate-y-2 hover:brightness-125 hover:border-zinc-500`
                  }
                `}
              >
                
                {/* --- 1. COMBINED EXPANDED WRAPPER (Image + Content) --- */}
                {/* Mobile: Uses 'flex-col' to naturally stack the image and text with ZERO gap. Desktop: Uses 'block' to keep the original absolute overlay structure. */}
                <div className={`absolute inset-0 w-full h-full flex flex-col md:block transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
                  
                  {/* --- MEDIA CONTAINER --- */}
                  <div className="w-full pt-4 md:pt-6 px-3 md:px-8 md:absolute md:inset-0 md:h-full md:pb-[10rem]">
                    <div className="relative w-full aspect-video md:aspect-auto md:h-full border border-white/10 bg-black/40 rounded-xl md:rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)] p-1.5 md:p-2 shrink-0">
                      <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden border-2 border-white/20 bg-black">
                        
                        {slide.media.map((mediaObj, idx) => {
                          const isCurrentMedia = innerIndex === idx;

                          return (
                            <div 
                              key={idx} 
                              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${isCurrentMedia ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                            >
                              {mediaObj.type === "video" ? (
                                <video 
                                  ref={(el) => {
                                    if (el) {
                                      if (isActive && isCurrentMedia) {
                                        el.play().catch((err) => console.log("Browser blocked autoplay:", err));
                                      } else {
                                        el.pause();
                                        el.currentTime = 0; 
                                      }
                                    }
                                  }}
                                  src={mediaObj.url}
                                  muted
                                  playsInline
                                  className="w-full h-full object-contain drop-shadow-2xl"
                                  onTimeUpdate={(e) => {
                                    const v = e.target as HTMLVideoElement;
                                    if (isActive && isCurrentMedia && v.duration) {
                                      setVideoProgress((v.currentTime / v.duration) * 100);
                                    }
                                  }}
                                  onEnded={triggerNextSlide}
                                />
                              ) : (
                                <Image
                                  src={mediaObj.url}
                                  alt={`${slide.title} - ${mediaObj.label}`}
                                  fill
                                  className="object-contain drop-shadow-2xl"
                                  priority={isActive && idx === 0}
                                />
                              )}
                              
                              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 bg-black/60 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                                {mediaObj.label}
                              </div>
                            </div>
                          )
                        })}

                        {/* Progress Dots */}
                        {slide.media.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
                            {slide.media.map((mediaObj, idx) => (
                              <button 
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInnerIndex(idx);
                                  setVideoProgress(0);
                                }}
                                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${innerIndex === idx ? "w-10 bg-white/20" : "w-2 bg-white/50 hover:bg-white/80"}`}
                              >
                                {innerIndex === idx && isActive && (
                                  mediaObj.type === "video" ? (
                                    <div 
                                      className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
                                      style={{ width: `${videoProgress}%` }} 
                                    />
                                  ) : (
                                    <div 
                                      className="absolute top-0 left-0 h-full bg-white"
                                      style={{ animation: 'fillImageProgress 4s linear forwards' }} 
                                    />
                                  )
                                )}
                              </button>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Gradient strictly hidden on mobile because we no longer overlap elements! */}
                  <div className={`hidden md:block absolute inset-x-0 bottom-0 h-[12rem] bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none`} />

                  {/* --- TEXT CONTENT CONTAINER --- */}
                  <div className="w-full px-4 pt-4 md:p-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 md:absolute md:bottom-0 md:inset-x-0">
                    
                    {/* MOBILE EXCLUSIVE: Icon + Title strictly inline! */}
                    <div className="flex md:hidden flex-row items-center gap-3 w-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border/50 shadow-lg backdrop-blur-md ${slide.bgIcon} ${slide.color}`}>
                        <slide.icon className="w-5 h-5" />
                      </div>
                      <h3 className={`${pirata.className} text-[1.75rem] text-foreground drop-shadow-lg tracking-wide leading-none pt-1`}>
                        {slide.title}
                      </h3>
                    </div>

                    {/* DESKTOP EXCLUSIVE: Standalone Icon (Keeps desktop format identical) */}
                    <div className={`hidden md:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0 border border-border/50 shadow-lg backdrop-blur-md ${slide.bgIcon} ${slide.color}`}>
                      <slide.icon className="w-6 h-6" />
                    </div>

                    {/* Description Block */}
                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 w-full overflow-hidden text-left">
                      
                      {/* DESKTOP EXCLUSIVE: Standalone Title */}
                      <h3 className={`${pirata.className} hidden md:block text-4xl lg:text-5xl text-foreground drop-shadow-lg tracking-wide leading-none shrink-0 md:w-[220px] lg:w-[280px]`}>
                        {slide.title}
                      </h3>
                      
                      {/* Divider Line (Desktop only) */}
                      <div className="hidden md:block w-px h-12 bg-border/50 shrink-0" />

                      {/* MAGIC FIX: max-h-none on mobile means full text visibility, no scroll! */}
                      <div className="max-h-none md:max-h-[100px] flex-1 overflow-visible md:overflow-y-auto overscroll-contain pr-0 md:pr-2 custom-scrollbar">
                        <p className="text-muted-foreground drop-shadow-md text-[15px] md:text-base lg:text-lg font-medium leading-snug">
                          {slide.description}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* --- 2. SHRUNKEN STATE (Completely Untouched) --- */}
                <div className={`absolute inset-0 flex flex-row md:flex-col items-center justify-start px-5 md:px-0 md:pt-8 md:pb-8 gap-4 md:gap-8 transition-opacity duration-500 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner bg-black/50 border border-zinc-700/50 ${slide.color}`}>
                    <slide.icon className="w-4 h-4 md:w-5 md:h-5 drop-shadow-md" />
                  </div>
                  
                  <div className="flex-1 flex items-center justify-start md:justify-center">
                    <h3 className={`${pirata.className} md:-rotate-90 whitespace-nowrap text-xl md:text-3xl tracking-widest ${slide.color} drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-90`}>
                      {slide.title}
                    </h3>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
</file>

<file path="src/components/landing/Footer.tsx">
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Monoton, Pirata_One } from "next/font/google";
import { ArrowRight, ArrowUpRight, Twitter, Github, Clock, Terminal, Activity } from "lucide-react";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });
const pirata = Pirata_One({ weight: "400", subsets: ["latin"], display: 'swap' });

export function Footer() {
  // OS Feature: Live Terminal Clock State
  const [time, setTime] = useState<string>("00:00:00");
  const [mounted, setMounted] = useState(false);
  
  // OS Feature: Lifetime Website Visits
  const [visits, setVisits] = useState<number | string>("...");

  // Safely start the clock and fetch visits only on the client
  useEffect(() => {
    setMounted(true);
    
    // 1. Clock Logic
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    
    // 2. Persistent Visit Counter Logic
    const trackVisit = async () => {
      try {
        // This hits a free external DB. The "/up" endpoint permanently increments the count by 1.
        // The namespace "somafit_os_production" is unique to your app.
        const res = await fetch("https://api.counterapi.dev/v1/somafit_os_production/visits/up");
        const data = await res.json();
        setVisits(data.count);
      } catch (error) {
        console.error("Failed to fetch visit count", error);
        setVisits("ERR");
      }
    };

    trackVisit();

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-black pt-24 md:pt-32 overflow-hidden border-t border-white/5 flex flex-col items-center">
      
      {/* 1. Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] md:h-[400px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[150px] md:h-[200px] bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center w-full">
        
        {/* 2. The Final Call to Action */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center w-full">
          <h2 className={`${pirata.className} text-[2.75rem] leading-[1.1] md:text-7xl text-white mb-4 md:mb-6 tracking-wide drop-shadow-2xl`}>
            Architect Your <br className="md:hidden" /> Perfect Day.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-md px-4">
            Stop guessing. Start executing. Initialize your personal operating system today.
          </p>
          <Link 
            href="/sign-up" 
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-white text-black rounded-full font-bold text-base md:text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 whitespace-nowrap">Initialize OS</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3. Floating Glass Dock */}
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-3 px-6 md:px-8 py-4 md:py-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl mb-10 md:mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-[95%]">
          {["Command Center", "Timeline", "Analysis", "Deadlines", "Notes"].map((item) => (
            <Link 
              key={item} 
              href="/dashboard" 
              className="text-zinc-400 hover:text-white text-[13px] md:text-base font-medium transition-colors flex items-center gap-1 group"
            >
              {item}
              <ArrowUpRight className="w-3 h-3 opacity-0 md:-translate-y-1 md:translate-x-1 md:group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all hidden md:block" />
            </Link>
          ))}
        </div>

        {/* 3.5 Contact / Terminal Connection Block */}
        <div className="flex flex-col items-center mb-12 md:mb-16 z-20">
          <p className="text-zinc-500 text-xs md:text-sm mb-3 uppercase tracking-widest font-semibold">
            Establish Connection
          </p>
          <a 
            href="mailto:nimtechsol@gmail.com" 
            className="group flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 backdrop-blur-md"
          >
            <Terminal className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-mono text-[13px] md:text-sm text-zinc-400 group-hover:text-white transition-colors tracking-wide">
              ping nimtechsol@gmail.com
            </span>
            <span className="w-1.5 h-4 bg-white/70 animate-pulse ml-0.5" /> 
          </a>
        </div>

        {/* 4. Bottom Utilities (Mobile Stacked & Symmetrical) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 border-t border-white/10 pt-8 pb-6 md:pb-4 px-2 md:px-4">
          
          {/* Top/Left: Live OS Status Row */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm font-medium text-zinc-500 w-full md:w-auto">
            {/* Desktop Copyright */}
            <span className="hidden md:block order-last md:order-none">
              © {new Date().getFullYear()} NIM Tech Solutions & Somafit. All rights reserved.
            </span>
            
            <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-700" />

            {/* NEW: Lifetime Traffic Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/5 font-mono text-xs text-zinc-400 shadow-inner tracking-wider" title="Total Lifetime Visits">
              <Activity className="w-3.5 h-3.5 text-primary/70" />
              <span className="opacity-70">SESSIONS:</span>
              <span className="text-white/90 font-semibold">
                {typeof visits === 'number' ? visits.toLocaleString() : visits}
              </span>
            </div>
            
            {/* Live Terminal Clock */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/5 font-mono text-xs text-zinc-400 shadow-inner tracking-wider">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              {mounted ? time : "00:00:00"}
            </div>

            {/* System Online Badge */}
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md text-zinc-300 text-xs font-semibold tracking-wide uppercase select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Online
            </span>
          </div>

          {/* Bottom/Right: Links & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 text-sm font-medium w-full md:w-auto">
            
            <div className="flex items-center gap-6 text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">
                Terms
              </Link>
            </div>
            
            <span className="hidden md:block w-px h-4 bg-white/15" />

            <div className="flex items-center gap-5 text-zinc-400">
              {/* <Link href="#" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">
                <Twitter className="w-[18px] h-[18px] md:w-4 md:h-4" />
                <span className="sr-only">Twitter</span>
              </Link> */}
              <Link href="https://github.com/OkRathod" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">
                <Github className="w-[18px] h-[18px] md:w-4 md:h-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>

            {/* Mobile Copyright fallback */}
            <span className="block md:hidden text-xs text-zinc-600 mt-2 text-center px-4">
              © {new Date().getFullYear()} NIM Tech Solutions & Somafit.<br className="block sm:hidden" /> All rights reserved.
            </span>

          </div>
        </div>

      </div>

      {/* 5. The Colossal Floor Logo */}
      <div className="w-full flex justify-center items-end mt-4 md:mt-0 relative z-0 overflow-hidden h-[18vw] md:h-auto">
        <h1 
          className={`${monoton.className} text-[27vw] md:text-[22vw] leading-[0.7] tracking-tighter md:tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-black select-none pointer-events-none hover:from-zinc-700 transition-all duration-1000`}
        >
          SOMAFIT
        </h1>
      </div>
      
    </footer>
  );
}
</file>

<file path="src/components/tasks/timeline-view.tsx">
"use client";

import { useMemo, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { format } from "date-fns";

export function TimelineView({ tasks, loading, onTimeSlotClick, onDropTask, draggedTaskId, onEdit }: any) {
  
  // 1. Current Time Line Indicator
  function CurrentTimeLine() {
      const [top, setTop] = useState(0);
      
      useEffect(() => {
          const update = () => {
              const now = new Date();
              setTop((now.getHours() * 60) + now.getMinutes());
          };
          update();
          const interval = setInterval(update, 60000);
          return () => clearInterval(interval);
      }, []);

      return (
          <div className="absolute left-0 right-0 border-t-2 border-red-500 z-40 pointer-events-none flex items-center" style={{ top: `${top}px` }}>
              <div className="absolute left-[76px] w-2 h-2 bg-red-500 rounded-full" />
          </div>
      );
  }

  // 2. Bulletproof Overlap Clustering Logic
  const positionedTasks = useMemo(() => {
    if (loading || !tasks || tasks.length === 0) return [];
    
    // Normalize data: Ensure we have valid start/end times in MS
    const normalized = tasks.filter((t: any) => t.startTime).map((t: any) => {
        const start = new Date(t.startTime).getTime();
        // Support both durationMins and duration properties
        const duration = Number(t.durationMins || t.duration || 60); 
        return {
            ...t,
            start,
            end: start + (duration * 60000),
            duration
        };
    }).sort((a: any, b: any) => a.start - b.start);

    // Group tasks that overlap into clusters
    const clusters: any[][] = [];
    let currentCluster: any[] = [];
    let clusterEnd = 0;

    normalized.forEach((task: any) => {
       if (currentCluster.length > 0 && task.start >= clusterEnd) {
           clusters.push(currentCluster);
           currentCluster = [task];
           clusterEnd = task.end;
       } else {
           currentCluster.push(task);
           if (task.end > clusterEnd) clusterEnd = task.end;
       }
    });
    if (currentCluster.length > 0) clusters.push(currentCluster);

    // Assign safe columns within each cluster
    const finalTasks: any[] = [];
    clusters.forEach(cluster => {
        const columns: number[] = []; 
        cluster.forEach(task => {
            let placed = false;
            for (let i = 0; i < columns.length; i++) {
                if (task.start >= columns[i]) {
                    task.colIndex = i;
                    columns[i] = task.end;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                task.colIndex = columns.length;
                columns.push(task.end);
            }
        });

        // Apply total columns so CSS knows how thin to make the bars
        const totalCols = columns.length;
        cluster.forEach(task => {
            task.totalCols = totalCols;
            finalTasks.push(task);
        });
    });

    return finalTasks;
  }, [tasks, loading]);

  return (
    <div className="min-h-[1440px] w-full max-w-4xl bg-card border-x border-border/40 relative shadow-sm">
        
        {/* Background Grid */}
        {Array.from({ length: 24 }).map((_, hour) => (
            <div 
                key={hour} 
                className="h-[60px] flex group relative border-b border-border/30 hover:bg-accent/10 transition-colors box-border"
                onClick={() => onTimeSlotClick(`${hour.toString().padStart(2, '0')}:00`)}
                onDragOver={(e) => e.preventDefault()} 
                onDrop={(e) => onDropTask(e, hour)} 
            >
                {/* 80px (w-20) left gutter for Time Labels */}
                <div className="w-[80px] flex-shrink-0 text-xs text-muted-foreground pt-0 pr-4 text-right font-mono select-none relative -top-2">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
                <div className="flex-1 relative border-l border-border/40 group-hover:border-primary/30 transition-colors">
                    <div className="hidden group-hover:flex absolute inset-0 items-center pl-4 opacity-50">
                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded font-medium tracking-wide">
                            Click to add task at {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                        </span>
                    </div>
                </div>
            </div>
        ))}

        {/* Overlapping Tasks Renderer */}
        {positionedTasks.map((task: any) => {
            const dateObj = new Date(task.start);
            const endDateObj = new Date(task.end);
            
            const topPosition = (dateObj.getHours() * 60) + dateObj.getMinutes();
            const height = task.duration;
            
            // EXACT CSS Math: 80px offset matches the time label column width perfectly
            const widthVal = `calc((100% - 80px) / ${task.totalCols} - 4px)`;
            const leftVal = `calc(80px + ((100% - 80px) / ${task.totalCols} * ${task.colIndex}) + 2px)`; 
            
            const priorityStyles: Record<string, string> = {
                HIGH:   "bg-red-500/10 border-l-red-500 text-red-700 dark:text-red-400",
                MEDIUM: "bg-amber-500/10 border-l-amber-500 text-amber-700 dark:text-amber-400",
                HABIT:  "bg-emerald-500/10 border-l-emerald-500 text-emerald-700 dark:text-emerald-400",
                LOW:    "bg-blue-500/10 border-l-blue-500 text-blue-700 dark:text-blue-400"
            };

            return (
                <div 
                    key={task.id}
                    draggable
                    onDragStart={(e) => { e.stopPropagation(); }}
                    onDragOver={(e) => e.preventDefault()} 
                    className={`
                        absolute rounded-r-lg border-l-[4px] px-2.5 py-1.5 shadow-sm cursor-pointer hover:shadow-md hover:z-50 transition-all overflow-hidden flex flex-col justify-between
                        ${priorityStyles[task.priority] || priorityStyles.LOW}
                        ${task.isCompleted ? 'opacity-50 grayscale bg-muted text-muted-foreground border-l-muted-foreground' : 'opacity-100'}
                        ${draggedTaskId === task.id ? 'opacity-50 border-dashed' : ''} 
                    `}
                    style={{ 
                        top: `${topPosition}px`, 
                        height: `${height}px`, 
                        width: widthVal, 
                        left: leftVal, 
                        zIndex: 10 + task.colIndex 
                    }}
                    onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                >
                    <div className="font-bold text-[11px] sm:text-xs flex items-start gap-1.5 leading-tight min-w-0">
                        {task.isCompleted && <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                        <span className="line-clamp-2">{task.title}</span>
                    </div>
                    
                    {/* 👇 Display Start Time - End Time */}
                    {height >= 35 && (
                        <div className="opacity-80 font-mono text-[9px] sm:text-[10px] mt-auto truncate text-foreground/80 font-medium">
                            {format(dateObj, "h:mm a")} - {format(endDateObj, "h:mm a")}
                        </div>
                    )}
                </div>
            )
        })}
        <CurrentTimeLine />
    </div>
  );
}
</file>

<file path="src/components/ui/calendar.tsx">
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        
        caption_dropdowns: "flex justify-center gap-1 items-center",
        dropdown: "bg-background border border-border rounded-md text-sm p-1 cursor-pointer",
        dropdown_month: "mr-1",
        dropdown_year: "ml-1",

        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        
          vhidden: "hidden",

        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
</file>

<file path="src/components/ui/progress.tsx">
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// 👇 We add 'indicatorClassName' to the type definition here
interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps // Use our new custom type
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // 👇 This is where we apply the custom color class!
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
</file>

<file path="src/components/main-layout-client.tsx">
"use client"; // 👈 This is fine for UI logic

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { FeedbackPrompt } from "@/components/feedback-prompt";

export function MainLayoutClient({ 
  children, 
  user 
}: { 
  children: React.ReactNode, 
  user: any // Recieves user data from the server parent
}) {
  const pathname = usePathname();
  
  // Define which pages are "Marketing" pages (No sidebar, no padding)
  const isMarketingPage = pathname === "/" || pathname?.startsWith("/sign");

  return (
    <>
      {/* 1. THE NAVBAR */}
      {!isMarketingPage && <Navbar user={user}/>}

      {/* 2. MAIN CONTENT WRAPPER */}
      <main 
        className={`min-h-screen ${
          isMarketingPage 
            ? "" // LANDING PAGE: No extra padding
            : "pb-2 pt-2 md:pt-0 md:pb-0 md:pl-20" // DASHBOARD: Padded for Sidebar (80px)
        }`}
      >
        {children}
      </main>
      <FeedbackPrompt />
    </>
  );
}
</file>

<file path="src/lib/guides.ts">
export const guides = [
    {
    slug: "the-soma-protocol", // This matches the folder name we just made
    title: "The Soma Protocol", 
    description: "The official master guide to high-performance living with Soma.",
    date: "2025-12-14",
    readTime: "Interactive Guide",
    image:"",
    // Content here is ignored because the page.tsx file overrides it
    content: "" 
  },
  {
  slug: "sleep-protocol", // This matches the folder name we just made
  title: "Why Sleep Is the Foundation of Human Performance", 
  description: "A science-backed exploration of how sleep governs memory, hormones, immunity, aging, and lifespan — and why it must come first.",
  date: "2025-12-17",
  readTime: "5 min read",
  image: "/guides/thumbnail/sleep.png",
  // Content here is ignored because the page.tsx file overrides it
  content: `
  <body>

<header>
    <p>
        <strong>
            A science-backed exploration of how sleep governs memory, hormones,
            immunity, aging, and lifespan — and why it must come first.
        </strong>
    </p>

    <p>
        Inspired by research presented by <strong>Dr. Matthew Walker</strong><br>
        Source:
        <a href="https://youtu.be/5MuIMqhT8DM?si=lhf_IWwgpHPW4qcq" target="_blank">
            TED Talk — Why We Sleep
        </a>
    </p>

    <hr>
</header>

<main>

    <section>
        <p>
            Let’s begin with an uncomfortable truth — one that most people
            underestimate, ignore, or postpone until it’s too late.
        </p>

        <p>
            Sleep is not optional. It is not a lifestyle choice. It is a
            non-negotiable biological requirement.
        </p>
    </section>

    <hr>

    <section>
        <h2>Sleep and Reproductive Health</h2>

        <p>
            Chronic sleep deprivation has direct and measurable effects on
            reproductive health in both men and women.
        </p>

        <p>
            Men who sleep only five hours per night have significantly smaller
            testicles than those who sleep seven hours or more. Those who
            routinely sleep just four to five hours show testosterone levels
            comparable to men ten years older.
        </p>

        <p>
            In biological terms, insufficient sleep accelerates aging of the
            reproductive system by nearly a decade. Equivalent impairments are
            observed in female reproductive health as well.
        </p>
    </section>

    <hr>

    <section>
        <h2>Sleep and the Ability to Learn</h2>

        <p>
            Over the past decade, neuroscience has revealed that sleep plays two
            critical roles in learning — one after learning, and one before it.
        </p>

        <p>
            After learning, sleep acts like a save button, stabilizing new
            memories so they are not lost. Before learning, sleep prepares the
            brain to absorb information, much like a dry sponge ready to soak up
            water.
        </p>

        <p>
            Without sleep, the brain’s memory circuits become saturated. New
            information simply cannot be absorbed.
        </p>
    </section>

    <hr>

    <section>
        <h2>The Cost of Pulling an All-Nighter</h2>

        <p>
            In controlled laboratory studies, participants were divided into two
            groups: one allowed a full eight hours of sleep, and another kept
            awake overnight with no caffeine or naps.
        </p>

        <p>
            The next day, both groups attempted to learn new information while
            undergoing brain scans.
        </p>

        <p>
            The result was stark: a <strong>40 percent reduction</strong> in the
            ability to form new memories in the sleep-deprived group — the
            difference between acing an exam and failing it outright.
        </p>
    </section>

    <hr>

    <section>
        <h2>The Hippocampus: A Closed Inbox</h2>

        <p>
            The hippocampus acts as the brain’s memory inbox, receiving and
            temporarily storing new experiences.
        </p>

        <p>
            In well-rested individuals, this region shows strong learning-related
            activity. In sleep-deprived individuals, activity is almost entirely
            absent.
        </p>

        <p>
            Sleep deprivation effectively shuts down the brain’s ability to
            commit new experiences to memory.
        </p>
    </section>

    <hr>

    <section>
        <h2>Deep Sleep and Memory Consolidation</h2>

        <p>
            During the deepest stages of sleep, the brain produces slow, powerful
            waves, accompanied by brief bursts of electrical activity known as
            sleep spindles.
        </p>

        <p>
            Together, these waves act as a file-transfer system, moving memories
            from fragile short-term storage into durable long-term memory.
        </p>
    </section>

    <hr>

    <section>
        <h2>Aging, Dementia, and Alzheimer’s Disease</h2>

        <p>
            As we age, deep sleep deteriorates. At the same time, memory and
            learning abilities decline.
        </p>

        <p>
            Research now shows these are not coincidental. Disrupted deep sleep
            is a significant contributor to cognitive decline and Alzheimer’s
            disease.
        </p>

        <p>
            Unlike many other aspects of aging, sleep is modifiable — making it
            a promising target for intervention.
        </p>
    </section>

    <hr>

    <section>
        <h2>Sleep and the Immune System</h2>

        <p>
            Natural killer cells act as the immune system’s frontline defense,
            identifying and destroying cancerous cells.
        </p>

        <p>
            After just one night of four hours of sleep, natural killer cell
            activity drops by nearly <strong>70 percent</strong>.
        </p>

        <p>
            Short sleep duration is strongly linked to increased risk of bowel,
            prostate, and breast cancers. The World Health Organization now
            classifies night-shift work as a probable carcinogen.
        </p>
    </section>

    <hr>

    <section>
        <h2>Sleep, DNA, and Lifespan</h2>

        <p>
            Sleep deprivation alters gene expression at a fundamental level.
        </p>

        <p>
            In one study, limiting sleep to six hours per night for one week
            altered the activity of 711 genes. Immune genes were suppressed,
            while genes linked to cancer, inflammation, stress, and heart disease
            were activated.
        </p>

        <blockquote>
            <p><strong>The shorter your sleep, the shorter your life.</strong></p>
        </blockquote>
    </section>

    <hr>

    <section>
        <h2>Two Rules for Better Sleep</h2>

        <p>
            First, maintain consistency. Go to bed and wake up at the same time
            every day, including weekends. Regularity anchors sleep quality.
        </p>

        <p>
            Second, keep your environment cool. The body must drop its core
            temperature to initiate sleep. For most people, around
            <strong>18°C (65°F)</strong> is ideal.
        </p>
    </section>

    <hr>

    <section>
        <h2>The Final Truth</h2>

        <p>
            Sleep is not a luxury. It is your life-support system.
        </p>

        <blockquote>
            <p>
                <strong>
                    Sleep is Mother Nature’s best effort at immortality.
                </strong>
            </p>
        </blockquote>

        <p>
            Reclaiming sleep is one of the most powerful decisions you can make
            for long-term health, clarity, and performance.
        </p>
    </section>

</main>

<footer>
    <hr>
    <p>
        Source:
        <a href="https://youtu.be/5MuIMqhT8DM?si=lhf_IWwgpHPW4qcq" target="_blank">
            TED Talk — Matthew Walker, Why We Sleep
        </a>
    </p>
</footer>

</body>

  `
},
  // Add more guide objects here later!
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
</file>

<file path="src/app/api/process-log/route.ts">
// src/app/api/process-log/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { decryptKey } from "@/lib/crypto";
import { parseAiLog } from "@/lib/validation";

export const maxDuration = 30;

// Lightweight per-instance rate limit. For multi-instance deployments, back
// this with Upstash/Redis; the shape stays the same.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();
function rateLimited(userId: string): boolean {
  const now = Date.now();
  const arr = (hits.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(userId, arr);
  return arr.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const gate = await requireUser();
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  if (rateLimited(userId)) {
    return NextResponse.json(
      { error: "Slow down", details: "You're logging very fast. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const userText: string = body.userText || body.text || "";
    const date: string | undefined = body.date;
    if (!userText.trim()) return NextResponse.json({ error: "Log text is missing" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Prefer the user's own key (the vault) if present, else the server key.
    let apiKey = process.env.GEMINI_API_KEY || "";
    if (user.encryptedApiKey && user.apiKeyIv) {
      try {
        apiKey = decryptKey(user.encryptedApiKey, user.apiKeyIv);
      } catch {
        /* fall back to server key */
      }
    }
    if (!apiKey) return NextResponse.json({ error: "Server API Key missing" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      SYSTEM ROLE: You are "Soma", an elite, culturally-intelligent nutrition & fitness coach.
      USER PROFILE:
      - Age/Gender: ${user.age ?? "N/A"} / ${user.gender ?? "N/A"}
      - Region: ${user.nationality ?? "N/A"}
      - Height/Weight: ${user.height ? user.height + "cm" : "N/A"} / ${user.weight ? user.weight + "kg" : "N/A"}
      - Goal: ${user.weightGoal ?? "N/A"} (Target ${user.targetWeight ? user.targetWeight + "kg" : "N/A"})
      - Daily targets: ${user.dailyCalorieGoal} kcal, ${user.waterGoal} ml
      - Activity/Job: ${user.activityLevel ?? "N/A"} / ${user.jobType ?? "N/A"}
      - Diet: ${user.dietaryPreferences ?? "none"}
      - Purpose: ${user.customPurpose ?? "general health"}

      TASK: Analyze this log: "${userText}"
      RULES: Interpret food culturally & by realistic portions. Tie feedback to the user's goal & purpose.
      "ai_feedback" = 3-5 encouraging, specific sentences. "next_step" = one concrete micro-habit.
      Return ONLY valid JSON:
      {"foods":[{"name":"string","calories":number,"protein":number,"carbs":number,"fats":number}],
       "exercises":[{"name":"string","calories_burned":number,"duration_minutes":number}],
       "total_calories_in":number,"total_calories_out":number,"ai_feedback":"string","next_step":"string"}
    `;

    const result = await model.generateContent(prompt);
    const raw = JSON.parse(result.response.text());
    const ai = parseAiLog(raw); // validated + totals repaired

    const newLog = await prisma.dailyLog.create({
      data: {
        userId,
        type: "MEAL",
        date: date ? new Date(date) : new Date(),
        rawText: userText,
        parsedData: ai,
        totalCaloriesIn: ai.total_calories_in,
        totalCaloriesOut: ai.total_calories_out,
        aiFeedback: ai.ai_feedback,
      },
    });

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    const msg = (error as Error).message || "";
    console.error("Processing Error:", msg);
    if (msg.includes("API_KEY_INVALID"))
      return NextResponse.json({ error: "Configuration Error", details: "The API key is invalid." }, { status: 401 });
    if (msg.includes("429") || msg.includes("quota"))
      return NextResponse.json({ error: "Traffic Overload", details: "The AI is busy. Try again shortly." }, { status: 429 });
    if (msg.includes("JSON"))
      return NextResponse.json({ error: "AI Glitch", details: "The AI returned unreadable data. Rephrase your log." }, { status: 502 });
    return NextResponse.json({ error: "System Error", details: "Unexpected error. Please try again." }, { status: 500 });
  }
}
</file>

<file path="src/app/dashboard/page.tsx">
import { getSomaUser } from "@/lib/prisma"; // Keep your existing helper
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";
import { checkProfileCompleteness } from "@/lib/check-profile"; // 👈 Import 1
import { CompleteProfileModal } from "@/components/complete-profile-modal"; // 👈 Import 2


export default async function DashboardPage() {
  // 1. Get the authenticated user (keeps your existing clean logic)
  const user = await getSomaUser();

  // 2. If not logged in, kick them out
  if (!user) {
    redirect("/sign-in");
  }

  // 3. 👇 NEW: Check if their profile is complete
  // const profileStatus = await checkProfileCompleteness(user.id);

  // 4. Pass the user data to Client, AND show modal if needed
  return (
    <>
      {/* If profile is incomplete, this Modal blocks the screen */}
      {/* {!profileStatus.isComplete && (
        <CompleteProfileModal userId={user.id} missingFields={profileStatus.missing} />
      )} */}

      {/* The normal dashboard loads behind it */}
      <DashboardClient user={user} />
    </>
  );
}
</file>

<file path="src/app/guides/[slug]/page.tsx">
import { getGuide, guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, UserPlus } from "lucide-react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MarkReadButton } from "@/components/guides/mark-read-button";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

// 👇 1. UPDATED METADATA: Includes the Canonical URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  
  if (!guide) return {};

  const baseUrl = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000" 
    : "https://www.somafit.in";
  
  const pageUrl = `${baseUrl}/guides/${slug}`;
  
  return {
    title: `${guide.title} | Soma`,
    description: guide.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${guide.title} | Soma`,
      description: guide.description,
      url: pageUrl,
      type: 'article',
    }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return notFound();

  // 👇 2. DYNAMIC SERVER RENDERING (Works perfectly without static params)
  const { userId } = await auth();
  let isRead = false;

  // Only check DB if user exists
  if (userId) {
    const record = await prisma.userReadGuide.findUnique({
      where: {
        userId_guideSlug: { userId, guideSlug: slug }
      }
    });
    isRead = !!record;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <article className="container mx-auto max-w-3xl">
        
        {/* Article Header (Visible to All) */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {guide.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {guide.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {guide.readTime}
            </div>
          </div>
        </header>

        {/* Content (Visible to All) */}
        <div 
          className="
            prose prose-lg dark:prose-invert max-w-none text-foreground
            prose-headings:font-bold prose-headings:text-foreground prose-a:text-info prose-strong:text-foreground
            prose-blockquote:border-l-foreground prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: guide.content }} 
        />

        {/* SMART FOOTER: Adapts to User vs Guest */}
        <div className="mt-16 p-8 bg-secondary/30 border border-border rounded-2xl text-center">
          
          {userId ? (
            /* === LOGGED IN VIEW === */
            <>
                <h3 className="text-2xl font-bold mb-3">Finished Reading?</h3>
                <p className="text-muted-foreground mb-6">Mark this protocol as complete.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MarkReadButton slug={slug} isRead={isRead} />
                    <Link href="/guides" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Back to Guides
                    </Link>
                </div>
            </>
          ) : (
            /* === GUEST VIEW === */
            <>
                <h3 className="text-2xl font-bold mb-3">Want to save your progress?</h3>
                <p className="text-muted-foreground mb-6">Create a free account to track completed protocols.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                        <Link href="/sign-up">
                            <UserPlus className="w-4 h-4" /> Create Free Account
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/guides">
                            Back to Guides
                        </Link>
                    </Button>
                </div>
            </>
          )}

        </div>

      </article>
    </div>
  );
}
</file>

<file path="src/components/deadlines/deadline-card.tsx">
"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Calendar, Clock, AlertTriangle, Timer } from "lucide-react";
import { MoreVertical, Trash2, Edit, Check, Square, CheckSquare, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toggleDeadline, deleteDeadline, toggleSubtask } from "@/app/actions/deadlines";
import { toast } from "sonner";
import { useState } from "react";
import { EditDeadlineDialog } from "@/components/deadlines/edit-deadline-dialog";

export function DeadlineCard({ data, onUpdate, isHistory }: any) {
  const { timeLeft, isExpired } = useCountdown(data.targetDate);
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Calculate Progress (Time Elapsed)
  const start = new Date(data.startDate).getTime();
  const end = data.targetDate ? new Date(data.targetDate).getTime() : null;
  const now = new Date().getTime();
  
  let progress = 0;
  if (end) {
    const totalDuration = end - start;
    const elapsed = now - start;
    progress = Math.max(0, Math.min((elapsed / totalDuration) * 100, 100)); // Clamp between 0-100
  }

  const isOverdue = !data.isCompleted && isExpired && data.targetDate;

  // 👇 DYNAMIC THEME ENGINE: Changes color based on time elapsed
  const getUrgencyTheme = () => {
    if (data.isCompleted) return { 
        bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500/30", 
        glow: "shadow-emerald-500/10", lightBg: "bg-emerald-500/5", gradient: "from-emerald-500/20 to-transparent" 
    };
    if (isOverdue) return { 
        bg: "bg-red-600", text: "text-red-600", border: "border-red-600/50", 
        glow: "shadow-red-600/20", lightBg: "bg-red-600/10", gradient: "from-red-600/20 to-red-600/5" 
    };
    if (progress > 90) return { 
        bg: "bg-red-500", text: "text-red-500", border: "border-red-500/40", 
        glow: "shadow-red-500/20", lightBg: "bg-red-500/10", gradient: "from-red-500/20 to-transparent" 
    };
    if (progress > 75) return { 
        bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500/40", 
        glow: "shadow-orange-500/20", lightBg: "bg-orange-500/10", gradient: "from-orange-500/20 to-transparent" 
    };
    if (progress > 50) return { 
        bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500/40", 
        glow: "shadow-amber-500/20", lightBg: "bg-amber-500/10", gradient: "from-amber-500/20 to-transparent" 
    };
    // Default (0-50% elapsed)
    return { 
        bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/30", 
        glow: "shadow-blue-500/10", lightBg: "bg-blue-500/5", gradient: "from-blue-500/20 to-transparent" 
    };
  };

  const theme = getUrgencyTheme();

  // Actions
  const handleMainToggle = async () => {
    try {
        await toggleDeadline(data.id, !data.isCompleted);
        toast.success(data.isCompleted ? "Marked as active" : "Deadline completed! 🎉");
        onUpdate();
    } catch (e) { toast.error("Failed to update status"); }
  };

  const handleSubtaskToggle = async (subId: string, currentStatus: boolean) => {
    try {
        await toggleSubtask(subId, !currentStatus);
        onUpdate();
    } catch (e) { toast.error("Failed to update subtask"); }
  };

  const handleDelete = async () => {
     try {
         await deleteDeadline(data.id);
         toast.success("Deadline deleted");
         onUpdate();
     } catch (e) { toast.error("Failed to delete"); }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.border} ${theme.glow} bg-card`}>
      
      {/* Subtle Background Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${theme.gradient} opacity-50 pointer-events-none`} />

      <CardHeader className="pb-2 pt-5 relative z-10">
        <div className="flex justify-between items-start gap-3">
           
           {/* LEFT: Title & Checkbox */}
           <div className="space-y-1.5 flex-1">
              <div className="flex items-start gap-3">
                 <button onClick={handleMainToggle} className={`mt-0.5 shrink-0 transition-transform hover:scale-110 ${data.isCompleted ? 'text-emerald-500' : theme.text}`}>
                    {data.isCompleted ? <CheckSquare className="w-6 h-6"/> : <Square className="w-6 h-6 opacity-60 hover:opacity-100"/>}
                 </button>
                 <div>
                     <CardTitle className={`text-xl font-bold leading-tight ${data.isCompleted ? 'line-through text-muted-foreground opacity-70' : 'text-foreground'}`}>
                        {data.title}
                     </CardTitle>
                     <div className="flex gap-2 mt-2">
                        {isOverdue && <Badge variant="destructive" className="animate-pulse shadow-sm shadow-red-500/20">Overdue</Badge>}
                        {!data.targetDate && <Badge variant="secondary" className="bg-secondary/50">Open Ended</Badge>}
                        {data.isCompleted && <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Completed</Badge>}
                     </div>
                 </div>
              </div>
           </div>

           {/* RIGHT: Dropdown Menu */}
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 text-muted-foreground hover:bg-secondary/50">
                    <MoreVertical className="w-4 h-4" />
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 border-border/50 shadow-xl">
                 <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-2" /> Edit Deadline
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleDelete} className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 relative z-10">
         
         {/* THE VIBRANT COUNTDOWN DISPLAY */}
         {data.targetDate && !data.isCompleted && (
             <div className={`relative p-5 rounded-2xl border ${theme.border} ${theme.lightBg} flex flex-col items-center justify-center overflow-hidden shadow-inner`}>
                 
                 {/* Top Label */}
                 <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold mb-2 opacity-80" style={{ color: `var(--${theme.text.split('-')[1]}-500)` }}>
                     {isOverdue ? <AlertTriangle className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
                     {isOverdue ? "Time Exceeded By" : "Time Remaining"}
                 </div>
                 
                 {/* Massive Countdown Numbers */}
                 <div className={`text-4xl md:text-5xl font-black tabular-nums tracking-tight mb-4 drop-shadow-sm ${theme.text}`}>
                    {timeLeft || "00:00:00"}
                 </div>
                 
                 {/* Visual Progress Bar Engine */}
                 {!isOverdue && (
                     <div className="w-full space-y-1.5">
                         <div className="w-full h-3 bg-background/60 rounded-full overflow-hidden shadow-inner border border-border/20">
                             <div 
                                className={`h-full ${theme.bg} transition-all duration-1000 ease-out`} 
                                style={{ width: `${progress}%` }} 
                             />
                         </div>
                         <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                             <span>Time Elapsed: {progress.toFixed(1)}%</span>
                             <span className={progress > 90 ? theme.text : ""}>{100 - Math.round(progress)}% Left</span>
                         </div>
                     </div>
                 )}
             </div>
         )}

         {/* Collapsible Subtasks Section */}
         {data.subtasks?.length > 0 && (
             <div className="rounded-xl border border-border/50 bg-secondary/5 overflow-hidden transition-all hover:border-border">
                 <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-secondary/20 transition-colors"
                 >
                    <div className="flex flex-col items-start gap-1.5 w-full">
                        <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                           Subtasks
                           {data.subtasks.filter((t:any) => t.isCompleted).length === data.subtasks.length && (
                               <Badge variant="outline" className="h-5 text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">All Done</Badge>
                           )}
                        </span>
                        <div className="flex items-center gap-3 w-full pr-4">
                             <Progress 
                                value={(data.subtasks.filter((t:any) => t.isCompleted).length / data.subtasks.length) * 100} 
                                className="h-1.5 flex-1 bg-background/50" 
                             />
                             <span className="text-xs text-muted-foreground font-mono font-medium shrink-0">
                                {data.subtasks.filter((t:any) => t.isCompleted).length} / {data.subtasks.length}
                             </span>
                        </div>
                    </div>
                    <div className="shrink-0 bg-background/50 p-1.5 rounded-md border border-border/50">
                        {expanded ? <ChevronUp className="w-4 h-4 text-foreground"/> : <ChevronDown className="w-4 h-4 text-foreground"/>}
                    </div>
                 </button>

                 {expanded && (
                     <div className="p-2 space-y-0.5 bg-background/30 border-t border-border/30">
                        {data.subtasks.map((task: any) => (
                           <div 
                             key={task.id} 
                             onClick={(e) => {
                                e.stopPropagation(); 
                                handleSubtaskToggle(task.id, task.isCompleted);
                             }}
                             className="flex items-start gap-3 text-sm cursor-pointer hover:bg-card p-2.5 rounded-lg transition-all group border border-transparent hover:border-border/60 hover:shadow-sm"
                           >
                              <div className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all shrink-0 ${task.isCompleted ? `${theme.bg} border-transparent shadow-sm` : 'border-muted-foreground/40 group-hover:border-primary/50'}`}>
                                 {task.isCompleted && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className={`flex-1 leading-tight ${task.isCompleted ? 'line-through text-muted-foreground opacity-60' : 'text-foreground/90 font-medium'}`}>
                                 {task.title}
                              </span>
                           </div>
                        ))}
                     </div>
                 )}
             </div>
         )}

         {/* Dates Footer */}
         <div className="flex justify-between items-center text-xs font-medium text-muted-foreground pt-3 border-t border-border/40">
             <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md">
                <Calendar className="w-3.5 h-3.5 opacity-70"/>
                <span>{format(new Date(data.startDate), "MMM d, yyyy")}</span>
             </div>
             {data.targetDate && (
                 <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 opacity-70"/>
                    <span>{format(new Date(data.targetDate), "MMM d, h:mm a")}</span>
                 </div>
             )}
         </div>

      </CardContent>

      <EditDeadlineDialog 
         open={isEditOpen} 
         onOpenChange={setIsEditOpen} 
         data={data} 
         onSave={onUpdate} 
      />
    </Card>
  );
}
</file>

<file path="src/components/dna-loader.tsx">
// import React from "react";

// export function DNALoader() {
//   // We create 12 pairs of dots
//   const dots = Array.from({ length: 12 });

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-8">
      
//       {/* The DNA Container */}
//       <div className="relative flex items-center justify-center h-16 w-48">
//         {dots.map((_, i) => (
//           <div key={i} className="absolute h-full" style={{ left: `${i * 15}px` }}>
//             {/* Strand 1 (Blue) */}
//             <div
//               className="dna-dot h-3 w-3 bg-info shadow-sm"
//               style={{
//                 animation: "strand1 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
//                 animationDelay: `${i * 0.15}s`,
//               }}
//             />
//             {/* Strand 2 (Light Blue) */}
//             <div
//               className="dna-dot h-3 w-3 bg-info/40"
//               style={{
//                 animation: "strand2 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
//                 animationDelay: `${i * 0.15}s`,
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Loading Text */}
//       {/* <div className="flex flex-col items-center gap-1">
//         <p className="text-xs font-medium text-blue-400 uppercase tracking-widest">Loading Settings...</p>
//       </div> */}
//     </div>
//   );
// }

export function DNALoader() {
  const dots = Array.from({ length: 12 });

  return (
    // 👇 FIX: 'fixed inset-0 z-[9999]' forces it to cover the WHOLE screen
    // This ignores all padding and sits on top of the Sidebar/Navbar
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-background gap-8">
      
      {/* Container (h-20 w-60) */}
      <div className="relative flex items-center justify-center h-20 w-60 perspective-[200px]">
        {dots.map((_, i) => (
          <div 
            key={i} 
            className="absolute h-full w-4 flex flex-col justify-between items-center"
            style={{ 
              left: `${i * 18}px`, 
              animation: "spinPair 4s linear infinite", 
              animationDelay: `${i * -0.3}s`, 
            }}
          >
            <div className="h-3 w-3 rounded-full bg-info shadow-sm" />
            <div className="w-[1px] h-full bg-info/20" />
            <div className="h-3 w-3 rounded-full bg-info/40" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 animate-pulse">
        {/* Optional text */}
      </div>
    </div>
  );
}
</file>

<file path="src/lib/prisma.ts">
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// This function ensures the user exists in our DB
export async function getSomaUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const primaryEmail =
    clerkUser.emailAddresses[0]?.emailAddress ?? clerkUser.primaryEmailAddress?.emailAddress;
  if (!primaryEmail) return null;

  const existing = await prisma.user.findUnique({ where: { email: primaryEmail } });
  if (existing) return existing;   // never rewrite id — keeps child rows intact

  return prisma.user.create({ data: { id: clerkUser.id, email: primaryEmail } });
}
</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/src/generated/prisma

# PWA files
public/sw.js
public/sw.js.map
public/workbox-*.js
public/workbox-*.js.map
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // swcMinify: true,  <-- REMOVED (Deprecated in Next.js 13+)
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  compress: true,
  images: {
    remotePatterns: [
        { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        { protocol: 'https', hostname: 'img.clerk.com' },
        { protocol: 'https', hostname: 'somafit-01.s3.ap-south-1.amazonaws.com' },
    ],
  },
};

export default withPWA(nextConfig);
</file>

<file path="src/app/sitemap.ts">
import { MetadataRoute } from 'next';
import { guides } from '@/lib/guides'; // Import your guides data

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.somafit.in';

  // 1. Define your static pages
  const staticRoutes = [
    '/',
    '/guides',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Generate dynamic URLs for your guides
  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.date), // Uses the guide's date
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine them
  return [...staticRoutes, ...guideRoutes];
}
</file>

<file path="src/app/robots.ts">
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 👇 CHANGE: Removed trailing slashes to ensure strict blocking
      disallow: [
        '/actions',
        '/analysis',
        "/api", 
        "/dashboard", 
        '/deadlines',
        "/feedback",
        "/history", 
        '/notes',
        "/profile",
        "/settings", 
        '/sign-in',
        '/sign-up',
        "/tasks", 
      ],
    },
    sitemap: 'https://www.somafit.in/sitemap.xml',
  };
}
</file>

<file path="src/components/WeeklyChart.tsx">
"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { parseISO, isSameDay, subDays } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// --- CONFIGURATION ---
const chartConfig = {
  in: {
    label: "Consumed",
    color: "hsl(24.6 95% 53.1%)", // Orange
  },
  out: {
    label: "Burned",
    color: "#ef4444", // Red
  },
  done: {
    label: "Tasks Done",
    color: "#8b5cf6", // Violet
  },
  pending: {
    label: "Tasks Pending",
    color: "#eab308", // Yellow/Amber
  },
  // 👇 NEW: Macro configurations
  protein: {
    label: "Protein",
    color: "#3b82f6", // Blue
  },
  carbs: {
    label: "Carbs",
    color: "#10b981", // Emerald
  },
  fats: {
    label: "Fats",
    color: "#f59e0b", // Amber
  },
} satisfies ChartConfig;

export default function WeeklyChart({ logs, tasks = [] }: { logs: any[]; tasks?: any[] }) {
  // 1. View States (Added 'macros')
  const [activeView, setActiveView] = React.useState<"calories" | "macros" | "tasks">("calories");
  
  // Sub-toggles
  const [activeCalorieMetric, setActiveCalorieMetric] = React.useState<"in" | "out">("in");
  const [activeTaskMetric, setActiveTaskMetric] = React.useState<"done" | "pending">("done");
  // 👇 NEW: Sub-toggle for macros
  const [activeMacroMetric, setActiveMacroMetric] = React.useState<"protein" | "carbs" | "fats">("protein");
  
  // 2. Time Range State
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("7d");

  // 3. Process Data based on Range
  const chartData = React.useMemo(() => {
    const today = new Date();
    const daysToSubtract = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;
    const dataPoints = [];

    for (let i = daysToSubtract - 1; i >= 0; i--) {
      const d = subDays(today, i);
      dataPoints.push(d);
    }

    return dataPoints.map((dayDate) => {
      // Filter Logs
      const dayLogs = logs.filter((log) => {
        const logDate = typeof log.date === "string" ? parseISO(log.date) : log.date;
        return isSameDay(dayDate, logDate);
      });

      const totalIn = dayLogs.reduce((acc, log) => acc + (log.totalCaloriesIn || 0), 0);
      const totalOut = dayLogs.reduce((acc, log) => acc + (log.totalCaloriesOut || 0), 0);

      // 👇 NEW: Extract Macros from foods
      let dailyProtein = 0;
      let dailyCarbs = 0;
      let dailyFats = 0;

      dayLogs.forEach((log) => {
        if (log.parsedData?.foods && Array.isArray(log.parsedData.foods)) {
          log.parsedData.foods.forEach((food: any) => {
            dailyProtein += food.protein || 0;
            dailyCarbs += food.carbs || 0;
            dailyFats += food.fats || 0;
          });
        }
      });

      // Filter Tasks (Done vs Pending)
      const dayTasks = tasks.filter((task) => {
        const taskDateVal = task.date || task.startTime;
        if (!taskDateVal) return false;
        const taskDate = typeof taskDateVal === "string" ? parseISO(taskDateVal) : taskDateVal;
        return isSameDay(dayDate, taskDate);
      });

      const doneCount = dayTasks.filter(t => t.isCompleted).length;
      const pendingCount = dayTasks.filter(t => !t.isCompleted).length;

      return {
        date: dayDate.toISOString(),
        in: totalIn,
        out: totalOut,
        protein: dailyProtein,
        carbs: dailyCarbs,
        fats: dailyFats,
        done: doneCount,
        pending: pendingCount,
      };
    });
  }, [logs, tasks, timeRange]);

  // 4. Calculate Totals (Dynamic based on range)
  const total = React.useMemo(
    () => ({
      in: chartData.reduce((acc, curr) => acc + curr.in, 0),
      out: chartData.reduce((acc, curr) => acc + curr.out, 0),
      done: chartData.reduce((acc, curr) => acc + curr.done, 0),
      pending: chartData.reduce((acc, curr) => acc + curr.pending, 0),
      // 👇 NEW: Macro totals
      protein: chartData.reduce((acc, curr) => acc + curr.protein, 0),
      carbs: chartData.reduce((acc, curr) => acc + curr.carbs, 0),
      fats: chartData.reduce((acc, curr) => acc + curr.fats, 0),
    }),
    [chartData]
  );

  // Helper to determine the active data key for the line
  const currentDataKey = 
    activeView === 'calories' ? activeCalorieMetric : 
    activeView === 'macros' ? activeMacroMetric : 
    activeTaskMetric;

  return (
    <Card className="border-border/50 bg-card/50 shadow-sm h-full">
      <CardHeader className="flex flex-col items-stretch border-b border-border/40 p-0 sm:flex-row">
        
        {/* Title Section */}
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-3 sm:py-4">
          <CardTitle className="text-base">History</CardTitle>
          <CardDescription className="text-xs">
            {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 3 months"}
          </CardDescription>
        </div>

        {/* Totals Display */}
        <div className="flex">
            {activeView === 'tasks' ? (
                <>
                    <button
                        data-active={activeTaskMetric === "done"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveTaskMetric("done")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.done.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                            {total.done.toLocaleString()}
                        </span>
                    </button>
                    <button
                        data-active={activeTaskMetric === "pending"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveTaskMetric("pending")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.pending.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                            {total.pending.toLocaleString()}
                        </span>
                    </button>
                </>
            ) : activeView === 'macros' ? (
                <>
                    {/* 👇 NEW: Macro Buttons */}
                    <button
                        data-active={activeMacroMetric === "protein"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-3 py-2 text-left data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-4 sm:py-4 transition-all"
                        onClick={() => setActiveMacroMetric("protein")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.protein.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-xl">
                            {Math.round(total.protein).toLocaleString()}<span className="text-sm text-muted-foreground ml-0.5">g</span>
                        </span>
                    </button>
                    <button
                        data-active={activeMacroMetric === "carbs"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-3 py-2 text-left border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:px-4 sm:py-4 transition-all"
                        onClick={() => setActiveMacroMetric("carbs")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.carbs.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-xl">
                            {Math.round(total.carbs).toLocaleString()}<span className="text-sm text-muted-foreground ml-0.5">g</span>
                        </span>
                    </button>
                    <button
                        data-active={activeMacroMetric === "fats"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-3 py-2 text-left border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:px-4 sm:py-4 transition-all"
                        onClick={() => setActiveMacroMetric("fats")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.fats.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-xl">
                            {Math.round(total.fats).toLocaleString()}<span className="text-sm text-muted-foreground ml-0.5">g</span>
                        </span>
                    </button>
                </>
            ) : (
                <>
                    <button
                        data-active={activeCalorieMetric === "in"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveCalorieMetric("in")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {chartConfig.in.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                        {total.in.toLocaleString()}
                        </span>
                    </button>
                    <button
                        data-active={activeCalorieMetric === "out"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveCalorieMetric("out")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {chartConfig.out.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                        {total.out.toLocaleString()}
                        </span>
                    </button>
                </>
            )}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-4">
        
        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
            
            {/* View Switcher */}
            <div className="bg-muted/50 p-0.5 rounded-lg flex gap-1">
                <button 
                    onClick={() => setActiveView("calories")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${activeView === 'calories' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Calories
                </button>
                {/* 👇 NEW: Macros Button */}
                <button 
                    onClick={() => setActiveView("macros")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${activeView === 'macros' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Macros
                </button>
                <button 
                    onClick={() => setActiveView("tasks")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${activeView === 'tasks' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Tasks
                </button>
            </div>

            {/* Time Range Switcher */}
            <div className="bg-muted/50 p-0.5 rounded-lg flex gap-1">
                <button 
                    onClick={() => setTimeRange("7d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '7d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    7D
                </button>
                <button 
                    onClick={() => setTimeRange("30d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '30d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    30D
                </button>
                <button 
                    onClick={() => setTimeRange("90d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '90d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    3M
                </button>
            </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 0, top: 5, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" opacity={0.4} />
            
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (timeRange === "7d") {
                    return date.toLocaleDateString("en-US", { weekday: "short" });
                }
                return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
              }}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  nameKey={currentDataKey}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  // Append 'g' for macros in the tooltip
                  formatter={(value, name) => {
                    const suffix = activeView === 'macros' ? 'g' : '';
                    return [
                        <span key={name as string} className="font-semibold">{Math.round(value as number)}{suffix}</span>, 
                        chartConfig[name as keyof typeof chartConfig]?.label || name
                    ];
                  }}
                />
              }
            />
            
            <Line
              dataKey={currentDataKey}
              type="monotone"
              stroke={`var(--color-${currentDataKey})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
</file>

<file path="src/app/api/tasks/route.ts">
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
</file>

<file path="src/app/settings/page.tsx">
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, Lock, Info, X, Download, AlertTriangle, Check, Moon, Sun, Monitor } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePanel } from "@/components/account/profile-panel";
import { EnableNotifications } from "@/components/EnableNotifications";

// Helper functions to convert between metric and imperial
const toImperialHeight = (cm: string) => (Number(cm) / 30.48).toFixed(1); // cm -> ft
const toMetricHeight = (ft: string) => (Number(ft) * 30.48).toFixed(0);   // ft -> cm
const toImperialWeight = (kg: string) => (Number(kg) * 2.20462).toFixed(0); // kg -> lbs
const toMetricWeight = (lbs: string) => (Number(lbs) / 2.20462).toFixed(1); // lbs -> kg

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const { user, isLoaded } = useUser();
  const { setTheme, theme } = useTheme();

  const [tab, setTab] = useState("profile");

  const [deleteStep, setDeleteStep] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);

  const [form, setForm] = useState({
    nationality: "",
    height: "",
    weight: "",
    apiKey: "",
    unitPreference: "metric",
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch(`/api/settings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm((prev) => ({
            ...prev,
            nationality: data.data.nationality || "",
            height: data.data.height || "",
            weight: data.data.weight || "",
            unitPreference: data.data.unitPreference || "metric",
          }));
          setHasKey(data.data.hasKey);
        }
        setLoading(false);
      });
  }, [isLoaded, user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);

    let payload = { ...form };
    if (form.unitPreference === "imperial") {
      payload.height = toMetricHeight(form.height);
      payload.weight = toMetricWeight(form.weight);
    }

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, ...payload }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Settings Saved", { description: "Your preferences have been updated." });
        if (form.apiKey) setHasKey(true);
        setForm((prev) => ({ ...prev, apiKey: "" }));
      }
    } catch {
      toast.error("Error", { description: "Could not save settings." });
    } finally {
      setSaving(false);
    }
  }

  async function handleExport() {
    if (!user) return;
    window.open(`/api/export?userId=${user.id}`, "_blank");
  }

  async function confirmDeactivation() {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        window.location.href = "/";
      } else {
        setDeleteStep(0);
        toast.error("Failed to Deactivate", { description: "Please try again later." });
        setIsDeleting(false);
      }
    } catch {
      setDeleteStep(0);
      setSimpleModal({ title: "Error", msg: "Something went wrong.", isError: true });
      setIsDeleting(false);
    }
  }

  if (!isLoaded || loading) return <DNALoader />;

  const toggleUnit = (newUnit: string) => {
    if (newUnit === form.unitPreference) return;
    setForm((prev) => {
      if (newUnit === "imperial") {
        return {
          ...prev,
          unitPreference: "imperial",
          height: prev.height ? toImperialHeight(prev.height) : "",
          weight: prev.weight ? toImperialWeight(prev.weight) : "",
        };
      } else {
        return {
          ...prev,
          unitPreference: "metric",
          height: prev.height ? toMetricHeight(prev.height) : "",
          weight: prev.weight ? toMetricWeight(prev.weight) : "",
        };
      }
    });
  };

  const showSaveBar = tab === "preferences" || tab === "data";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      <div
        className={`max-w-4xl mx-auto space-y-8 transition-all ${
          deleteStep > 0 || simpleModal ? "blur-sm scale-[0.98] opacity-80" : ""
        }`}
      >
        {/* HEADER */}
        <div className="border-b border-border pb-6 animate-fade-up">
          <h1 className="text-3xl font-bold text-foreground">Account</h1>
          <p className="text-muted-foreground mt-1">
            Your profile, preferences and privacy — all in one place.
          </p>
        </div>

        {/* TABS */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-8">
          <TabsList className="bg-muted/60 p-1 rounded-xl flex-wrap h-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>

          {/* ================= PROFILE TAB ================= */}
          <TabsContent value="profile">
            <ProfilePanel />
          </TabsContent>

          {/* ================= PREFERENCES TAB ================= */}
          <TabsContent value="preferences" className="space-y-6 animate-fade-in">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    Physical Profile
                    <InfoPopup text="This data helps the AI calibrate calories specifically for your body type." />
                  </CardTitle>

                  {/* UNIT TOGGLE */}
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => toggleUnit("metric")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all press ${
                        form.unitPreference === "metric" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      Metric
                    </button>
                    <button
                      onClick={() => toggleUnit("imperial")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all press ${
                        form.unitPreference === "imperial" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      Imperial
                    </button>
                  </div>
                </div>
                <CardDescription>Calibrate Soma for your body metrics.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Nationality / Cultural Background</Label>
                  <Input
                    value={form.nationality}
                    onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    placeholder="e.g. Indian, Japanese, Mediterranean"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Height ({form.unitPreference === "metric" ? "cm" : "ft"})</Label>
                    <Input
                      value={form.height}
                      onChange={(e) => setForm({ ...form, height: e.target.value })}
                      placeholder={form.unitPreference === "metric" ? "175" : "5.9"}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Weight ({form.unitPreference === "metric" ? "kg" : "lbs"})</Label>
                    <Input
                      value={form.weight}
                      onChange={(e) => setForm({ ...form, weight: e.target.value })}
                      placeholder={form.unitPreference === "metric" ? "70" : "150"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= APPEARANCE TAB ================= */}
          <TabsContent value="appearance" className="animate-fade-in">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Theme Preferences
                  <InfoPopup text="Choose how Soma looks on your device." />
                </CardTitle>
                <CardDescription>Light, dark, or system-based appearance.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all press ${
                      theme === "light" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Sun className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">Light</span>
                  </button>

                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all press ${
                      theme === "dark" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Moon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">Dark</span>
                  </button>

                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all press ${
                      theme === "system" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Monitor className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">System</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= NOTIFICATIONS TAB ================= */}
          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Push Notifications
              </h3>
              <EnableNotifications />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reminders are delivered to this device. You can turn them off any time, and each
              device manages its own subscription.
            </p>
          </TabsContent>

          {/* ================= DATA TAB ================= */}
          <TabsContent value="data" className="space-y-6 animate-fade-in">
            {/* VAULT */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-600" /> AI Configuration
                    </CardTitle>
                    <CardDescription>Bring your own Gemini API key. Stored with AES-256 encryption.</CardDescription>
                  </div>

                  {hasKey && (
                    <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-200">
                      <CheckCircle className="w-3 h-3" /> Key Active
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Google Gemini API Key</Label>
                  <Input
                    type="password"
                    placeholder={hasKey ? "••••••••••••••••" : "AIzaSy..."}
                    value={form.apiKey}
                    onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Don't have one?{" "}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline text-primary hover:text-primary/80">
                      Get it free here
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* EXPORT */}
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Download your entire health history as CSV.</p>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardContent>
            </Card>

            {/* DANGER ZONE */}
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Permanently deactivate your account.</p>
                <Button variant="destructive" onClick={() => setDeleteStep(1)}>
                  Deactivate
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* STICKY SAVE BAR — only for settings-backed tabs */}
        {showSaveBar && (
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border md:static md:bg-transparent md:border-none md:p-0 flex justify-end z-40">
            <Button onClick={handleSave} disabled={saving} size="lg" className="w-full md:w-auto shadow-lg md:shadow-none hover-lift">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* ================= MODALS ================= */}
      {deleteStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          {deleteStep === 1 && (
            <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 animate-scale-in">
              <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">Are you sure?</h3>
                <p className="text-sm text-muted-foreground">This will begin the process of deactivating your account.</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setDeleteStep(0)} className="w-auto">Cancel</Button>
                <Button onClick={() => setDeleteStep(2)} className="w-auto">Continue</Button>
              </div>
            </div>
          )}

          {deleteStep === 2 && (
            <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-slide-right">
              <div className="flex items-start gap-4">
                <div className="bg-info/10 p-3 rounded-full shrink-0">
                  <Info className="w-6 h-6 text-info" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Safety & Grace Period</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="mb-3">We don't want you to lose data by accident.</p>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Your account will be <strong>hidden immediately</strong>.</li>
                      <li>You have <strong>15 days</strong> to log back in and restore everything.</li>
                      <li>After 15 days, your data is <strong>deleted forever</strong>.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button variant="ghost" onClick={() => setDeleteStep(1)}>Back</Button>
                <Button variant="destructive" onClick={confirmDeactivation} disabled={isDeleting} className="gap-2">
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Confirm Deactivation
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {simpleModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-scale-in">
            <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? "bg-destructive/10 text-destructive" : "bg-success/10 text-emerald-600"}`}>
                {simpleModal.isError ? <AlertTriangle className="w-6 h-6" /> : <Check className="w-6 h-6" />}
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-lg font-bold text-foreground">{simpleModal.title}</h3>
                <p className="text-sm text-muted-foreground">{simpleModal.msg}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"}>
                Okay, got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex ml-2 items-center">
      <Info onClick={() => setOpen(!open)} className="w-4 h-4 text-muted-foreground hover:text-info cursor-pointer transition-colors" />

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50">
            <div className="relative bg-primary text-primary-foreground text-xs rounded-lg shadow-2xl p-4 pr-10 w-96 animate-scale-in">
              <p className="leading-relaxed">{text}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="absolute top-2 right-2 p-1 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
</file>

<file path="src/app/page.tsx">
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSlider } from "@/components/landing/FeatureSlider";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* 1. Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <FeatureSlider />
        <FeaturesBento />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
</file>

<file path="src/app/tasks/page.tsx">
"use client";

import { useState, useEffect } from "react";
import { format, isToday } from "date-fns";
import { Plus, Repeat, AlignLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { TaskList } from "@/components/tasks/task-list";
import { TimelineView } from "@/components/tasks/timeline-view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { ensureTodaysHabits } from "@/app/actions/habits";

export default function TasksPage() {

//###################################################################################################################################################
// STATES & REFS

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [newTask, setNewTask] = useState({title: "", description: "", priority: "LOW", isRecurring: false, date: format(new Date(), "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: [] as any[] });
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  const [activeTab, setActiveTab] = useState("tasks");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

// ##################################################################################################################################################
// FUNCTIONS

// Fetch tasks for the selected date. When the selected date is TODAY we first
// run ensureTodaysHabits() — the same idempotent safety-net the dashboard uses —
// so habit instances exist even when the user opens /tasks before /dashboard.
useEffect(() => {
    const timer = setTimeout(async () => {
        try {
            if (isToday(selectedDate)) {
                await ensureTodaysHabits(
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                ).catch(() => {});
            }
        } finally {
            fetchTasks();
        }
    }, 400);

    return () => clearTimeout(timer);
}, [selectedDate]);

async function handleDropTask(e: React.DragEvent, hour: number) {
      e.preventDefault();
      if (!draggedTaskId) return;

      const taskToUpdate = tasks.find(t => t.id === draggedTaskId);
      if (!taskToUpdate) return;

      const newStartTime = new Date(selectedDate);
      newStartTime.setHours(hour);
      newStartTime.setMinutes(0);
      newStartTime.setSeconds(0);

      setTasks(prev => prev.map(t =>
          t.id === draggedTaskId ? { ...t, startTime: newStartTime } : t
      ));

      await fetch("/api/tasks", {
          method: "PATCH",
          body: JSON.stringify({
              taskId: draggedTaskId,
              startTime: newStartTime
          })
      });

      setDraggedTaskId(null);
  }


  function openAddModalAtTime(timeString: string) {
      setEditingId(null);
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: timeString,
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setIsAdding(true);
  }


  const filteredTasks = tasks.filter(t => {
      if (activeTab === 'habits') return t.priority === "HABIT" || t.isRecurring;
      return t.priority !== "HABIT" && !t.isRecurring;
  });


  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${format(selectedDate, "yyyy-MM-dd")}`);
        const data = await res.json();
        if (data.success) setTasks(data.tasks);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }


  function openEditModal(task: any) {
      setEditingId(task.id);
      setNewTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          isRecurring: task.priority === "HABIT" || task.isRecurring,
          date: task.date ? format(new Date(task.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          startTime: task.startTime ? format(new Date(task.startTime), "HH:mm") : "",
          duration: task.durationMins ? task.durationMins.toString() : "60",
          subtasks: task.subtasks || []
      });
      setIsAdding(true);
  }


  async function handleSaveTask() {
    let finalPriority = newTask.priority;
    if (!newTask.isRecurring && newTask.priority === "HABIT") {
        finalPriority = "LOW";
    } else if (newTask.isRecurring) {
        finalPriority = "HABIT";
    }

    const newSubtasksToAdd = newTask.subtasks.filter((st: any) => !st.id);
    const targetDateObj = new Date(newTask.date);
    const startTimeObj = newTask.startTime
        ? new Date(`${newTask.date}T${newTask.startTime}`)
        : null;

    const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: finalPriority,
        isRecurring: newTask.isRecurring,

        date: targetDateObj,
        startTime: startTimeObj,
        duration: newTask.duration ? parseInt(newTask.duration) : 60,

        newSubtasks: newSubtasksToAdd,
        subtasks: newTask.subtasks
    };

    let res;
    if (editingId) {
        res = await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ taskId: editingId, ...payload })
        });
    } else {
        res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }

    const data = await res.json();
    if (data.success) {
        setIsAdding(false);
        resetForm();
        fetchTasks();
    } else {
        alert(data.error || "Operation failed");
    }
  }


  function resetForm() {
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: "",
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setEditingId(null);
  }



  async function toggleTask(id: string, currentStatus: boolean) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
    await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId: id, isCompleted: !currentStatus })
    });
  }


  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, isCompleted: !currentStatus } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, isCompleted: !currentStatus })
    });
  }


  async function updateSubtaskProgress(taskId: string, subtaskId: string, newValue: number) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, currentValue: newValue } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, subtaskValue: newValue })
    });
  }


  async function handleDeleteTask(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
  }

return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
        {loading && <DNALoader/>}
        {/* 1. Header */}
        <header className="h-16 border-b border-border/50 bg-background/70 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-10 gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="min-w-0 flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "pl-0 text-lg md:text-2xl font-bold tracking-tight text-foreground/90 hover:bg-transparent hover:text-primary transition-colors justify-start h-auto p-0"
                                )}
                            >
                                <span className="truncate">
                                    {format(selectedDate, "EEEE, MMM do, yyyy")}
                                </span>
                                <ChevronDown className="ml-2 h-5 w-5 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-border" align="start">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                                fromYear={2024}
                                toYear={new Date().getFullYear() + 5}
                                className="rounded-md border-0"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex md:hidden bg-secondary/60 p-1 rounded-lg border border-border/50">
                <button
                onClick={() => setMobileView("list")}
                className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all press",
                    mobileView === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
                >
                List
                </button>
                <button
                onClick={() => setMobileView("timeline")}
                className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all press",
                    mobileView === "timeline" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
                >
                Time
                </button>
            </div>
        </header>


        {/* 2. Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

            {/* === Left Column (List) === */}
            <aside className={cn(
                "w-full md:w-[400px] xl:w-[450px] border-r border-border/50 bg-background/40 flex-col shrink-0 relative",
                mobileView === 'list' ? 'flex h-full' : 'hidden md:flex'
            )}>
                {/* Tabs Header */}
                <div className="p-4 border-b border-border/50 shrink-0">
                    <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="tasks" className="gap-2"><AlignLeft className="w-4 h-4"/> Tasks</TabsTrigger>
                            <TabsTrigger value="habits" className="gap-2"><Repeat className="w-4 h-4"/> Habits</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Scrollable List Area */}
                <div className="flex-1 overflow-y-auto pb-40 md:pb-24 custom-scrollbar animate-fade-in">
                    <TaskList
                        loading={loading}
                        tasks={filteredTasks}
                        activeTab={activeTab}
                        onDragStart={setDraggedTaskId}
                        onToggle={toggleTask}
                        onSubToggle={toggleSubtask}
                        onSubProgress={updateSubtaskProgress}
                        onDelete={handleDeleteTask}
                        onEdit={openEditModal}
                    />
                </div>

                {/* STICKY ADD BUTTON */}
                <div className="absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-10 z-20">
                    <Button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="w-full shadow-xl shadow-primary/25 h-12 text-sm font-semibold rounded-xl hover-lift"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add New Task
                    </Button>
                </div>
            </aside>

            {/* === Right Column (Timeline) === */}
            <main className={cn(
                "flex-1 overflow-y-auto bg-background/40 relative custom-scrollbar flex justify-center pt-3 pb-24 md:pb-5",
                mobileView === 'timeline' ? 'flex' : 'hidden md:flex'
            )}>
                <TimelineView
                    tasks={filteredTasks}
                    loading={loading}
                    onTimeSlotClick={openAddModalAtTime}
                    onDropTask={handleDropTask}
                    draggedTaskId={draggedTaskId}
                    onEdit={openEditModal}
                />
            </main>
        </div>

        {/* 3. Dialog */}
        <AddTaskDialog
            isOpen={isAdding}
            onOpenChange={(open: boolean) => { setIsAdding(open); if(!open) resetForm(); }}
            task={newTask}
            setTask={setNewTask}
            subtask={newSubtask}
            setSubtask={setNewSubtask}
            onSave={handleSaveTask}
            isEditing={!!editingId}
        />
    </div>
  );
}
</file>

<file path="prisma/schema.prisma">
// prisma/schema.prisma
// SomaFit v5 — hardened schema
// Key changes vs v4:
//  - NEW: HabitTemplate + HabitSubtaskTemplate  (the per-user "source of truth" for habits)
//  - Task now documents parentId => HabitTemplate.id (instances of a template)
//  - Added User relations + onDelete: Cascade for Deadline / Note / DailyMetrics / UserReadGuide
//  - DailyLog relation switched RESTRICT -> Cascade so users can actually be deleted
//  - DailyLog.type ("MEAL" | "WATER") so water logs stop polluting streaks/badges
//  - Added indexes on hot query paths
//  - User.timezone, User.streakFreezes, notification-preference fields

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String   @id @default(uuid())
  email          String   @unique
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Physical Profile
  nationality    String?
  height         Float?   // cm
  weight         Float?   // kg

  // API key vault (optional per-user key)
  encryptedApiKey String?
  apiKeyIv        String?

  // Lifecycle
  scheduledForDeletion DateTime?

  // Preferences
  unitPreference  String  @default("metric")
  timezone        String  @default("UTC")   // IANA tz, e.g. "Asia/Kolkata" — drives habit generation

  // Profile
  age               Int?
  gender            String?
  activityLevel     String?
  jobType           String?
  dietaryPreferences String?

  // Goals
  customPurpose     String?
  weightGoal        String?
  targetWeight      Float?
  dailyCalorieGoal  Int      @default(2000)
  waterGoal         Int      @default(2500)
  autoGoals         Boolean  @default(true)  // recompute goals from stats + trend

  // Gamification
  streakFreezes     Int      @default(2)     // "freeze" tokens that save a broken streak

  // Notification preferences
  notifyEnabled     Boolean  @default(true)
  quietHoursStart   Int?     // 0-23 local hour
  quietHoursEnd     Int?     // 0-23 local hour

  // Membership
  plan              String   @default("Free")
  joinedAt          DateTime @default(now())

  // Relations
  logs              DailyLog[]
  tasks             Task[]
  habitTemplates    HabitTemplate[]
  metrics           DailyMetrics[]
  deadlines         Deadline[]
  notes             Note[]
  readGuides        UserReadGuide[]
  feedback          Feedback[]
  pushSubscriptions PushSubscription[]
}

model PushSubscription {
  id        String   @id @default(cuid())
  userId    String
  endpoint  String   @unique
  p256dh    String
  auth      String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model DailyLog {
  id             String   @id @default(uuid())
  userId         String
  date           DateTime @default(now())

  type           String   @default("MEAL") // "MEAL" | "WATER" — WATER rows are excluded from streaks/badges

  rawText        String   @db.Text
  parsedData     Json?

  totalCaloriesIn  Int      @default(0)
  totalCaloriesOut Int      @default(0)
  waterMl          Int      @default(0)

  aiFeedback       String?  @db.Text

  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, date])
  @@index([userId, type, date])
}

model Task {
  id             String    @id @default(cuid())
  userId         String
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  title          String
  description    String?   @db.Text

  date           DateTime  // day this task belongs to (stored at local-midnight UTC)
  startTime      DateTime?
  durationMins   Int?

  isRecurring    Boolean   @default(false)
  frequency      String?
  parentId       String?   // For HABIT instances: the source HabitTemplate.id

  priority       String    // "HIGH" | "MEDIUM" | "LOW" | "HABIT"
  isCompleted    Boolean   @default(false)

  subtasks       SubTask[]

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  lastNotifiedAt DateTime?

  // A given habit template can only be instantiated once per day per user
  @@unique([userId, parentId, date])
  @@index([userId, date])
}

model SubTask {
  id           String   @id @default(cuid())
  taskId       String
  task         Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)

  title        String
  isCompleted  Boolean  @default(false)

  targetValue  Int?
  currentValue Int?     @default(0)
  unit         String?

  @@index([taskId])
}

// ============================================================
//  HABIT TEMPLATES  — the per-user source of truth for habits.
//  Daily Task rows (priority HABIT) are *instances* generated
//  from these templates. Notes / one-off tasks are never copied.
// ============================================================
model HabitTemplate {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  title        String
  description  String?   @db.Text

  startTime    DateTime? // only the time-of-day component is used
  durationMins Int?      @default(60)

  // 0 = Sunday ... 6 = Saturday. Default = every day.
  daysOfWeek   Int[]     @default([0, 1, 2, 3, 4, 5, 6])

  isActive     Boolean   @default(true)
  order        Int       @default(0)

  subtasks     HabitSubtaskTemplate[]

  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([userId, isActive])
}

model HabitSubtaskTemplate {
  id          String        @id @default(cuid())
  habitId     String
  habit       HabitTemplate @relation(fields: [habitId], references: [id], onDelete: Cascade)

  title       String
  targetValue Int?
  unit        String?
  order       Int           @default(0)

  @@index([habitId])
}

model UserReadGuide {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  guideSlug String
  readAt    DateTime @default(now())

  @@unique([userId, guideSlug])
}

model Feedback {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  rating    Int
  category  String
  answers   Json

  createdAt DateTime @default(now())

  @@index([userId])
}

model DailyMetrics {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date        DateTime // local-midnight UTC

  steps       Int      @default(0)
  stepSource  String   @default("MANUAL")

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, date])
  @@index([userId, date])
}

model Deadline {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String

  startDate   DateTime  @default(now())
  targetDate  DateTime?

  isCompleted Boolean   @default(false)
  completedAt DateTime?

  subtasks    DeadlineSubtask[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId])
}

model DeadlineSubtask {
  id          String   @id @default(cuid())
  title       String
  isCompleted Boolean  @default(false)

  deadlineId  String
  deadline    Deadline @relation(fields: [deadlineId], references: [id], onDelete: Cascade)

  @@index([deadlineId])
}

model Note {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  content   String   @db.Text

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, updatedAt])
}
</file>

<file path="src/app/history/page.tsx">
"use client";

import { useEffect, useState, useMemo} from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Clock , Trash2, Check, AlertTriangle, X, Plus, PenLine, ChevronDown, LayoutGrid, List } from "lucide-react";
import { MessageSquare, Target, Utensils, Activity, Flame, ChevronRight } from "lucide-react";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { Button } from "@/components/ui/button"; // Import Button
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddLogDialog } from "@/components/history/add-log-dialog";
import { HistoryTaskList } from "@/components/history/history-task-list";
import { HistoryTimeline } from "@/components/history/history-timeline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // 👈 Add this
import { Footprints } from "lucide-react"; // 👈 Add Footprints
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { getDailySteps } from "@/app/actions/steps"; // 👈 Import the action we made earlier

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

// 👇 MODAL STATES
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  //   Track which tab is open so the button knows what to do
  const [activeTab, setActiveTab] = useState("diet");

  // Task specific states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

// 👇 NEW: ADD LOG STATE
  const [isAdding, setIsAdding] = useState(false); 
  const [newLogText, setNewLogText] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);
  
  // Inside HistoryPage component, near other state variables
  const [tasks, setTasks] = useState<any[]>([]); // 👈 NEW: Store history tasks
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [dailySteps, setDailySteps] = useState(0);

  const [newTask, setNewTask] = useState({
      title: "", 
      description: "", 
      priority: "MEDIUM", 
      isRecurring: false, 
      date: format(new Date(), "yyyy-MM-dd"), // Default date
      startTime: "", 
      duration: "60", 
      subtasks: [] as any[] 
  });

  // 👇 1. New State for Layout Preference
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false);

  // 👇 2. Load saved preference on mount
  useEffect(() => {
    const savedView = localStorage.getItem("dietViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
  }, []);

  // 👇 3. Handle saving the preference
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("dietViewMode", mode);
  };


async function handleAddTask() {
  // Check against full object title
  if (!newTask.title.trim() || !date || !user) return;
  
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        ...newTask, // Spread all fields (description, priority, etc.)
        userId: user.id,
        // Override date with the history page's selected date context
        date: format(date, "yyyy-MM-dd"), 
        isCompleted: false
      })
    });
    
    if (res.ok) {
        toast.success("Task added to history");
        // Reset form
        setNewTask({ 
            title: "", description: "", priority: "MEDIUM", isRecurring: false, 
            date: format(date, "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: [] 
        });
        setIsAddingTask(false);
        fetchTasks(); 
    }
  } catch (e) {
    console.error(e);
  }
}
// 2. Delete a Task
async function confirmDeleteTask() {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
        await fetch(`/api/tasks?taskId=${taskToDelete}`, { method: "DELETE" });
        setTasks(prev => prev.filter(t => t.id !== taskToDelete));
        toast.success("Task deleted");
    } catch (e) {
        toast.error("Could not delete task");
    } finally {
        setIsDeleting(false);
        setTaskToDelete(null);
    }
}

  const filteredHistoryTasks = useMemo(() => {
    if (!date) return [];
    const target = format(date, "yyyy-MM-dd");

    return tasks.filter(t =>
        format(new Date(t.date), "yyyy-MM-dd") === target
    );
    }, [tasks, date]);



  useEffect(() => {
      if (!isLoaded || !user) return;
      
      setLoading(true);
      // 👇 CHANGED: Fetch both in parallel
      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]); // Added 'date' to dependencies so it refetches on change

  // 👇 NEW: Helper function to fetch tasks
  async function fetchTasks() {
      try {
          if(!date) return;
          // Reusing your existing Tasks API!
          const res = await fetch(`/api/tasks?date=${format(date, "yyyy-MM-dd")}`);
          const data = await res.json();
          if (data.success) setTasks(data.tasks);
      } catch (e) { console.error("Failed to fetch tasks", e); }
  }

  // 👇 NEW: Handle toggling tasks from history
  async function toggleTaskHistory(taskId: string, currentStatus: boolean) {
    // 1. Optimistic Update (Update UI instantly)
    setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, isCompleted: !currentStatus } : t
    ));

    // 2. Sync with Database
    try {
        await fetch("/api/tasks", { 
            method: "PATCH", 
            body: JSON.stringify({ taskId, isCompleted: !currentStatus }) 
        });
    } catch (e) {
        console.error("Failed to update task", e);
    }
  }

async function fetchLogs() {
    try {
      // 👇 FIX: Define a start date far in the past (e.g., Jan 1, 2024)
      // This ensures the API returns ALL your history, not just the last 14 days.
      const fromDate = new Date("2024-01-01").toISOString();
      const toDate = new Date().toISOString(); // Today

      // 👇 Pass 'from' and 'to' to bypass the "take: 14" limit on the server
      const res = await fetch(`/api/get-logs?userId=${user?.id}&from=${fromDate}&to=${toDate}`);
      
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  // 👇 NEW: Helper to fetch steps
  async function fetchSteps() {
    if (!date) return;
    try {
        // We pass the specific date to your server action
        // Note: You might need to update getDailySteps to accept a date parameter if it doesn't already
        // If your getDailySteps only gets "today", you might need to tweak it or use an API route.
        // Assuming getDailySteps handles the date logic or we pass it:
        const res = await getDailySteps(date); 
        setDailySteps(res.steps);
    } catch (e) {
        console.error("Failed to fetch steps");
    }
  }

  useEffect(() => {
      if (!isLoaded || !user) return;
      
      setLoading(true);
      // 👇 CHANGED: Add fetchSteps to the parallel execution
      Promise.all([fetchLogs(), fetchTasks(), fetchSteps()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]);

 

  // 👇 NEW COMPONENT: Handles Expand/Collapse Logic


  // 👇 NEW: HANDLE ADD LOG (BACKFILL)
  async function handleAddLog() {

    // 👇 ADD 'user' to this check
    if (!newLogText.trim() || !date || !user) {
        return;
    }
    
    setIsSavingLog(true);
    try {
        const res = await fetch("/api/process-log", { 
            method: "POST",
            body: JSON.stringify({
                userText: newLogText,
                userId: user.id,
                date: date.toISOString() // 👈 IMPORTANT: Sends the selected calendar date
            })
        });

        const data = await res.json();
        
        if (data.success) {
            toast.success("Entry added successfully!");
            setNewLogText("");
            setIsAdding(false);
            fetchLogs(); // 👈 Refresh list to show the new card immediately
        } else {
            toast.error(data.error || "Processing Failed", {
                description: data.details
            });
        }
    } catch (e) {
        toast.error("Connection Error"); // 👈 Changed
    } finally {
        setIsSavingLog(false);
    }
  }

  // 👇 1. OPEN CONFIRM MODAL
    function askToDelete(logId: string) {
      setLogToDelete(logId);
    }

  // 👇 2. CONFIRM DELETE
    async function confirmDelete() {
      if (!logToDelete) return;
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/delete-log?id=${logToDelete}&userId=${user?.id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          setLogs((prev) => prev.filter((log) => log.id !== logToDelete));
          setLogToDelete(null);
          toast.success("Record removed successfully");
        } else {
          setLogToDelete(null);
          toast.error("Failed to delete log");
        }
      } catch (error) {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsDeleting(false);
      }
    }

  // 👇 3. MIDNIGHT FIX (Normalizes dates so blue dots show up)
    const daysWithHistory = logs.map(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d;
    });

  // Filter logs for the selected date
  const filteredLogs = logs.filter((log) => {
    if (!date) return false;
    const logDate = new Date(log.date).toDateString();
    const selectedDate = date.toDateString();
    return logDate === selectedDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort Morning -> Night

if (!isLoaded || loading || !isMounted) return <DNALoader />;

  // Helper: Check if selected date is in the future
  const isFutureDate = date ? date > new Date() : false;

 return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. TOP HEADER - Clean & Unified */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
           <div>
               <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  History
               </h1>
               <p className="text-muted-foreground mt-1">Review your daily timeline.</p>
           </div>

           {/* 👇 UNIFIED DATE PICKER (Visible on ALL screens) */}
           <div className="flex items-center gap-3">
                {/* 👇 NEW: Steps Display Badge */}
                <div className="hidden sm:flex items-center gap-2 bg-orange-500/10 text-orange-600 px-3 py-2 rounded-md border border-orange-500/20">
                    <Footprints className="w-4 h-4" />
                    <span className="font-mono font-bold">{dailySteps.toLocaleString()}</span>
                    <span className="text-xs opacity-80">steps</span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal bg-card hover:bg-accent/50 border-border shadow-sm h-10",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-border shadow-xl" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      fromYear={2024} 
                      toYear={new Date().getFullYear() + 5}
                      modifiers={{ hasHistory: daysWithHistory }}
                      modifiersClassNames={{ hasHistory: "bg-primary/10 font-bold text-primary rounded-full" }}
                    />
                  </PopoverContent>
                </Popover>

                {/* Add Entry Button */}
                {/* {date && !isFutureDate && (
                    <Button onClick={() => setIsAdding(true)} className="gap-2 shadow-sm h-10">
                        <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Entry</span>
                    </Button>
                )} */}
           </div>
        </div>

        {/* 2. MAIN CONTENT - Full Width Now */}
        <div className="space-y-6">
            <Tabs defaultValue="diet" className="w-full" onValueChange={(val) => setActiveTab(val)}>
                
                <div className="flex flex-col gap-4 border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                            {date ? format(date, "EEEE, MMMM do") : "Select a Date"}
                        </h2>
                        
                        {/* 2. Make the button smart */}
                        {date && !isFutureDate && activeTab !== 'timeline' && (
                            <Button 
                                size="sm" 
                                // Logic: Tasks tab -> Add Task, Diet tab -> Add Log
                                onClick={() => activeTab === 'tasks' ? setIsAddingTask(true) : setIsAdding(true)} 
                                className="gap-2 shadow-sm"
                            >
                                <Plus className="w-4 h-4" /> 
                                <span className="hidden sm:inline">
                                    {activeTab === 'tasks' ? "Add Task" : "Add Log"}
                                </span>
                            </Button>
                        )}
                    </div>
                    <TabsList className="bg-transparent border-b border-border/40 p-0 h-auto gap-6 rounded-none w-full justify-start">
                        <TabsTrigger value="diet" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Diet
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Tasks
                        </TabsTrigger>
                        <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Timeline
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* --- TABS CONTENT (Same as before) --- */}
                <TabsContent value="diet" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                    {filteredLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                            <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                            <p>No activity recorded.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* 👇 THE TOGGLE SWITCH (Only shows on md screens and up) */}
                            <div className="hidden md:flex justify-end">
                                <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="sm"
                                        className={`h-8 px-3 gap-2 ${viewMode === "list" ? 'shadow-sm' : 'text-muted-foreground'}`}
                                        onClick={() => handleViewChange("list")}
                                    >
                                        <List className="w-4 h-4" /> List
                                    </Button>
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="sm"
                                        className={`h-8 px-3 gap-2 ${viewMode === "grid" ? 'shadow-sm' : 'text-muted-foreground'}`}
                                        onClick={() => handleViewChange("grid")}
                                    >
                                        <LayoutGrid className="w-4 h-4" /> Grid
                                    </Button>
                                </div>
                            </div>

                            {/* 👇 DYNAMIC LAYOUT CLASSES */}
                            <div className={
                                viewMode === "list" 
                                ? "flex flex-col gap-4 w-full" 
                                : "grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
                            }>
                                {filteredLogs.map((log) => (
                                    <HistoryLogCard key={log.id} log={log} onDelete={(id) => setLogToDelete(id)} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="tasks" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                        {/* 👇 Pass the delete handler to the list */}
                        <HistoryTaskList 
                            tasks={filteredHistoryTasks} 
                            onToggle={toggleTaskHistory} 
                            onDelete={(id) => setTaskToDelete(id)} 
                        />
                    </TabsContent>

                <TabsContent value="timeline" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                    <HistoryTimeline tasks={tasks} />
                </TabsContent>
            </Tabs>
        </div>

      </div>
      {/* --- MODALS --- */}
      <AddLogDialog 
        isOpen={isAdding} 
        onOpenChange={setIsAdding} 
        date={date} 
        text={newLogText} 
        onTextChange={setNewLogText} 
        onSave={handleAddLog} 
        isSaving={isSavingLog} 
      />

      {logToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 border border-border">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center"><Trash2 className="h-6 w-6 text-destructive" /></div>
             <div className="space-y-2"><h3 className="text-lg font-bold">Delete Record?</h3><p className="text-sm text-muted-foreground">This cannot be undone.</p></div>
             <div className="flex gap-3 justify-center">
               <Button variant="outline" onClick={() => setLogToDelete(null)} disabled={isDeleting}>Cancel</Button>
               <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin"/> : "Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

      {/* {simpleModal && (
         <div className="fixed inset-0 z-150 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 relative border border-border">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"}>Okay</Button>
                </div>
            </div>
         </div>
      )} */}

    {/* Replace old manual Dialog with this Component */}
    <AddTaskDialog 
        isOpen={isAddingTask} 
        onOpenChange={setIsAddingTask}
        task={newTask}
        setTask={setNewTask}
        subtask={newSubtask}
        setSubtask={setNewSubtask}
        onSave={handleAddTask}
        isEditing={false} // History page usually just adds new tasks
    />

    {/* 7. TASK DELETE CONFIRMATION MODAL */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 border border-border animate-in zoom-in-95">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-destructive" />
             </div>
             <div className="space-y-2">
                <h3 className="text-lg font-bold">Delete Task?</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
             </div>
             <div className="flex gap-3 justify-center">
               <Button 
                 variant="outline" 
                 onClick={() => setTaskToDelete(null)} 
                 disabled={isDeleting}
               >
                 Cancel
               </Button>
               <Button 
                 variant="destructive" 
                 onClick={confirmDeleteTask} 
                 disabled={isDeleting}
               >
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Yes, Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}


function HistoryLogCard({ log, onDelete }: { log: any, onDelete: (id: string) => void }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card 
            className={`bg-card border-border shadow-sm transition-all group relative cursor-pointer ${expanded ? 'ring-1 ring-primary/20' : 'hover:shadow-md'}`}
            onClick={() => setExpanded(!expanded)}
        >
            <CardContent className="flex gap-5 relative group transition-all">

              {/* TIME COLUMN */}
              <div className="flex flex-col items-center min-w-[70px] pr-5 border-r border-border/40">
                  {/* Time */}
                  <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md shadow-sm">
                      {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>

                  {/* Vertical Line */}
                  <div
                      className={`
                          w-[3px] mt-3 rounded-full bg-gradient-to-b from-primary/40 to-primary/10
                          transition-all duration-300 
                          ${expanded ? "h-24 opacity-100" : "h-10 opacity-70"}
                      `}
                  />
              </div>

              {/* CONTENT COLUMN */}
              <div className="flex-1 space-y-3 pr-10">
                  
                  {/* Header Metrics */}
                  <div className="flex justify-between items-start">
                      
                      {/* Metric Badges */}
                      <div className="flex flex-wrap items-center gap-2">

                          {/* Calories In */}
                          <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 shadow-sm">
                              +{log.totalCaloriesIn}
                              <span className="text-muted-foreground ml-1">kcal</span>
                          </span>

                          {/* Calories Out */}
                          {log.totalCaloriesOut > 0 && (
                              <span className="text-[11px] font-mono font-semibold text-success bg-success/10 px-2 py-1 rounded border border-success/20 shadow-sm">
                                  -{log.totalCaloriesOut}
                              </span>
                          )}

                          {/* Water */}
                          {log.waterMl > 0 && (
                              <span className="text-[11px] font-mono font-semibold text-info bg-info/10 px-2 py-1 rounded border border-info/20 shadow-sm">
                                  {log.waterMl}ml
                              </span>
                          )}
                      </div>

                      {/* Chevron */}
                      {/* <button className="transition-transform duration-300 text-muted-foreground">
                          <ChevronDown className={`w-5 h-5 ${expanded ? "rotate-180" : ""}`} />
                      </button> */}
                  </div>

                  {/* COLLAPSED PREVIEW */}
                  {!expanded && (
                      <p className="text-sm text-foreground/80 line-clamp-1 italic">
                          "{log.rawText}"
                      </p>
                  )}

                  {/* EXPANDED SECTION */}
                  {expanded && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            
                            {/* Main text */}
                            <div className="bg-secondary/20 p-3 sm:p-4 rounded-lg border border-border/40 text-sm leading-relaxed shadow-sm">
                                "{log.rawText}"
                            </div>

                            {/* AI Feedback */}
                            {log.parsedData && (
                                <div className="mt-4 space-y-3 sm:space-y-4 border-t border-border/40 pt-4">
                                    
                                    {/* 1. AI COACH FEEDBACK */}
                                    {(log.aiFeedback || log.parsedData.ai_feedback) && (
                                        <div className="bg-primary/5 p-3 sm:p-4 rounded-xl border border-primary/10 shadow-sm">
                                            <div className="font-bold text-primary flex items-center gap-2 mb-2 text-xs sm:text-sm uppercase tracking-wider">
                                                <MessageSquare className="w-4 h-4 shrink-0" /> Coach Analysis
                                            </div>
                                            <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
                                                "{log.aiFeedback || log.parsedData.ai_feedback}"
                                            </p>
                                        </div>
                                    )}

                                    {/* 2. THE NEXT ACTIONABLE STEP */}
                                    {log.parsedData.next_step && (
                                        <div className="bg-emerald-500/10 p-3 sm:p-4 rounded-xl border border-emerald-500/20 shadow-sm">
                                            <div className="font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2 mb-1.5 text-xs sm:text-sm uppercase tracking-wider">
                                                <Target className="w-4 h-4 shrink-0" /> Next Step
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                                                {log.parsedData.next_step}
                                            </p>
                                        </div>
                                    )}

                                    {/* 3. CALORIE SUMMARY TABS */}
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        <div className="bg-secondary/30 p-2.5 sm:p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-border/50 gap-1">
                                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                                <Utensils className="w-3.5 h-3.5" /> In
                                            </span>
                                            <span className="font-bold text-orange-500 text-sm sm:text-base">{log.totalCaloriesIn} kcal</span>
                                        </div>
                                        <div className="bg-secondary/30 p-2.5 sm:p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-border/50 gap-1">
                                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                                <Flame className="w-3.5 h-3.5" /> Out
                                            </span>
                                            <span className="font-bold text-red-500 text-sm sm:text-base">{log.totalCaloriesOut} kcal</span>
                                        </div>
                                    </div>

                                    {/* 4. FOODS LOGGED TABLE */}
                                    {log.parsedData.foods && log.parsedData.foods.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                                                Foods Tracked
                                            </h4>
                                            <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-card">
                                                {log.parsedData.foods.map((food: any, i: number) => (
                                                    <div key={i} className="p-2.5 sm:p-3 flex flex-col gap-1.5 sm:flex-row sm:items-center justify-between hover:bg-secondary/10 transition-colors">
                                                        <div className="flex items-start justify-between sm:block w-full sm:w-auto gap-2">
                                                            <span className="font-semibold text-xs sm:text-sm leading-tight">{food.name}</span>
                                                            <span className="sm:hidden bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap shrink-0">
                                                                {food.calories} kcal
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.protein}g</strong> Pro</span>
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.carbs}g</strong> Carbs</span>
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.fats}g</strong> Fat</span>
                                                            <span className="hidden sm:inline-flex bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-2 py-0.5 rounded-md ml-auto whitespace-nowrap">
                                                                {food.calories} kcal
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 5. EXERCISES LOGGED TABLE */}
                                    {log.parsedData.exercises && log.parsedData.exercises.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                                                Activity Tracked
                                            </h4>
                                            <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-card">
                                                {log.parsedData.exercises.map((exercise: any, i: number) => (
                                                    <div key={i} className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-secondary/10 transition-colors">
                                                        <span className="font-semibold text-xs sm:text-sm leading-tight">{exercise.name}</span>
                                                        <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] sm:text-xs w-full sm:w-auto">
                                                            <span className="text-muted-foreground font-medium">{exercise.duration_minutes} mins</span>
                                                            <span className="bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md whitespace-nowrap">
                                                                {exercise.calories_burned} kcal
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 👇 6. AI DISCLAIMER (NEW) */}
                                    <div className="mt-5 pt-4 border-t border-border/40 flex items-start gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-muted-foreground/60 italic leading-snug">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                                        <p>
                                            The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                                        </p>
                                    </div>
                                    
                                </div>
                            )}
                        </div>
                    )}
              </div>

              {/* DELETE BUTTON */}
              <div
                  className={`
                      absolute top-3 right-3 transition-opacity duration-200
                      ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
              >
                  <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shadow-sm"
                      onClick={(e) => {
                          e.stopPropagation();
                          onDelete(log.id);
                      }}
                  >
                      <Trash2 className="w-4 h-4" />
                  </Button>
              </div>

          </CardContent>

        </Card>
    );
}
</file>

<file path="src/app/globals.css">
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/*
  SomaFit v6 — "Iris & Ember" palette.
  A refined iris (indigo-violet) as the signature, paired with a warm ember/gold
  energy accent, on cool porcelain / graphite surfaces. Elegant, premium and
  calm — engineered for long focus sessions in both light and dark.
*/

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-energy: var(--energy);
  --color-energy-foreground: var(--energy-foreground);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);

  --font-quote: var(--font-baskervville), serif;
  --font-wallpoet: var(--font-wallpoet);
  --font-bbh-hegarty: var(--font-bbh-hegarty);

  --color-priority-high: var(--priority-high);
  --color-priority-high-bg: var(--priority-high-bg);
  --color-priority-medium: var(--priority-medium);
  --color-priority-medium-bg: var(--priority-medium-bg);
  --color-priority-habit: var(--priority-habit);
  --color-priority-habit-bg: var(--priority-habit-bg);
  --color-priority-low: var(--priority-low);
  --color-priority-low-bg: var(--priority-low-bg);

  /* Motion tokens shared everywhere */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ============ LIGHT ============ */
:root {
  --background: #f6f6fb;   /* cool porcelain with a faint iris tint */
  --foreground: #191627;   /* deep ink-navy, never pure black */

  --card: #ffffff;
  --card-foreground: #191627;
  --popover: #ffffff;
  --popover-foreground: #191627;

  /* Signature accent: refined iris */
  --primary: #5b57e0;
  --primary-foreground: #ffffff;

  --secondary: #edecf8;
  --secondary-foreground: #262048;

  --muted: #f0eff8;
  --muted-foreground: #6b6987;

  --accent: #e6e4fb;          /* soft iris wash for hover fills */
  --accent-foreground: #4a44c9;

  --destructive: #e11d48;     /* vivid rose — clearly an action colour */
  --destructive-foreground: #ffffff;
  --success: #12a150;
  --success-foreground: #ffffff;
  --info: #2563eb;
  --info-foreground: #ffffff;
  --energy: #eab308;          /* warm ember-gold = calories/energy */
  --energy-foreground: #3b2f00;

  --border: #e7e6f1;
  --input: #e7e6f1;
  --ring: #5b57e0;

  --radius: 0.9rem;

  --gradient-from: var(--primary);
  --gradient-to: #7c5cff;
  --glass-surface: color-mix(in srgb, var(--card) 72%, transparent);
  --overlay: rgba(20, 18, 40, 0.45);

  --shadow-card: 0 1px 2px rgba(25, 22, 39, 0.04), 0 10px 30px rgba(25, 22, 39, 0.07);
  --shadow-elevated: 0 4px 12px rgba(25, 22, 39, 0.08), 0 24px 60px rgba(25, 22, 39, 0.12);
  --shadow-cta: 0 10px 30px rgba(91, 87, 224, 0.30);

  --quote-bg: #f1f0fb;
  --quote-accent: #e6e4fb;
  --quote-text: #191627;
  --quote-author: #4a44c9;

  --priority-high: #e11d48;    --priority-high-bg: #ffe4ea;
  --priority-medium: #d97706;  --priority-medium-bg: #fef0d5;
  --priority-habit: #5b57e0;   --priority-habit-bg: #e6e4fb;
  --priority-low: #2563eb;     --priority-low-bg: #dbeafe;
}

/* ============ DARK ============ */
.dark {
  --background: #12111c;   /* deep indigo-charcoal instrument panel */
  --foreground: #e9e8f2;

  --card: #1a1926;
  --card-foreground: #e9e8f2;
  --popover: #1a1926;
  --popover-foreground: #e9e8f2;

  --primary: #8b87ff;      /* brightened iris for dark surfaces */
  --primary-foreground: #14112b;

  --secondary: #232235;
  --secondary-foreground: #e9e8f2;

  --muted: #232235;
  --muted-foreground: #9a98b6;

  --accent: #2a2740;
  --accent-foreground: #b6b2ff;

  --destructive: #fb7185;      /* vivid rose reads clearly on dark */
  --destructive-foreground: #2a0710;
  --success: #34d399;
  --success-foreground: #04241a;
  --info: #60a5fa;
  --info-foreground: #0a1830;
  --energy: #fbbf24;
  --energy-foreground: #241900;

  --border: #2b2a3d;
  --input: #2b2a3d;
  --ring: #8b87ff;

  --gradient-from: var(--primary);
  --gradient-to: #6d5cff;
  --glass-surface: color-mix(in srgb, var(--card) 78%, transparent);
  --overlay: rgba(0, 0, 0, 0.72);
  --shadow-cta: 0 12px 40px rgba(139, 135, 255, 0.22);
  --shadow-card: 0 8px 28px rgba(0, 0, 0, 0.55);
  --shadow-elevated: 0 12px 48px rgba(0, 0, 0, 0.6);

  --quote-bg: #1a1926;
  --quote-accent: #2a2740;
  --quote-text: #e9e8f2;
  --quote-author: #b6b2ff;

  --priority-high: #fb7185;    --priority-high-bg: #4c111f;
  --priority-medium: #fbbf24;  --priority-medium-bg: #3d2c0a;
  --priority-habit: #8b87ff;   --priority-habit-bg: #282348;
  --priority-low: #93c5fd;     --priority-low-bg: #14264d;
}

@layer base {
  * { border-color: var(--border); }
  body {
    background-color: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  /* Visible keyboard focus everywhere (accessibility quality floor). */
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  ::selection { background: color-mix(in srgb, var(--primary) 28%, transparent); }
}

/* =========================================================
   MOTION SYSTEM — reusable keyframes + helpers
   Used across pages/popups for a cohesive, professional feel.
========================================================= */
@keyframes soma-fade-up   { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes soma-fade-in   { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes soma-scale-in  { 0% { opacity: 0; transform: scale(0.96); } 100% { opacity: 1; transform: scale(1); } }
@keyframes soma-slide-right{ 0% { opacity: 0; transform: translateX(-16px); } 100% { opacity: 1; transform: translateX(0); } }
@keyframes soma-float      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes soma-shimmer    { 100% { transform: translateX(100%); } }
@keyframes soma-pop        { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }

.animate-fade-up    { animation: soma-fade-up   0.5s var(--ease-out-soft) both; }
.animate-fade-in    { animation: soma-fade-in   0.4s ease both; }
.animate-scale-in   { animation: soma-scale-in  0.35s var(--ease-out-soft) both; }
.animate-slide-right{ animation: soma-slide-right 0.4s var(--ease-out-soft) both; }
.animate-pop        { animation: soma-pop 0.4s var(--ease-spring) both; }

/* Stagger helpers — add .stagger to a parent, children fade-up in sequence */
.stagger > *        { animation: soma-fade-up 0.5s var(--ease-out-soft) both; }
.stagger > *:nth-child(1){ animation-delay: 0.02s; }
.stagger > *:nth-child(2){ animation-delay: 0.06s; }
.stagger > *:nth-child(3){ animation-delay: 0.10s; }
.stagger > *:nth-child(4){ animation-delay: 0.14s; }
.stagger > *:nth-child(5){ animation-delay: 0.18s; }
.stagger > *:nth-child(6){ animation-delay: 0.22s; }
.stagger > *:nth-child(7){ animation-delay: 0.26s; }
.stagger > *:nth-child(8){ animation-delay: 0.30s; }

/* Micro-interactions */
.hover-lift { transition: transform 0.25s var(--ease-out-soft), box-shadow 0.25s var(--ease-out-soft); }
.hover-lift:hover { transform: translateY(-3px); box-shadow: var(--shadow-elevated); }

.press { transition: transform 0.12s var(--ease-out-soft); }
.press:active { transform: scale(0.97); }

/* Skeleton shimmer overlay */
.shimmer { position: relative; overflow: hidden; }
.shimmer::after {
  content: ""; position: absolute; inset: 0; transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--foreground) 8%, transparent), transparent);
  animation: soma-shimmer 1.4s infinite;
}

/* Elegant gradient text for headings */
.text-gradient {
  background: linear-gradient(120deg, var(--gradient-from), var(--gradient-to));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* Slim, tasteful scrollbars (class already referenced across the app) */
.custom-scrollbar { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--foreground) 18%, transparent) transparent; }
.custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--foreground) 16%, transparent);
  border-radius: 999px; border: 2px solid transparent; background-clip: padding-box;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--foreground) 28%, transparent); background-clip: padding-box; }

/* Safe-area helpers for the mobile bottom bar */
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
.pt-safe { padding-top: env(safe-area-inset-top); }

/* ---------- "Pulse Core" loader keyframes ---------- */
@keyframes soma-orbit { to { transform: rotate(360deg); } }
@keyframes soma-pulse {
  0%, 100% { transform: scale(0.82); opacity: 0.55; }
  50%      { transform: scale(1);    opacity: 1; }
}
@keyframes soma-trace {
  0%   { stroke-dashoffset: 300; opacity: 0.2; }
  50%  { opacity: 1; }
  100% { stroke-dashoffset: 0;   opacity: 0.2; }
}

/* Calendar dropdowns */
.rdp-dropdown_year, .rdp-dropdown_month {
  background-color: transparent; font-weight: 500; font-size: 0.875rem;
  border: none; cursor: pointer; outline: none; appearance: none; padding-right: 0.5rem;
}
.rdp-dropdown_year:hover, .rdp-dropdown_month:hover { opacity: 0.7; }
.rdp-caption_dropdowns { display: flex; gap: 0.5rem; align-items: center; justify-content: center; }

/* Legacy aliases kept so existing markup keeps animating */
@keyframes fadeUp { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }

/* Respect reduced-motion: kill decorative animation for those who ask. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
</file>

<file path="src/middleware.ts">
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",                  // Landing Page
  "/sign-in(.*)",       // Auth
  "/sign-up(.*)",       // Auth
  "/api/uploadthing(.*)", // Public APIs (add others if needed)
  "/manifest.json",     // 👈 PWA Critical
  "/sw.js",             // 👈 PWA Critical
  "/icons(.*)",         // 👈 PWA Assets
  "/sitemap.xml",       // 👈 CRITICAL FIX FOR GOOGLE
  "/robots.txt",         // 👈 CRITICAL FIX FOR GOOGLE
  "/guides(.*)",        // Public Guides,
  '/api/cron/notifications',
  // '/hero-video.mp4', // 👈 CRITICAL FIX FOR GOOGLE (to allow indexing the homepage video)
  // '/dashboard.mp4', // 👈 CRITICAL FIX FOR GOOGLE (to allow indexing the dashboard video in the features section)
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.pathname;
  const userAgent = req.headers.get("user-agent")?.toLowerCase() || "";

  // 1. ALWAYS ALLOW LANDING PAGE & ASSETS FIRST
  if (isPublicRoute(req)) {
     // If user is logged in and visiting Home/Auth, send to dashboard
     if (userId && (url === "/" || url.startsWith("/sign-in") || url.startsWith("/sign-up"))) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
     }
     // Otherwise, let them see the public page
     return NextResponse.next();
  }

  // 2. PROTECT EVERYTHING ELSE
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();
//   const url = req.nextUrl.pathname;

//   if (userId) {
//     if (url === "/" || url.startsWith("/sign-in") || url.startsWith("/sign-up")) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   if (!userId) {
//     if (!isPublicRoute(req)) {
//       const signInUrl = new URL('/', req.url);
//       signInUrl.searchParams.set('redirect_url', req.url);
//       return NextResponse.redirect(signInUrl);
//     }
//   }
//   return NextResponse.next();
// });

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
</file>

<file path="src/app/layout.tsx">
import type { Metadata, Viewport } from "next";
import { Inter, Wallpoet } from "next/font/google";
import localFont from "next/font/local";
import { Baskervville } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { getSomaUser } from "@/lib/prisma"; // 👈 1. Server Import works here!
import { MainLayoutClient } from "@/components/main-layout-client"; // 👈 2. Import the new Client Component
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  variable: "--font-baskervville", 
});

const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wallpoet", // 👈 Defines the variable name
});

const BBH_Hegarty = localFont({
  src: "/fonts/BBH_Hegarty/BBHHegarty-Regular.ttf", // 👈 Make sure this path matches your file name!
  variable: "--font-bbh-hegarty",  // 👈 The CSS variable name
  weight: "400",
});

// import type { Metadata } from "next";
import { headers } from "next/headers";

// --- DYNAMIC METADATA GENERATION (SEO & Indexing) ---
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "www.somafit.in";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  // Dynamically constructs the base URL (handles localhost, preview URLs, and Production)
  const fullBaseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(fullBaseUrl),
    title: {
      default: "Soma | The AI Health Operating System", 
      template: "%s | Soma", // Automatically formats child pages (e.g., "Dashboard | Soma")
    },
    description: "The operating system for your biological and physical potential. Centralize your metrics, schedule tasks, and track historical data.",
    keywords: ["health dashboard", "AI fitness", "habit tracker", "daily timeline", "macro tracker", "Soma OS"],
    manifest: "/manifest.webmanifest",
    
    // Explicit icon mapping for mobile devices and PWA
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    
    // Ensures beautiful rich snippets on iMessage, Discord, Twitter, LinkedIn
    openGraph: {
      title: "Soma | The AI Health Operating System",
      description: "The operating system for your biological and physical potential. Architect your perfect day.",
      url: fullBaseUrl,
      siteName: "Soma OS",
      images: [
        {
          url: "/og-image.png", // Note: Ensure you place an 'og-image.jpg' (1200x630) in your public folder!
          width: 1200,
          height: 630,
          alt: "Soma OS Dashboard Preview",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    
    // Twitter-specific card formatting
    twitter: {
      card: "summary_large_image",
      title: "Soma | The AI Health Operating System",
      description: "The operating system for your biological and physical potential. Architect your perfect day.",
      images: ["/og-image.png"], 
    },
    
    // Advanced crawler directives
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    }
  };
}

export const viewport: Viewport = {
  themeColor: "#0b1512",
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👇 3. Fetch data safely on the server
  const user = await getSomaUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${baskervville.variable} ${BBH_Hegarty.variable} ${wallpoet.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>

            {/* 👇 4. Pass the data to the client component */}
            <MainLayoutClient user={user}>
              {children}
              <Toaster />
            </MainLayoutClient>

          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
</file>

<file path="src/components/ui/navbar.tsx">
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  History,
  House,
  UserCog,
  ListTodo,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  MessageSquarePlus,
  ClockFadingIcon,
  FileText,
  CalendarHeart,
  Repeat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false); // Controls Sidebar Expansion
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide on Landing Page & Auth Pages
  if (pathname === "/" || pathname.startsWith("/sign-")) {
    return null;
  }

  // Primary links (top of the rail)
  const primaryLinks = [
    { href: "/dashboard", icon: <House className="w-5 h-5" />, label: "Home" },
    { href: "/tasks", icon: <ListTodo className="w-5 h-5" />, label: "Tasks" },
    { href: "/habits", icon: <Repeat className="w-5 h-5" />, label: "Habits" },
    { href: "/analysis", icon: <CalendarHeart className="w-5 h-5" />, label: "Analysis" },
    { href: "/deadlines", icon: <ClockFadingIcon className="w-5 h-5" />, label: "Deadlines" },
    { href: "/notes", icon: <FileText className="w-5 h-5" />, label: "Notes" },
    { href: "/history", icon: <History className="w-5 h-5" />, label: "History" },
  ];

  // Secondary links (bottom of the rail). Profile + Settings are merged → "Account".
  const secondaryLinks = [
    { href: "/guides", icon: <BookOpen className="w-5 h-5" />, label: "Guides" },
    { href: "/feedback", icon: <MessageSquarePlus className="w-5 h-5" />, label: "Feedback" },
    { href: "/settings", icon: <UserCog className="w-5 h-5" />, label: "Account" },
  ];

  const isAccountActive = pathname === "/settings" || pathname === "/profile";

  const RailLink = ({ link }: { link: any }) => {
    const isActive =
      link.href === "/settings" ? isAccountActive : pathname === link.href;
    return (
      <Link
        href={link.href}
        className={cn(
          "relative flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 group press",
          isActive
            ? "text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {/* Animated active pill */}
        {isActive && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/25"
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
          />
        )}

        <span className="relative z-10 min-w-[24px] flex justify-center">
          {link.icon}
        </span>

        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="relative z-10 whitespace-nowrap font-medium text-sm"
            >
              {link.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapsed tooltip */}
        {!isExpanded && (
          <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-border/60 whitespace-nowrap z-50">
            {link.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR (md and up)
      ========================================================= */}
      <motion.nav
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col bg-card/80 backdrop-blur-xl border-r border-border/60 shadow-sm h-screen"
      >
        {/* LOGO / BRAND */}
        <div className="h-16 flex items-center justify-start border-b border-border/40 relative">
          <Link href="/" className="z-10">
            <div className="relative px-10 w-14 h-14 cursor-pointer transition-transform hover:scale-105 press">
              <Image src="/logo2.webp" alt="Soma Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle sidebar"
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 shadow-sm z-50 hover:scale-110 transition-all"
          >
            <ChevronRight className={cn("w-3 h-3 transition-transform duration-300", isExpanded && "rotate-180")} />
          </button>
        </div>

        {/* LINKS */}
        <div className={cn("flex-1 flex flex-col p-3 py-5", isExpanded ? "overflow-y-auto custom-scrollbar" : "overflow-hidden")}>
          <div className="flex flex-col gap-1.5">
            {primaryLinks.map((link) => (
              <RailLink key={link.href} link={link} />
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-1.5 pt-3 mt-3 border-t border-border/40">
            {secondaryLinks.map((link) => (
              <RailLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* FOOTER / USER */}
        <div className="p-4 border-t border-border/40">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl p-1.5 -m-1.5 hover:bg-accent transition-colors",
              !isExpanded && "justify-center"
            )}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden relative ring-2 ring-border shrink-0">
              {user?.image ? (
                <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-[var(--gradient-to)] flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{user?.email || "Your account"}</span>
                <span className="text-xs text-muted-foreground truncate">Free Plan</span>
              </div>
            )}
          </Link>
        </div>
      </motion.nav>

      {/* =========================================================
          MOBILE BOTTOM BAR
      ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/85 backdrop-blur-xl border-t border-border/60 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {primaryLinks.slice(0, 4).map((link: any) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex flex-col items-center justify-center w-16 h-full gap-1 press"
              >
                <span className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                  {link.icon}
                </span>
                <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute -top-px h-0.5 w-8 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Menu trigger + popup */}
          <div className="relative flex flex-col items-center justify-center w-16 h-full">
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsMobileMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-full right-0 mb-3 bg-popover/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-1.5 min-w-[170px] flex flex-col gap-0.5 z-[100]"
                  >
                    {[
                      { href: "/analysis", icon: <CalendarHeart className="w-4 h-4" />, label: "Analysis" },
                      { href: "/deadlines", icon: <ClockFadingIcon className="w-4 h-4" />, label: "Deadlines" },
                      { href: "/notes", icon: <FileText className="w-4 h-4" />, label: "Notes" },
                      { href: "/history", icon: <History className="w-4 h-4" />, label: "History" },
                      { href: "/guides", icon: <BookOpen className="w-4 h-4" />, label: "Guides" },
                      { href: "/settings", icon: <UserCog className="w-4 h-4" />, label: "Account" },
                      { href: "/feedback", icon: <MessageSquarePlus className="w-4 h-4" />, label: "Feedback" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                          (item.href === "/settings" ? isAccountActive : pathname === item.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-popover-foreground hover:bg-accent"
                        )}
                      >
                        {item.icon} {item.label}
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors press",
                isMobileMenuOpen ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[10px] font-medium">Menu</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
</file>

<file path="src/app/dashboard/dashboard-client.tsx">
"use client";

import { useEffect, useState } from "react";
import { subDays, startOfDay, endOfDay, isToday } from "date-fns";
import { AlertTriangle, Check, Flame, Cookie, MessageSquare, Target, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import WeeklyChart from "@/components/WeeklyChart";

// Components
import { QuoteBanner } from "@/components/dashboard/QuoteBanner";
import { QuickLog } from "@/components/dashboard/QuickLog";
import { EnergyRing } from "@/components/dashboard/EnergyRing";
import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { HydrationCard } from "@/components/dashboard/HydrationCard";
import { PendingTasksList } from "@/components/dashboard/PendingTasksList";
import { X } from "lucide-react";
import { CompleteProfileModal } from "@/components/complete-profile-modal";
import { StepTracker } from "@/components/dashboard/step-tracker";
import { toast } from "sonner"; // Assuming you have sonner installed
// Add this near your other component imports (like QuoteBanner, QuickLog, etc.)
import { ensureTodaysHabits } from "@/app/actions/habits";

export default function DashboardClient({ user }: { user: any }) {
  const USER_ID = user.id;   
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 👇 UPDATED: Added macros to the summary state
  const [summary, setSummary] = useState({
        in: 0, out: 0,
        goal: user?.dailyCalorieGoal ?? 2000,
        protein: 0, carbs: 0, fats: 0,
        });
  
  const [waterTotal, setWaterTotal] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const [allWeeklyTasks, setAllWeeklyTasks] = useState<any[]>([]); 
  const [pendingTasks, setPendingTasks] = useState<any[]>([]); 
  const [quote, setQuote] = useState({ quote: "Loading motivation...", author: "" });
  const [profileStatus, setProfileStatus] = useState<any>(null);

  const [newLogText, setNewLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, streak: 0 });

  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  
  // 👇 NEW: State to hold the AI Coach Feedback
  const [feedbackModal, setFeedbackModal] = useState<any | null>(null);

  useEffect(() => {
    async function checkProfile() {
      const res = await fetch("/api/profile-status");
      const data = await res.json();
      setProfileStatus(data);
    }
    checkProfile();
  }, []);

  useEffect(() => {
      // Safety net: generate today's habits from templates if the cron hasn't
      // run yet. Idempotent — safe on every load, never duplicates.
      ensureTodaysHabits(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then((r) => { if (r?.created) fetchTasks(); })
        .catch(() => {});

      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
      async function getQuote() {
          try {
              const res = await fetch('/api/quote');
              const data = await res.json();
              if (data.quote) setQuote(data);
          } catch (e) {
              console.error("Quote error", e);
          }
      }
      getQuote();
  }, []);

  const sortTasks = (tasks: any[]) => {
    const priorityOrder: any = { HIGH: 1, MEDIUM: 2, LOW: 3, HABIT: 4 };
    return [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      const pA = priorityOrder[a.priority] || 99;
      const pB = priorityOrder[b.priority] || 99;
      return pA - pB;
    });
  };

  async function fetchLogs() {
    try {
      const today = new Date();
      const fromDate = startOfDay(subDays(today, 90)).toISOString();
      const toDate = endOfDay(today).toISOString();

      const res = await fetch(
        `/api/get-logs?from=${fromDate}&to=${toDate}`
      );
      
      const data = await res.json();

      if (res.ok && data.success) {
        setLogs(data.logs);
        calculateSummary(data.logs); 
      }
    } catch (error) { 
      console.error("Error fetching logs", error); 
    }
  }

  async function fetchTasks() {
    try {
      const today = new Date();
      const lastWeek = subDays(today, 90); 
      const res = await fetch(
        `/api/tasks?from=${startOfDay(lastWeek).toISOString()}&to=${endOfDay(today).toISOString()}`, 
        { cache: 'no-store' }
      );
      const data = await res.json();
      
      if (data.success) {
        setAllWeeklyTasks(data.tasks);
        const todaysTasks = data.tasks.filter((t: any) => isToday(new Date(t.date)));
        setPendingTasks(sortTasks(todaysTasks));
      }
    } catch (e) { console.error("Task fetch error", e); }
  }

  async function toggleTask(id: string, currentStatus: boolean) {
      setPendingTasks(prev => {
        const updated = prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t);
        return sortTasks(updated);
      });
      setAllWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
      await fetch("/api/tasks", { 
          method: "PATCH", 
          body: JSON.stringify({ taskId: id, isCompleted: !currentStatus }) 
      });
  }

  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     setPendingTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) => 
                 st.id === subtaskId ? { ...st, isCompleted: !currentStatus } : st
             )
         };
     }));
     await fetch("/api/tasks", { 
        method: "PATCH", 
        body: JSON.stringify({ taskId, subtaskId, isCompleted: !currentStatus }) 
    });
  }

  async function handleRestoreAccount() {
      setShowRestoreModal(false); 
      setIsRestoring(true);
      try {
        const res = await fetch("/api/user/restore", { method: "POST" });
        if (res.ok) {
          setSimpleModal({ title: "Welcome Back!", msg: "Your account is fully active again." });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setSimpleModal({ title: "Error", msg: "Failed to restore account.", isError: true });
        }
      } catch (e) {
        setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsRestoring(false);
      }
    }

  // 👇 UPDATED: Added Macro Parsing logic
  function calculateSummary(logs: any[]) {
    let totalIn = 0;
    let totalOut = 0;
    let water = 0;
    let totalPro = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    
    const todayStr = new Date().toLocaleDateString();

    logs.forEach(log => {
      const logDateStr = new Date(log.date).toLocaleDateString();

      if (logDateStr === todayStr) {
        totalIn += log.totalCaloriesIn;
        totalOut += log.totalCaloriesOut;
        if (log.waterMl) water += log.waterMl;

        // Parse macros from the foods array
        if (log.parsedData?.foods && Array.isArray(log.parsedData.foods)) {
            log.parsedData.foods.forEach((food: any) => {
                totalPro += food.protein || 0;
                totalCarbs += food.carbs || 0;
                totalFats += food.fats || 0;
            });
        }
      }
    });

    setSummary(prev => ({ 
        ...prev, 
        in: totalIn, 
        out: totalOut, 
        protein: totalPro, 
        carbs: totalCarbs, 
        fats: totalFats 
    }));
    setWaterTotal(water);
  }

  async function handleAddWater() {
    try {
      setWaterTotal(prev => prev + 250);
      const res = await fetch("/api/log-water", {
        method: "POST",
        body: JSON.stringify({ amount: 250 }),
      });
      const data = await res.json();
      if (data.success) fetchLogs(); 
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add water log.", isError: true });
    }
  }

  // 👇 UPDATED: Handles AI Feedback Extraction & Triggers the Modal
  async function handleAddLog() {
    if (!newLogText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userText: newLogText,
          userTimezone: "Asia/Kolkata", 
          date: new Date().toISOString() // Pass date to ensure proper logging
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewLogText(""); 
        fetchLogs(); 
        
        if (data.log?.parsedData) {
            // Pass the entire log object to the modal
            setFeedbackModal(data.log);
        } else {
            toast.success("Log processed successfully!");
        }
      } else {
          toast.error("Failed to process log: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add log.", isError: true });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-32 md:pb-12">
      {profileStatus && !profileStatus.isComplete && (
        <CompleteProfileModal userId={user.id} missingFields={profileStatus.missing} />
      )}

      <main className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {loading && <DNALoader />}
        
        {/* 1. Date Header */}
        <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80">
                Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h1>
        </div>


        {/* RESTORE BANNER */}
        {user?.scheduledForDeletion && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 ">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-destructive/20 rounded-full flex items-center justify-center text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-destructive">Account Scheduled for Deletion</p>
                <p className="text-sm text-foreground/80">
                  You have until <span className="font-semibold">{new Date(user.scheduledForDeletion).toLocaleDateString()}</span> to restore your account.
                </p>
              </div>
            </div>
            <Button onClick={() => setShowRestoreModal(true)} disabled={isRestoring} variant="destructive" className="w-full md:w-auto">
              {isRestoring ? "Restoring..." : "Undo Deletion"}
            </Button>
          </div>
        )}

        {/* 2. Quick Log (Top on Desktop) */}
        <div className="hidden md:flex flex-col gap-2.5">
            <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
            
            {/* Desktop AI Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground/50 italic px-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                <p>
                    The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                </p>
            </div>
        </div>

        {/* 3. MIDDLE SECTION: Energy/Hydro (Left) & Tasks (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT: Net Balance & Hydration */}
            <div className="lg:col-span-7 space-y-6 flex flex-col">
                
                {/* HERO: Unified Nutrition & Energy Core */}
                <div className="bg-card border border-border/60 rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                    
                    {/* Background Ambient Glow for the whole card */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* TOP: Calories & Balance Island */}
                    <div className="relative grid grid-cols-2 md:grid-cols-3 items-center gap-6 sm:gap-4 bg-secondary/10 p-5 sm:p-6 rounded-3xl border border-border/40 shadow-inner z-10 justify-items-center">
                        
                        {/* Net Balance Center (Spans full width on Mobile, Middle on Desktop) */}
                        <div className="col-span-2 md:col-span-1 md:order-2 w-full flex justify-center relative z-10">
                            <NetBalanceCard inVal={summary.in} outVal={summary.out} goal={summary.goal} />
                        </div>

                        {/* Consumed Ring + Glow (Left side on mobile and desktop) */}
                        <div className="col-span-1 md:order-1 flex flex-col items-center gap-3 relative w-full">
                            <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-110 opacity-40 mix-blend-screen pointer-events-none" />
                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest relative z-10">Consumed</span>
                            <div className="relative z-10 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                                <EnergyRing 
                                    value={summary.in} 
                                    max={summary.goal} 
                                    label="" 
                                    color="hsl(24.6 95% 53.1%)" 
                                    icon={<Cookie className="w-4 h-4 sm:w-5 sm:h-5"/>}
                                />
                            </div>
                        </div>

                        {/* Burned Ring + Glow (Right side on mobile and desktop) */}
                        <div className="col-span-1 md:order-3 flex flex-col items-center gap-3 relative w-full">
                            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-110 opacity-40 mix-blend-screen pointer-events-none" />
                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest relative z-10">Burned</span>
                            <div className="relative z-10 drop-shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                                <EnergyRing 
                                    value={summary.out} 
                                    max={summary.goal + 500} 
                                    label="" 
                                    color="#ef4444" 
                                    icon={<Flame className="w-4 h-4 sm:w-5 sm:h-5"/>}
                                />
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: Vibrant Macro Tracker */}
                    <div className="grid grid-cols-3 gap-3 md:gap-5 relative z-10">
                        {/* Protein Glow Box */}
                        <div className="relative overflow-hidden bg-blue-500/10 border border-blue-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.03] hover:shadow-blue-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Protein</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.protein)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>

                        {/* Carbs Glow Box */}
                        <div className="relative overflow-hidden bg-emerald-500/10 border border-emerald-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.03] hover:shadow-emerald-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Carbs</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.carbs)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>

                        {/* Fats Glow Box */}
                        <div className="relative overflow-hidden bg-amber-500/10 border border-amber-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.03] hover:shadow-amber-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Fats</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.fats)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>
                    </div>

                    {/* 👇 NEW: AI Disclaimer (Mobile Only) tucked inside the card */}
                    <div className="md:hidden mt-2 pt-4 border-t border-border/40 flex items-start gap-2 text-[10px] text-muted-foreground/50 italic relative z-10">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                        <p className="leading-snug">
                            The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                        </p>
                    </div>

                </div>

                <HydrationCard total={waterTotal} onAdd={handleAddWater} />
                <StepTracker />
            </div>

            {/* RIGHT: Pending Tasks (Strict Fixed Height) */}
            <div className="lg:col-span-5 flex flex-col h-[600px] overflow-hidden rounded-3xl bg-card border border-border/60 shadow-sm">
                <div className="h-full overflow-y-auto pr-1 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-border">
                    <PendingTasksList tasks={pendingTasks} onToggle={toggleTask} onSubToggle={toggleSubtask} />
                </div>
            </div>
        </div>

        {/* 4. BOTTOM SECTION: Quote (25%) & Chart (75%) */}
        <div className="flex flex-col gap-6">
            <div className="w-full">
                <QuoteBanner quote={quote} />
            </div>

            <div className="w-full">
                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                    {/* The logs passed down here now natively contain macros for the chart to use */}
                    <WeeklyChart logs={logs} tasks={allWeeklyTasks} />
                </div>
            </div>
        </div>

        {/* MOBILE STICKY LOG & DISCLAIMER */}
        <div className="md:hidden flex flex-col gap-3">
             <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
             
             {/* Mobile AI Disclaimer */}
             <div className="flex items-start gap-2 text-[10px] text-muted-foreground/50 italic px-2 mb-4">
                 <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5 opacity-70" />
                 <p leading-tight>
                     The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                 </p>
             </div>
        </div>

      </main>

      {/* --- MODALS --- */}

      {/* 👇 AI COACH FEEDBACK REPORT MODAL */}
      {feedbackModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-card border border-primary/30 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto overflow-x-hidden">
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" /> Log Analysis
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                      {/* Coach Feedback */}
                      {(feedbackModal.aiFeedback || feedbackModal.parsedData?.ai_feedback) && (
                          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                              <p className="text-sm italic text-muted-foreground leading-relaxed">
                                  "{feedbackModal.aiFeedback || feedbackModal.parsedData.ai_feedback}"
                              </p>
                          </div>
                      )}

                      {/* Next Step */}
                      {feedbackModal.parsedData?.next_step && (
                          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                              <div className="font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2 mb-1 text-sm uppercase tracking-wider">
                                  <Target className="w-4 h-4 shrink-0" /> Next Step
                              </div>
                              <p className="text-sm font-medium text-foreground leading-snug">
                                  {feedbackModal.parsedData.next_step}
                              </p>
                          </div>
                      )}

                      {/* Calories Summary */}
                      <div className="grid grid-cols-2 gap-3">
                          <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between border border-border/50">
                              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5" /> In</span>
                              <span className="font-bold text-orange-500">{feedbackModal.totalCaloriesIn} kcal</span>
                          </div>
                          <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between border border-border/50">
                              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Out</span>
                              <span className="font-bold text-red-500">{feedbackModal.totalCaloriesOut} kcal</span>
                          </div>
                      </div>

                      {/* Foods Processed */}
                      {feedbackModal.parsedData?.foods?.length > 0 && (
                          <div>
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Items Tracked</h4>
                              <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-background">
                                  {feedbackModal.parsedData.foods.map((food: any, i: number) => (
                                      <div key={i} className="p-3 flex flex-col gap-1 text-sm">
                                          <div className="flex justify-between items-start">
                                              <span className="font-semibold">{food.name}</span>
                                              <span className="font-bold text-orange-500">{food.calories} kcal</span>
                                          </div>
                                          <div className="flex gap-3 text-xs text-muted-foreground">
                                              <span>Pro: <strong className="text-foreground">{food.protein}g</strong></span>
                                              <span>Carbs: <strong className="text-foreground">{food.carbs}g</strong></span>
                                              <span>Fat: <strong className="text-foreground">{food.fats}g</strong></span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-border/50">
                      <Button onClick={() => setFeedbackModal(null)} className="px-8 font-bold w-full sm:w-auto">
                          Done
                      </Button>
                  </div>
              </div>
          </div>
      )}

      {simpleModal && (
         <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold text-foreground">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"} className="px-6">Okay</Button>
                </div>
            </div>
         </div>
      )}

      {showRestoreModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6">
             <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Restore Account?</h3>
                <p className="text-sm text-muted-foreground">This will cancel the deletion process.</p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setShowRestoreModal(false)}>Cancel</Button>
                <Button onClick={handleRestoreAccount}>Yes, Restore</Button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
</file>

<file path="package.json">
{
  "name": "soma",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --webpack",
    "build": "npx prisma generate && next build --webpack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.36.0",
    "@ducanh2912/next-pwa": "^10.2.9",
    "@google/generative-ai": "^0.24.1",
    "@prisma/client": "^6.19.0",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@tiptap/extension-link": "^3.14.0",
    "@tiptap/extension-placeholder": "^3.14.0",
    "@tiptap/extension-task-item": "^3.14.0",
    "@tiptap/extension-task-list": "^3.14.0",
    "@tiptap/extension-underline": "^3.14.0",
    "@tiptap/react": "^3.14.0",
    "@tiptap/starter-kit": "^3.14.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "framer-motion": "^12.23.26",
    "gsap": "^3.14.2",
    "lucide-react": "^0.556.0",
    "next": "^16.0.10",
    "next-themes": "^0.4.6",
    "react": "19.2.0",
    "react-day-picker": "^8.10.1",
    "react-dom": "19.2.0",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "web-push": "^3.6.7",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/web-push": "^3.6.4",
    "dotenv": "^17.4.2",
    "eslint": "^9",
    "eslint-config-next": "16.0.7",
    "prisma": "^6.19.0",
    "tailwindcss": "^4",
    "tsx": "^4.23.1",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
</file>

</files>
