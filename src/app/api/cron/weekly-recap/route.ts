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