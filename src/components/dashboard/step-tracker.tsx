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

  if (loading) return <div className="panel shimmer h-[262px]" />;

  const goal = 10000;
  const pct = Math.min((steps / goal) * 100, 100);

  return (
    <section className="panel flex flex-col p-5 md:p-6">
      <div className="flex items-center justify-between">
        <p className="label-mono flex items-center gap-2">
          <Footprints className="size-3.5 text-energy" /> Steps
        </p>
        <span className="font-mono text-[11px] text-muted-foreground">goal {goal.toLocaleString()}</span>
      </div>

      <p className="numeral mt-5 text-5xl">{steps.toLocaleString()}</p>

      <div className="mt-5 h-7 overflow-hidden rounded-md bg-surface" aria-hidden="true">
        <div className="h-full rounded-md bg-energy transition-[width] duration-1000" style={{ width: `${pct}%` }} />
      </div>

      {/* Manual entry (Google Fit sync is parked — see commented logic above) */}
      <form
        className="mt-5 flex gap-2 md:mt-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleManualSave();
        }}
      >
        <label htmlFor="steps-input" className="sr-only">
          Steps today
        </label>
        <Input
          id="steps-input"
          type="number"
          inputMode="numeric"
          min={0}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter steps"
          className="h-11 flex-1 rounded-full px-4 tabular-nums"
        />
        <Button type="submit" variant="outline" className="h-11 gap-1.5 px-4">
          <Check className="size-4" /> Save
        </Button>
      </form>
    </section>
  );
}
