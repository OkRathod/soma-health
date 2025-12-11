"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define which pages are "Marketing" pages (No sidebar, no padding)
  const isMarketingPage = pathname === "/" || pathname?.startsWith("/sign");

  return (
    <>
      {/* 1. THE NAVBAR */}
      {/* It has internal logic to hide, but we can conditionally render it here too for safety */}
      {!isMarketingPage && <Navbar />}

      {/* 2. GLOBAL LOGO (Only for Dashboard/App pages) */}
      {!isMarketingPage && (
        <div className="absolute md:fixed top-6 left-6 z-50">
          <div className="relative w-16 h-16 md:w-24 md:h-24 transition-all duration-300">
            <Image 
              src="/logo.png" 
              alt="Soma Logo" 
              fill 
              className="object-contain" 
              priority
            />
          </div>
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
            : "pb-24 pt-28 md:pt-8 md:pb-8 md:pl-24" // DASHBOARD: Padded for Dock/Logo
        }`}
      >
        {children}
      </main>
    </>
  );
}