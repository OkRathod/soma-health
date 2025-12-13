import { getSomaUser } from "@/lib/prisma"; // Keep your existing helper
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";
import { checkProfileCompleteness } from "@/lib/check-profile"; // 👈 Import 1
import { CompleteProfileModal } from "@/components/complete-profile-modal"; // 👈 Import 2

export default async function DashboardPage() {
  // 1. Get the authenticated user (keeps your existing clean logic)
  const user = await getSomaUser();

  // 2. If not logged in, kick them out
  if (!user) {
    redirect("/sign-in");
  }

  // 3. 👇 NEW: Check if their profile is complete
  const profileStatus = await checkProfileCompleteness(user.id);

  // 4. Pass the user data to Client, AND show modal if needed
  return (
    <>
      {/* If profile is incomplete, this Modal blocks the screen */}
      {!profileStatus.isComplete && (
        <CompleteProfileModal userId={user.id} missingFields={profileStatus.missing} />
      )}

      {/* The normal dashboard loads behind it */}
      <DashboardClient user={user} />
    </>
  );
}