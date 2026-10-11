"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Clock, X, CalendarDays, Loader2, ListChecks, Repeat, Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { PageShell, PageHeader, StatTile, EmptyState } from "@/components/layout/page";
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

const DAY_PRESETS: { label: string; days: number[] }[] = [
  { label: "Every day", days: ALL_DAYS },
  { label: "Weekdays", days: [1, 2, 3, 4, 5] },
  { label: "Weekends", days: [0, 6] },
];

const EMPTY_FORM: HabitForm = {
  title: "",
  description: "",
  startTime: "",
  durationMins: "60",
  daysOfWeek: [...ALL_DAYS],
  isActive: true,
  subtasks: [],
};

/** Bottom sheet on phones, centred dialog from `sm`. Layered over the shared DialogContent. */
const SHEET_CLASS =
  "max-h-[90dvh] gap-0 overflow-y-auto p-0 sm:max-w-lg " +
  "max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 " +
  "max-sm:rounded-b-none max-sm:rounded-t-[2rem] max-sm:border-x-0 max-sm:border-b-0";

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

  function samePreset(days: number[]) {
    return days.length === form.daysOfWeek.length && days.every((d) => form.daysOfWeek.includes(d));
  }

  if (loading) return <DNALoader label="Loading your habits…" />;

  // Display-only figures for the summary tiles.
  const todayIdx = new Date().getDay();
  const activeCount = habits.filter((h) => h.isActive).length;
  const pausedCount = habits.length - activeCount;
  const dueToday = habits.filter((h) => h.isActive && h.daysOfWeek.includes(todayIdx)).length;
  const stepCount = habits.reduce((n, h) => n + h.subtasks.length, 0);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Habits"
        title={
          <>
            Routines that <em>repeat</em>
          </>
        }
        description="Your recurring routines. They appear automatically each morning, only on the days you choose."
        actions={
          <Button onClick={openNew} className="w-full sm:w-auto">
            <Plus /> New habit
          </Button>
        }
      />

      {habits.length === 0 ? (
        <EmptyState
          icon={<CalendarDays />}
          title="No habits yet"
          description="Create your first habit, like “Drink 2L water” or “Morning walk”, and it’ll show up on your dashboard on the days you pick."
          action={
            <Button onClick={openNew} variant="outline">
              <Plus /> Create a habit
            </Button>
          }
        />
      ) : (
        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            <StatTile
              tone="lime"
              label="Due today"
              value={dueToday}
              hint={`Scheduled for ${format(new Date(), "EEEE")}`}
              icon={<CalendarDays className="size-3.5" />}
            />
            <StatTile label="Active" value={activeCount} hint={`of ${habits.length} habit${habits.length === 1 ? "" : "s"}`} icon={<Repeat className="size-3.5" />} />
            <StatTile label="Paused" value={pausedCount} hint="Hidden from the dashboard" />
            <StatTile label="Steps" value={stepCount} hint="Across all habits" icon={<ListChecks className="size-3.5" />} />
          </div>

          <section className="panel overflow-hidden">
            <header className="flex items-center justify-between gap-4 px-4 pb-4 pt-5 sm:px-6">
              <div className="min-w-0">
                <p className="label-mono mb-1.5">Templates</p>
                <h2 className="text-lg font-medium leading-tight tracking-[-0.02em]">
                  {habits.length} habit{habits.length === 1 ? "" : "s"}
                </h2>
              </div>
            </header>

            <ul className="divide-y divide-border border-t border-border">
              {habits.map((h) => {
                const confirming = confirmDelete === h.id;
                return (
                  <li
                    key={h.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-x-6 lg:py-5"
                  >
                    {/* Name, notes, schedule */}
                    <div className={cn("min-w-0 transition-opacity", !h.isActive && "opacity-55")}>
                      <div className="flex items-center gap-2.5">
                        <h3 className="truncate text-[15px] font-medium leading-snug">{h.title}</h3>
                        {!h.isActive && (
                          <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                            Paused
                          </span>
                        )}
                      </div>
                      {h.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{h.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[13px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {daysSummary(h.daysOfWeek)}
                        </span>
                        {h.startTime && (
                          <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <Clock className="size-3.5" />
                            {format(new Date(h.startTime), "h:mm a")}
                          </span>
                        )}
                        {h.durationMins != null && (
                          <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <Timer className="size-3.5" />
                            {h.durationMins} min
                          </span>
                        )}
                        {h.subtasks.length > 0 && (
                          <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <ListChecks className="size-3.5" />
                            {h.subtasks.length} step{h.subtasks.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pause / resume */}
                    <label className="grid size-10 place-items-center justify-self-end lg:order-3">
                      <Switch
                        checked={h.isActive}
                        onCheckedChange={() => onToggleActive(h)}
                        aria-label={h.isActive ? "Pause habit" : "Activate habit"}
                      />
                    </label>

                    {/* Day strip */}
                    <div
                      className={cn("flex gap-1 transition-opacity lg:order-2", !h.isActive && "opacity-55")}
                      role="img"
                      aria-label={`Repeats: ${daysSummary(h.daysOfWeek)}`}
                    >
                      {DAY_LABELS.map((label, d) => (
                        <span
                          key={d}
                          className={cn(
                            "grid size-6 place-items-center rounded-full font-mono text-[11px] sm:size-7",
                            h.daysOfWeek.includes(d)
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface text-muted-foreground/70"
                          )}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Edit / delete */}
                    <div
                      className={cn(
                        "flex items-center justify-end gap-1 lg:order-4",
                        confirming && "col-span-2 lg:col-span-1"
                      )}
                    >
                      <Button size="icon" variant="ghost" onClick={() => openEdit(h)} aria-label="Edit habit">
                        <Pencil />
                      </Button>
                      {confirming ? (
                        <div className="flex items-center gap-1">
                          <Button variant="destructive" onClick={() => onDelete(h.id)}>
                            Delete
                          </Button>
                          <Button variant="ghost" onClick={() => setConfirmDelete(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setConfirmDelete(h.id)}
                          aria-label="Delete habit"
                          className="text-destructive hover:bg-priority-high-bg hover:text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}

      {/* ---------- Add / Edit dialog ---------- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={SHEET_CLASS}>
          <DialogHeader className="px-6 pb-2 pt-6 text-left">
            <p className="eyebrow">Habit template</p>
            <DialogTitle className="display mt-2 text-3xl font-normal leading-[1.05]">
              {form.id ? "Edit habit" : "New habit"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Name the habit, choose the days it repeats, and optionally add a time, duration and steps.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 px-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="h-title">Name</Label>
              <Input
                id="h-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Morning walk"
              />
            </div>

            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label>Repeat on</Label>
              <div className="grid max-w-sm grid-cols-7 gap-1.5">
                {DAY_LABELS.map((label, d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    aria-pressed={form.daysOfWeek.includes(d)}
                    aria-label={DAY_NAMES[d]}
                    className={cn(
                      "press grid h-10 place-items-center rounded-full text-sm font-medium transition-colors",
                      form.daysOfWeek.includes(d)
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 overflow-x-auto pt-1 no-scrollbar">
                {DAY_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setForm({ ...form, daysOfWeek: [...p.days] })}
                    className={cn(
                      "h-10 shrink-0 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                      samePreset(p.days)
                        ? "border-foreground/40 text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="h-time">Start time (optional)</Label>
                <Input
                  id="h-time"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
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
              <div className="flex items-center justify-between gap-3">
                <Label>Steps (optional)</Label>
                <Button type="button" variant="outline" onClick={addSubtask}>
                  <Plus /> Add step
                </Button>
              </div>
              {form.subtasks.length === 0 && (
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Break the habit into checkable steps, e.g. “Fill bottle”, target 8 glasses.
                </p>
              )}
              <div className="space-y-2">
                {form.subtasks.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center gap-2 rounded-2xl bg-surface p-2 sm:flex-nowrap"
                  >
                    <Input
                      value={s.title}
                      onChange={(e) => updateSubtask(i, { title: e.target.value })}
                      placeholder="Step name"
                      aria-label={`Step ${i + 1} name`}
                      className="basis-full sm:basis-0 sm:flex-1"
                    />
                    <Input
                      value={s.targetValue}
                      onChange={(e) => updateSubtask(i, { targetValue: e.target.value })}
                      placeholder="Target"
                      aria-label={`Step ${i + 1} target`}
                      type="number"
                      inputMode="numeric"
                      className="flex-1 basis-0 sm:w-24 sm:flex-none sm:basis-auto"
                    />
                    <Input
                      value={s.unit}
                      onChange={(e) => updateSubtask(i, { unit: e.target.value })}
                      placeholder="Unit"
                      aria-label={`Step ${i + 1} unit`}
                      className="flex-1 basis-0 sm:w-20 sm:flex-none sm:basis-auto"
                    />
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeSubtask(i)} aria-label="Remove step">
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active */}
            <label className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
              <span>
                <span className="block text-sm font-medium">Active</span>
                <span className="mt-0.5 block text-[13px] text-muted-foreground">
                  Paused habits stop appearing on your dashboard.
                </span>
              </span>
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                aria-label="Active"
              />
            </label>
          </div>

          <DialogFooter className="sticky bottom-0 border-t border-border bg-card px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <Button variant="ghost" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              {form.id ? "Save changes" : "Create habit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
