"use client"; // 👈 This is fine for UI logic

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";

export function MainLayoutClient({ 
  children, 
  user 
}: { 
  children: React.ReactNode, 
  user: any // Recieves user data from the server parent
}) {
  const pathname = usePathname();
  
  // Define which pages are "Marketing" pages (No sidebar, no padding)
  const isMarketingPage = pathname === "/" || pathname?.startsWith("/sign");

  return (
    <>
      {/* 1. THE NAVBAR */}
      {!isMarketingPage && <Navbar user={user}/>}

      {/* 2. MAIN CONTENT WRAPPER */}
      <main 
        className={`min-h-screen ${
          isMarketingPage 
            ? "" // LANDING PAGE: No extra padding
            : "pb-2 pt-2 md:pt-0 md:pb-0 md:pl-20" // DASHBOARD: Padded for Sidebar (80px)
        }`}
      >
        {children}
      </main>
    </>
  );
}