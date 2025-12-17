// app/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markGuideAsRead(slug: string) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.userReadGuide.upsert({
    where: { 
      // This composite key name depends on how Prisma named it. 
      // It is usually `userId_guideSlug` based on your @@unique constraint.
      userId_guideSlug: { userId, guideSlug: slug } 
    },
    update: {}, // If it exists, do nothing
    create: { userId, guideSlug: slug },
  });

  // Refresh the UI instantly
  revalidatePath(`/guides/${slug}`);
  revalidatePath("/guides");
}