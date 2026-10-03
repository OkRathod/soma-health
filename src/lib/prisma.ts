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

  const primaryEmail =
    clerkUser.emailAddresses[0]?.emailAddress ?? clerkUser.primaryEmailAddress?.emailAddress;
  if (!primaryEmail) return null;

  const existing = await prisma.user.findUnique({ where: { email: primaryEmail } });
  if (existing) return existing;   // never rewrite id — keeps child rows intact

  return prisma.user.create({ data: { id: clerkUser.id, email: primaryEmail } });
}