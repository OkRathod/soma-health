import { getSomaUser } from "@/lib/prisma"; // The helper we just made
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client"; // We will create this next

export default async function DashboardPage() {
  // 1. Get the authenticated user from the server
  const user = await getSomaUser();

  // 2. If not logged in, kick them out
  if (!user) {
    redirect("/sign-in");
  }

  // 3. Pass the user data to the Client Component
  return <DashboardClient user={user} />;
}