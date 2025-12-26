"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateDeadline } from "@/app/actions/deadlines";
import { format } from "date-fns";
import { Loader2, Edit, Plus, X, Trash2 } from "lucide-react";

export function EditDeadlineDialog({ open, onOpenChange, data, onSave }: any) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [hasDeadline, setHasDeadline] = useState(!!data.targetDate);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // 👇 New Subtasks State
  const [subtasks, setSubtasks] = useState<{ id?: string, title: string }[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  // Pre-fill data when opening
  useEffect(() => {
    if (open && data) {
        setTitle(data.title);
        setHasDeadline(!!data.targetDate);
        
        // 1. Fill Date/Time
        if (data.targetDate) {
            const d = new Date(data.targetDate);
            setDate(format(d, "yyyy-MM-dd"));
            setTime(format(d, "HH:mm"));
        } else {
            setDate("");
            setTime("23:59");
        }

        // 2. Fill Subtasks (Deep copy to avoid mutating props)
        if (data.subtasks) {
            setSubtasks(data.subtasks.map((s: any) => ({ id: s.id, title: s.title })));
        }
    }
  }, [open, data]);

  // --- Subtask Handlers ---
  const addSubtask = () => {
      if (!newSubtaskText.trim()) return;
      setSubtasks([...subtasks, { title: newSubtaskText.trim() }]); // No ID means "New"
      setNewSubtaskText("");
  };

  const removeSubtask = (index: number) => {
      const newRef = [...subtasks];
      newRef.splice(index, 1);
      setSubtasks(newRef);
  };

  const handleSubtaskChange = (index: number, val: string) => {
      const newRef = [...subtasks];
      newRef[index].title = val;
      setSubtasks(newRef);
  };
  // ------------------------

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let targetDateISO = null;
      if (hasDeadline && date) {
        targetDateISO = new Date(`${date}T${time}`).toISOString();
      }

      await updateDeadline(data.id, { 
          title, 
          targetDate: targetDateISO,
          subtasks // 👈 Sending the updated list
      });
      
      toast.success("Deadline Updated");
      onSave();
      onOpenChange(false);
    } catch (e) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" /> Edit Deadline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Date Picker */}
          <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
             <div className="flex items-center justify-between">
                <Label>Set Deadline?</Label>
                <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
             </div>
             {hasDeadline && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label className="text-xs">Date</Label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs">Time</Label>
                      <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                   </div>
                </div>
             )}
          </div>

          {/* Subtasks Section */}
          <div className="space-y-3">
             <Label>Subtasks</Label>
             
             {/* Existing List */}
             <div className="space-y-2">
                 {subtasks.map((task, i) => (
                    <div key={i} className="flex gap-2">
                        <Input 
                            value={task.title} 
                            onChange={(e) => handleSubtaskChange(i, e.target.value)}
                            className="h-9"
                        />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                            onClick={() => removeSubtask(i)}
                        >
                            <Trash2 className="w-4 h-4"/>
                        </Button>
                    </div>
                 ))}
             </div>

             {/* Add New */}
             <div className="flex gap-2 pt-2">
                 <Input 
                    placeholder="Add new subtask..." 
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                    className="h-9"
                 />
                 <Button type="button" size="sm" onClick={addSubtask} variant="secondary">
                    <Plus className="w-4 h-4" />
                 </Button>
             </div>
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}