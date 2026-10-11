import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const POINTS = [
  { title: "Log in a sentence", body: "Type what you ate or did. Soma works out the calories and macros." },
  { title: "One timeline for the day", body: "Tasks, habits and deadlines sit on a single plan you can trust." },
  { title: "See the pattern", body: "Weekly trends show what is working, without the spreadsheet." },
];

/** Minimal Clerk theming so the widget sits on the paper like the rest of the app. */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#171713",
    borderRadius: "14px",
    fontFamily: "inherit",
  },
};

/**
 * Split layout for the sign-in / sign-up screens: an inset ink panel with the
 * brand statement on the left, the Clerk widget centred on paper on the right.
 * On phones the ink panel collapses to a logo header above the widget.
 */
export function AuthShell({
  eyebrow,
  children,
  alternate,
}: {
  eyebrow: string;
  children: React.ReactNode;
  alternate: { prompt: string; label: string; href: string };
}) {
  return (
    <div className="grid min-h-dvh gap-2 p-2 sm:gap-3 sm:p-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel */}
      <aside className="panel-ink relative hidden flex-col justify-between overflow-hidden rounded-[2.25rem] p-10 lg:flex xl:p-14">
        <Link href="/" aria-label="Somafit home" className="w-fit">
          <Logo size={30} />
        </Link>

        <div>
          <p className="eyebrow !text-ink-foreground/60">{eyebrow}</p>
          <h1 className="display mt-5 text-6xl xl:text-7xl">
            A calm system for your body <em className="text-lime">and</em> your day.
          </h1>
        </div>

        <ol className="divide-y divide-ink-foreground/15 border-t border-ink-foreground/15">
          {POINTS.map((p, i) => (
            <li key={p.title} className="flex gap-5 py-4">
              <span className="pt-0.5 font-mono text-[11px] text-lime">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[15px] font-medium">{p.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-foreground/60">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>

      {/* Widget */}
      <section className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between gap-3 rounded-[1.75rem] bg-ink px-5 py-4 text-ink-foreground lg:hidden">
          <Link href="/" aria-label="Somafit home">
            <Logo size={26} />
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-foreground/60">{eyebrow}</span>
        </header>

        <div className="hidden items-center justify-between px-4 pt-3 lg:flex">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <p className="text-sm text-muted-foreground">
            {alternate.prompt}{" "}
            <Link
              href={alternate.href}
              className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {alternate.label}
            </Link>
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-2 py-8 sm:px-6 lg:py-10">
          <div className="flex w-full max-w-full justify-center [&>*]:max-w-full">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground lg:hidden">
            {alternate.prompt}{" "}
            <Link
              href={alternate.href}
              className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4"
            >
              {alternate.label}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
