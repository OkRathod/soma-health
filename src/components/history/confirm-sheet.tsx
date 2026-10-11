"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Destructive confirmation used by the History page (delete a log / delete a task).
 * Bottom sheet on phones, centred dialog from `sm`.
 */
export function ConfirmSheet({
  title,
  description,
  confirmLabel = "Delete",
  busy,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel?: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-end bg-[var(--overlay)] p-0 backdrop-blur-[3px] animate-fade-in sm:place-items-center sm:p-4"
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="max-h-[90dvh] w-full overflow-y-auto rounded-t-[2rem] border border-border bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float animate-scale-in sm:max-w-sm sm:rounded-3xl">
        <span className="grid size-11 place-items-center rounded-full bg-priority-high-bg text-destructive">
          <Trash2 className="size-5" />
        </span>
        <h3 className="display mt-4 text-3xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
