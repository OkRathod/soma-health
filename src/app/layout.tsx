import type { Metadata, Viewport } from "next";
import { Inter, Wallpoet } from "next/font/google";
import localFont from "next/font/local";
import { Baskervville } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { getSomaUser } from "@/lib/prisma"; // 👈 1. Server Import works here!
import { MainLayoutClient } from "@/components/main-layout-client"; // 👈 2. Import the new Client Component
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  variable: "--font-baskervville", 
});

const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wallpoet", // 👈 Defines the variable name
});

const BBH_Hegarty = localFont({
  src: "/fonts/BBH_Hegarty/BBHHegarty-Regular.ttf", // 👈 Make sure this path matches your file name!
  variable: "--font-bbh-hegarty",  // 👈 The CSS variable name
  weight: "400",
});

export const metadata: Metadata = {
  title: "Soma",
  description: "The AI Health Operating System",
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
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
      <body className={`${inter.className} ${baskervville.variable} ${BBH_Hegarty.variable} ${wallpoet.variable} antialiased`}>
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
              <Toaster />
            </MainLayoutClient>

          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}