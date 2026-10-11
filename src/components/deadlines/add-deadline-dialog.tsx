"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createDeadline } from "@/app/actions/deadlines";
import { deadlineSheetClass } from "@/components/deadlines/sheet";

interface AddDeadlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function AddDeadlineDialog({ open, onOpenChange, onSave }: AddDeadlineDialogProps) {
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [hasDeadline, setHasDeadline] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("23:59"); // Default to end of day

  // Subtasks state
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
        // Combine date and time into an ISO string
        const combined = new Date(`${date}T${time}`);
        targetDateISO = combined.toISOString();
      }

      await createDeadline({
        title,
        targetDate: targetDateISO,
        subtasks,
      });

      toast.success("Deadline created");

      // Reset form
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
      <DialogContent className={deadlineSheetClass}>
        <DialogHeader className="pr-8 text-left">
          <p className="eyebrow">New deadline</p>
          <DialogTitle className="display mt-1 text-[2rem] font-normal leading-none">
            What are you working <em>towards?</em>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Name the goal, set an optional due date and break it into steps.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="new-deadline-title">Goal or task title</Label>
            <Input
              id="new-deadline-title"
              placeholder="e.g. Submit project report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium"
            />
          </div>

          {/* Due date toggle and pickers */}
          <div className="rounded-2xl bg-surface p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label htmlFor="new-deadline-has-date">Set a due date</Label>
                <p className="mt-1.5 text-[13px] text-muted-foreground">Turn off for open-ended goals.</p>
              </div>
              <Switch id="new-deadline-has-date" checked={hasDeadline} onCheckedChange={setHasDeadline} />
            </div>

            {hasDeadline && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="min-w-0 space-y-1.5">
                  <Label htmlFor="new-deadline-date" className="label-mono">Date</Label>
                  <Input
                    id="new-deadline-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="min-w-0 space-y-1.5">
                  <Label htmlFor="new-deadline-time" className="label-mono">Time</Label>
                  <Input
                    id="new-deadline-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Subtasks */}
          <div className="space-y-2">
            <Label htmlFor="new-deadline-step">
              Steps <span className="font-normal text-muted-foreground">optional</span>
            </Label>

            {subtasks.length > 0 && (
              <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {subtasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-2 py-1 pl-3.5 pr-1 text-sm">
                    <span className="label-mono w-5 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 truncate">{task}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(i)}
                      aria-label={`Remove step "${task}"`}
                      className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-2">
              <Input
                id="new-deadline-step"
                placeholder="Add a step…"
                value={currentSubtask}
                onChange={(e) => setCurrentSubtask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={handleAddSubtask}
                type="button"
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
            {loading ? <Loader2 className="animate-spin" /> : null}
            Create deadline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
