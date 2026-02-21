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