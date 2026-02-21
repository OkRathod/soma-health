"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle, LayoutGrid, List } from "lucide-react"; // 👈 Added layout icons
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDeadlineDialog } from "@/components/deadlines/add-deadline-dialog";
import { DeadlineCard } from "@/components/deadlines/deadline-card";
import { getDeadlines } from "@/app/actions/deadlines";
import { DNALoader } from "@/components/dna-loader";

export default function DeadlinesPage() {
  const [activeTab, setActiveTab] = useState("running");
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // 👇 1. New State for Layout Preference
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false); // Prevents hydration mismatch

  useEffect(() => {
    // 👇 2. Load the saved preference from LocalStorage on mount
    const savedView = localStorage.getItem("deadlineViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
    loadData();
  }, []);

  async function loadData() {
    const res = await getDeadlines();
    if (res.success) setDeadlines(res.data);
    setLoading(false);
  }

  // 👇 3. Handle saving the preference when the user clicks the toggle
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("deadlineViewMode", mode);
  };

  const now = new Date();
  
  const running = deadlines.filter(d => {
    if (d.isCompleted) return false;
    if (!d.targetDate) return true; 
    return new Date(d.targetDate) > now;
  });

  const history = deadlines.filter(d => {
    if (d.isCompleted) return true;
    if (d.targetDate && new Date(d.targetDate) <= now) return true;
    return false;
  });

  // 👇 4. Dynamic CSS classes based on selected view
  const layoutClasses = viewMode === "list"
    ? "flex flex-col gap-4 w-full animate-in fade-in" // Removed max-w-3xl mx-auto
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full animate-in fade-in";

  // Don't render layout until client side is ready to prevent hydration flashes
  if (!isMounted) return null; 

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      {loading && <DNALoader />}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Deadlines
            </h1>
            <p className="text-muted-foreground mt-1">Track your projects against the clock.</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2 shadow-lg">
             <Plus className="w-4 h-4" /> New Deadline
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
           
           {/* 👇 Tabs & View Toggle Wrapper */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="running" className="gap-2">
                   <Clock className="w-4 h-4"/> Active ({running.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                   <CheckCircle className="w-4 h-4"/> Past / Done ({history.length})
                </TabsTrigger>
             </TabsList>

             {/* 👇 The Toggle Switch */}
             <div className="hidden md:flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
               <Button
                 variant={viewMode === "list" ? "secondary" : "ghost"}
                 size="sm"
                 className={`h-8 px-3 gap-2 ${viewMode === "list" ? 'shadow-sm' : 'text-muted-foreground'}`}
                 onClick={() => handleViewChange("list")}
               >
                 <List className="w-4 h-4" /> List
               </Button>
               <Button
                 variant={viewMode === "grid" ? "secondary" : "ghost"}
                 size="sm"
                 className={`h-8 px-3 gap-2 ${viewMode === "grid" ? 'shadow-sm' : 'text-muted-foreground'}`}
                 onClick={() => handleViewChange("grid")}
               >
                 <LayoutGrid className="w-4 h-4" /> Grid
               </Button>
             </div>
           </div>

           <TabsContent value="running" className={layoutClasses}>
              {running.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-muted-foreground bg-card border border-dashed rounded-xl shadow-sm">
                    No active deadlines. Start something new!
                 </div>
              ) : (
                 running.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} />
                 ))
              )}
           </TabsContent>

           <TabsContent value="history" className={layoutClasses}>
               {history.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-muted-foreground bg-card border border-dashed rounded-xl shadow-sm">
                    No completed deadlines yet.
                 </div>
               ) : (
                 history.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} isHistory />
                 ))
               )}
           </TabsContent>
        </Tabs>

      </div>

      <AddDeadlineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={loadData} />
    </div>
  );
}