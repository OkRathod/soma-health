import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "lime" | "ink" | "paper" | "ghost";

const tones: Record<Tone, { shell: string; chip: string }> = {
  lime: { shell: "bg-lime text-lime-foreground", chip: "bg-ink text-lime" },
  ink: { shell: "bg-ink text-ink-foreground", chip: "bg-lime text-lime-foreground" },
  paper: { shell: "bg-card text-foreground border border-border", chip: "bg-foreground text-background" },
  ghost: { shell: "bg-white/12 text-white backdrop-blur-md border border-white/20", chip: "bg-white text-ink" },
};

/**
 * The signature call-to-action: a pill with a trailing circular arrow chip.
 * The chip rotates 45° on hover. Use at most once or twice per screen.
 */
export function ArrowLink({
  href,
  children,
  tone = "lime",
  size = "md",
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const t = tones[tone];
  const sizing =
    size === "lg"
      ? "h-14 pl-6 pr-2 text-[15px] gap-4"
      : size === "sm"
        ? "h-9 pl-3.5 pr-1 text-[13px] gap-2.5"
        : "h-12 pl-5 pr-1.5 text-sm gap-3";
  const chip = size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-9";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-between rounded-full font-medium tracking-[-0.01em] transition-transform duration-200 active:scale-[0.97]",
        sizing,
        t.shell,
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span className={cn("grid place-items-center rounded-full transition-transform duration-300 ease-out group-hover:rotate-45", chip, t.chip)}>
        <ArrowUpRight className={size === "sm" ? "size-3.5" : "size-4"} />
      </span>
    </Link>
  );
}
