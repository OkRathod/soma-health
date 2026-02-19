// app/analysis/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HabitAnalysisClient from "../../components/analysis/HabitAnalysisClient";

export default async function AnalysisPage() {
  // 1. Securely get the user ID from Clerk on the server
  const { userId } = await auth();

  // 2. Protect the route: if they aren't logged in, send them to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // 3. Render the client component and pass the userId as a prop
  return <HabitAnalysisClient userId={userId} />;
}