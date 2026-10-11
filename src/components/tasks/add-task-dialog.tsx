"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const fieldLabel = "label-mono mb-2 block";

/** Create / edit form for a task. Bottom sheet on phones, centred dialog from `sm`. */
export function AddTaskDialog({ isOpen, onOpenChange, task, setTask, subtask, setSubtask, onSave, isEditing }: any) {

  const addSubtask = () => {
    if (!subtask.title) return;
    setTask({ ...task, subtasks: [...task.subtasks, { ...subtask }] });
    setSubtask({ title: "", targetValue: "", unit: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bottom-0 left-0 top-auto flex max-h-[90dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-b-none rounded-t-[2rem] p-0 sm:bottom-auto sm:left-[50%] sm:top-[50%] sm:max-w-lg sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl"
      >
        <DialogHeader className="shrink-0 gap-3 border-b border-border px-6 pb-5 pt-6 text-left">
          <p className="eyebrow">{isEditing ? "Edit" : "New"}</p>
          <DialogTitle className="display text-3xl font-normal">
            {isEditing ? "Edit task" : "Create a task"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Set the title, priority, schedule and subtasks for this task.
          </DialogDescription>
        </DialogHeader>

        <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div>
            <label htmlFor="task-title" className={fieldLabel}>Title</label>
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
            />
          </div>

          <div>
            <label className={fieldLabel}>Priority</label>
            <Select
              value={task.priority === "HABIT" && !task.isRecurring ? "LOW" : task.priority}
              onValueChange={v => setTask({ ...task, priority: v })}
              disabled={task.isRecurring}
            >
              <SelectTrigger className="h-11 w-full rounded-xl bg-card">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH">High (Max 3)</SelectItem>
                <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="task-date" className={fieldLabel}>When</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_8rem_7rem]">
              <Input
                id="task-date"
                type="date"
                aria-label="Date"
                className="col-span-2 sm:col-span-1"
                value={task.date}
                onChange={e => setTask({ ...task, date: e.target.value })}
              />
              <Input
                type="time"
                aria-label="Start time"
                value={task.startTime}
                onChange={e => setTask({ ...task, startTime: e.target.value })}
              />
              <div className="flex h-11 items-center gap-2 rounded-xl border border-input bg-card px-3.5 focus-within:border-foreground/60 focus-within:ring-[3px] focus-within:ring-foreground/10">
                <input
                  className="w-full min-w-0 bg-transparent text-base outline-none md:text-sm"
                  type="number"
                  aria-label="Duration in minutes"
                  placeholder="60"
                  value={task.duration}
                  onChange={e => setTask({ ...task, duration: e.target.value })}
                />
                <span className="text-xs text-muted-foreground">min</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-surface p-4">
            <Checkbox
              id="recurring"
              className="mt-0.5 size-5 rounded-md bg-card"
              checked={task.isRecurring}
              onCheckedChange={(c) => setTask({ ...task, isRecurring: !!c })}
            />
            <div>
              <label htmlFor="recurring" className="text-sm font-medium">Mark as daily habit</label>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Repeats every day automatically.</p>
            </div>
          </div>

          <div>
            <label htmlFor="task-description" className={fieldLabel}>Description</label>
            <Textarea
              id="task-description"
              className="min-h-[88px] resize-none"
              placeholder="Add details..."
              value={task.description}
              onChange={e => setTask({ ...task, description: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="subtask-title" className={fieldLabel}>Subtasks</label>
            <div className="flex gap-2">
              <Input
                id="subtask-title"
                placeholder="Name (e.g. Pushups)"
                value={subtask.title}
                onChange={e => setSubtask({ ...subtask, title: e.target.value })}
              />
              <Input
                placeholder="Target"
                type="number"
                aria-label="Subtask target"
                className="w-24 shrink-0"
                value={subtask.targetValue}
                onChange={e => setSubtask({ ...subtask, targetValue: e.target.value })}
              />
              <Button variant="secondary" className="h-11" onClick={addSubtask}>Add</Button>
            </div>

            {task.subtasks.length > 0 && (
              <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {task.subtasks.map((st: any, i: number) => (
                  <li key={i} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
                    <span className="min-w-0 truncate font-medium">{st.title}</span>
                    {st.targetValue && (
                      <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        Target: {st.targetValue}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <Button size="lg" className="w-full" onClick={onSave}>
            {isEditing ? "Save changes" : "Create task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
