"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateDeadline } from "@/app/actions/deadlines";
import { format } from "date-fns";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { deadlineSheetClass } from "@/components/deadlines/sheet";

export function EditDeadlineDialog({ open, onOpenChange, data, onSave }: any) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [hasDeadline, setHasDeadline] = useState(!!data.targetDate);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Subtasks state
  const [subtasks, setSubtasks] = useState<{ id?: string, title: string }[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  // Pre-fill data when opening
  useEffect(() => {
    if (open && data) {
        setTitle(data.title);
        setHasDeadline(!!data.targetDate);

        // 1. Fill date and time
        if (data.targetDate) {
            const d = new Date(data.targetDate);
            setDate(format(d, "yyyy-MM-dd"));
            setTime(format(d, "HH:mm"));
        } else {
            setDate("");
            setTime("23:59");
        }

        // 2. Fill subtasks (copied so props are never mutated)
        if (data.subtasks) {
            setSubtasks(data.subtasks.map((s: any) => ({ id: s.id, title: s.title })));
        }
    }
  }, [open, data]);

  // --- Subtask handlers ---
  const addSubtask = () => {
      if (!newSubtaskText.trim()) return;
      setSubtasks([...subtasks, { title: newSubtaskText.trim() }]); // No id means "new"
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
          subtasks // the full, edited list
      });

      toast.success("Deadline updated");
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
      <DialogContent className={deadlineSheetClass}>
        <DialogHeader className="pr-8 text-left">
          <p className="eyebrow">Edit deadline</p>
          <DialogTitle className="display mt-1 text-[2rem] font-normal leading-none">
            Adjust the <em>plan</em>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Change the title, due date or steps of this deadline.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor={`edit-title-${data.id}`}>Title</Label>
            <Input
              id={`edit-title-${data.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium"
            />
          </div>

          {/* Due date */}
          <div className="rounded-2xl bg-surface p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label htmlFor={`edit-has-date-${data.id}`}>Set a due date</Label>
                <p className="mt-1.5 text-[13px] text-muted-foreground">Turn off for open-ended goals.</p>
              </div>
              <Switch id={`edit-has-date-${data.id}`} checked={hasDeadline} onCheckedChange={setHasDeadline} />
            </div>
            {hasDeadline && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="min-w-0 space-y-1.5">
                  <Label htmlFor={`edit-date-${data.id}`} className="label-mono">Date</Label>
                  <Input id={`edit-date-${data.id}`} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <Label htmlFor={`edit-time-${data.id}`} className="label-mono">Time</Label>
                  <Input id={`edit-time-${data.id}`} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          {/* Subtasks */}
          <div className="space-y-2">
            <Label htmlFor={`edit-step-${data.id}`}>Steps</Label>

            {subtasks.length > 0 && (
              <div className="space-y-2">
                {subtasks.map((task, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={task.title}
                      onChange={(e) => handleSubtaskChange(i, e.target.value)}
                      aria-label={`Step ${i + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-11 text-muted-foreground hover:text-destructive"
                      onClick={() => removeSubtask(i)}
                      aria-label={`Remove step ${i + 1}`}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                id={`edit-step-${data.id}`}
                placeholder="Add a step…"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubtask()}
              />
              <Button
                type="button"
                size="icon"
                onClick={addSubtask}
                variant="secondary"
                aria-label="Add step"
                className="size-11"
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-7 grid grid-cols-2 gap-3 sm:flex">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
