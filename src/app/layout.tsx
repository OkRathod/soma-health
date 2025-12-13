import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Baskervville } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { MainLayout } from "@/components/main-layout";

const inter = Inter({ subsets: ["latin"] });

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  variable: "--font-baskervville", 
});

export const metadata: Metadata = {
  title: "Soma",
  description: "The AI Health Operating System",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000", // Matches your manifest theme_color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming on inputs, giving a native app feel
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${baskervville.variable} antialiased`}>
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