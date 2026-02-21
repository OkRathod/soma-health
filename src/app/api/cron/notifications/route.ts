// src/app/api/cron/notifications/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:your-email@example.com', // Change to your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET(req: Request) {
  // 1. Secure the route (so only Vercel Cron can call it)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const now = new Date();
    
    // Time windows for scheduled tasks (Now + 5 mins to Now + 10 mins)
    const fiveMinsFromNow = new Date(now.getTime() + 5 * 60000);
    const tenMinsFromNow = new Date(now.getTime() + 10 * 60000);
    
    // Time window for un-scheduled tasks (6 hours ago)
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60000);

    // ==========================================
    // CONDITION 1: Task starts in ~5 minutes
    // ==========================================
    const upcomingTasks = await prisma.task.findMany({
      where: {
        isCompleted: false,
        startTime: {
          gte: fiveMinsFromNow,
          lt: tenMinsFromNow,
        },
      },
      include: { user: { include: { pushSubscriptions: true } } }
    });
    
    // Define the exact start and end of TODAY
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // ==========================================
    // CONDITION 2: No time set, every 6 hours (TODAY ONLY)
    // ==========================================
    const unScheduledTasks = await prisma.task.findMany({
      where: {
        isCompleted: false,
        startTime: null, 
        date: {             // 👈 NEW: Only fetch tasks scheduled for today
          gte: startOfToday,
          lte: endOfToday
        },
        OR: [
          { lastNotifiedAt: null }, 
          { lastNotifiedAt: { lte: sixHoursAgo } } 
        ]
      },
      include: { user: { include: { pushSubscriptions: true } } }
    });

    const allTasksToNotify = [...upcomingTasks, ...unScheduledTasks];
    const updateTaskIds: string[] = [];

    // Send the notifications
    for (const task of allTasksToNotify) {
      const subs = task.user.pushSubscriptions;
      if (subs.length === 0) continue;

      const payload = JSON.stringify({
        title: task.startTime ? "Upcoming Task!" : "Friendly Reminder",
        body: task.startTime 
          ? `Your task "${task.title}" starts in 5 minutes.`
          : `Don't forget to complete: "${task.title}" today.`,
      });

      // Send to all user's devices
      for (const sub of subs) {
        try {
          await webpush.sendNotification({
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth }
          }, payload);
        } catch (error: any) {
          // If the device unsubscribed, delete it from DB
          if (error.statusCode === 410 || error.statusCode === 404) {
            await prisma.pushSubscription.delete({ where: { id: sub.id } });
          }
        }
      }
      
      // Mark task as notified so the 6-hour timer resets
      updateTaskIds.push(task.id);
    }

    // Update 'lastNotifiedAt' for all processed tasks
    if (updateTaskIds.length > 0) {
      await prisma.task.updateMany({
        where: { id: { in: updateTaskIds } },
        data: { lastNotifiedAt: now }
      });
    }

    return NextResponse.json({ success: true, notifiedCount: allTasksToNotify.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}