"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }

    // 2. Listen for the 'beforeinstallprompt' event (Android/Desktop Chrome)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event for later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Android/Desktop Install Click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // If already installed, don't show anything
  if (isStandalone) return null;

  return (
    <>
      {/* --- ANDROID / DESKTOP BUTTON --- */}
      {deferredPrompt && (
        <Button 
          onClick={handleInstallClick}
          variant="outline" 
          size="lg" 
          className="h-14 gap-2 border-white/25 bg-white/10 px-6 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 animate-in fade-in zoom-in duration-300"
        >
          <Download className="size-4" /> Install app
        </Button>
      )}

      {/* --- iOS BUTTON (Triggers Tooltip) --- */}
      {isIOS && !deferredPrompt && (
        <div className="relative">
            <Button 
            onClick={() => setShowIOSHint(true)}
            variant="outline" 
            size="lg" 
            className="h-14 gap-2 border-white/25 bg-white/10 px-6 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40"
            >
            <Download className="size-4" /> Install app
            </Button>

            {/* iOS TOOLTIP OVERLAY */}
            <AnimatePresence>
                {showIOSHint && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-x-4 bottom-8 z-50 bg-card text-foreground border border-border p-4 rounded-2xl shadow-float md:absolute md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-4 md:w-64"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-semibold">Install for iOS</p>
                            <button onClick={() => setShowIOSHint(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            Apple doesn't support direct install buttons yet.
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                1. Tap the <Share className="w-4 h-4" /> <strong>Share</strong> button.
                            </div>
                            <div className="flex items-center gap-2">
                                2. Scroll down and tap <span className="font-bold border border-border bg-secondary/50 px-1 rounded">Add to Home Screen</span>.
                            </div>
                        </div>
                        {/* Triangle pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-card md:block hidden"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      )}
    </>
  );
}