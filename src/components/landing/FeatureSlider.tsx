"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pirata_One } from "next/font/google";
import { LayoutDashboard, CalendarClock, Flame, Timer, StickyNote, History } from "lucide-react";

// Initialize the Pirata One font
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  display: 'swap',
});

// `media` array replaces `images` to support both video and images
const slides = [
  {
    id: 1,
    title: "Command Center",
    description: "Centralize your biological metrics. Monitor your exact caloric intake, macro breakdowns, and daily hydration targets in one unified, real-time dashboard. No matter how much text you add here, it will safely flow downwards naturally on mobile without any scrolling!",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard.mp4", label: "Feature Video" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-3.png", label: "Main Overview" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-2.png", label: "AI Feedback" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-1.png", label: "Weekly Chart" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-4.png", label: "Steps Counter" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/dashboard-5.png", label: "Tasks Preview" }, 
    ], 
    icon: LayoutDashboard,
    color: "text-primary",
    bgIcon: "bg-primary/10",
    borderActive: "border-primary/50 shadow-primary/20",
  },
  {
    id: 2,
    title: "24-Hour Timeline",
    description: "Take absolute control of your schedule. Seamlessly drag and drop your daily tasks, habits, and focus blocks to architect your perfect day.",
    media: [
      // { type: "video", url: "/hero-video.mp4", label: "Timeline Action" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/tasks-1.png", label: "Habit Blocks" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/tasks-2.png", label: "Tasks Blocks" },
    ],
    icon: CalendarClock,
    color: "text-violet-500",
    bgIcon: "bg-violet-500/10",
    borderActive: "border-violet-500/50 shadow-violet-500/20",
  },
  {
    id: 3,
    title: "Deep Analysis",
    description: "Turn daily discipline into visual momentum. Track your historical data through dynamic monthly heatmaps and watch your consistency compound.",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/analysis-video.mp4", label: "Consistency Heatmap" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/analysis.png", label: "Consistency Heatmap" }
    ],
    icon: Flame,
    color: "text-orange-500",
    bgIcon: "bg-orange-500/10",
    borderActive: "border-orange-500/50 shadow-orange-500/20",
  },
  {
    id: 4,
    title: "Deadline Manager",
    description: "Eliminate procrastination. Transform abstract due dates into striking, visual countdown timers that guarantee your highest-priority projects stay on track.",
    media: [
      { type: "video", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadlines-video.mp4", label: "Active Projects" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadline-2.png", label: "Active Projects" }, 
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/deadline-1.png", label: "Countdown Timers" }
    ],
    icon: Timer,
    color: "text-destructive",
    bgIcon: "bg-destructive/10",
    borderActive: "border-destructive/50 shadow-destructive/20",
  },
  {
    id: 5,
    title: "Rich Notes",
    description: "Offload your mental clutter. Capture fleeting thoughts, document complex routines, and journal your progress with our frictionless, distraction-free editor.",
    media: [
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/notes.png", label: "Daily Journal" }, 
      // { type: "image", url: "/slide-notes-2.png", label: "Workout Log" }
    ],
    icon: StickyNote,
    color: "text-green-500",
    bgIcon: "bg-green-500/10",
    borderActive: "border-green-500/50 shadow-green-500/20",
  },
  {
    id: 6,
    title: "Complete History",
    description: "Your personal logbook. Scroll through a timeline of everything you've eaten, lifted, and accomplished. Access your chronological database instantly to analyze past performance and optimize your future trajectory.",
    media: [
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-2.png", label: "Chronological Log" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-1.png", label: "Chronological Log" },
      { type: "image", url: "https://somafit-01.s3.ap-south-1.amazonaws.com/history-3.png", label: "Chronological Log" }
    ],
    icon: History, // Make sure 'History' is imported from 'lucide-react' at the top of your file!
    color: "text-cyan-500",
    bgIcon: "bg-cyan-500/10",
    borderActive: "border-cyan-500/50 shadow-cyan-500/20",
  },
];

export function FeatureSlider() {
  const [activeId, setActiveId] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [innerIndex, setInnerIndex] = useState(0);
  
  const [videoProgress, setVideoProgress] = useState(0);

  const triggerNextSlide = () => {
    const currentSlide = slides.find(s => s.id === activeId);
    if (!currentSlide) return;

    if (innerIndex >= currentSlide.media.length - 1) {
      setActiveId((prevId) => (prevId === slides.length ? 1 : prevId + 1));
      setInnerIndex(0);
    } else {
      setInnerIndex((prev) => prev + 1);
    }
    setVideoProgress(0);
  };

  useEffect(() => {
    if (isHovered) return;

    const currentSlide = slides.find(s => s.id === activeId);
    if (!currentSlide) return;
    
    const currentMedia = currentSlide.media[innerIndex];

    if (currentMedia.type === "video") return;

    const timer = setTimeout(() => {
      triggerNextSlide();
    }, 4000); 

    return () => clearTimeout(timer);
  }, [isHovered, activeId, innerIndex]); 

  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        @keyframes fillImageProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className={`${pirata.className} text-4xl md:text-7xl font-bold tracking-tight mb-3 md:mb-4 text-foreground`}>
            Experience the <span className="text-primary">Interface.</span>
          </h2>
        </div>

        <div 
          className="flex flex-col md:flex-row gap-3 md:gap-4 w-full h-[700px] md:h-[600px] group/container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide) => {
            const isActive = activeId === slide.id;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if(!isActive) {
                     setActiveId(slide.id);
                     setInnerIndex(0);
                     setVideoProgress(0);
                  }
                }}
                className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] border-2
                  ${isActive 
                    ? `flex-[12] md:flex-[8] ${slide.borderActive} shadow-2xl bg-card` 
                    : `flex-[1] md:flex-[1] border-zinc-700/50 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 md:hover:-translate-y-2 hover:brightness-125 hover:border-zinc-500`
                  }
                `}
              >
                
                {/* --- 1. COMBINED EXPANDED WRAPPER (Image + Content) --- */}
                {/* Mobile: Uses 'flex-col' to naturally stack the image and text with ZERO gap. Desktop: Uses 'block' to keep the original absolute overlay structure. */}
                <div className={`absolute inset-0 w-full h-full flex flex-col md:block transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
                  
                  {/* --- MEDIA CONTAINER --- */}
                  <div className="w-full pt-4 md:pt-6 px-3 md:px-8 md:absolute md:inset-0 md:h-full md:pb-[10rem]">
                    <div className="relative w-full aspect-video md:aspect-auto md:h-full border border-white/10 bg-black/40 rounded-xl md:rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)] p-1.5 md:p-2 shrink-0">
                      <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden border-2 border-white/20 bg-black">
                        
                        {slide.media.map((mediaObj, idx) => {
                          const isCurrentMedia = innerIndex === idx;

                          return (
                            <div 
                              key={idx} 
                              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${isCurrentMedia ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                            >
                              {mediaObj.type === "video" ? (
                                <video 
                                  ref={(el) => {
                                    if (el) {
                                      if (isActive && isCurrentMedia) {
                                        el.play().catch((err) => console.log("Browser blocked autoplay:", err));
                                      } else {
                                        el.pause();
                                        el.currentTime = 0; 
                                      }
                                    }
                                  }}
                                  src={mediaObj.url}
                                  muted
                                  playsInline
                                  className="w-full h-full object-contain drop-shadow-2xl"
                                  onTimeUpdate={(e) => {
                                    const v = e.target as HTMLVideoElement;
                                    if (isActive && isCurrentMedia && v.duration) {
                                      setVideoProgress((v.currentTime / v.duration) * 100);
                                    }
                                  }}
                                  onEnded={triggerNextSlide}
                                />
                              ) : (
                                <Image
                                  src={mediaObj.url}
                                  alt={`${slide.title} - ${mediaObj.label}`}
                                  fill
                                  className="object-contain drop-shadow-2xl"
                                  priority={isActive && idx === 0}
                                />
                              )}
                              
                              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 bg-black/60 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                                {mediaObj.label}
                              </div>
                            </div>
                          )
                        })}

                        {/* Progress Dots */}
                        {slide.media.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
                            {slide.media.map((mediaObj, idx) => (
                              <button 
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInnerIndex(idx);
                                  setVideoProgress(0);
                                }}
                                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${innerIndex === idx ? "w-10 bg-white/20" : "w-2 bg-white/50 hover:bg-white/80"}`}
                              >
                                {innerIndex === idx && isActive && (
                                  mediaObj.type === "video" ? (
                                    <div 
                                      className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
                                      style={{ width: `${videoProgress}%` }} 
                                    />
                                  ) : (
                                    <div 
                                      className="absolute top-0 left-0 h-full bg-white"
                                      style={{ animation: 'fillImageProgress 4s linear forwards' }} 
                                    />
                                  )
                                )}
                              </button>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Gradient strictly hidden on mobile because we no longer overlap elements! */}
                  <div className={`hidden md:block absolute inset-x-0 bottom-0 h-[12rem] bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none`} />

                  {/* --- TEXT CONTENT CONTAINER --- */}
                  <div className="w-full px-4 pt-4 md:p-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 md:absolute md:bottom-0 md:inset-x-0">
                    
                    {/* MOBILE EXCLUSIVE: Icon + Title strictly inline! */}
                    <div className="flex md:hidden flex-row items-center gap-3 w-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border/50 shadow-lg backdrop-blur-md ${slide.bgIcon} ${slide.color}`}>
                        <slide.icon className="w-5 h-5" />
                      </div>
                      <h3 className={`${pirata.className} text-[1.75rem] text-foreground drop-shadow-lg tracking-wide leading-none pt-1`}>
                        {slide.title}
                      </h3>
                    </div>

                    {/* DESKTOP EXCLUSIVE: Standalone Icon (Keeps desktop format identical) */}
                    <div className={`hidden md:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0 border border-border/50 shadow-lg backdrop-blur-md ${slide.bgIcon} ${slide.color}`}>
                      <slide.icon className="w-6 h-6" />
                    </div>

                    {/* Description Block */}
                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 w-full overflow-hidden text-left">
                      
                      {/* DESKTOP EXCLUSIVE: Standalone Title */}
                      <h3 className={`${pirata.className} hidden md:block text-4xl lg:text-5xl text-foreground drop-shadow-lg tracking-wide leading-none shrink-0 md:w-[220px] lg:w-[280px]`}>
                        {slide.title}
                      </h3>
                      
                      {/* Divider Line (Desktop only) */}
                      <div className="hidden md:block w-px h-12 bg-border/50 shrink-0" />

                      {/* MAGIC FIX: max-h-none on mobile means full text visibility, no scroll! */}
                      <div className="max-h-none md:max-h-[100px] flex-1 overflow-visible md:overflow-y-auto overscroll-contain pr-0 md:pr-2 custom-scrollbar">
                        <p className="text-muted-foreground drop-shadow-md text-[15px] md:text-base lg:text-lg font-medium leading-snug">
                          {slide.description}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* --- 2. SHRUNKEN STATE (Completely Untouched) --- */}
                <div className={`absolute inset-0 flex flex-row md:flex-col items-center justify-start px-5 md:px-0 md:pt-8 md:pb-8 gap-4 md:gap-8 transition-opacity duration-500 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner bg-black/50 border border-zinc-700/50 ${slide.color}`}>
                    <slide.icon className="w-4 h-4 md:w-5 md:h-5 drop-shadow-md" />
                  </div>
                  
                  <div className="flex-1 flex items-center justify-start md:justify-center">
                    <h3 className={`${pirata.className} md:-rotate-90 whitespace-nowrap text-xl md:text-3xl tracking-widest ${slide.color} drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-90`}>
                      {slide.title}
                    </h3>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}