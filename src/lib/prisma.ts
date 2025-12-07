// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { currentUser } from '@clerk/nextjs/server';

// This function ensures the user exists in our DB
export async function getSomaUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  // Check if user exists in OUR database
  const user = await prisma.user.findUnique({
    where: { id: clerkUser.id } // We will use Clerk ID as our Primary Key!
  });

  if (user) return user;

  // If not, create them immediately
  const newUser = await prisma.user.create({
    data: {
      id: clerkUser.id, // Important: Sync the IDs
      email: clerkUser.emailAddresses[0].emailAddress,
      nationality: "Unknown", 
      height: 0,
      weight: 0
    }
  });

  return newUser;
}