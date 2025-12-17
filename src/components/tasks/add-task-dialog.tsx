"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit2, Sparkles, Layers, Plus } from "lucide-react";

export function AddTaskDialog({ isOpen, onOpenChange, task, setTask, subtask, setSubtask, onSave, isEditing }: any) {
  
  const addSubtask = () => {
    if (!subtask.title) return;
    setTask({ ...task, subtasks: [...task.subtasks, { ...subtask }] });
    setSubtask({ title: "", targetValue: "", unit: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-lg bg-card border-border sm:rounded-xl max-h-[85vh] flex flex-col p-0 overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="p-6 pb-3 border-b border-border/40 bg-secondary/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
              {isEditing ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
          
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Title</label>
            <Input
              className="bg-secondary/30 border-transparent focus:border-primary transition-all"
              placeholder="What needs to be done?"
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
          </div>

          {/* Priority & Time Row */}
          <div className="grid grid-rows-2 gap-4">
            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground/80">Priority</label>
              <Select
                value={task.priority === "HABIT" && !task.isRecurring ? "LOW" : task.priority}
                onValueChange={v => setTask({ ...task, priority: v })}
                disabled={task.isRecurring}
              >
                <SelectTrigger className="bg-secondary/30 border-transparent focus:border-primary">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High (Max 3)</SelectItem>
                  <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date + Time */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground/80">Time</label>
                <div className="flex gap-2">
                    <Input
                        type="date"
                        className="bg-secondary/30 border-transparent focus:border-primary flex-1"
                        value={task.date}
                        onChange={e => setTask({ ...task, date: e.target.value })}
                    />
                    <Input
                        type="time"
                        className="bg-secondary/30 border-transparent focus:border-primary w-24"
                        value={task.startTime}
                        onChange={e => setTask({ ...task, startTime: e.target.value })}
                    />
                    <div className="flex items-center gap-2 bg-secondary/30 rounded-md px-3 border border-transparent focus-within:border-primary">
                        <Input 
                            className="w-12 h-9 border-none bg-transparent p-0 text-center focus-visible:ring-0"
                            type="number" 
                            placeholder="60"
                            value={task.duration} 
                            onChange={e => setTask({...task, duration: e.target.value})} 
                        />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">min</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-start gap-3 border border-border/50 bg-secondary/10 p-4 rounded-lg">
            <Checkbox
              id="recurring"
              className="mt-1 data-[state=checked]:bg-primary"
              checked={task.isRecurring}
              onCheckedChange={(c) => setTask({ ...task, isRecurring: !!c })}
            />
            <div className="space-y-0.5">
              <label htmlFor="recurring" className="text-sm font-medium cursor-pointer">Mark as Daily Habit</label>
              <p className="text-xs text-muted-foreground">Repeats every day automatically.</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Description</label>
            <Textarea
              className="bg-secondary/30 border-transparent focus:border-primary resize-none min-h-[80px]"
              placeholder="Add details..."
              value={task.description}
              onChange={e => setTask({ ...task, description: e.target.value })}
            />
          </div>

          {/* Subtasks Section */}
          <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 space-y-4">
            <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
              <Layers className="w-4 h-4 text-primary" /> Subtasks
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Name (e.g. Pushups)"
                className="h-9 text-sm bg-background border-transparent"
                value={subtask.title}
                onChange={e => setSubtask({ ...subtask, title: e.target.value })}
              />
              <Input
                placeholder="Target"
                type="number"
                className="h-9 w-20 text-sm bg-background border-transparent"
                value={subtask.targetValue}
                onChange={e => setSubtask({ ...subtask, targetValue: e.target.value })}
              />
              <Button size="sm" className="h-9" onClick={addSubtask}>Add</Button>
            </div>
            
            {task.subtasks.length > 0 && (
              <div className="space-y-2 mt-1">
                {task.subtasks.map((st: any, i: number) => (
                  <div key={i} className="text-xs flex justify-between items-center bg-background p-2 px-3 rounded-md border shadow-sm">
                    <span className="font-medium truncate max-w-[70%]">{st.title}</span>
                    {st.targetValue && (
                      <Badge variant="secondary" className="text-[10px] h-5">Target: {st.targetValue}</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 border-t border-border/40 bg-background">
            <Button className="w-full text-base font-semibold py-6 shadow-lg shadow-primary/20" onClick={onSave}>
                {isEditing ? "Save Changes" : "Create Task"}
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}