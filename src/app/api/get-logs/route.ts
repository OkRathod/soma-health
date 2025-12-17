import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  
  // 👇 1. Get the date params
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID required" });
  }

  try {
    // 👇 2. Build dynamic query options
    const queryOptions: any = {
      where: { 
        userId: userId 
      },
      orderBy: { date: 'desc' },
    };

    // 👇 3. If dates provided, filter by range. If NOT, limit to recent 14.
    if (from && to) {
      queryOptions.where.date = {
        gte: new Date(from), // Greater than or equal to Start Date
        lte: new Date(to),   // Less than or equal to End Date
      };
      // Note: We REMOVE 'take' here so we get all 90 days if needed
    } else {
      queryOptions.take = 14; // Default fallback if no dates sent
    }

    const logs = await prisma.dailyLog.findMany(queryOptions);

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Fetch Logs Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}