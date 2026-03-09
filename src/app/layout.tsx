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