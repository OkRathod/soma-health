"use client";

import { ArrowUp, Loader2, Sparkles } from "lucide-react";

interface QuickLogProps {
  value: string;
  onChange: (val: string) => void;
  onLog: () => void;
  isProcessing: boolean;
}

const EXAMPLES = ["2 eggs and toast", "30 min run", "Dal, rice and a salad"];

/**
 * The natural-language composer. One sentence in, calories/macros/activity out.
 * Rendered inline on every breakpoint (it used to be a second, fixed bar on
 * mobile that fought the bottom navigation for space).
 */
export function QuickLog({ value, onChange, onLog, isProcessing }: QuickLogProps) {
  const canSend = !isProcessing && value.trim().length > 0;

  return (
    <div className="panel-ink p-2 pl-4 sm:pl-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <Sparkles className="hidden size-4 shrink-0 text-lime sm:block" aria-hidden="true" />
        <label htmlFor="quick-log" className="sr-only">
          Log food or a workout
        </label>
        <input
          id="quick-log"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && canSend && onLog()}
          placeholder="What did you eat or do?"
          autoComplete="off"
          enterKeyHint="send"
          className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink-foreground placeholder:text-ink-foreground/45 focus:outline-none sm:h-14 sm:text-[17px]"
        />
        <button
          type="button"
          onClick={onLog}
          disabled={!canSend}
          aria-label="Log entry"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-lime-foreground transition-[transform,opacity] duration-200 active:scale-95 disabled:opacity-40 sm:size-14"
        >
          {isProcessing ? <Loader2 className="size-5 animate-spin" /> : <ArrowUp className="size-5" />}
        </button>
      </div>

      {/* Tap-to-fill examples: teaches the input format without a tutorial */}
      <div className="no-scrollbar -ml-1 flex gap-1.5 overflow-x-auto pb-1.5 pr-2 pt-0.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => onChange(ex)}
            className="shrink-0 rounded-full border border-white/12 px-3 py-1.5 text-xs text-ink-foreground/60 transition-colors hover:border-white/30 hover:text-ink-foreground"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
