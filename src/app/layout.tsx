import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Baskervville } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { getSomaUser } from "@/lib/prisma"; // 👈 1. Server Import works here!
import { MainLayoutClient } from "@/components/main-layout-client"; // 👈 2. Import the new Client Component

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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👇 3. Fetch data safely on the server
  const user = await getSomaUser();

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

            {/* 👇 4. Pass the data to the client component */}
            <MainLayoutClient user={user}>
              {children}
            </MainLayoutClient>

          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}