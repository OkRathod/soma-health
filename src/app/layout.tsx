import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";

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

          {/* 1. The Navbar sits on top of everything */}
          <Navbar />

          {/* 2. Main Content Wrapper (Pushes content away from Navbar) */}
          <main className="min-h-screen pb-24 md:pb-8 md:pl-24 pt-4">
            {children}
          </main>

        </ClerkProvider>
      </body>
    </html>
  );
}