"use client";

/**
 * Feature 5.4 — Unified "Today" command bar.
 * One natural-language input routes to the right action by intent:
 *   "drank 500ml"                  -> water
 *   "gym at 6pm"                   -> timed task
 *   "finish report by friday"      -> deadline
 *   "2 rotis, dal, 30 min walk"    -> AI food/exercise log (default)
 *
 * It calls your existing endpoints/actions, so it complements (doesn't replace)
 * the individual screens.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, CornerDownLeft } from "lucide-react";
import { createDeadline } from "@/app/actions/deadlines";

type Intent = "water" | "task" | "deadline" | "log";

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/\b(\d+)\s?(ml|l|glass|glasses|water)\b/.test(t) || /\bdrank\b/.test(t)) return "water";
  if (/\bby\s+(today|tomorrow|mon|tue|wed|thu|fri|sat|sun|\d)/.test(t) || /\bdeadline\b/.test(t)) return "deadline";
  if (/\bat\s+\d/.test(t) || /\b(\d{1,2})(:\d{2})?\s?(am|pm)\b/.test(t)) return "task";
  return "log";
}

function parseWaterMl(text: string): number {
  const l = text.match(/(\d+(?:\.\d+)?)\s?l\b/i);
  if (l) return Math.round(parseFloat(l[1]) * 1000);
  const ml = text.match(/(\d+)\s?ml/i);
  if (ml) return parseInt(ml[1], 10);
  const glasses = text.match(/(\d+)\s?glass/i);
  if (glasses) return parseInt(glasses[1], 10) * 250;
  return 250;
}

function parseTime(text: string): string | null {
  const m = text.match(/(\d{1,2})(?::(\d{2}))?\s?(am|pm)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const pm = m[3].toLowerCase() === "pm";
  if (pm && h < 12) h += 12;
  if (!pm && h === 12) h = 0;
  const d = new Date();
  d.setHours(h, min, 0, 0);
  return d.toISOString();
}

export function CommandBar({ onDone }: { onDone?: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const intent = text.trim() ? detectIntent(text) : null;

  async function run() {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    try {
      const kind = detectIntent(value);

      if (kind === "water") {
        const amount = parseWaterMl(value);
        const r = await fetch("/api/log-water", { method: "POST", body: JSON.stringify({ amount }) });
        if (!r.ok) throw new Error();
        toast.success(`Logged ${amount} ml of water 💧`);
      } else if (kind === "task") {
        const startTime = parseTime(value);
        const title = value.replace(/\bat\s+\d.*$/i, "").trim() || value;
        const r = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ title, priority: "MEDIUM", date: new Date().toISOString(), startTime }),
        });
        if (!r.ok) throw new Error();
        toast.success("Task added to today");
      } else if (kind === "deadline") {
        const title = value.replace(/\bby\s+.*$/i, "").trim() || value;
        await createDeadline({ title, targetDate: null, subtasks: [] });
        toast.success("Deadline created");
      } else {
        const r = await fetch("/api/process-log", {
          method: "POST",
          body: JSON.stringify({ userText: value, date: new Date().toISOString() }),
        });
        const data = await r.json();
        if (!r.ok || !data.success) throw new Error(data.details || data.error);
        toast.success("Logged & analyzed ✨");
      }

      setText("");
      onDone?.();
    } catch (e) {
      toast.error((e as Error).message || "Couldn't process that — try rephrasing.");
    } finally {
      setBusy(false);
    }
  }

  const hint =
    intent === "water" ? "Log water" :
    intent === "task" ? "Add a task" :
    intent === "deadline" ? "Create a deadline" :
    intent === "log" ? "Analyze with AI" : "";

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring transition">
        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          disabled={busy}
          placeholder="Tell Soma anything — “2 eggs and toast”, “drank 500ml”, “gym at 6pm”…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          aria-label="Command bar"
        />
        {hint && <span className="hidden sm:inline text-[11px] text-muted-foreground">{hint}</span>}
        <button
          onClick={run}
          disabled={busy || !text.trim()}
          className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition"
          aria-label="Submit"
        >
          <CornerDownLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
