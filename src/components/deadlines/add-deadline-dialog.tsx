"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Loader2, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { createDeadline } from "@/app/actions/deadlines";
import { updateDeadline } from "@/app/actions/deadlines";

interface AddDeadlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function AddDeadlineDialog({ open, onOpenChange, onSave }: AddDeadlineDialogProps) {
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [hasDeadline, setHasDeadline] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("23:59"); // Default to end of day
  
  // Subtasks State
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleAddSubtask = () => {
    if (!currentSubtask.trim()) return;
    setSubtasks([...subtasks, currentSubtask.trim()]);
    setCurrentSubtask("");
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setLoading(true);

    try {
      let targetDateISO = null;

      if (hasDeadline && date) {
        // Combine Date and Time into ISO string
        const combined = new Date(`${date}T${time}`);
        targetDateISO = combined.toISOString();
      }

      await createDeadline({
        title,
        targetDate: targetDateISO,
        subtasks,
      });

      toast.success("Deadline Created!");
      
      // Reset Form
      setTitle("");
      setSubtasks([]);
      setCurrentSubtask("");
      setHasDeadline(true);
      
      onSave(); // Refresh parent
      onOpenChange(false); // Close modal
    } catch (e) {
      toast.error("Failed to create deadline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-primary" />
            Create New Deadline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* 1. Title Input */}
          <div className="space-y-2">
            <Label>Goal / Task Title</Label>
            <Input 
              placeholder="e.g. Submit Project Report" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium"
            />
          </div>

          {/* 2. Deadline Toggle & Picker */}
          <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                   <Label>Set Specific Deadline?</Label>
                   <p className="text-xs text-muted-foreground">Disable for open-ended goals.</p>
                </div>
                <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
             </div>

             {hasDeadline && (
                <div className="grid grid-cols-2 gap-4 pt-2 animate-in slide-in-from-top-2">
                   <div className="space-y-2">
                      <Label className="text-xs">Date</Label>
                      <Input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs">Time</Label>
                      <Input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                   </div>
                </div>
             )}
          </div>

          {/* 3. Subtasks Manager */}
          <div className="space-y-3">
             <Label>Subtasks (Optional)</Label>
             
             {/* List of added subtasks */}
             {subtasks.length > 0 && (
                 <div className="space-y-2 mb-3">
                    {subtasks.map((task, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-secondary/50 px-3 py-2 rounded-md border border-border">
                           <span>{task}</span>
                           <button onClick={() => handleRemoveSubtask(i)} className="text-muted-foreground hover:text-destructive">
                              <X className="w-4 h-4" />
                           </button>
                        </div>
                    ))}
                 </div>
             )}

             {/* Add Input */}
             <div className="flex gap-2">
                <Input 
                   placeholder="Add a step..." 
                   value={currentSubtask}
                   onChange={(e) => setCurrentSubtask(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                />
                <Button variant="secondary" onClick={handleAddSubtask} type="button">
                   <Plus className="w-4 h-4" />
                </Button>
             </div>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
            Create Deadline
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}