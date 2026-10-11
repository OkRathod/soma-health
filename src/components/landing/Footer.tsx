"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Logo } from "@/components/brand/logo";
import { Reveal } from "./Reveal";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Today", href: "/dashboard" },
      { label: "Timeline", href: "/tasks" },
      { label: "Habits", href: "/habits" },
      { label: "Deadlines", href: "/deadlines" },
      { label: "Notes", href: "/notes" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "The Soma protocol", href: "/guides/the-soma-protocol" },
      { label: "Product tour", href: "#tour" },
      { label: "How it works", href: "#how" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Create account", href: "/sign-up" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
];

/** Closing call-to-action plus the site footer, both as inset rounded frames. */
export function Footer() {
  const [time, setTime] = useState<string | null>(null);
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setTime(fmt());
    const interval = setInterval(() => setTime(fmt()), 1000);

    // Lifetime visit counter (free external counter; failure is silent).
    fetch("https://api.counterapi.dev/v1/somafit_os_production/visits/up")
      .then((r) => r.json())
      .then((d) => typeof d?.count === "number" && setVisits(d.count))
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="space-y-2 p-2 sm:space-y-3 sm:p-3">
      {/* ---------- Closing CTA ---------- */}
      <section className="panel-lime relative overflow-hidden rounded-[1.75rem] px-5 py-16 sm:rounded-[2.25rem] sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="eyebrow !text-lime-foreground/70 [&::before]:!bg-ink">Ready when you are</p>
            <h2 className="display mt-5 text-[3rem] sm:text-7xl lg:text-[6rem]">
              Architect your <em>perfect day.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-base leading-relaxed text-lime-foreground/75">
              Stop guessing, start seeing. Set up takes a couple of minutes and the first log takes one sentence.
            </p>
            <div className="mt-6">
              <ArrowLink href="/sign-up" tone="ink" size="lg">
                Create your workspace
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Footer card ---------- */}
      <section className="panel-ink rounded-[1.75rem] px-5 pb-6 pt-12 sm:rounded-[2.25rem] sm:px-8 md:pt-16 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Logo size={30} className="text-ink-foreground" />
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                One calm workspace for nutrition, movement, habits, deadlines and notes.
              </p>
              <a
                href="mailto:nimtechsol@gmail.com"
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 py-1.5 pl-1.5 pr-5 text-sm text-white/85 transition-colors hover:border-white/40"
              >
                <span className="grid size-9 place-items-center rounded-full bg-lime text-lime-foreground">
                  <Mail className="size-4" />
                </span>
                nimtechsol@gmail.com
              </a>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              {columns.map((col) => (
                <div key={col.title}>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{col.title}</p>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-1 text-[15px] text-white/80 transition-colors hover:text-lime"
                        >
                          {l.label}
                          <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Oversized wordmark */}
          <div className="mt-14 overflow-hidden md:mt-20" aria-hidden="true">
            <p className="pointer-events-none select-none whitespace-nowrap font-display text-[34vw] leading-[0.78] tracking-[-0.03em] text-white/[0.07] min-[1400px]:text-[30rem]">
              Somafit
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} NIM Tech Solutions &amp; Somafit. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em]">
              {visits !== null && <span>{visits.toLocaleString()} visits</span>}
              <span className="tabular-nums">{time ?? "--:--:--"}</span>
              <Link href="https://github.com/OkRathod" className="inline-flex items-center gap-1.5 hover:text-white">
                <Github className="size-3.5" /> GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
