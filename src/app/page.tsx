"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Monoton } from "next/font/google";
import { 
  ArrowRight, 
  Brain, 
  History, 
  Zap, 
  ShieldCheck, 
  LineChart, 
  Smartphone,
  MessageSquarePlus, // New icon
  CalendarClock,     // New icon
  TrendingUp,        // New icon
  Watch,             // New icon
  Mic,               // New icon
  Users,              // New icon
  BookOpen
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InstallPWA } from "@/components/install-pwa";

// Initialize the font
const monoton = Monoton({ 
  weight: "400", 
  subsets: ["latin"] 
});

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  
  // Refs for animation scopes
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const dashboardMockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HERO ANIMATIONS
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered Text Reveal
      tl.fromTo(
        ".hero-text-element",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.15 }
      );

      // Buttons Pop in
      tl.fromTo(
        ".hero-buttons",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.4"
      );

      // Dashboard Mockup Float & Tilt Effect
      gsap.fromTo(
        dashboardMockRef.current,
        { rotationX: 10, rotationY: -10, y: 100, opacity: 0 },
        { rotationX: 5, rotationY: -5, y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.2 }
      );

      // Continuous Floating Animation for Dashboard
      gsap.to(dashboardMockRef.current, {
        y: -15,
        rotationX: 0,
        rotationY: 0,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2
      });

      // 2. SCROLL ANIMATIONS (Features)
      const features = gsap.utils.toArray('.bento-card');
      features.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", 
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1, 
          }
        );
      });

      // 3. HOW IT WORKS LINE ANIMATION
      gsap.fromTo(".step-line", 
        { height: "0%" },
        { 
          height: "100%", 
          duration: 1.5, 
          ease: "none",
          scrollTrigger: {
            trigger: ".how-it-works",
            start: "top center",
            end: "bottom center",
            scrub: true
          } 
        }
      );

      // 4. UPCOMING CARDS ANIMATION
      gsap.fromTo(".upcoming-card",
        { y: 30, opacity: 0 },
        {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#roadmap",
            start: "top 80%"
          }
        }
      );

    }, mainRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* 1. GLASS NAVBAR */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LEFT SIDE: Logo + Name */}
          <div className="flex items-center gap-8">
            <span className={`${monoton.className} text-3xl text-foreground pt-1`}>
               SOMA
            </span>
            <Link 
              href="/guides" 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Guides
            </Link>
          </div>

          {/* RIGHT SIDE: Buttons */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                <Link href="/dashboard">
                  Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-105">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          
        </div>
      </header>

      <main className="flex-1 pt-16">
        
        {/* 2. MODERN HERO SECTION */}
        <section className="relative pt-20 pb-32 lg:pt-32 overflow-hidden">
          
          {/* 👇 NEW: Background Video */}
          {/* <video
            autoPlay
            loop
            muted
            playsInline // Important for iOS autoplay
            className="absolute inset-0 w-full h-full object-cover z-10"
          >
            <source src="/hero.mp4" type="video/mp4" />
            Optional: Add a placeholder image if video fails to load
            <img src="/hero-poster.jpg" alt="Hero background" />
          </video> */}

          {/* 👇 NEW: Dark Overlay (Adjust opacity /60 as needed for readability) */}
          {/* This sits between the video and the content to ensure text contrast */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] -z-10" />

          {/* ❌ REMOVED: Old blurred gradient blobs */}
          {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-[100%] blur-[100px] -z-10" /> */}
          {/* <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-info/5 rounded-[100%] blur-[120px] -z-10" /> */}

          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            
            {/* Left: Text Content */}
            <div className="flex-1 text-center lg:text-left" ref={heroTextRef}>
              {/* ... keep existing text content ... */}
              <div className="hero-text-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-secondary text-secondary-foreground text-sm font-medium mb-6 backdrop-blur-md">
                 {/* Note: Added bg-secondary/80 and backdrop-blur-md above for better contrast over video */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Soma v1.0 is Live
              </div>

              <h1 className="hero-text-element text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Your Body, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient">
                  Intelligently Decoded.
                </span>
              </h1>

              <p className="hero-text-element text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Stop guessing. Soma uses AI to analyze your meals, track your workouts, and visualize your metabolic trends—all in one privacy-first dashboard.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-info hover:opacity-90 transition-opacity shadow-lg shadow-info/20">
                  <Link href="/sign-up">Start Your Journey</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-input bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm gap-2">
                  <Link href="/guides/the-soma-protocol">
                    <BookOpen className="w-4 h-4 text-primary" /> Read Protocol
                  </Link>
                </Button>
                {/* 👇 3. ADD THE INSTALL BUTTON HERE */}
                <InstallPWA />
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENTO GRID FEATURES */}
        <section id="features" className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                Everything you need to <span className="text-primary underline decoration-info/50 underline-offset-4">thrive</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We've combined advanced AI with simple design to create the ultimate health companion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
              
              {/* Feature 1: Large Span */}
              <div className="bento-card md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Brain className="w-48 h-48 text-primary" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">AI-Powered Nutrition Coach</h3>
                    <p className="text-muted-foreground text-lg max-w-md">
                      Don't calculate macros manually. Just type "I ate chicken and rice" and Soma decodes the nutritional value, calorie count, and quality instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Vertical */}
              <div className="bento-card md:row-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-info/20">
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-info/5 to-transparent" />
                <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center mb-6 text-info">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Real-time Metabolic Adaptation</h3>
                <p className="text-muted-foreground mb-6">
                  Soma learns. If you consistently burn more than you eat, it adapts your goals to ensure healthy, sustainable progress.
                </p>
                {/* Visual Graphic */}
                <div className="mt-auto w-full h-32 bg-background rounded-xl border border-border flex items-end justify-between p-4 px-6 overflow-hidden">
                   {[40, 60, 45, 70, 65, 85].map((h, i) => (
                      <div key={i} className="w-3 bg-info rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }} />
                   ))}
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bento-card group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-success/20">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center mb-6 text-success">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visual History</h3>
                <p className="text-muted-foreground">
                  Spot trends with our beautiful heat-map calendar. Never lose track of your consistency.
                </p>
              </div>

               {/* Feature 4 */}
               <div className="bento-card group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-foreground">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Deep dive into your caloric intake versus expenditure with precision charts.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS (UPDATED FLOW) */}
        <section id="how-it-works" className="py-24 how-it-works relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-bold mb-4">How Soma Works</h2>
               <p className="text-muted-foreground">Three steps to complete health mastery.</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Central Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2">
                 <div className="step-line w-full bg-primary origin-top" />
              </div>

              {/* Step 1: Natural AI Logging */}
              <div className="relative flex flex-col md:flex-row items-center justify-between mb-24 group">
                <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-12 md:pl-0">
                  <h3 className="text-xl font-bold text-foreground">1. Speak or Type Naturally</h3>
                  <p className="text-muted-foreground">Just tell Soma: "I ate a cheese sandwich and walked 2km." Our AI parses calories, macros, and activity instantly.</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary z-10 flex items-center justify-center shadow-lg shadow-primary/20">
                  <MessageSquarePlus className="w-4 h-4 text-primary" />
                </div>
                <div className="md:w-5/12 order-3 pl-12 md:pl-0">
                   <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Brain className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">"Logged!"</p>
                            <p className="text-xs text-muted-foreground">+350 kcal | -120 kcal burned</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

               {/* Step 2: Drag & Drop Tasks */}
               <div className="relative flex flex-col md:flex-row items-center justify-between mb-24 group">
                <div className="md:w-5/12 order-2 md:order-3 pl-12 md:pl-0">
                  <h3 className="text-xl font-bold text-foreground">2. Design Your Perfect Day</h3>
                  <p className="text-muted-foreground">Use our 24-hour drag-and-drop timeline to schedule meals, workouts, and habits. Visualize your day like a pro.</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-info z-10 flex items-center justify-center shadow-lg shadow-info/20">
                  <CalendarClock className="w-4 h-4 text-info" />
                </div>
                <div className="md:w-5/12 text-left md:text-right order-3 md:order-1 pl-12 md:pl-0">
                    <div className="inline-flex flex-col gap-2 p-3 bg-card rounded-xl border border-border shadow-sm w-full max-w-[200px] md:ml-auto">
                        <div className="h-8 bg-blue-500/10 border-l-4 border-blue-500 rounded text-xs flex items-center px-2">Gym 7:00 AM</div>
                        <div className="h-8 bg-green-500/10 border-l-4 border-green-500 rounded text-xs flex items-center px-2">Breakfast</div>
                        <div className="h-8 bg-orange-500/10 border-l-4 border-orange-500 rounded text-xs flex items-center px-2">Work Block</div>
                    </div>
                </div>
              </div>

               {/* Step 3: Analytics */}
               <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 text-left md:text-right order-2 md:order-1 pl-12 md:pl-0">
                  <h3 className="text-xl font-bold text-foreground">3. Track & Optimize</h3>
                  <p className="text-muted-foreground">View your Weekly Charts and History Logs. Spot trends, fix caloric imbalances, and stay consistent.</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-success z-10 flex items-center justify-center shadow-lg shadow-success/20">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div className="md:w-5/12 order-3 pl-12 md:pl-0">
                   <div className="p-4 bg-card rounded-xl border border-border shadow-sm flex items-end justify-between gap-1 h-20">
                      {[30, 50, 45, 80, 60, 90, 75].map((h, i) => (
                          <div key={i} className="w-full bg-success/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. UPCOMING FEATURES (ROADMAP) */}
        <section id="roadmap" className="py-24 bg-gradient-to-b from-background to-secondary/20 border-t border-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            Roadmap
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">The Future of Soma</h2>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            We are just getting started. Here is what we are building next to supercharge your health journey.
                        </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        View Full Roadmap <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Card 1 */}
                    <div className="upcoming-card p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Watch className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Wearable Sync</h3>
                        <p className="text-muted-foreground text-sm">
                            Seamless integration with Apple Health, Google Fit, and Oura Ring to auto-import your workouts and sleep data.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="upcoming-card p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Mic className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Soma Voice Mode</h3>
                        <p className="text-muted-foreground text-sm">
                            Hands-free logging. Just tap and talk. "Hey Soma, log a 30-minute run and a banana." Done in seconds.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="upcoming-card p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Community Challenges</h3>
                        <p className="text-muted-foreground text-sm">
                            Compete with friends in step counts, hydration streaks, and consistency leaderboards. Health is better together.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* 6. TRUST / PRIVACY */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Your Data is Yours. Period.</h2>
            <p className="text-xl text-muted-foreground mb-10">
              We believe health data is the most personal data you possess. Soma is built with privacy-first principles. We don't sell your data, ever.
            </p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="font-semibold">End-to-End Encrypted</span>
               </div>
               <div className="flex items-center gap-2">
                 <Smartphone className="w-5 h-5" />
                 <span className="font-semibold">Local-First Philosophy</span>
               </div>
            </div>
          </div>
        </section>

      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <span className={`${monoton.className} text-xl pt-1`}>
               SOMA
             </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Soma Inc. All rights reserved.
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}