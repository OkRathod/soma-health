import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Building blocks for the Account hub: a titled panel whose body is a list of
 * labelled rows. Label on the left and control on the right from `sm`, stacked
 * on phones.
 */

export function SettingsSection({
  label,
  title,
  description,
  action,
  footer,
  children,
  className,
}: {
  label?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 p-5 md:p-6">
        <div className="min-w-0">
          {label && <p className="label-mono mb-1.5">{label}</p>}
          <h2 className="flex items-center gap-2 text-lg font-medium leading-tight tracking-[-0.02em]">{title}</h2>
          {description && (
            <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children && <div className="divide-y divide-border border-t border-border px-5 md:px-6">{children}</div>}
      {footer && (
        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-end md:px-6">
          {footer}
        </div>
      )}
    </section>
  );
}

export function FieldRow({
  label,
  hint,
  children,
  className,
}: {
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-2.5 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-center sm:gap-6 md:py-5",
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{hint}</p>}
      </div>
      <div className="min-w-0 sm:max-w-md">{children}</div>
    </div>
  );
}

/** Wraps an input and prints its unit (kg, cm, kcal) inside the right edge. */
export function WithUnit({ unit, children }: { unit: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative [&_input]:pr-14">
      {children}
      <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
        {unit}
      </span>
    </div>
  );
}
