import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page primitives shared by every signed-in screen.
 * They own the horizontal gutters, max width, and the clearance needed for the
 * floating top navbar (desktop) and the bottom dock (mobile) — pages should not
 * hand-roll `p-4 md:p-8 pb-32` any more.
 */

export function PageShell({
  children,
  className,
  width = "wide",
}: {
  children: React.ReactNode;
  className?: string;
  /** wide = dashboards & boards, narrow = forms & reading */
  width?: "wide" | "narrow" | "full";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 pb-32 pt-2 sm:px-6 md:pb-20 md:pt-4 lg:px-8",
        width === "wide" && "max-w-[1240px]",
        width === "narrow" && "max-w-3xl",
        width === "full" && "max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-5 border-b border-border pb-6 md:mb-8 md:flex-row md:items-end md:justify-between md:pb-8",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-3.5">{eyebrow}</p>}
        <h1 className="display text-[2.5rem] sm:text-5xl md:text-[3.5rem]">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Panel({
  children,
  className,
  tone = "card",
  as: Tag = "section",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "card" | "well" | "ink" | "lime";
  as?: "section" | "div" | "article" | "aside";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn(
        tone === "card" && "panel",
        tone === "well" && "panel-well rounded-3xl",
        tone === "ink" && "panel-ink",
        tone === "lime" && "panel-lime",
        "p-5 md:p-6",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function PanelHeader({
  label,
  title,
  action,
  className,
}: {
  label?: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {label && <p className="label-mono mb-1.5">{label}</p>}
        {title && <h2 className="text-lg font-medium leading-tight tracking-[-0.02em]">{title}</h2>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatTile({
  label,
  value,
  unit,
  hint,
  icon,
  tone = "card",
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "card" | "well" | "ink" | "lime";
  className?: string;
}) {
  const muted =
    tone === "ink" ? "text-ink-foreground/60" : tone === "lime" ? "text-lime-foreground/70" : "text-muted-foreground";
  return (
    <div
      className={cn(
        "flex min-h-[128px] flex-col justify-between rounded-3xl p-4 md:p-5",
        tone === "card" && "border border-border bg-card shadow-card",
        tone === "well" && "bg-surface",
        tone === "ink" && "bg-ink text-ink-foreground",
        tone === "lime" && "bg-lime text-lime-foreground",
        className
      )}
    >
      <div className={cn("flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.1em]", muted)}>
        <span>{label}</span>
        {icon}
      </div>
      <div>
        <div className="numeral text-[2rem] md:text-[2.5rem]">
          {value}
          {unit && <span className={cn("ml-1 text-sm font-normal tracking-normal", muted)}>{unit}</span>}
        </div>
        {hint && <p className={cn("mt-1.5 text-xs", muted)}>{hint}</p>}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 py-14 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 grid size-12 place-items-center rounded-full bg-surface text-muted-foreground [&_svg]:size-5">
          {icon}
        </div>
      )}
      <p className="font-display text-2xl leading-tight">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Pill segmented control. Controlled; options are plain values with labels. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode; icon?: React.ReactNode }[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-surface p-1 no-scrollbar",
        className
      )}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors [&_svg]:size-4",
              size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 text-[13px]",
              active
                ? "bg-ink text-ink-foreground dark:bg-lime dark:text-lime-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
