"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { DNALoader } from "@/components/dna-loader";

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchLogs();
  }, [isLoaded, user]);

  async function fetchLogs() {
    try {
      const res = await fetch(`/api/get-logs?userId=${user?.id}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  // Filter logs for the selected date
  const filteredLogs = logs.filter((log) => {
    if (!date) return false;
    const logDate = new Date(log.date).toDateString();
    const selectedDate = date.toDateString();
    return logDate === selectedDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort Morning -> Night

  if (!isLoaded || loading) return <DNALoader />;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
           <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
             <Clock className="w-8 h-8 text-primary" /> History
           </h1>
           <p className="text-muted-foreground">Review your past days and track your consistency.</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          
          {/* LEFT: Calendar Card */}
          <div className="flex flex-col gap-4">
            <Card className="border-border bg-card shadow-sm w-fit mx-auto md:mx-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-0"
                />
            </Card>
            <div className="text-center text-sm text-muted-foreground hidden md:block">
                {date ? format(date, "MMMM do, yyyy") : "Select a date"}
            </div>
          </div>

          {/* RIGHT: Timeline Feed */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                {date ? format(date, "EEEE, MMMM do") : "Select a Date"}
            </h2>

            {filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                    <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                    <p>No activity recorded for this day.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredLogs.map((log, index) => (
                        <Card key={log.id} className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                            <CardContent className="p-5 flex gap-4">
                                {/* Time Column */}
                                <div className="flex flex-col items-center min-w-[60px] border-r border-border pr-4">
                                    <span className="text-sm font-bold text-primary">
                                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {/* Timeline Line (Visual Only) */}
                                    {index !== filteredLogs.length - 1 && (
                                        <div className="h-full w-[1px] bg-border mt-2" />
                                    )}
                                </div>

                                {/* Content Column */}
                                <div className="flex-1 space-y-2">
                                    <p className="text-foreground text-sm leading-relaxed">"{log.rawText}"</p>
                                    
                                    {/* AI Feedback Badge */}
                                    {log.aiFeedback && (
                                        <div className="bg-muted/50 text-muted-foreground text-xs px-3 py-2 rounded-md border border-border">
                                            <span className="font-semibold text-primary mr-1">Coach:</span> {log.aiFeedback}
                                        </div>
                                    )}

                                    {/* Metrics Badges */}
                                    <div className="flex gap-3 pt-1">
                                        <span className="text-xs font-mono font-medium text-foreground bg-secondary px-2 py-1 rounded">
                                            +{log.totalCaloriesIn} <span className="text-muted-foreground">kcal</span>
                                        </span>
                                        {log.totalCaloriesOut > 0 && (
                                            <span className="text-xs font-mono font-medium text-success bg-success/10 px-2 py-1 rounded">
                                                -{log.totalCaloriesOut} <span className="text-success/70">burned</span>
                                            </span>
                                        )}
                                        {log.waterMl > 0 && (
                                            <span className="text-xs font-mono font-medium text-info bg-info/10 px-2 py-1 rounded">
                                                {log.waterMl}ml <span className="text-info/70">water</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}