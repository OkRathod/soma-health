"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Monoton } from "next/font/google";
import { ArrowRight, BookOpen } from "lucide-react";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    // {/* UPGRADED WIDTH: Replaced md:w-auto md:min-w-[600px] with md:w-[85%] md:max-w-6xl */}
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-[420px] md:w-[85%] md:max-w-5xl rounded-2xl md:rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300">
      
      {/* Inner Content Wrapper */}
      <div className="flex items-center justify-between px-3 py-2.5 md:px-6 md:py-3 w-full">
        
        {/* LEFT SIDE: Logo & Links */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className={`${monoton.className} text-xl md:text-3xl text-white pt-1 tracking-wider hover:scale-105 transition-transform drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]`}>
            SOMAFIT
          </Link>
          <Link 
            href="/guides" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Guides
          </Link>
        </div>

        {/* RIGHT SIDE: Auth Buttons */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {isSignedIn ? (
            <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-6 text-sm md:text-base">
              <Link href="/dashboard">
                Dashboard <ArrowRight className="ml-1.5 md:ml-2 w-3.5 h-3.5 md:w-4 md:h-4" />
              </Link>
            </Button>
          ) : (
            <>
              {/* Premium Blue Sign In Button */}
              <Button asChild className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-5 text-sm md:text-base font-medium border border-blue-500/50">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              
              {/* Glow Get Started Button */}
              <Button asChild className="rounded-xl bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 h-9 md:h-10 px-4 md:px-6 text-sm md:text-base font-semibold">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}