import {
  CalendarClock,
  Flame,
  History,
  LayoutDashboard,
  MessageSquareText,
  ScanLine,
  StickyNote,
  Timer,
  TrendingUp,
  User,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "./Reveal";

const modules = [
  {
    title: "Command centre",
    body: "Calories, macros, water, steps and today's open tasks in one overview.",
    icon: LayoutDashboard,
  },
  {
    title: "Daily timeline",
    body: "A 24-hour plan for tasks, habits and focus blocks.",
    icon: CalendarClock,
  },
  {
    title: "Deep analysis",
    body: "Streaks and a monthly heatmap that make consistency visible.",
    icon: Flame,
  },
  {
    title: "Deadline manager",
    body: "Live countdowns with subtasks for the projects that can't slip.",
    icon: Timer,
  },
  {
    title: "Rich notes",
    body: "Routines, journals and plans in a clean rich-text editor.",
    icon: StickyNote,
  },
  {
    title: "Complete history",
    body: "Every meal, workout and finished task, in order.",
    icon: History,
  },
  {
    title: "Profile & goals",
    body: "Your metrics, targets and all-time stats in one place.",
    icon: User,
  },
];

const steps = [
  {
    icon: MessageSquareText,
    title: "Say it in plain words",
    body: "Type what you ate or did. Somafit's AI turns the sentence into calories, macros and activity — no databases to search.",
  },
  {
    icon: ScanLine,
    title: "See where you stand",
    body: "Your balance, water, steps and remaining tasks update instantly, with a short note on what to do next.",
  },
  {
    icon: TrendingUp,
    title: "Let it compound",
    body: "Habits regenerate each morning, streaks build, and the weekly chart shows the trend instead of the noise.",
  },
];

/**
 * Three stacked marketing sections: the positioning statement with fact tiles,
 * the seven-module grid, and the three-step "how it works".
 */
export function FeaturesBento() {
  return (
    <>
      {/* ---------- Statement + facts ---------- */}
      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6">Why Somafit</p>
            <h2 className="display text-[2.3rem] sm:text-5xl md:text-6xl">
              Most people run their health in one app, their tasks in another and their
              notes in a third.{" "}
              <span className="text-muted-foreground">Somafit puts them on the same page — literally.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-12 lg:gap-4">
            <Reveal className="lg:col-span-5">
              <div className="panel-ink dot-grid flex h-full min-h-[260px] flex-col justify-between p-6 md:p-8 [--foreground:#f3f2ec]">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">Replaces</p>
                <div>
                  <p className="numeral text-7xl md:text-8xl">7</p>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/70">
                    separate tools — calorie counter, to-do list, habit tracker, deadline board,
                    notes, logbook and step counter.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-4">
              <div className="panel flex h-full min-h-[260px] flex-col justify-between p-6 md:p-8">
                <p className="label-mono">Logging a meal</p>
                <div>
                  <p className="numeral text-7xl md:text-8xl">
                    1<span className="ml-2 text-2xl font-normal tracking-normal text-muted-foreground">sentence</span>
                  </p>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                    Write it like a message. The AI estimates calories, protein, carbs and fat for you.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="sm:col-span-2 lg:col-span-3">
              <div className="panel-lime flex h-full min-h-[260px] flex-col justify-between p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-lime-foreground/65">Planning horizon</p>
                <div>
                  <p className="numeral text-7xl md:text-8xl">
                    24<span className="ml-1 text-2xl font-normal tracking-normal">h</span>
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-lime-foreground/75">
                    One timeline for the whole day, not a list that never ends.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Modules ---------- */}
      <section id="modules" className="scroll-mt-24 px-2 sm:px-3">
        <div className="rounded-[1.75rem] bg-surface px-4 py-16 sm:rounded-[2.25rem] sm:px-6 md:py-24 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-4">Modules</p>
                <h2 className="display text-[2.6rem] sm:text-6xl">
                  Seven tools. <em>One interface.</em>
                </h2>
              </div>
              <ArrowLink href="/sign-up" tone="ink">
                Try them all
              </ArrowLink>
            </Reveal>

            <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <li key={m.title} className="group bg-card p-6 transition-colors duration-300 hover:bg-lime-soft md:p-7">
                    <div className="mb-12 flex items-center justify-between md:mb-16">
                      <span className="grid size-11 place-items-center rounded-full bg-surface transition-colors duration-300 group-hover:bg-lime group-hover:text-lime-foreground">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium tracking-[-0.02em]">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </li>
                );
              })}
              <li className="flex flex-col justify-between bg-ink p-6 text-ink-foreground md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">Next</p>
                <p className="font-display text-3xl leading-[1.05]">
                  More on the way — tell us what you need.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="mb-10 md:mb-14">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="display max-w-3xl text-[2.6rem] sm:text-6xl">
              Three steps, <em>repeated daily.</em>
            </h2>
          </Reveal>
          <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.07}>
                  <li className="panel flex h-full flex-col p-6 md:p-8">
                    <div className="mb-10 flex items-center justify-between border-b border-border pb-5">
                      <span className="font-display text-5xl leading-none">{i + 1}</span>
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Nutrition values are AI estimates and are approximate. Somafit is a tracking tool, not medical advice.
          </p>
        </div>
      </section>
    </>
  );
}
