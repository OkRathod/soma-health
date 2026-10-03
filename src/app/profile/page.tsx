import { redirect } from "next/navigation";

// Profile has been merged into the unified Account hub (Settings → Profile tab).
// Keep this route so old links/bookmarks land in the right place.
export default function ProfilePage() {
  redirect("/settings");
}