"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Bug, Lightbulb, MessageSquare, CheckCircle2, ArrowRight, Wand2, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/app/actions/feedback"; 
import { cn } from "@/lib/utils";
import Link from "next/link";

// ⚡ LCP OPTIMIZATION 1: Move heavy constants outside component to avoid re-creation
const QUESTION_BANK: any = {
  BUG: {
    title: "Report a Bug",
    q1: { label: "What exactly happened?", placeholder: "I clicked X and then Y crashed...", key: "bugDescription" },
    q2: { label: "Steps to reproduce (optional)", placeholder: "1. Go to settings\n2. Click save...", key: "bugSteps" },
    icon: AlertTriangle
  },
  FEATURE: {
    title: "Request a Feature",
    q1: { label: "What problem are you trying to solve?", placeholder: "I find it hard to track my water because...", key: "featureProblem" },
    q2: { label: "How do you imagine the solution?", placeholder: "It would be cool if there was a button that...", key: "featureSolution" },
    icon: Wand2
  },
  GENERAL: {
    title: "General Feedback",
    q1: { label: "Biggest daily challenge Soma doesn't solve yet?", placeholder: "e.g. I struggle to track my mood...", key: "generalChallenge" },
    q2: { label: "Magic Wand: One thing to change on Soma?", placeholder: "I wish the dashboard had...", key: "generalMagicWand" },
    icon: Heart
  }
};

export default function FeedbackPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<"BUG" | "FEATURE" | "GENERAL" | "">("");
  const [answers, setAnswers] = useState({
    bugDescription: "", bugSteps: "",
    featureProblem: "", featureSolution: "",
    generalChallenge: "", generalMagicWand: ""
  });

const handleSubmit = async () => {
    setIsSubmitting(true);
    const activeQuestions = QUESTION_BANK[category];
    const cleanAnswers = {
        [activeQuestions.q1.key]: (answers as any)[activeQuestions.q1.key],
        [activeQuestions.q2.key]: (answers as any)[activeQuestions.q2.key]
    };
    const relevantData = {
        rating,
        category,
        answers: cleanAnswers 
    };

    await submitFeedback(relevantData);
    setStep(4);
    setIsSubmitting(false);
  };

  const currentQ = category ? QUESTION_BANK[category] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md">
        
        {/* Static Content (LCP Candidate) - Renders instantly */}
        <div className="text-center mb-6 md:mb-10 space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Help us improve</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your feedback shapes Soma.</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden relative flex flex-col min-h-[350px] md:min-h-[450px]">
            
            {/* Progress Bar */}
            <div className="h-1 bg-secondary w-full">
                <motion.div 
                    className="h-full bg-primary" 
                    animate={{ width: `${(step / 3) * 100}%` }}
                    initial={false} // Disable initial animation for faster visual load
                />
            </div>

            <div className="p-5 md:p-8 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                
                {/* === STEP 1: RATING === */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        // ⚡ LCP OPTIMIZATION 2: initial={false} 
                        // This prevents the component from being hidden (opacity: 0) on load.
                        // It ensures the stars are visible in the initial HTML sent by the server.
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 text-center"
                    >
                        <h2 className="text-lg md:text-xl font-semibold">How is your experience?</h2>
                        <div className="flex justify-center gap-1 md:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                                >
                                    <Star 
                                        className={cn(
                                            "w-8 h-8 md:w-10 md:h-10 transition-colors", 
                                            rating >= star ? "fill-primary text-primary" : "text-muted-foreground/20"
                                        )} 
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="pt-2">
                            <Button disabled={rating === 0} onClick={() => setStep(2)} className="w-full h-10 md:h-12 text-base rounded-lg">
                                Next <ArrowRight className="ml-2 w-4 h-4"/>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* === STEP 2: CATEGORY === */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h2 className="text-lg font-semibold text-center">What is this regarding?</h2>
                        <div className="grid grid-cols-1 gap-2.5">
                            {[
                                { id: "BUG", icon: Bug, label: "Bug Report", desc: "Something is broken" },
                                { id: "FEATURE", icon: Lightbulb, label: "Feature Request", desc: "I have an idea" },
                                { id: "GENERAL", icon: MessageSquare, label: "General", desc: "Feedback on experience" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setCategory(item.id as any); setStep(3); }}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-left active:scale-[0.98]"
                                >
                                    <div className="p-2.5 bg-secondary rounded-full">
                                        <item.icon className="w-4 h-4 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{item.label}</div>
                                        <div className="text-[10px] md:text-xs text-muted-foreground">{item.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="w-full text-muted-foreground">Back</Button>
                    </motion.div>
                )}

                {/* === STEP 3: DYNAMIC DETAILS === */}
                {step === 3 && currentQ && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                            <currentQ.icon className="w-4 h-4" />
                            {currentQ.title}
                        </div>

                        {/* Q1 */}
                        <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-medium">{currentQ.q1.label}</label>
                            <Textarea 
                                placeholder={currentQ.q1.placeholder}
                                className="bg-secondary/20 min-h-[80px] text-sm resize-none focus-visible:ring-1"
                                // @ts-ignore
                                value={answers[currentQ.q1.key]}
                                // @ts-ignore
                                onChange={(e) => setAnswers({...answers, [currentQ.q1.key]: e.target.value})}
                            />
                        </div>

                        {/* Q2 */}
                        <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-medium">{currentQ.q2.label}</label>
                            <Textarea 
                                placeholder={currentQ.q2.placeholder}
                                className="bg-secondary/20 min-h-[80px] text-sm resize-none focus-visible:ring-1"
                                // @ts-ignore
                                value={answers[currentQ.q2.key]}
                                // @ts-ignore
                                onChange={(e) => setAnswers({...answers, [currentQ.q2.key]: e.target.value})}
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Back</Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2]">
                                {isSubmitting ? "Sending..." : "Submit"}
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* === STEP 4: SUCCESS === */}
                {step === 4 && (
                    <motion.div 
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4 py-4"
                    >
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold">Received!</h2>
                            <p className="text-xs text-muted-foreground">Thanks for helping us build Soma.</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4">
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard">Return to Dashboard</Link>
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                    setRating(0);
                                    setCategory("");
                                    setAnswers({
                                        bugDescription: "", bugSteps: "",
                                        featureProblem: "", featureSolution: "",
                                        generalChallenge: "", generalMagicWand: ""
                                    });
                                    setStep(1); 
                                }}
                                className="text-muted-foreground hover:text-primary"
                            >
                                Submit another response
                            </Button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}