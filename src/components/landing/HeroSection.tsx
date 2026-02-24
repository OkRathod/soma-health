"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Pirata_One } from "next/font/google";
import gsap from "gsap";
import { InstallPWA } from "@/components/install-pwa";

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // FORCE PLAY THE VIDEO
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Browser blocked autoplay:", error);
      });
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text-element",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.15 }
      );

      tl.fromTo(
        ".hero-buttons",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    // min-h-[100dvh] is better for mobile browsers to account for the address bar
    <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden pt-24 pb-16 md:pt-20 md:pb-20">
      
      {/* --- LAYER 1: BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-black">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80" 
        >
          <source src="https://somafit-01.s3.ap-south-1.amazonaws.com/hero-video+(1).mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* --- LAYER 2: TEXT CONTENT --- */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center mt-4 sm:mt-10">
        
        {/* Version Badge - Scaled down slightly for mobile */}
        <div className="hero-text-element inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50 text-secondary-foreground text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
          Somafit v4 is Now Live
        </div>

        {/* --- ADDED: GLASS FROST WRAPPER --- */}
        {/* Padding and border radius optimized for mobile view */}
        <div className="hero-text-element w-full max-w-5xl mx-auto mb-8 md:mb-12 p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.4)]">
          
          {/* Main Headline - Font size scales smoothly from 2.75rem (mobile) to 8xl (desktop) */}
          <h1 className={`${pirata.className} text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl tracking-widest mb-4 md:mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]`}>
            The Ultimate Operating System <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient block mt-1 sm:mt-0">
              For Your Life.
            </span>
          </h1>

          {/* Subheadline - Scaled to text-base for mobile readability */}
          <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] font-medium">
            More than just a tracker. Manage your nutrition, map your daily timeline, track project deadlines, and log your history in one unified, beautiful workspace.
          </p>
          
        </div>
        {/* --- END GLASS WRAPPER --- */}

        {/* CTAs - Buttons size reduced slightly on mobile so they don't overpower the screen */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto px-2 sm:px-0">
          <Button asChild size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all duration-300 group w-full sm:w-auto rounded-xl">
            <Link href="/sign-up">
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-8 md:px-10 text-base bg-background/60 backdrop-blur-md border-border/50 hover:bg-secondary/80 w-full sm:w-auto transition-all duration-300 rounded-xl gap-2 shadow-lg">
            <Link href="/guides">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" /> View Guides
            </Link>
          </Button>
          <div className="w-full sm:w-auto flex justify-center mt-1 sm:mt-0">
            <InstallPWA />
          </div>
        </div>

      </div>
    </section>
  );
}