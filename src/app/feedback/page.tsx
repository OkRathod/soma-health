"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Bug, Lightbulb, MessageSquare, Check, ArrowLeft, ArrowRight, ChevronRight, Wand2, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/app/actions/feedback"; 
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/layout/page";

// Constants live outside the component so they are not re-created on render
const QUESTION_BANK: any = {
  BUG: {
    title: "Report a bug",
    q1: { label: "What exactly happened?", placeholder: "I clicked X and then Y crashed...", key: "bugDescription" },
    q2: { label: "Steps to reproduce (optional)", placeholder: "1. Go to settings\n2. Click save...", key: "bugSteps" },
    icon: AlertTriangle
  },
  FEATURE: {
    title: "Request a feature",
    q1: { label: "What problem are you trying to solve?", placeholder: "I find it hard to track my water because...", key: "featureProblem" },
    q2: { label: "How do you imagine the solution?", placeholder: "It would be cool if there was a button that...", key: "featureSolution" },
    icon: Wand2
  },
  GENERAL: {
    title: "General feedback",
    q1: { label: "Biggest daily challenge Soma doesn't solve yet?", placeholder: "e.g. I struggle to track my mood...", key: "generalChallenge" },
    q2: { label: "Magic Wand: One thing to change on Soma?", placeholder: "I wish the dashboard had...", key: "generalMagicWand" },
    icon: Heart
  }
};

const RATING_WORDS = ["Tap a star to rate", "Not good", "Could be better", "It's okay", "Pretty good", "Love it"];

const CATEGORIES = [
  { id: "BUG", icon: Bug, label: "Bug report", desc: "Something is broken" },
  { id: "FEATURE", icon: Lightbulb, label: "Feature request", desc: "I have an idea" },
  { id: "GENERAL", icon: MessageSquare, label: "General", desc: "Feedback on the experience" },
];

const STEP_LABELS = ["Rating", "Topic", "Details"];

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
    <PageShell width="narrow">
      <PageHeader
        eyebrow="Feedback"
        title={
          <>
            Help us <em>improve</em>
          </>
        }
        description="Your feedback shapes Soma. Three short steps, about a minute."
      />

      <section className="panel overflow-hidden">
        {/* Step indicator */}
        {step < 4 && (
          <div className="border-b border-border px-5 py-4 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="label-mono">
                Step {step} of 3 <span className="mx-1.5 opacity-50">/</span>
                <span className="text-foreground">{STEP_LABELS[step - 1]}</span>
              </p>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      n === step ? "w-8 bg-foreground" : n < step ? "w-4 bg-foreground" : "w-4 bg-surface"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex min-h-[340px] flex-col justify-center p-5 md:min-h-[380px] md:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: rating */}
            {step === 1 && (
              <motion.div
                key="step1"
                // initial={false} keeps the stars visible in the server-rendered HTML.
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-[1.75rem] leading-tight tracking-[-0.02em] md:text-3xl">
                  How is your experience?
                </h2>
                <div className="mt-6 flex gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      aria-pressed={rating >= star}
                      className={cn(
                        "press grid aspect-square flex-1 max-w-16 place-items-center rounded-2xl border transition-colors",
                        rating >= star
                          ? "border-transparent bg-lime text-lime-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/30"
                      )}
                    >
                      <Star className={cn("size-5 sm:size-6", rating >= star && "fill-current")} />
                    </button>
                  ))}
                </div>
                <p className="label-mono mt-4">{RATING_WORDS[rating]}</p>
                <div className="mt-8 flex justify-end">
                  <Button disabled={rating === 0} onClick={() => setStep(2)} size="lg" className="w-full sm:w-auto">
                    Next <ArrowRight />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: category */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-[1.75rem] leading-tight tracking-[-0.02em] md:text-3xl">
                  What is this about?
                </h2>
                <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                  {CATEGORIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { setCategory(item.id as any); setStep(3); }}
                      className="group flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-foreground transition-colors group-hover:bg-card">
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-medium">{item.label}</span>
                        <span className="block text-[13px] text-muted-foreground">{item.desc}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground">
                    <ArrowLeft /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: questions for the chosen category */}
            {step === 3 && currentQ && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="label-mono flex items-center gap-2">
                  <currentQ.icon className="size-3.5" />
                  {currentQ.title}
                </p>

                <div className="mt-5 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="feedback-q1" className="block text-sm font-medium">{currentQ.q1.label}</label>
                    <Textarea
                      id="feedback-q1"
                      placeholder={currentQ.q1.placeholder}
                      className="min-h-[96px] resize-none"
                      // @ts-ignore
                      value={answers[currentQ.q1.key]}
                      // @ts-ignore
                      onChange={(e) => setAnswers({...answers, [currentQ.q1.key]: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="feedback-q2" className="block text-sm font-medium">{currentQ.q2.label}</label>
                    <Textarea
                      id="feedback-q2"
                      placeholder={currentQ.q2.placeholder}
                      className="min-h-[96px] resize-none"
                      // @ts-ignore
                      value={answers[currentQ.q2.key]}
                      // @ts-ignore
                      onChange={(e) => setAnswers({...answers, [currentQ.q2.key]: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={() => setStep(2)} className="text-muted-foreground">
                    <ArrowLeft /> Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting} size="lg" className="flex-1 sm:flex-none sm:min-w-40">
                    {isSubmitting ? "Sending..." : "Submit"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-lime text-lime-foreground">
                  <Check className="size-6" />
                </span>
                <h2 className="display mt-5 text-4xl md:text-5xl">
                  Received. <em>Thank you.</em>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">Thanks for helping us build Soma.</p>

                <div className="mt-7 flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard">Return to dashboard</Link>
                  </Button>
                  <Button
                    variant="ghost"
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
                    className="w-full text-muted-foreground sm:w-auto"
                  >
                    Submit another response
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
