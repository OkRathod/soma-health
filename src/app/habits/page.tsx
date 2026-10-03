"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Clock, X, CalendarDays, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import {
  getHabitTemplates,
  saveHabitTemplate,
  toggleHabitActive,
  deleteHabitTemplate,
} from "@/app/actions/habits";

// ---- Local types (avoid importing Prisma types into a client component) ----
interface SubtaskForm {
  id?: string;
  title: string;
  targetValue: string;
  unit: string;
}
interface HabitForm {
  id?: string;
  title: string;
  description: string;
  startTime: string; // "HH:mm"
  durationMins: string;
  daysOfWeek: number[];
  isActive: boolean;
  subtasks: SubtaskForm[];
}
interface HabitTemplate {
  id: string;
  title: string;
  description: string | null;
  startTime: string | null;
  durationMins: number | null;
  daysOfWeek: number[];
  isActive: boolean;
  subtasks: { id: string; title: string; targetValue: number | null; unit: string | null }[];
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

const EMPTY_FORM: HabitForm = {
  title: "",
  description: "",
  startTime: "",
  durationMins: "60",
  daysOfWeek: [...ALL_DAYS],
  isActive: true,
  subtasks: [],
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<HabitTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HabitForm>(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    try {
      const res = await getHabitTemplates();
      if (res.success) setHabits(res.data as unknown as HabitTemplate[]);
    } catch {
      toast.error("Couldn't load your habits.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm({ ...EMPTY_FORM, daysOfWeek: [...ALL_DAYS] });
    setDialogOpen(true);
  }

  function openEdit(h: HabitTemplate) {
    setForm({
      id: h.id,
      title: h.title,
      description: h.description ?? "",
      startTime: h.startTime ? format(new Date(h.startTime), "HH:mm") : "",
      durationMins: String(h.durationMins ?? 60),
      daysOfWeek: h.daysOfWeek?.length ? [...h.daysOfWeek] : [...ALL_DAYS],
      isActive: h.isActive,
      subtasks: h.subtasks.map((s) => ({
        id: s.id,
        title: s.title,
        targetValue: s.targetValue != null ? String(s.targetValue) : "",
        unit: s.unit ?? "",
      })),
    });
    setDialogOpen(true);
  }

  function toggleDay(d: number) {
    setForm((f) => ({
      ...f,
      daysOfWeek: f.daysOfWeek.includes(d)
        ? f.daysOfWeek.filter((x) => x !== d)
        : [...f.daysOfWeek, d].sort((a, b) => a - b),
    }));
  }

  function addSubtask() {
    setForm((f) => ({ ...f, subtasks: [...f.subtasks, { title: "", targetValue: "", unit: "" }] }));
  }
  function updateSubtask(i: number, patch: Partial<SubtaskForm>) {
    setForm((f) => ({
      ...f,
      subtasks: f.subtasks.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  }
  function removeSubtask(i: number) {
    setForm((f) => ({ ...f, subtasks: f.subtasks.filter((_, idx) => idx !== i) }));
  }

  async function save() {
    if (!form.title.trim()) {
      toast.error("Give your habit a name.");
      return;
    }
    if (form.daysOfWeek.length === 0) {
      toast.error("Pick at least one day.");
      return;
    }
    setSaving(true);

    // Match the existing task convention: new Date(`${date}T${time}`).
    const anchor = format(new Date(), "yyyy-MM-dd");
    const startTimeIso = form.startTime ? new Date(`${anchor}T${form.startTime}`).toISOString() : null;

    try {
      await saveHabitTemplate({
        id: form.id,
        title: form.title.trim(),
        description: form.description.trim() || null,
        startTime: startTimeIso,
        durationMins: form.durationMins ? parseInt(form.durationMins, 10) : 60,
        daysOfWeek: form.daysOfWeek,
        isActive: form.isActive,
        subtasks: form.subtasks
          .filter((s) => s.title.trim())
          .map((s) => ({
            id: s.id,
            title: s.title.trim(),
            targetValue: s.targetValue ? parseInt(s.targetValue, 10) : null,
            unit: s.unit.trim() || null,
          })),
      });
      toast.success(form.id ? "Habit updated" : "Habit created");
      setDialogOpen(false);
      await load();
    } catch (e) {
      toast.error((e as Error).message || "Couldn't save the habit.");
    } finally {
      setSaving(false);
    }
  }

  async function onToggleActive(h: HabitTemplate) {
    // optimistic
    setHabits((prev) => prev.map((x) => (x.id === h.id ? { ...x, isActive: !x.isActive } : x)));
    try {
      await toggleHabitActive(h.id, !h.isActive);
    } catch {
      setHabits((prev) => prev.map((x) => (x.id === h.id ? { ...x, isActive: h.isActive } : x)));
      toast.error("Couldn't update the habit.");
    }
  }

  async function onDelete(id: string) {
    setConfirmDelete(null);
    const prev = habits;
    setHabits((h) => h.filter((x) => x.id !== id)); // optimistic
    try {
      await deleteHabitTemplate(id);
      toast.success("Habit deleted");
    } catch {
      setHabits(prev);
      toast.error("Couldn't delete the habit.");
    }
  }

  function daysSummary(days: number[]): string {
    if (days.length === 7) return "Every day";
    if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return "Weekdays";
    if (days.length === 2 && days.includes(0) && days.includes(6)) return "Weekends";
    return days.map((d) => DAY_NAMES[d]).join(", ");
  }

  if (loading) return <DNALoader label="Loading your habits…" />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Habits</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your recurring routines. They appear automatically each morning — only on the days you choose.
          </p>
        </div>
        <Button onClick={openNew} className="shrink-0">
          <Plus className="mr-1.5 h-4 w-4" /> New habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
          <CalendarDays className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">No habits yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first habit — like “Drink 2L water” or “Morning walk” — and it’ll show up on your
            dashboard on the days you pick.
          </p>
          <Button onClick={openNew} variant="outline" className="mt-4">
            <Plus className="mr-1.5 h-4 w-4" /> Create a habit
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((h) => (
            <div
              key={h.id}
              className={cn(
                "rounded-xl border border-border bg-card p-4 transition",
                !h.isActive && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "var(--priority-habit)" }}
                    />
                    <h3 className="truncate font-semibold text-foreground">{h.title}</h3>
                  </div>
                  {h.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{h.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {daysSummary(h.daysOfWeek)}
                    </span>
                    {h.startTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(h.startTime), "h:mm a")}
                      </span>
                    )}
                    {h.subtasks.length > 0 && <span>{h.subtasks.length} step{h.subtasks.length > 1 ? "s" : ""}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Switch
                    checked={h.isActive}
                    onCheckedChange={() => onToggleActive(h)}
                    aria-label={h.isActive ? "Pause habit" : "Activate habit"}
                  />
                  <Button size="icon" variant="ghost" onClick={() => openEdit(h)} aria-label="Edit habit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {confirmDelete === h.id ? (
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="destructive" onClick={() => onDelete(h.id)}>
                        Delete
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setConfirmDelete(h.id)}
                      aria-label="Delete habit"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Day strip */}
              <div className="mt-3 flex gap-1">
                {DAY_LABELS.map((label, d) => (
                  <span
                    key={d}
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-md text-[11px] font-medium",
                      h.daysOfWeek.includes(d)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground/50"
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Add / Edit dialog ---------- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit habit" : "New habit"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="h-title">Name</Label>
              <Input
                id="h-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Morning walk"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="h-desc">Description (optional)</Label>
              <Textarea
                id="h-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Any notes or details…"
                rows={2}
              />
            </div>

            {/* Day picker */}
            <div className="space-y-1.5">
              <Label>Repeat on</Label>
              <div className="flex gap-1.5">
                {DAY_LABELS.map((label, d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    aria-pressed={form.daysOfWeek.includes(d)}
                    aria-label={DAY_NAMES[d]}
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition",
                      form.daysOfWeek.includes(d)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-1 text-xs">
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [...ALL_DAYS] })}>
                  Every day
                </button>
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [1, 2, 3, 4, 5] })}>
                  Weekdays
                </button>
                <button type="button" className="text-primary hover:underline" onClick={() => setForm({ ...form, daysOfWeek: [0, 6] })}>
                  Weekends
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="h-time">Start time (optional)</Label>
                <Input
                  id="h-time"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="h-dur">Duration (mins)</Label>
                <Input
                  id="h-dur"
                  type="number"
                  inputMode="numeric"
                  value={form.durationMins}
                  onChange={(e) => setForm({ ...form, durationMins: e.target.value })}
                  placeholder="60"
                />
              </div>
            </div>

            {/* Subtasks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Steps (optional)</Label>
                <Button type="button" size="sm" variant="ghost" onClick={addSubtask}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add step
                </Button>
              </div>
              {form.subtasks.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Break the habit into checkable steps, e.g. “Fill bottle”, target 8 glasses.
                </p>
              )}
              <div className="space-y-2">
                {form.subtasks.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={s.title}
                      onChange={(e) => updateSubtask(i, { title: e.target.value })}
                      placeholder="Step name"
                      className="flex-1"
                    />
                    <Input
                      value={s.targetValue}
                      onChange={(e) => updateSubtask(i, { targetValue: e.target.value })}
                      placeholder="#"
                      type="number"
                      inputMode="numeric"
                      className="w-16"
                    />
                    <Input
                      value={s.unit}
                      onChange={(e) => updateSubtask(i, { unit: e.target.value })}
                      placeholder="unit"
                      className="w-20"
                    />
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeSubtask(i)} aria-label="Remove step">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">Paused habits stop appearing on your dashboard.</p>
              </div>
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              {form.id ? "Save changes" : "Create habit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}