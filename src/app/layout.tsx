import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";

// 👇 IMPORT THIS
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soma.",
  description: "The AI Health Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>

          {/* 1. The Navbar (Floating Dock) */}
          <Navbar />

          {/* 2. GLOBAL LOGO */}
          {/* 👇 CHANGED: 
              'absolute' -> Scrolls with the page on Mobile (moves up).
              'md:fixed' -> Stays pinned in the corner on Desktop. 
          */}
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

          {/* 3. Main Content Wrapper */}
          {/* Keep the 'pt-28' so the logo doesn't cover the text initially */}
          <main className="min-h-screen pb-24 pt-28 md:pt-8 md:pb-8 md:pl-24">
            {children}
          </main>

        </ClerkProvider>
      </body>
    </html>
  );
}