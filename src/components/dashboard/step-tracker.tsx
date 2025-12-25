"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footprints, RefreshCw, Link2, Link2Off, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner"; 
import { getDailySteps, updateDailySteps } from "@/app/actions/steps";
// import { syncGoogleSteps } from "@/app/actions/steps"; // 👈 COMMENTED OUT
// import { useClerk } from "@clerk/nextjs"; // 👈 COMMENTED OUT

export function StepTracker() {
//   const { client, session } = useClerk(); // 👈 COMMENTED OUT
//   const { openUserProfile } = useClerk(); // 👈 COMMENTED OUT
  const [steps, setSteps] = useState(0);
  const [source, setSource] = useState<string>("MANUAL");
  const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false); // 👈 COMMENTED OUT
  
  // Local state for the input field
  const [inputValue, setInputValue] = useState("");

  // 1. Load Data on Mount
  useEffect(() => {
    async function load() {
      const data = await getDailySteps();
      setSteps(data.steps);
      setSource(data.source);
      setInputValue(data.steps.toString());
      setLoading(false);
    }
    load();
  }, []);

/* 👈 GOOGLE SYNC LOGIC COMMENTED OUT START
const handleSync = async () => {
    setSyncing(true);
    try {
        const result = await syncGoogleSteps();
        
        if (!result.success) {
            // 👇 CASE 1: They logged in before you added the feature
            if (result.error === "reauth_needed") {
                await client.signIn.create({
                  strategy: "oauth_google",
                  redirectUrl: "/dashboard", // Come back here after
                  actionCompleteRedirectUrl: "/dashboard",
                });
                return;
            }
            // 👇 CASE 2: They explicitly denied permission (The 403 Error)
            if (result.error === "google_api_error") {
                toast.error("Permission missing.", {
                    description: "Please disconnect Google and reconnect it with the 'Physical Activity' checkbox checked.",
                    duration: 8000, // Show for longer
                    action: {
                        label: "Fix Now",
                        onClick: () => openUserProfile() 
                    }
                });
                return;
            }
            throw new Error(result.error);
        }
        
        setSteps(result.steps);
        setSource("GOOGLE");
        toast.success("Synced with Google Fit!");
        
    } catch (e) {
        toast.error("Failed to sync steps.");
    } finally {
        setSyncing(false);
    }
  };
GOOGLE SYNC LOGIC COMMENTED OUT END 👉 */

  // 3. Handle Manual Save
  const handleManualSave = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val) || val < 0) return;

    setSteps(val);
    setSource("MANUAL");
    await updateDailySteps(val, "MANUAL");
    toast.success("Steps updated");
  };

  // 4. Handle Disconnect (Switch back to Manual)
  const handleDisconnect = async () => {
    // We don't delete data, just switch mode to allow editing
    setSource("MANUAL");
    setInputValue(steps.toString()); 
    await updateDailySteps(steps, "MANUAL"); // Update DB to reflect mode change
    toast.info("Switched to Manual Mode");
  };

  if (loading) return <div className="h-32 bg-secondary/20 animate-pulse rounded-xl" />;

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm space-y-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Footprints className="w-24 h-24" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
             <Footprints className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Steps</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {/* {source === "GOOGLE" ? "Automated" : "Manual Entry"} */}
                Manual Entry {/* 👈 Force Manual Label */}
            </p>
          </div>
        </div>
        
        {/* Toggle Button (Already commented out by you) */}
        {/* {source === "GOOGLE" ? (
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDisconnect}
                className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
             >
                <Link2Off className="w-3 h-3 mr-1" /> Disconnect
             </Button>
        ) : (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSync}
                disabled={syncing}
                className="h-8 text-xs gap-1"
            >
                {syncing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Link2 className="w-3 h-3" />}
                Sync Google
            </Button>
        )} */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-2">
         {/* 👇 GOOGLE MODE UI COMMENTED OUT 
         {source === "GOOGLE" ? (
             // === GOOGLE MODE (READ ONLY) ===
             <div className="flex items-end justify-between">
                 <div>
                    <span className="text-3xl font-bold tracking-tight">{steps.toLocaleString()}</span>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" /> Verified by Google Fit
                    </p>
                 </div>
                 <Button variant="secondary" size="icon" onClick={handleSync} disabled={syncing} className="h-8 w-8">
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                 </Button>
             </div>
         ) : ( 
         */}
             {/* === MANUAL MODE (EDITABLE) - ALWAYS RENDERED NOW === */}
             <div className="flex gap-2">
                 <div className="relative flex-1">
                    <Input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-2xl font-bold h-12 pr-12"
                        placeholder="0"
                    />
                    <span className="absolute right-3 top-4 text-xs text-muted-foreground pointer-events-none">
                        steps
                    </span>
                 </div>
                 <Button onClick={handleManualSave} className="h-12 w-12 shrink-0 bg-primary/30 text-primary hover:bg-primary/60">
                    <Check className="w-5 h-5" />
                 </Button>
             </div>
         {/* )} 👈 END COMMENT */}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 relative z-10">
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div 
                className="h-full bg-orange-500 transition-all duration-1000" 
                style={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }} 
            />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span>Goal: 10,000</span>
        </div>
      </div>

    </div>
  );
}