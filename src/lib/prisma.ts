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

  const primaryEmail = clerkUser.emailAddresses[0].emailAddress;

  // 👇 FIX: Anchor the upsert to the Email, not the ID
  const user = await prisma.user.upsert({
    where: { 
      email: primaryEmail 
    },
    update: {
      // If they deleted and recreated their Clerk account, this heals the database
      // by syncing the new Clerk ID to their existing Somafit profile.
      id: clerkUser.id 
    },
    create: {
      id: clerkUser.id,
      email: primaryEmail,
      nationality: "Unknown", 
      height: 0,
      weight: 0
    }
  });

  return user;
}