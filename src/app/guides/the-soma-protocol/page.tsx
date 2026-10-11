"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarCheck, Clock, Droplets, Flame, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page";

const PHASES = [
  {
    phase: "Phase 1",
    title: "The architecture of tomorrow",
    desc: "Decision fatigue is the enemy. By planning the night before, you wake up with a pre-loaded brain, ready to execute without hesitation.",
    icon: CalendarCheck,
    bullets: [
      "Anchor Biology: Schedule Sleep, Gym, and Meals as 'Habits' first.",
      "Deep Work Containers: Drag a 90-minute HIGH priority block to your peak energy time (9 AM).",
      "Shallow Buffer: Batch emails and chores into low-energy windows (4 PM).",
    ],
  },
  {
    phase: "Phase 2",
    title: "The morning launchpad",
    desc: "How you start the first 30 minutes determines your dopamine trajectory. Prime your mind, hydrate your system, and fuel with intention.",
    icon: Droplets,
    bullets: [
      "Mindset Primer: Read the Daily Quote to trigger your Reticular Activating System.",
      "Hydration Kickstart: Tap 'Add 250ml' before coffee to fix overnight dehydration.",
      "Glucose Baseline: Log a savory, high-protein breakfast to prevent an 11 AM crash.",
    ],
  },
  {
    phase: "Phase 3",
    title: "The execution window",
    desc: "Time, energy, and biology converge. Soma acts as your visual accountability partner, keeping you in flow and properly fueled.",
    icon: Flame,
    bullets: [
      "Visual Forcing Function: The Timeline View creates urgency (Parkinson's Law).",
      "Adaptive Fueling: Check Dashboard Stats before lunch. Low burn? Eat light. High burn? Refuel.",
      "NEAT Optimization: Log small walks to validate your non-exercise activity.",
    ],
  },
  {
    phase: "Phase 4",
    title: "The evening audit",
    desc: "Close open loops to sleep better. Reviewing your data turns experience into strategy for tomorrow.",
    icon: Clock,
    bullets: [
      "Zeigarnik Effect: Check off remaining tasks to release mental tension.",
      "History Review: Compare your 'Planned' timeline vs 'Actual' reality.",
      "AI Coach: Read the diet feedback. High sodium today? Adjust tomorrow.",
    ],
  },
];

export default function SomaProtocolPage() {
  return (
    <PageShell width="narrow">
      <article>
        <Link
          href="/guides"
          className="-ml-2 inline-flex h-10 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All guides
        </Link>

        {/* Title */}
        <header className="mt-4 border-b border-border pb-8 md:mt-6 md:pb-10">
          <p className="eyebrow mb-4">Official guide</p>
          <h1 className="display text-[3rem] sm:text-6xl md:text-7xl">
            The Soma <em>protocol</em>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A blueprint for high-performance living. Optimize your biology, automate your decisions, and engineer your
            perfect day.
          </p>

          {/* Contents */}
          <nav aria-label="Phases" className="-mx-4 mt-7 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
            <ol className="flex w-max gap-2">
              {["Environment", "Tomorrow", "Morning", "Execution", "Audit"].map((label, i) => (
                <li key={label}>
                  <a
                    href={`#phase-${i}`}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3.5 text-[13px] font-medium transition-colors hover:bg-accent"
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">{i}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        {/* Phase 0: environment */}
        <section id="phase-0" className="scroll-mt-28 border-b border-border py-10 md:py-14">
          <PhaseHeader
            phase="Phase 0"
            title="The environment"
            desc="You don't rise to the level of your goals — you fall to the level of your systems. Soma removes friction so your habits execute automatically."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 md:gap-4">
            <FeatureCard
              icon={<Smartphone />}
              title="1. Install as a PWA"
              desc="Remove the browser UI. Add Soma to your Home Screen to create a dedicated psychological trigger for logging."
            />
            <FeatureCard
              icon={<Zap />}
              title="2. Zero-click mindset"
              desc="We designed the Dashboard for speed. Treat it as your command center. Bypass menus, just log."
            />
          </div>
        </section>

        {/* Phases 1 to 4 */}
        {PHASES.map((p, i) => (
          <section key={p.phase} id={`phase-${i + 1}`} className="scroll-mt-28 border-b border-border py-10 md:py-14">
            <PhaseHeader phase={p.phase} title={p.title} desc={p.desc} icon={<p.icon />} />
            <ol className="mt-7 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              {p.bullets.map((item, n) => {
                const cut = item.indexOf(": ");
                const lead = cut > -1 ? item.slice(0, cut) : "";
                const rest = cut > -1 ? item.slice(cut + 2) : item;
                return (
                  <li key={n} className="flex items-start gap-4 p-4 md:p-5">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-surface font-mono text-[11px] text-muted-foreground">
                      {n + 1}
                    </span>
                    <p className="min-w-0 text-[15px] leading-relaxed">
                      {lead && <span className="font-medium">{lead}. </span>}
                      <span className="text-muted-foreground">{rest}</span>
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        {/* Closing call to action */}
        <section className="panel-ink mt-10 p-6 md:mt-14 md:p-10">
          <p className="eyebrow !text-ink-foreground/60">Next step</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Ready to <em className="text-lime">optimize?</em>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-foreground/70">
            You have the protocol. You have the tool. Now, execute the plan.
          </p>
          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button asChild variant="lime" size="lg">
              <Link href="/dashboard">
                Go to dashboard <ArrowUpRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-ink-foreground/25 text-ink-foreground hover:border-ink-foreground/50 hover:bg-ink-foreground/10"
            >
              <Link href="/tasks">Open planner</Link>
            </Button>
          </div>
        </section>
      </article>
    </PageShell>
  );
}

/* --- Subcomponents --- */

function PhaseHeader({ phase, title, desc, icon }: any) {
  return (
    <div>
      <p className="label-mono flex items-center gap-2 [&_svg]:size-3.5">
        {icon}
        {phase}
      </p>
      <h2 className="display mt-3 text-[2rem] sm:text-4xl md:text-[2.75rem]">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="panel p-5 md:p-6">
      <span className="grid size-10 place-items-center rounded-full bg-surface text-foreground [&_svg]:size-4.5">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-medium leading-tight tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
