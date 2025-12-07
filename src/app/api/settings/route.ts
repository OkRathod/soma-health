import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encryptKey } from '@/lib/crypto'; // We use the encryption tool we built in Phase 1

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, nationality, height, weight, apiKey } = body;

    // Prepare the update data
    let updateData: any = {
      nationality,
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    // Only update the API Key if the user typed a new one
    if (apiKey && apiKey.trim() !== "") {
      const { encryptedData, iv } = encryptKey(apiKey);
      updateData.encryptedApiKey = encryptedData;
      updateData.apiKeyIv = iv;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// We also need a GET to fill the form when the page loads
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: "No ID" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      nationality: true,
      height: true,
      weight: true,
      encryptedApiKey: true, // We check IF it exists, but we won't send the key back
    }
  });

  return NextResponse.json({ 
    success: true, 
    data: {
      ...user,
      hasKey: !!user?.encryptedApiKey // Returns true if they have a key saved
    }
  });
}