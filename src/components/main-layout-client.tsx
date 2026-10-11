"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { FeedbackPrompt } from "@/components/feedback-prompt";

/**
 * Client half of the root layout. Decides whether a route gets the app shell
 * (floating navbar on desktop, top bar + dock on mobile) or renders bare
 * (landing page and Clerk auth screens).
 */
export function MainLayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const pathname = usePathname();
  const isBare = pathname === "/" || pathname?.startsWith("/sign");

  if (isBare) {
    return (
      <>
        <main className="min-h-dvh">{children}</main>
        <FeedbackPrompt />
      </>
    );
  }

  return (
    <>
      <Navbar user={user} />
      {/* md:pt-24 clears the fixed desktop bar. Mobile clearance for the dock is
          handled by PageShell's bottom padding. */}
      <main className={user ? "min-h-dvh md:pt-24" : "min-h-dvh pt-4"}>{children}</main>
      <FeedbackPrompt />
    </>
  );
}
