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

  // 👇 FIX: Use upsert to handle concurrent Next.js layout/page requests
  const user = await prisma.user.upsert({
    where: { 
      id: clerkUser.id // We use Clerk ID as our Primary Key
    },
    update: {}, // If the user already exists, do nothing and just return them
    create: {
      id: clerkUser.id, // Important: Sync the IDs
      email: clerkUser.emailAddresses[0].emailAddress,
      nationality: "Unknown", 
      height: 0,
      weight: 0
    }
  });

  return user;
}