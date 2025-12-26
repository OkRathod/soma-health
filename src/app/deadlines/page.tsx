"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDeadlineDialog } from "@/components/deadlines/add-deadline-dialog";
import { DeadlineCard } from "@/components/deadlines/deadline-card"; // See Phase 5
import { getDeadlines } from "@/app/actions/deadlines";
import { DNALoader } from "@/components/dna-loader";


export default function DeadlinesPage() {
  const [activeTab, setActiveTab] = useState("running");
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await getDeadlines();
    if (res.success) setDeadlines(res.data);
    setLoading(false);
  }

  // 👇 LOGIC: Split items based on time & status
  const now = new Date();
  
  const running = deadlines.filter(d => {
    // Show if NOT completed AND (No Deadline OR Deadline is in future)
    if (d.isCompleted) return false;
    if (!d.targetDate) return true; 
    return new Date(d.targetDate) > now;
  });

  const history = deadlines.filter(d => {
    // Show if Completed OR Deadline Passed
    if (d.isCompleted) return true;
    if (d.targetDate && new Date(d.targetDate) <= now) return true;
    return false;
  });

  
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
           <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="running" className="gap-2">
                 <Clock className="w-4 h-4"/> Active ({running.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                 <CheckCircle className="w-4 h-4"/> Past / Done ({history.length})
              </TabsTrigger>
           </TabsList>

           <TabsContent value="running" className="flex flex-col gap-4 animate-in fade-in">
              {running.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-muted-foreground bg-card border border-dashed rounded-xl">
                    No active deadlines. Start something new!
                 </div>
              ) : (
                 running.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} />
                 ))
              )}
           </TabsContent>

           <TabsContent value="history" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
               {history.map(item => (
                    <DeadlineCard key={item.id} data={item} onUpdate={loadData} isHistory />
               ))}
           </TabsContent>
        </Tabs>

      </div>

      <AddDeadlineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={loadData} />
    </div>
  );
}