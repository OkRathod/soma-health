"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this or use standard textarea
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import WeeklyChart from "@/components/WeeklyChart";

// 🔴 KEEP YOUR ID HERE
export default function DashboardClient({ user }: { user: any }) {
  // 👇 USE THE REAL ID
  const USER_ID = user.id;   
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ in: 0, out: 0, goal: 2500 });
  
  // New State for Input
  const [newLogText, setNewLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  function calculateSummary(logs: any[]) {
    let totalIn = 0;
    let totalOut = 0;
    logs.forEach(log => {
      totalIn += log.totalCaloriesIn;
      totalOut += log.totalCaloriesOut;
    });
    setSummary(prev => ({ ...prev, in: totalIn, out: totalOut }));
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
      alert("Failed to process log");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
           {/* Concept 2 Logo: Simple Circle */}
           <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center">
             <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
           </div>
           <h1 className="text-2xl font-bold tracking-tight text-slate-800">Soma.</h1>
        </div>
        <Link href="/settings">
        <Button variant="outline" className="text-slate-600">Settings</Button>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        
        {/* 1. The Input Area (New!) */}
        <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <label className="block text-sm font-medium text-slate-500 mb-2">What did you do or eat?</label>
          <div className="flex gap-2">
            <textarea
              value={newLogText}
              onChange={(e) => setNewLogText(e.target.value)}
              placeholder="e.g. I had a bowl of curd rice and went for a 20 min walk..."
              className="flex-1 min-h-[60px] p-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
            <Button 
              onClick={handleAddLog} 
              disabled={isProcessing || !newLogText.trim()}
              className="h-auto px-6 bg-slate-900 hover:bg-slate-800"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </section>

        {/* 2. The Big Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Calories In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{summary.in}</div>
              <Progress value={(summary.in / summary.goal) * 100} className="h-2 mt-3 bg-slate-100" />
              <p className="text-xs text-slate-400 mt-2 text-right">{Math.round((summary.in / summary.goal) * 100)}% of goal</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{summary.out}</div>
              <p className="text-xs text-slate-500 mt-1">Active Energy</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-slate-900 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.in - summary.out}</div>
              <p className="text-xs text-slate-400 mt-1">Current Total</p>
            </CardContent>
          </Card>
        </div>

        <section>
        <WeeklyChart logs={logs} />
        </section>

        {/* 3. Recent Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Today's Journal</h2>
          
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-400"/></div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-white border-dashed">
              <p className="text-slate-500">No logs yet.</p>
            </div>
          ) : (
            logs.map((log) => (
              <Card key={log.id} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-slate-900">"{log.rawText}"</p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">
                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    
                    {log.aiFeedback && (
                        <div className="bg-blue-50 text-blue-700 text-xs px-3 py-2 rounded-md border border-blue-100 leading-relaxed">
                        <span className="font-semibold mr-1">Coach:</span> {log.aiFeedback}
                        </div>
                    )}
                  </div>

                  <div className="flex md:flex-col items-center gap-4 md:gap-1 text-sm font-mono text-slate-600 min-w-[80px] md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 pl-0 md:pl-4 mt-2 md:mt-0 w-full md:w-auto justify-end">
                    <div className="text-slate-900">
                      <span className="font-bold">+{log.totalCaloriesIn}</span> <span className="text-xs text-slate-400">in</span>
                    </div>
                    {log.totalCaloriesOut > 0 && (
                        <div className="text-emerald-600">
                        <span className="font-bold">-{log.totalCaloriesOut}</span> <span className="text-xs text-emerald-600/70">out</span>
                        </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
