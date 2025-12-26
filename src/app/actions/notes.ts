"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getNotes() {
  const { userId } = await auth();
  if (!userId) return { success: false, data: [] };

  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });

  return { success: true, data: notes };
}

export async function saveNote(data: { id?: string; title: string; content: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (data.id) {
    // Update existing
    await prisma.note.update({
      where: { id: data.id, userId },
      data: { 
        title: data.title, 
        content: data.content 
      }
    });
  } else {
    // Create new
    await prisma.note.create({
      data: {
        userId,
        title: data.title || "Untitled Note",
        content: data.content
      }
    });
  }

  revalidatePath("/notes");
  return { success: true };
}

export async function deleteNote(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.note.delete({
    where: { id, userId }
  });

  revalidatePath("/notes");
  return { success: true };
}