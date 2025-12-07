// src/app/api/create-user/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        nationality: body.nationality,
        height: parseFloat(body.height),
        weight: parseFloat(body.weight),
        // We leave the API key blank for now
      },
    });

    return NextResponse.json({ success: true, user: newUser });

  } catch (error: any) {
    // If the email already exists, this error catches it
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}