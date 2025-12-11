import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { MainLayout } from "@/components/main-layout"; // 👈 Import the new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soma",
  description: "The AI Health Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            
            {/* 👇 The Client Component handles the conditional UI now */}
            <MainLayout>
              {children}
            </MainLayout>

          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}