import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs';
import { getSomaUser } from "@/lib/prisma";
import { MainLayoutClient } from "@/components/main-layout-client";
import { Toaster } from "@/components/ui/sonner";

// Type system (see globals.css → @theme): grotesk for reading, serif for
// display, mono for labels. Exposed as CSS variables so Tailwind's
// font-sans / font-display / font-mono utilities resolve to them.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// import type { Metadata } from "next";
import { headers } from "next/headers";

// --- DYNAMIC METADATA GENERATION (SEO & Indexing) ---
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "www.somafit.in";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  // Dynamically constructs the base URL (handles localhost, preview URLs, and Production)
  const fullBaseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(fullBaseUrl),
    title: {
      default: "Soma | The AI Health Operating System", 
      template: "%s | Soma", // Automatically formats child pages (e.g., "Dashboard | Soma")
    },
    description: "The operating system for your biological and physical potential. Centralize your metrics, schedule tasks, and track historical data.",
    keywords: ["health dashboard", "AI fitness", "habit tracker", "daily timeline", "macro tracker", "Soma OS"],
    manifest: "/manifest.webmanifest",
    
    // Explicit icon mapping for mobile devices and PWA
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    
    // Ensures beautiful rich snippets on iMessage, Discord, Twitter, LinkedIn
    openGraph: {
      title: "Soma | The AI Health Operating System",
      description: "The operating system for your biological and physical potential. Architect your perfect day.",
      url: fullBaseUrl,
      siteName: "Soma OS",
      images: [
        {
          url: "/og-image.png", // Note: Ensure you place an 'og-image.jpg' (1200x630) in your public folder!
          width: 1200,
          height: 630,
          alt: "Soma OS Dashboard Preview",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    
    // Twitter-specific card formatting
    twitter: {
      card: "summary_large_image",
      title: "Soma | The AI Health Operating System",
      description: "The operating system for your biological and physical potential. Architect your perfect day.",
      images: ["/og-image.png"], 
    },
    
    // Advanced crawler directives
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#10100e" },
  ],
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👇 3. Fetch data safely on the server
  const user = await getSomaUser();

  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">
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