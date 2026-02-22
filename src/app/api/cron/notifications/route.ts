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
    // Define the exact start and end of TODAY
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // 1. Fetch ALL uncompleted tasks for TODAY (Both Timed and Un-timed)
    const todaysTasks = await prisma.task.findMany({
      where: {
        isCompleted: false,
        date: {             
          gte: startOfToday,
          lte: endOfToday
        }
      },
      include: { user: { include: { pushSubscriptions: true } } }
    });

    const allTasksToNotify = [];

    // 2. Filter the tasks using JavaScript so we can ignore the wrong "Jan 19" dates
    for (const task of todaysTasks) {
      if (task.startTime) {
        // --- TIMED TASKS (5-Minute Warning) ---
        // Extract ONLY the hours and minutes (ignores the wrong calendar date)
        const taskHour = task.startTime.getUTCHours();
        const taskMinute = task.startTime.getUTCMinutes();
        
        const currentHour = now.getUTCHours();
        const currentMinute = now.getUTCMinutes();

        // Convert to total minutes for easy comparison
        const taskTotalMinutes = (taskHour * 60) + taskMinute;
        const currentTotalMinutes = (currentHour * 60) + currentMinute;

        let minutesDifference = taskTotalMinutes - currentTotalMinutes;
        
        // Handle midnight crossover (e.g., current time is 23:58, task is 00:03)
        if (minutesDifference < -1000) minutesDifference += 1440; 

        // If the task is exactly 5 to 9 minutes away, add it to the notification list!
        if (minutesDifference >= 5 && minutesDifference < 10) {
          allTasksToNotify.push({ ...task, isTimed: true });
        }
      } else {
        // --- UNTIMED TASKS (6-Hour Reminder) ---
        const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60000);
        if (!task.lastNotifiedAt || task.lastNotifiedAt <= sixHoursAgo) {
          allTasksToNotify.push({ ...task, isTimed: false });
        }
      }
    }

    const updateTaskIds: string[] = [];

    // 3. Send the notifications
    for (const task of allTasksToNotify) {
      const subs = task.user.pushSubscriptions;
      if (subs.length === 0) continue;

      // 👇 Notice we use 'task.isTimed' here now to decide the message
      const payload = JSON.stringify({
        title: task.isTimed ? "Upcoming Task!" : "Friendly Reminder",
        body: task.isTimed 
          ? `Your task "${task.title}" starts in 5 minutes.`
          : `Don't forget to complete: "${task.title}" today.`,
      });

      // ... (Keep your existing webpush.sendNotification loop here) ...
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