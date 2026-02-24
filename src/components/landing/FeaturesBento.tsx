"use client";

import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, CalendarClock, Flame, History, User, Timer, StickyNote, ArrowRight } from "lucide-react";
import { Pirata_One } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

// Upgraded feature array with EXPANDED professional copywriting
const features = [
  {
    num: "01",
    title: "Command Center",
    description: "Your daily overview. Instantly view calories consumed, macros, hydration, and your pending tasks. Eliminate the friction of context-switching by aggregating your most critical biological and productivity metrics into a single, unified dashboard.",
    icon: LayoutDashboard,
    colSpan: "md:col-span-2 md:row-span-2",
    color: "text-white",
    glow: "rgba(255, 255, 255, 0.15)",
  },
  {
    num: "02",
    title: "Daily Timeline",
    description: "Design your perfect day. Schedule tasks, habits, and routines in a powerful 24-hour visual timeline. Drag and drop your focus blocks, visualize your free time, and ensure your priorities are protected.",
    icon: CalendarClock,
    colSpan: "md:col-span-1 md:row-span-2",
    color: "text-sky-400",
    glow: "rgba(56, 189, 248, 0.15)",
  },
  {
    num: "03",
    title: "Deep Analysis",
    description: "Watch your consistency compound. Track habit streaks and view your activity on a beautiful monthly heatmap. Transform abstract effort into hard visual data, creating a psychological feedback loop that forces you to keep your momentum alive.",
    icon: Flame,
    colSpan: "md:col-span-1",
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  {
    num: "04",
    title: "Deadline Manager",
    description: "Beat the clock. Keep projects on track with visual countdown timers and subtask progression. Turn vague due dates into looming, ticking realities that naturally manufacture the urgency required to execute without hesitation.",
    icon: Timer,
    colSpan: "md:col-span-1",
    color: "text-red-500",
    glow: "rgba(239, 68, 68, 0.15)",
  },
  {
    num: "05",
    title: "Rich Notes",
    description: "Your second brain. Capture thoughts, routines, and ideas with our built-in rich text editor. Whether drafting a new workout split, journaling a breakthrough, or storing assets, your context stays perfectly integrated.",
    icon: StickyNote,
    colSpan: "md:col-span-1",
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    num: "06",
    title: "Complete History",
    description: "Your personal logbook. Scroll through a timeline of everything you've eaten, lifted, and accomplished. Access your chronological database instantly to analyze past performance and optimize your future trajectory.",
    icon: History,
    colSpan: "md:col-span-2",
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.15)",
  },
  {
    num: "07",
    title: "Digital Profile",
    description: "Track all-time stats, earn consistency badges, and manage your physical metrics in one place. Cultivate your digital identity as you level up in real life, turning personal development into a gamified experience.",
    icon: User,
    colSpan: "md:col-span-1",
    color: "text-pink-500",
    glow: "rgba(236, 72, 153, 0.15)",
  }
];

// --- 1. THE SPOTLIGHT CARD COMPONENT ---
function SpotlightCard({ feature }: { feature: typeof features[0] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Add will-change to force the browser to hardware-accelerate this element
      className={`bento-feature-card group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950/50 border border-white/5 transition-colors duration-500 hover:border-white/20 will-change-transform ${feature.colSpan}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${feature.glow}, transparent 40%)`,
        }}
      />
      
      {/* Inner Noise / Glass Overlay */}
      <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] md:rounded-[calc(2rem-1px)] bg-zinc-950/80 backdrop-blur-xl z-0 transition-all duration-500 group-hover:bg-zinc-950/60" />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col h-full p-5 md:p-8 overflow-hidden">
        
        {/* Background Watermark Number (Pirata Font) */}
        <div className={`absolute -bottom-2 -right-2 md:-bottom-4 text-[8rem] md:text-[10rem] leading-none ${pirata.className} text-white/[0.03] select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4`}>
          {feature.num}
        </div>

        {/* Background Rotating Icon */}
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 scale-125 md:scale-150 -translate-y-1/4 translate-x-1/4 group-hover:rotate-12">
          <feature.icon className={`w-32 h-32 md:w-48 md:h-48 ${feature.color}`} />
        </div>
        
        {/* Top: Glowing Icon Pill */}
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 border border-white/10 bg-white/5 shadow-lg relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${feature.color} relative z-10`} />
        </div>
        
        {/* Bottom: Text Content */}
        <div className="mt-auto relative z-10 pt-4">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide transition-colors duration-300">
              {feature.title}
            </h3>
            <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 ${feature.color} opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0`} />
          </div>
          
          <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed max-w-[95%] md:max-w-[90%] font-medium group-hover:text-zinc-300 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

      </div>
    </div>
  );
}

// --- 2. MAIN BENTO SECTION ---
export function FeaturesBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  // OPTIMIZED, SNAPPY GSAP REVEAL USING SCROLLTRIGGER.BATCH
  useEffect(() => {
    const ctx = gsap.context(() => {
      // .batch perfectly groups items that appear on the screen at the exact same time
      ScrollTrigger.batch(".bento-feature-card", {
        interval: 0.1, // time window to group items
        batchMax: 3, // maximum items to group together
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { 
              y: 50, // Shorter travel distance feels faster
              opacity: 0, 
              scale: 0.95, 
              rotationX: 15 
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 0.8, // Shorter duration
              ease: "power3.out", // Snappier ease (doesn't drag out at the end)
              stagger: 0.1, // Staggers ONLY the items inside this specific batch
              overwrite: true, // Prevents glitches if scrolled rapidly
            }
          );
        },
        start: "top 85%", // Triggers slightly earlier
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-black relative overflow-hidden">
      
      {/* Background Subtle "Operating System" Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Architecture
          </div>
          
          <h2 className={`${pirata.className} text-[3.5rem] leading-[1] md:text-7xl lg:text-8xl tracking-widest mb-4 md:mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] uppercase`}>
            7 Tools. <br className="block md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient">
              1 Interface.
            </span>
          </h2>
          
          <p className="text-base md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            Everything you need to map your life, strictly organized into powerful, interconnected modules.
          </p>
        </div>

        {/* 3D Perspective Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: "1200px" }}>
          {features.map((feature, idx) => (
            <SpotlightCard key={idx} feature={feature} />
          ))}
        </div>
        
      </div>
    </section>
  );
}