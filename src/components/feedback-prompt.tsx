"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { shouldRequestFeedback } from "@/app/actions/feedback"; // Import the action

export function FeedbackPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEligibility = async () => {
      // 1. Check LocalStorage (The "Snooze" Check)
      const snoozeUntil = localStorage.getItem("feedback_snooze_until");
      
      if (snoozeUntil) {
        const snoozeDate = new Date(parseInt(snoozeUntil));
        // If current date is BEFORE the snooze date, do nothing.
        if (new Date() < snoozeDate) return;
      }

      // 2. Check Server (The "Database" Check)
      // We add a small delay (e.g., 5 seconds) so it doesn't pop immediately on load
      setTimeout(async () => {
          const shouldShow = await shouldRequestFeedback();
          if (shouldShow) setIsOpen(true);
      }, 4000);
    };

    checkEligibility();
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    
    // 3. Set Snooze for 7 Days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    localStorage.setItem("feedback_snooze_until", sevenDaysFromNow.getTime().toString());
  };

  const handleAccept = () => {
    setIsOpen(false);
    // Optional: Set a smaller snooze (e.g., 1 hour) just in case they don't complete it
    // But usually, the server check will handle it once they submit.
    router.push("/feedback");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="gap-0 sm:max-w-[400px]">
        <DialogHeader className="gap-0 text-left">
            <p className="eyebrow">A quick question</p>
            <DialogTitle className="display mt-3 text-[2rem] font-normal sm:text-4xl">
                Enjoying <em>Soma?</em>
            </DialogTitle>
            <DialogDescription className="mt-2 leading-relaxed">
                We noticed you&apos;ve been using the app for a while.
                We would love to hear your thoughts to help us improve.
            </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex-col gap-2 sm:flex-col">
            <Button onClick={handleAccept} size="lg" className="w-full">
                Give feedback
            </Button>
            <Button onClick={handleDismiss} variant="ghost" className="w-full text-muted-foreground">
                Maybe later
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
