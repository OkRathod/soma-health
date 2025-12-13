"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Clock , Trash2, Check, AlertTriangle, X, Plus, PenLine} from "lucide-react";
import { DNALoader } from "@/components/dna-loader";
import { Button } from "@/components/ui/button"; // Import Button
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"; 
import { Textarea } from "@/components/ui/textarea";

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

// 👇 MODAL STATES
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

// 👇 NEW: ADD LOG STATE
  const [isAdding, setIsAdding] = useState(false); 
  const [newLogText, setNewLogText] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);


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

  // 👇 NEW: HANDLE ADD LOG (BACKFILL)
  async function handleAddLog() {

    // 👇 ADD 'user' to this check
    if (!newLogText.trim() || !date || !user) {
        return;
    }
    
    setIsSavingLog(true);
    try {
        const res = await fetch("/api/process-log", { 
            method: "POST",
            body: JSON.stringify({
                userText: newLogText,
                userId: user.id,
                date: date.toISOString() // 👈 IMPORTANT: Sends the selected calendar date
            })
        });

        const data = await res.json();
        
        if (data.success) {
            setSimpleModal({ title: "Success", msg: "Entry added successfully!" });
            setNewLogText("");
            setIsAdding(false);
            fetchLogs(); // 👈 Refresh list to show the new card immediately
        } else {
            setSimpleModal({ 
                title: data.error || "Processing Failed", 
                msg: data.details || "The AI could not process your log. Please try again.", 
                isError: true 
            });
        }
    } catch (e) {
        setSimpleModal({ 
            title: "Connection Error", 
            msg: "Could not reach the server. Please check your internet connection.", 
            isError: true 
        });
    } finally {
        setIsSavingLog(false);
    }
  }

  // 👇 1. OPEN CONFIRM MODAL
    function askToDelete(logId: string) {
      setLogToDelete(logId);
    }

  // 👇 2. CONFIRM DELETE
    async function confirmDelete() {
      if (!logToDelete) return;
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/delete-log?id=${logToDelete}&userId=${user?.id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          setLogs((prev) => prev.filter((log) => log.id !== logToDelete));
          setLogToDelete(null);
          setSimpleModal({ title: "Deleted", msg: "Record removed successfully." });
        } else {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Failed to delete log.", isError: true });
        }
      } catch (error) {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsDeleting(false);
      }
    }

  // 👇 3. MIDNIGHT FIX (Normalizes dates so blue dots show up)
    const daysWithHistory = logs.map(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d;
    });

  // Filter logs for the selected date
  const filteredLogs = logs.filter((log) => {
    if (!date) return false;
    const logDate = new Date(log.date).toDateString();
    const selectedDate = date.toDateString();
    return logDate === selectedDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort Morning -> Night

  if (!isLoaded || loading) return <DNALoader />;

  // Helper: Check if selected date is in the future
  const isFutureDate = date ? date > new Date() : false;

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
                    
                    // 👇 ADD THESE 3 LINES
                    captionLayout="dropdown-buttons"
                    fromYear={2024} 
                    toYear={new Date().getFullYear() + 100} // Always shows up to next year

                    // 👇 2. TELL CALENDAR WHICH DATES HAVE HISTORY
                    modifiers={{ hasHistory: daysWithHistory }}
                    
                    // 👇 3. STYLE THOSE DATES (Light Circle)
                    modifiersClassNames={{ 
                        hasHistory: "bg-primary/10 font-bold text-primary rounded-full transition-all hover:bg-primary/30 hover:scale-110 cursor-pointer aria-selected:!bg-primary aria-selected:!text-primary-foreground aria-selected:hover:!bg-primary/70 aria-selected:hover:!scale-110" 
                    }}
                />
            </Card>
            <div className="text-center text-sm text-muted-foreground hidden md:block">
                {date ? format(date, "MMMM do, yyyy") : "Select a date"}
            </div>
          </div>

          {/* RIGHT: Timeline Feed */}
          <div className="space-y-6">

            {/* 👇 HEADER WITH ADD BUTTON */}
            <div className="flex items-center justify-between border-b border-border pb-2 ">
                <h2 className="text-xl font-semibold text-foreground">
                    {date ? format(date, "EEEE, MMMM do") : "Select a Date"}
                </h2>
                
                {/* 👇 FIX: Hide button if no date selected OR if date is in future */}
                {date && !isFutureDate && (
                    <Button 
                        size="sm" 
                        onClick={() => setIsAdding(true)} 
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="w-4 h-4" /> Add Entry
                    </Button>
                )}
            </div>
            {/* LOGS LIST */}
            {filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                    <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                    {/* 👇 CHANGE TEXT BASED ON DATE */}
                    {isFutureDate ? (
                        <p>You cannot log activity for the future.</p>
                    ) : (
                        <>
                            <p>No activity recorded for this day.</p>
                            <Button variant="link" onClick={() => setIsAdding(true)} className="mt-2 text-primary">
                                Add an entry now
                            </Button>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border scrollbar-track-background max-h-[600px] overflow-y-auto pr-1">
                    {filteredLogs.map((log, index) => (
                        <Card key={log.id} className="bg-card border-border shadow-sm hover:shadow-md transition-all group relative">
                             <CardContent className="p-5 flex gap-4">
                                {/* Time Column */}
                                <div className="flex flex-col items-center min-w-[60px] border-r border-border pr-4">
                                    <span className="text-sm font-bold text-primary">
                                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {/* Timeline Line (Restored) */}
                                    {index !== filteredLogs.length - 1 && (
                                        <div className="h-full w-[1px] bg-border mt-2" />
                                    )}
                                </div>

                                {/* Content Column */}
                                <div className="flex-1 space-y-2 pr-8"> 
                                    <p className="text-foreground text-sm">"{log.rawText}"</p>
                                    
                                    {/* AI Feedback (Restored) */}
                                    {log.aiFeedback && (
                                        <div className="bg-muted/50 text-muted-foreground text-xs px-3 py-2 rounded-md border border-border">
                                            <span className="font-semibold text-primary mr-1">Coach:</span> {log.aiFeedback}
                                        </div>
                                    )}

                                    {/* Metrics Badges (Restored) */}
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

                                {/* Delete Button (Updated for Mobile) */}
                                <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" onClick={() => setLogToDelete(log.id)}>
                                       <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                </div>
                             </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </div>

        </div>

      </div>

      {/* 5. DELETE CONFIRMATION MODAL */}
      {logToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 animate-in zoom-in-95 border border-border">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-destructive" />
             </div>
             <div className="space-y-2">
               <h3 className="text-lg font-bold">Delete Record?</h3>
               <p className="text-sm text-muted-foreground">
                 Are you sure you want to remove this log? This action cannot be undone.
               </p>
             </div>
             <div className="flex gap-3 justify-center">
               <Button 
                 variant="outline" 
                 onClick={() => setLogToDelete(null)} 
                 className="w-auto"
                 disabled={isDeleting}
               >
                 Cancel
               </Button>
               <Button 
                 variant="destructive"
                 onClick={confirmDelete} 
                 className="w-auto"
                 disabled={isDeleting}
               >
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Yes, Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <PenLine className="w-5 h-5 text-primary" />
                    Add Entry for {date ? format(date, "MMM do") : ""}
                </DialogTitle>
                {/* 👇 ADD THIS DESCRIPTION COMPONENT */}
            <DialogDescription>
                Type what you ate or how you exercised. AI will calculate the stats.
            </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <Textarea 
                    placeholder="E.g. I ate a cheese sandwich and ran 2km..." 
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    className="min-h-[100px] resize-none bg-background focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                    This will be processed by AI and added to your history without overwriting existing data.
                </p>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdding(false)} disabled={isSavingLog}>Cancel</Button>
                <Button onClick={handleAddLog} disabled={isSavingLog || !newLogText.trim()}>
                    {isSavingLog ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Save Entry"}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 6. SUCCESS / ERROR MODAL */}
      {simpleModal && (
         <div className="fixed inset-0 z-150 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95 border border-border">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"}>
                        Okay
                    </Button>
                </div>
            </div>
         </div>
      )}

    </div>
  );
}

