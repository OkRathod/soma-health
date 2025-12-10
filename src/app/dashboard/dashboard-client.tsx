"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this or use standard textarea
import { Loader2, Send, AlertTriangle, X, Check} from "lucide-react";
import Link from "next/link";
import WeeklyChart from "@/components/WeeklyChart";
import Image from "next/image";

// 🔴 KEEP YOUR ID HERE
export default function DashboardClient({ user }: { user: any }) {
  // 👇 USE THE REAL ID
  const USER_ID = user.id;   
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ in: 0, out: 0, goal: 2500 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  
  // New State for Input
  const [newLogText, setNewLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 👇 NEW: STATE FOR GENERIC SUCCESS/ERROR MODALS
  // This replaces ugly browser alerts for things like "Settings Saved"
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      const res = await fetch(`/api/get-logs?userId=${USER_ID}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        calculateSummary(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  async function handleRestoreAccount() {
      // We close the modal first (if open)
      setShowRestoreModal(false); 
      
      setIsRestoring(true);
      try {
        const res = await fetch("/api/user/restore", { method: "POST" });
        if (res.ok) {
          setSimpleModal({ title: "Welcome Back!", msg: "Your account is fully active again." });
          
          // Slight delay before reload so they can read the success message
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setSimpleModal({ title: "Error", msg: "Failed to restore account.", isError: true });
        }
      } catch (e) {
        console.error(e);
        setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsRestoring(false);
      }
    }

  function calculateSummary(logs: any[]) {
    let totalIn = 0;
    let totalOut = 0;
    let water = 0;
    
    // Get "Today" as a simple string (e.g., "12/9/2025")
    // This uses your computer's local time, so it resets exactly at YOUR midnight.
    const todayStr = new Date().toLocaleDateString();

    logs.forEach(log => {
      // Convert the log's date to the same string format
      const logDateStr = new Date(log.date).toLocaleDateString();

      // 🛑 THE FIX: Only add numbers if the dates match!
      if (logDateStr === todayStr) {
        totalIn += log.totalCaloriesIn;
        totalOut += log.totalCaloriesOut;
        if (log.waterMl) water += log.waterMl;
      }
    });

    setSummary(prev => ({ ...prev, in: totalIn, out: totalOut }));
    setWaterTotal(water);
  }

async function handleAddWater() {
    try {
      // Optimistic update: Update the UI immediately before the API responds
      setWaterTotal(prev => prev + 250);
      
      const res = await fetch("/api/log-water", {
        method: "POST",
        body: JSON.stringify({
          userId: USER_ID,
          amount: 250
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        fetchLogs(); // Sync with real database data
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add water log.", isError: true });
    }
  }

  async function handleAddLog() {
    if (!newLogText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userId: USER_ID,
          userText: newLogText,
          userTimezone: "Asia/Kolkata", // You can make this dynamic later
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewLogText(""); // Clear input
        fetchLogs(); // Refresh data immediately
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add log.", isError: true });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground">
      <main className="max-w-4xl mx-auto space-y-8">
        
        {/* 👇 RESTORE BANNER (Only shows if scheduledForDeletion is set) */}
        {user?.scheduledForDeletion && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-destructive/10 border border-red-200 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-destructive">Account Scheduled for Deletion</p>
                  <p className="text-sm text-red-700">
                    You have until <span className="font-semibold">{new Date(user.scheduledForDeletion).toLocaleDateString()}</span> to restore your account.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowRestoreModal(true)} 
                disabled={isRestoring}
                className="bg-red-600 hover:bg-red-700 text-primary-foreground w-full md:w-auto shadow-sm"
              >
                {isRestoring ? "Restoring..." : "Undo Deletion"}
              </Button>
            </div>
          </div>
        )}

        {/* 1. The Input Area (New!) */}
        <section className="bg-card p-4 rounded-xl shadow-sm border border-border">
          <label className="block text-sm font-medium text-muted-foreground mb-2">What did you do or eat?</label>
          <div className="flex gap-2">
            <textarea
              value={newLogText}
              onChange={(e) => setNewLogText(e.target.value)}
              placeholder="e.g. I had a bowl of curd rice and went for a 20 min walk..."
              className="flex-1 min-h-[60px] p-3 rounded-md border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <Button 
              onClick={handleAddLog} 
              disabled={isProcessing || !newLogText.trim()}
              className="h-auto px-6 bg-primary hover:bg-slate-800"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </section>

        {/* 2. The Big Numbers */}
        {/* 👇 CHANGED: lg:grid-cols-4 ensures all 4 cards fit in one row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calories In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{summary.in}</div>
              <Progress value={(summary.in / summary.goal) * 100} className="h-2 mt-3 bg-slate-100" />
              <p className="text-xs text-muted-foreground mt-2 text-right">{Math.round((summary.in / summary.goal) * 100)}% of goal</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{summary.out}</div>
              <p className="text-xs text-muted-foreground mt-1">Active Energy</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm bg-card text-muted-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.in - summary.out}</div>
              <p className="text-xs text-muted-foreground mt-1">Current Total</p>
            </CardContent>
          </Card>

          {/* 👇 NEW WATER CARD START */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-info">Hydration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">
                {waterTotal} <span className="text-lg font-normal text-info">ml</span>
              </div>
              <Button 
                onClick={handleAddWater} 
                size="sm" 
                variant="outline" 
                className="mt-3 w-full border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                + Add Glass (250ml)
              </Button>
            </CardContent>
          </Card>
          {/* 👆 NEW WATER CARD END */}
        </div>

        <section>
        <WeeklyChart logs={logs} />
        </section>
      </main>
      {/* 👇 GENERIC SUCCESS/ERROR MODAL */}
      {simpleModal && (
         <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
            <div className="bg-card rounded-xl shadow-2xl w-auto max-w-sm p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSimpleModal(null)} 
                  className="absolute top-4 right-4 text-muted-foreground hover:text-slate-600"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="flex items-start gap-4 pr-6">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-success'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold text-foreground whitespace-nowrap">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground">{simpleModal.msg}</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={() => setSimpleModal(null)} 
                      className={simpleModal.isError ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-slate-800'}
                    >
                        Okay
                    </Button>
                </div>
            </div>
         </div>
      )}

      {/* 👇 RESTORE CONFIRMATION MODAL */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
          <div className="bg-card rounded-xl shadow-2xl max-w-sm w-auto p-6 text-center space-y-6 animate-in zoom-in-95">
             
             {/* Icon */}
             <div className="mx-auto bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-info" />
             </div>

             {/* Text */}
             <div className="space-y-2">
               <h3 className="text-lg font-bold text-foreground">Restore Account?</h3>
               <p className="text-sm text-muted-foreground">
                 This will cancel the deletion process. Your account will be safe and fully active immediately.
               </p>
             </div>

             {/* Buttons */}
             <div className="flex gap-3 justify-center">
               <Button 
                 variant="outline" 
                 onClick={() => setShowRestoreModal(false)} 
                 className="w-auto"
               >
                 Cancel
               </Button>
               <Button 
                 onClick={handleRestoreAccount} 
                 className="w-auto bg-primary hover:bg-slate-800"
               >
                 Yes, Restore
               </Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
