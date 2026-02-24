"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Monoton, Pirata_One } from "next/font/google";
import { ArrowRight, ArrowUpRight, Twitter, Github, Clock, Terminal } from "lucide-react";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });
const pirata = Pirata_One({ weight: "400", subsets: ["latin"], display: 'swap' });

export function Footer() {
  // OS Feature: Live Terminal Clock State
  const [time, setTime] = useState<string>("00:00:00");
  const [mounted, setMounted] = useState(false);

  // Safely start the clock only on the client
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-black pt-24 md:pt-32 overflow-hidden border-t border-white/5 flex flex-col items-center">
      
      {/* 1. Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] md:h-[400px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[150px] md:h-[200px] bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center w-full">
        
        {/* 2. The Final Call to Action */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center w-full">
          <h2 className={`${pirata.className} text-[2.75rem] leading-[1.1] md:text-7xl text-white mb-4 md:mb-6 tracking-wide drop-shadow-2xl`}>
            Architect Your <br className="md:hidden" /> Perfect Day.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-md px-4">
            Stop guessing. Start executing. Initialize your personal operating system today.
          </p>
          <Link 
            href="/sign-up" 
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-white text-black rounded-full font-bold text-base md:text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 whitespace-nowrap">Initialize OS</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3. Floating Glass Dock */}
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-3 px-6 md:px-8 py-4 md:py-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl mb-10 md:mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-[95%]">
          {["Command Center", "Timeline", "Analysis", "Deadlines", "Notes"].map((item) => (
            <Link 
              key={item} 
              href="/dashboard" 
              className="text-zinc-400 hover:text-white text-[13px] md:text-base font-medium transition-colors flex items-center gap-1 group"
            >
              {item}
              <ArrowUpRight className="w-3 h-3 opacity-0 md:-translate-y-1 md:translate-x-1 md:group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all hidden md:block" />
            </Link>
          ))}
        </div>

        {/* 3.5 Contact / Terminal Connection Block */}
        <div className="flex flex-col items-center mb-12 md:mb-16 z-20">
          <p className="text-zinc-500 text-xs md:text-sm mb-3 uppercase tracking-widest font-semibold">
            Establish Connection
          </p>
          <a 
            href="mailto:nimtechsol@gmail.com" 
            className="group flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 backdrop-blur-md"
          >
            <Terminal className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="font-mono text-[13px] md:text-sm text-zinc-400 group-hover:text-white transition-colors tracking-wide">
              ping nimtechsol@gmail.com
            </span>
            <span className="w-1.5 h-4 bg-white/70 animate-pulse ml-0.5" /> 
          </a>
        </div>

        {/* 4. Bottom Utilities (Mobile Stacked & Symmetrical) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 border-t border-white/10 pt-8 pb-6 md:pb-4 px-2 md:px-4">
          
          {/* Top/Left: Live OS Status Row */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm font-medium text-zinc-500 w-full md:w-auto">
            {/* Desktop Copyright */}
            <span className="hidden md:block order-last md:order-none">
              © {new Date().getFullYear()} NIM Tech Solutions & Somafit. All rights reserved.
            </span>
            
            <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-700" />
            
            {/* Live Terminal Clock */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/5 font-mono text-xs text-zinc-400 shadow-inner tracking-wider">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              {mounted ? time : "00:00:00"}
            </div>

            {/* System Online Badge */}
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md text-zinc-300 text-xs font-semibold tracking-wide uppercase select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Online
            </span>
          </div>

          {/* Bottom/Right: Links & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 text-sm font-medium w-full md:w-auto">
            
            <div className="flex items-center gap-6 text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">
                Terms
              </Link>
            </div>
            
            <span className="hidden md:block w-px h-4 bg-white/15" />

            <div className="flex items-center gap-5 text-zinc-400">
              <Link href="#" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">
                <Twitter className="w-[18px] h-[18px] md:w-4 md:h-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white hover:-translate-y-0.5 transition-transform duration-300">
                <Github className="w-[18px] h-[18px] md:w-4 md:h-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>

            {/* Mobile Copyright fallback */}
            <span className="block md:hidden text-xs text-zinc-600 mt-2 text-center px-4">
              © {new Date().getFullYear()} NIM Tech Solutions & Somafit.<br className="block sm:hidden" /> All rights reserved.
            </span>

          </div>
        </div>

      </div>

      {/* 5. The Colossal Floor Logo (Mobile width explicitly fixed) */}
      <div className="w-full flex justify-center items-end mt-4 md:mt-0 relative z-0 overflow-hidden h-[18vw] md:h-auto">
        <h1 
          className={`${monoton.className} text-[27vw] md:text-[22vw] leading-[0.7] tracking-tighter md:tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-black select-none pointer-events-none hover:from-zinc-700 transition-all duration-1000`}
        >
          SOMAFIT
        </h1>
      </div>
      
    </footer>
  );
}