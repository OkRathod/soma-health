import { prisma } from "@/lib/prisma";

export async function checkProfileCompleteness(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      height: true,
      weight: true,
      age: true,
      gender: true,
      activityLevel: true,
    },
  });

  if (!user) return { isComplete: false, missing: ["User Not Found"] };

  const missingFields = [];
  if (!user.height) missingFields.push("height");
  if (!user.weight) missingFields.push("weight");
  if (!user.age) missingFields.push("age");
  if (!user.gender) missingFields.push("gender");
  // Activity level usually has a default, but good to check
  if (!user.activityLevel) missingFields.push("activity level");

  return {
    isComplete: missingFields.length === 0,
    missing: missingFields,
  };
}