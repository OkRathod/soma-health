import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 IMPORT THIS
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soma.",
  description: "The AI Health Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 👇 WRAP EVERYTHING HERE
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}