import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HabitAnalysisClient from "../../components/analysis/HabitAnalysisClient";

export default async function AnalysisPage() {
  // Resolve the signed-in user on the server; unauthenticated visitors go to sign-in.
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <HabitAnalysisClient userId={userId} />;
}
