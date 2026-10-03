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