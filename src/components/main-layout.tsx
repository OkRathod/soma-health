"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";
import Link from "next/link";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define which pages are "Marketing" pages (No sidebar, no padding)
  const isMarketingPage = pathname === "/" || pathname?.startsWith("/sign") || pathname?.startsWith("/guides");

  return (
    <>
      {/* 1. THE NAVBAR */}
      {/* It has internal logic to hide, but we can conditionally render it here too for safety */}
      {!isMarketingPage && <Navbar />}

      {/* 2. GLOBAL LOGO (Only for Dashboard/App pages) */}
      {!isMarketingPage && (
        <div className="absolute md:fixed top-6 left-6 z-50">
          <Link href="/">
            <div className="relative w-20 h-20 cursor-pointer transition-transform hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Soma Logo" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
          </Link>
        </div>
      )}

      {/* 3. MAIN CONTENT WRAPPER */}
      {/* If Marketing Page: Simple min-h-screen (Full width/height).
          If App Page: Add the specific padding for the floating dock & logo.
      */}
      <main 
        className={`min-h-screen ${
          isMarketingPage 
            ? "" // LANDING PAGE: No extra padding
            : "pb-24 pt-20 md:pt-0 md:pb-0 md:pl-24" // DASHBOARD: Padded for Dock/Logo
        }`}
      >
        {children}
      </main>
    </>
  );
}