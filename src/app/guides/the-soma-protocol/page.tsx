"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, 
  Brain, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  Flame, 
  Smartphone, 
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SomaProtocolPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            
            {/* 1. BACK BUTTON (Floating) */}
            {/* <div className="fixed top-6 left-6 z-50">
                <Button asChild variant="ghost" size="sm" className="backdrop-blur-md bg-background/30 hover:bg-background/60 border border-border/50">
                    <Link href="/guides"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Guides</Link>
                </Button>
            </div> */}

            {/* 2. HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">
                {/* Background Gradient Mesh */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-[100%] blur-[100px] -z-10" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/5 rounded-[100%] blur-[120px] -z-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Official Guide
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        The Soma <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Protocol</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A blueprint for high-performance living. Optimize your biology, automate your decisions, and engineer your perfect day.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 text-sm text-muted-foreground"
                >
                    <span className="text-xs uppercase tracking-widest">Begin Protocol</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                </motion.div>
            </section>

            {/* 3. PHASE 0: ENVIRONMENT */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader 
                        phase="Phase 0" 
                        title="The Environment" 
                        desc="You don't rise to the level of your goals — you fall to the level of your systems. Soma removes friction so your habits execute automatically."
                    />

                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        <FeatureCard
                            icon={<Smartphone className="w-6 h-6 text-primary" />}
                            title="1. Install as a PWA"
                            desc="Remove the browser UI. Add Soma to your Home Screen to create a dedicated psychological trigger for logging."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-primary" />}
                            title="2. Zero-Click Mindset"
                            desc="We designed the Dashboard for speed. Treat it as your command center. Bypass menus, just log."
                        />
                    </div>
                </div>
            </section>

            {/* 4. PHASE 1: ARCHITECTURE */}
            <SplitSection
                phase="Phase 1"
                title="The Architecture of Tomorrow"
                desc="Decision fatigue is the enemy. By planning the night before, you wake up with a pre-loaded brain, ready to execute without hesitation."
                bullets={[
                    "Anchor Biology: Schedule Sleep, Gym, and Meals as 'Habits' first.",
                    "Deep Work Containers: Drag a 90-minute HIGH priority block to your peak energy time (9 AM).",
                    "Shallow Buffer: Batch emails and chores into low-energy windows (4 PM)."
                ]}
                icon={<CalendarCheck className="w-8 h-8 text-primary" />}
            />

            {/* 5. PHASE 2: MORNING */}
            <SplitSection
                phase="Phase 2"
                title="The Morning Launchpad"
                desc="How you start the first 30 minutes determines your dopamine trajectory. Prime your mind, hydrate your system, and fuel with intention."
                bullets={[
                    "Mindset Primer: Read the Daily Quote to trigger your Reticular Activating System.",
                    "Hydration Kickstart: Tap 'Add 250ml' before coffee to fix overnight dehydration.",
                    "Glucose Baseline: Log a savory, high-protein breakfast to prevent an 11 AM crash."
                ]}
                reverse
                icon={<Droplets className="w-8 h-8 text-blue-500" />}
            />

            {/* 6. PHASE 3: EXECUTION */}
            <SplitSection
                phase="Phase 3"
                title="The Execution Window"
                desc="Time, energy, and biology converge. Soma acts as your visual accountability partner, keeping you in flow and properly fueled."
                bullets={[
                    "Visual Forcing Function: The Timeline View creates urgency (Parkinson's Law).",
                    "Adaptive Fueling: Check Dashboard Stats before lunch. Low burn? Eat light. High burn? Refuel.",
                    "NEAT Optimization: Log small walks to validate your non-exercise activity."
                ]}
                icon={<Flame className="w-8 h-8 text-orange-500" />}
            />

            {/* 7. PHASE 4: AUDIT */}
            <SplitSection
                phase="Phase 4"
                title="The Evening Audit"
                desc="Close open loops to sleep better. Reviewing your data turns experience into strategy for tomorrow."
                bullets={[
                    "Zeigarnik Effect: Check off remaining tasks to release mental tension.",
                    "History Review: Compare your 'Planned' timeline vs 'Actual' reality.",
                    "AI Coach: Read the diet feedback. High sodium today? Adjust tomorrow."
                ]}
                reverse
                icon={<Clock className="w-8 h-8 text-purple-500" />}
            />

            {/* 8. CTA */}
            <section className="py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-card border border-border p-12 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />
                    
                    <h2 className="text-4xl font-bold mb-6">Ready to Optimize?</h2>
                    <p className="text-lg text-muted-foreground mb-10">
                        You have the protocol. You have the tool. Now, execute the plan.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25">
                            <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                            <Link href="/tasks">Open Planner</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}

/* --- SUBCOMPONENTS --- */

function SectionHeader({ phase, title, desc }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
        >
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">{phase}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
        >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function SplitSection({ phase, title, desc, bullets, reverse = false, icon }: any) {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
                
                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={reverse ? "lg:order-2" : ""}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-secondary rounded-xl">{icon}</div>
                        <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{phase}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {desc}
                    </p>

                    <ul className="space-y-4">
                        {bullets.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <span className="text-foreground/90">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Visual Side (Abstract Representation) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`
                        relative h-[500px] w-full rounded-3xl overflow-hidden border border-border shadow-2xl
                        ${reverse ? "lg:order-1" : ""}
                    `}
                >
                    {/* Abstract UI Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary/50" />
                    
                    {/* Decorative Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                    
                    {/* Content Placeholder (Simulates UI) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg p-6 flex flex-col gap-4">
                            <div className="h-8 w-1/3 bg-primary/10 rounded-lg animate-pulse" />
                            <div className="h-4 w-2/3 bg-secondary rounded animate-pulse delay-75" />
                            <div className="h-4 w-1/2 bg-secondary rounded animate-pulse delay-150" />
                            <div className="mt-auto h-32 bg-secondary/30 rounded-xl border border-dashed border-border" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}