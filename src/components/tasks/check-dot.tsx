"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const priorityTone: Record<string, string> = {
  HIGH: "bg-priority-high-bg text-priority-high",
  MEDIUM: "bg-priority-medium-bg text-priority-medium",
  LOW: "bg-priority-low-bg text-priority-low",
  HABIT: "bg-priority-habit-bg text-priority-habit",
};

/**
 * Round check control used by task rows and subtasks. The visible dot is
 * small, but the button itself keeps a comfortable tap area.
 */
export function CheckDot({
  checked,
  onChange,
  label,
  small,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn("group/check grid shrink-0 place-items-center rounded-full", small ? "size-8" : "size-10")}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full border transition-colors",
          small ? "size-5" : "size-6",
          checked
            ? "border-transparent bg-lime text-lime-foreground"
            : "border-input bg-card group-hover/check:border-foreground/50"
        )}
      >
        {checked && <Check className={small ? "size-3" : "size-3.5"} strokeWidth={3} />}
      </span>
    </button>
  );
}
