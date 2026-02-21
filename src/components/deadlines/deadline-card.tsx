"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Calendar, Clock, AlertTriangle, Timer } from "lucide-react";
import { MoreVertical, Trash2, Edit, Check, Square, CheckSquare, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toggleDeadline, deleteDeadline, toggleSubtask } from "@/app/actions/deadlines";
import { toast } from "sonner";
import { useState } from "react";
import { EditDeadlineDialog } from "@/components/deadlines/edit-deadline-dialog";

export function DeadlineCard({ data, onUpdate, isHistory }: any) {
  const { timeLeft, isExpired } = useCountdown(data.targetDate);
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Calculate Progress (Time Elapsed)
  const start = new Date(data.startDate).getTime();
  const end = data.targetDate ? new Date(data.targetDate).getTime() : null;
  const now = new Date().getTime();
  
  let progress = 0;
  if (end) {
    const totalDuration = end - start;
    const elapsed = now - start;
    progress = Math.max(0, Math.min((elapsed / totalDuration) * 100, 100)); // Clamp between 0-100
  }

  const isOverdue = !data.isCompleted && isExpired && data.targetDate;

  // 👇 DYNAMIC THEME ENGINE: Changes color based on time elapsed
  const getUrgencyTheme = () => {
    if (data.isCompleted) return { 
        bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500/30", 
        glow: "shadow-emerald-500/10", lightBg: "bg-emerald-500/5", gradient: "from-emerald-500/20 to-transparent" 
    };
    if (isOverdue) return { 
        bg: "bg-red-600", text: "text-red-600", border: "border-red-600/50", 
        glow: "shadow-red-600/20", lightBg: "bg-red-600/10", gradient: "from-red-600/20 to-red-600/5" 
    };
    if (progress > 90) return { 
        bg: "bg-red-500", text: "text-red-500", border: "border-red-500/40", 
        glow: "shadow-red-500/20", lightBg: "bg-red-500/10", gradient: "from-red-500/20 to-transparent" 
    };
    if (progress > 75) return { 
        bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500/40", 
        glow: "shadow-orange-500/20", lightBg: "bg-orange-500/10", gradient: "from-orange-500/20 to-transparent" 
    };
    if (progress > 50) return { 
        bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500/40", 
        glow: "shadow-amber-500/20", lightBg: "bg-amber-500/10", gradient: "from-amber-500/20 to-transparent" 
    };
    // Default (0-50% elapsed)
    return { 
        bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/30", 
        glow: "shadow-blue-500/10", lightBg: "bg-blue-500/5", gradient: "from-blue-500/20 to-transparent" 
    };
  };

  const theme = getUrgencyTheme();

  // Actions
  const handleMainToggle = async () => {
    try {
        await toggleDeadline(data.id, !data.isCompleted);
        toast.success(data.isCompleted ? "Marked as active" : "Deadline completed! 🎉");
        onUpdate();
    } catch (e) { toast.error("Failed to update status"); }
  };

  const handleSubtaskToggle = async (subId: string, currentStatus: boolean) => {
    try {
        await toggleSubtask(subId, !currentStatus);
        onUpdate();
    } catch (e) { toast.error("Failed to update subtask"); }
  };

  const handleDelete = async () => {
     try {
         await deleteDeadline(data.id);
         toast.success("Deadline deleted");
         onUpdate();
     } catch (e) { toast.error("Failed to delete"); }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${theme.border} ${theme.glow} bg-card`}>
      
      {/* Subtle Background Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${theme.gradient} opacity-50 pointer-events-none`} />

      <CardHeader className="pb-2 pt-5 relative z-10">
        <div className="flex justify-between items-start gap-3">
           
           {/* LEFT: Title & Checkbox */}
           <div className="space-y-1.5 flex-1">
              <div className="flex items-start gap-3">
                 <button onClick={handleMainToggle} className={`mt-0.5 shrink-0 transition-transform hover:scale-110 ${data.isCompleted ? 'text-emerald-500' : theme.text}`}>
                    {data.isCompleted ? <CheckSquare className="w-6 h-6"/> : <Square className="w-6 h-6 opacity-60 hover:opacity-100"/>}
                 </button>
                 <div>
                     <CardTitle className={`text-xl font-bold leading-tight ${data.isCompleted ? 'line-through text-muted-foreground opacity-70' : 'text-foreground'}`}>
                        {data.title}
                     </CardTitle>
                     <div className="flex gap-2 mt-2">
                        {isOverdue && <Badge variant="destructive" className="animate-pulse shadow-sm shadow-red-500/20">Overdue</Badge>}
                        {!data.targetDate && <Badge variant="secondary" className="bg-secondary/50">Open Ended</Badge>}
                        {data.isCompleted && <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Completed</Badge>}
                     </div>
                 </div>
              </div>
           </div>

           {/* RIGHT: Dropdown Menu */}
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 text-muted-foreground hover:bg-secondary/50">
                    <MoreVertical className="w-4 h-4" />
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 border-border/50 shadow-xl">
                 <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-2" /> Edit Deadline
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleDelete} className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                 </DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 relative z-10">
         
         {/* THE VIBRANT COUNTDOWN DISPLAY */}
         {data.targetDate && !data.isCompleted && (
             <div className={`relative p-5 rounded-2xl border ${theme.border} ${theme.lightBg} flex flex-col items-center justify-center overflow-hidden shadow-inner`}>
                 
                 {/* Top Label */}
                 <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold mb-2 opacity-80" style={{ color: `var(--${theme.text.split('-')[1]}-500)` }}>
                     {isOverdue ? <AlertTriangle className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
                     {isOverdue ? "Time Exceeded By" : "Time Remaining"}
                 </div>
                 
                 {/* Massive Countdown Numbers */}
                 <div className={`text-4xl md:text-5xl font-black tabular-nums tracking-tight mb-4 drop-shadow-sm ${theme.text}`}>
                    {timeLeft || "00:00:00"}
                 </div>
                 
                 {/* Visual Progress Bar Engine */}
                 {!isOverdue && (
                     <div className="w-full space-y-1.5">
                         <div className="w-full h-3 bg-background/60 rounded-full overflow-hidden shadow-inner border border-border/20">
                             <div 
                                className={`h-full ${theme.bg} transition-all duration-1000 ease-out`} 
                                style={{ width: `${progress}%` }} 
                             />
                         </div>
                         <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                             <span>Time Elapsed: {progress.toFixed(1)}%</span>
                             <span className={progress > 90 ? theme.text : ""}>{100 - Math.round(progress)}% Left</span>
                         </div>
                     </div>
                 )}
             </div>
         )}

         {/* Collapsible Subtasks Section */}
         {data.subtasks?.length > 0 && (
             <div className="rounded-xl border border-border/50 bg-secondary/5 overflow-hidden transition-all hover:border-border">
                 <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-secondary/20 transition-colors"
                 >
                    <div className="flex flex-col items-start gap-1.5 w-full">
                        <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                           Subtasks
                           {data.subtasks.filter((t:any) => t.isCompleted).length === data.subtasks.length && (
                               <Badge variant="outline" className="h-5 text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">All Done</Badge>
                           )}
                        </span>
                        <div className="flex items-center gap-3 w-full pr-4">
                             <Progress 
                                value={(data.subtasks.filter((t:any) => t.isCompleted).length / data.subtasks.length) * 100} 
                                className="h-1.5 flex-1 bg-background/50" 
                             />
                             <span className="text-xs text-muted-foreground font-mono font-medium shrink-0">
                                {data.subtasks.filter((t:any) => t.isCompleted).length} / {data.subtasks.length}
                             </span>
                        </div>
                    </div>
                    <div className="shrink-0 bg-background/50 p-1.5 rounded-md border border-border/50">
                        {expanded ? <ChevronUp className="w-4 h-4 text-foreground"/> : <ChevronDown className="w-4 h-4 text-foreground"/>}
                    </div>
                 </button>

                 {expanded && (
                     <div className="p-2 space-y-0.5 bg-background/30 border-t border-border/30">
                        {data.subtasks.map((task: any) => (
                           <div 
                             key={task.id} 
                             onClick={(e) => {
                                e.stopPropagation(); 
                                handleSubtaskToggle(task.id, task.isCompleted);
                             }}
                             className="flex items-start gap-3 text-sm cursor-pointer hover:bg-card p-2.5 rounded-lg transition-all group border border-transparent hover:border-border/60 hover:shadow-sm"
                           >
                              <div className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all shrink-0 ${task.isCompleted ? `${theme.bg} border-transparent shadow-sm` : 'border-muted-foreground/40 group-hover:border-primary/50'}`}>
                                 {task.isCompleted && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className={`flex-1 leading-tight ${task.isCompleted ? 'line-through text-muted-foreground opacity-60' : 'text-foreground/90 font-medium'}`}>
                                 {task.title}
                              </span>
                           </div>
                        ))}
                     </div>
                 )}
             </div>
         )}

         {/* Dates Footer */}
         <div className="flex justify-between items-center text-xs font-medium text-muted-foreground pt-3 border-t border-border/40">
             <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md">
                <Calendar className="w-3.5 h-3.5 opacity-70"/>
                <span>{format(new Date(data.startDate), "MMM d, yyyy")}</span>
             </div>
             {data.targetDate && (
                 <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 opacity-70"/>
                    <span>{format(new Date(data.targetDate), "MMM d, h:mm a")}</span>
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