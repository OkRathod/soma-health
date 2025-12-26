"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { MoreVertical, Trash2, Edit, Check, Square, CheckSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toggleDeadline, deleteDeadline, toggleSubtask } from "@/app/actions/deadlines"; // Import your actions
import { toast } from "sonner";
import { useState } from "react"; // 👈 Needed for toggle state
import { ChevronDown, ChevronUp } from "lucide-react"; // 👈 Icons for the button
import { EditDeadlineDialog } from "@/components/deadlines/edit-deadline-dialog";

export function DeadlineCard({ data, onUpdate, isHistory }: any) {
  // Use our custom hook
  const { timeLeft, isExpired } = useCountdown(data.targetDate);
  const [expanded, setExpanded] = useState(false); // 👈 New State
  const [isEditOpen, setIsEditOpen] = useState(false); // 👈 Add this
  
  // Calculate Progress (Time Elapsed)
  const start = new Date(data.startDate).getTime();
  const end = data.targetDate ? new Date(data.targetDate).getTime() : null;
  const now = new Date().getTime();
  
  let progress = 0;
  if (end) {
    const totalDuration = end - start;
    const elapsed = now - start;
    progress = Math.min((elapsed / totalDuration) * 100, 100);
  }

  const isOverdue = !data.isCompleted && isExpired && data.targetDate;

// 1. Toggle Main Deadline Completion
  const handleMainToggle = async () => {
    try {
        await toggleDeadline(data.id, !data.isCompleted);
        toast.success(data.isCompleted ? "Marked as active" : "Deadline completed!");
        onUpdate(); // Refresh the list
    } catch (e) { toast.error("Failed to update status"); }
  };

  // 2. Toggle Subtask
  const handleSubtaskToggle = async (subId: string, currentStatus: boolean) => {
    try {
        await toggleSubtask(subId, !currentStatus);
        onUpdate();
    } catch (e) { toast.error("Failed to update subtask"); }
  };

  // 3. Delete Deadline
  const handleDelete = async () => {
     try {
         await deleteDeadline(data.id);
         toast.success("Deadline deleted");
         onUpdate();
     } catch (e) { toast.error("Failed to delete"); }
  };

  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-md ${isOverdue ? 'border-destructive/50 bg-destructive/5' : 'border-border'}`}>
      
      {/* Timer Header */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isOverdue ? 'bg-destructive' : 'bg-primary'}`}>
         {end && <div className="h-full bg-background/50" style={{ width: `${100 - progress}%`, float: 'right' }} />}
      </div>

      <CardHeader className="pb-2 pt-6">
        <div className="flex justify-between items-start gap-3">
           
           {/* LEFT: Title & Badges */}
           <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                 <button onClick={handleMainToggle} className="text-primary hover:scale-110 transition-transform">
                    {data.isCompleted ? <CheckSquare className="w-5 h-5"/> : <Square className="w-5 h-5 opacity-40"/>}
                 </button>
                 <CardTitle className={`text-lg font-bold leading-tight ${data.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {data.title}
                 </CardTitle>
              </div>
              <div className="flex gap-2">
                 {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                 {!data.targetDate && <Badge variant="outline">No Date</Badge>}
              </div>
           </div>

           {/* RIGHT: Dropdown Menu (Edit/Delete) */}
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 {/* Hook this up to your Edit Dialog later */}
                 <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>

        </div>
      </CardHeader>

      <CardContent className="space-y-4">
         
         {/* THE COUNTDOWN DISPLAY */}
         {data.targetDate && !data.isCompleted && !isOverdue && (
             <div className="text-center py-4 bg-muted/30 rounded-lg border border-border/50">
                 <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Time Remaining</div>
                 <div className="text-4xl font-bbh-bogle font-bold text-foreground tabular-nums tracking-wider">
                    <span className="uppercase">{timeLeft || "--:--:--"}</span>
                 </div>
             </div>
         )}

         {/* Collapsible Subtasks Section */}
         {data.subtasks.length > 0 && (
             <div className="rounded-lg border border-border/50 bg-secondary/10 overflow-hidden">
                 
                 {/* Header / Toggle Button */}
                 <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-between p-3 text-sm hover:bg-secondary/20 transition-colors"
                 >
                    <div className="flex flex-col items-start gap-1">
                        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">Subtasks</span>
                        <div className="flex items-center gap-2">
                             <Progress value={(data.subtasks.filter((t:any) => t.isCompleted).length / data.subtasks.length) * 100} className="w-24 h-1.5" />
                             <span className="text-xs text-muted-foreground font-mono">
                                {data.subtasks.filter((t:any) => t.isCompleted).length}/{data.subtasks.length}
                             </span>
                        </div>
                    </div>
                    {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground"/> : <ChevronDown className="w-4 h-4 text-muted-foreground"/>}
                 </button>

                 {/* The List (Only shows when expanded) */}
                 {expanded && (
                     <div className="p-3 pt-0 space-y-1 animate-in slide-in-from-top-2 border-t border-border/30 mt-2">
                        {data.subtasks.map((task: any) => (
                           <div 
                             key={task.id} 
                             onClick={(e) => {
                                e.stopPropagation(); // Prevent toggling the accordion when clicking a task
                                handleSubtaskToggle(task.id, task.isCompleted);
                             }}
                             className="flex items-center gap-3 text-sm cursor-pointer hover:bg-background p-2 rounded-md transition-colors group border border-transparent hover:border-border/50"
                           >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${task.isCompleted ? 'bg-primary border-primary' : 'border-muted-foreground/40 group-hover:border-primary'}`}>
                                 {task.isCompleted && <Check className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <span className={`flex-1 truncate ${task.isCompleted ? 'line-through text-muted-foreground opacity-70' : ''}`}>
                                 {task.title}
                              </span>
                           </div>
                        ))}
                     </div>
                 )}
             </div>
         )}

         {/* Dates Footer */}
         <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
             <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70"/>
                <span>Start: {format(new Date(data.startDate), "MMM d")}</span>
             </div>
             {data.targetDate && (
                 <div className="flex items-center gap-1.5 justify-end font-medium text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary"/>
                    <span>End: {format(new Date(data.targetDate), "MMM d, h:mm a")}</span>
                 </div>
             )}
         </div>

      </CardContent>
      <EditDeadlineDialog 
         open={isEditOpen} 
         onOpenChange={setIsEditOpen} 
         data={data} 
         onSave={onUpdate} 
      />
    </Card>
  );
}