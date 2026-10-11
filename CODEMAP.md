# Somafit — Code map

What every code file is for and why it exists. Keep this in step with the code:
when a file is added, removed or changes role, update its row.

**Stack:** Next.js 16 (App Router, webpack build) · React 19 · Tailwind CSS v4 · Prisma + PostgreSQL ·
Clerk auth · Google Gemini (log parsing) · framer-motion · recharts · TipTap · next-pwa · web-push.

**Legend:** ★ new in v8 · ✎ redesigned in v8 · (blank) untouched in v8 · ⚠ unused, candidate for deletion

---

## 1. How a request flows

1. `src/middleware.ts` — Clerk gate. Public: `/`, `/sign-in`, `/sign-up`, `/guides/*`, PWA assets, sitemap/robots. Everything else needs a session. Signed-in users hitting `/` or auth pages go to `/dashboard`.
2. `src/app/layout.tsx` — loads fonts, wraps in `ThemeProvider` + `ClerkProvider`, fetches the Soma user, renders `MainLayoutClient`.
3. `src/components/main-layout-client.tsx` — bare render for `/` and `/sign-*`; otherwise app shell (`Navbar`) + `<main>`.
4. The page renders inside `PageShell` and talks to either **API routes** (`src/app/api/*`, via `fetch`) or **server actions** (`src/app/actions/*`).
5. Both go through `src/lib/prisma.ts` to the database; API routes authenticate with `src/lib/auth.ts`.

---

## 2. Design system

| File | | Purpose |
|---|---|---|
| `src/app/globals.css` | ✎ | The whole design system: colour tokens (light/dark), Tailwind `@theme` mapping, radii, fonts, type roles (`.display`, `.eyebrow`, `.label-mono`, `.numeral`), surfaces (`.panel`, `.panel-well`, `.panel-ink`, `.panel-lime`, `.glass`), motion helpers, scrollbars, prose overrides. Change a colour here and the whole app follows. |
| `src/components/layout/page.tsx` | ★ | Page primitives used by every signed-in screen: `PageShell` (gutters, max width, clearance for navbar/dock), `PageHeader` (eyebrow + serif title + actions), `Panel`, `PanelHeader`, `StatTile`, `EmptyState`, `Segmented`. |
| `src/components/brand/logo.tsx` | ★ | `SomaMark` (lime tile with ink S) and `Logo` (mark + serif wordmark). Drawn in SVG so it works on any background. |
| `src/components/ui/arrow-link.tsx` | ★ | Signature CTA: pill link with a circular arrow chip that rotates on hover. Tones: lime, ink, paper, ghost. |
| `src/components/theme-toggle.tsx` | ★ | Round light/dark switch used in the navbar. |
| `src/components/theme-provider.tsx` | | Thin wrapper around `next-themes`. |
| `src/lib/utils.ts` | | `cn()` — merges class names (clsx + tailwind-merge). |

### `src/components/ui/` — base controls (shadcn/Radix)
| File | | Purpose |
|---|---|---|
| `navbar.tsx` | ✎ | **The app shell navigation.** Desktop floating pill bar; mobile top bar, floating dock and "More" bottom sheet; signed-out variant. Edit `PRIMARY` / `SECONDARY` / `DOCK` arrays to change destinations. |
| `button.tsx` | ✎ | Button with variants `default` `lime` `outline` `secondary` `ghost` `destructive` `link`; all pills. |
| `card.tsx` | ✎ | Card container parts (older screens/dialogs still use it; new work uses `.panel`). |
| `badge.tsx` | ✎ | Mono chip; added `lime` variant. |
| `input.tsx`, `textarea.tsx`, `select.tsx` | ✎ | Form fields, 44px tall, 18px radius. |
| `tabs.tsx` | ✎ | Radix tabs styled as a pill segmented control. |
| `dialog.tsx` | ✎ | Radix dialog; themed overlay, large radius, scrolls when tall. |
| `progress.tsx`, `skeleton.tsx` | ✎ | Thin progress bar; skeleton block. |
| `calendar.tsx` | | react-day-picker wrapper (date popovers). |
| `chart.tsx` | | recharts container, tooltip and legend helpers. |
| `checkbox.tsx`, `switch.tsx`, `label.tsx`, `separator.tsx`, `popover.tsx`, `dropdown-menu.tsx` | | Radix wrappers, unchanged. |
| `sonner.tsx` | | Toast host, themed from tokens. |

---

## 3. Pages (`src/app`)

| Route / file | | Purpose |
|---|---|---|
| `layout.tsx` | ✎ | Root layout, fonts (Geist, Geist Mono, Instrument Serif), SEO metadata, theme colour. |
| `page.tsx` | ✎ | Landing page; composes the `components/landing/*` sections. |
| `manifest.ts` | ✎ | PWA manifest (name, colours, icons). |
| `robots.ts`, `sitemap.ts` | | SEO files. |
| `icon.png` | | App icon (still the old blue mark). |
| `dashboard/page.tsx` | | Server wrapper: loads the user, redirects if signed out. |
| `dashboard/dashboard-client.tsx` | ✎ | "Today" screen. Owns all dashboard state: logs, tasks, water, quote, AI log submission, restore-account flow, and three sheets (log analysis, message, restore). |
| `tasks/page.tsx` | ✎ | Day planner: date toolbar, task list, 24-hour timeline, add/edit dialog. Talks to `/api/tasks`. |
| `habits/page.tsx` | ✎ | Habit templates (recurring routines): create, edit, pause, delete. Uses `actions/habits`. |
| `analysis/page.tsx` | ✎ | Server wrapper (auth) for the habit analysis screen. |
| `deadlines/page.tsx` | ✎ | Deadline board: active vs past, list/grid, picks the "featured" (most urgent) card. Uses `actions/deadlines`. |
| `notes/page.tsx` | ✎ | Notes: searchable list + editor pane. Uses `actions/notes`. |
| `history/page.tsx` | ✎ | Look back at any day: diet logs, tasks, timeline; add/delete logs. |
| `settings/page.tsx` | ✎ | Account hub: Profile, Preferences, Appearance, Notifications, Data & privacy (Gemini key, export, delete account). |
| `profile/page.tsx` | | Redirects to `/settings` (keeps old links alive). |
| `feedback/page.tsx` | ✎ | Three-step feedback form. Uses `actions/feedback`. |
| `guides/page.tsx` | ✎ | Guide index with read state (public). |
| `guides/[slug]/page.tsx` | ✎ | Guide article rendered from `lib/guides.ts`. |
| `guides/the-soma-protocol/page.tsx` | ✎ | Hand-written flagship guide. |
| `sign-in/[[...sign-in]]/page.tsx`, `sign-up/[[...sign-up]]/page.tsx` | ✎ | Clerk widgets inside `AuthShell`. |
| `fonts/*` | ⚠ | Local font files from older versions; no longer loaded. |

---

## 4. Feature components (`src/components`)

### Shell
| File | | Purpose |
|---|---|---|
| `main-layout-client.tsx` | ✎ | Chooses bare layout vs app shell per route; mounts `FeedbackPrompt`. |
| `soma-loader.tsx` | ✎ | The only loading indicator (inline or full-screen veil). Also exported as `DNALoader`. |
| `feedback-prompt.tsx` | ✎ | Occasional "rate Somafit" dialog; snoozes via localStorage. |
| `install-pwa.tsx` | ✎ | "Install app" button (Android/desktop prompt, iOS instructions). Used in the landing hero. |
| `EnableNotifications.tsx` | ✎ | Push-notification opt-in: service worker registration + subscribe/unsubscribe. |
| `complete-profile-modal.tsx` | ✎ | Blocking dialog asking for height/weight/age/gender when the profile is incomplete. |

### Landing (`landing/`)
| File | | Purpose |
|---|---|---|
| `Navbar.tsx` | ✎ | Transparent-over-hero bar that condenses into a glass pill; mobile menu. |
| `HeroSection.tsx` | ✎ | Inset hero frame, headline, CTAs, and five product vignette cards drawn in code. |
| `FeatureSlider.tsx` | ✎ | Product tour: numbered list drives a media stage (S3 images/videos), auto-advances. Edit the `slides` array to change content. |
| `FeaturesBento.tsx` | ✎ | Three sections: "Why" statement + fact tiles, seven-module grid, three-step "How it works". |
| `Footer.tsx` | ✎ | Lime closing CTA and the ink footer card (links, email, visit counter, clock). |
| `Reveal.tsx` | ★ | Fade-and-rise on scroll wrapper. |

### Dashboard (`dashboard/`)
| File | | Purpose |
|---|---|---|
| `QuickLog.tsx` | ✎ | Natural-language composer ("what did you eat or do?"). |
| `NetBalanceCard.tsx` | ✎ | Calories in − out, verdict chip, goal / left-to-eat. |
| `EnergyRing.tsx` | ✎ | SVG progress ring for consumed / burned. |
| `HydrationCard.tsx` | ✎ | Water today as glass cells; +250 ml button. |
| `step-tracker.tsx` | ✎ | Manual step entry + progress (Google Fit sync code is parked in comments). |
| `QuoteBanner.tsx` | ✎ | Daily quote on an ink panel. |
| `PendingTasksList.tsx` | ✎ | Today's tasks/habits with inline completion. |
| `../WeeklyChart.tsx` | ✎ | Trends chart: calories / macros / tasks over 7, 30, 90 days. |
| `StatCard.tsx`, `CalorieRadialChart.tsx` | ⚠ | Unused. |

### Tasks (`tasks/`)
| File | | Purpose |
|---|---|---|
| `task-list.tsx` | ✎ | List of draggable task rows with loading and empty states. |
| `task-card.tsx` | ✎ | One task row: check, meta, edit/delete, expandable subtasks with numeric progress. |
| `timeline-view.tsx` | ✎ | 24-hour grid; lays out overlapping tasks; drop target for scheduling. |
| `add-task-dialog.tsx` | ✎ | Create/edit task form (also used by History). |
| `check-dot.tsx` | ★ | Round check control + priority colour map. |

### Habits & analysis
| File | | Purpose |
|---|---|---|
| `analysis/HabitAnalysisClient.tsx` | ✎ | Streak tiles, month heatmap, consistency panel. Fetches `/api/habits/analysis`. |
| `Habitanalysisclient.tsx` | ⚠ | Older duplicate, unused. |

### Deadlines (`deadlines/`)
| File | | Purpose |
|---|---|---|
| `deadline-card.tsx` | ✎ | Countdown card (live timer, elapsed bar, steps, urgency states, menu). Optional `featured` prop. |
| `add-deadline-dialog.tsx`, `edit-deadline-dialog.tsx` | ✎ | Create / edit forms. |
| `sheet.ts` | ★ | Class string that turns a dialog into a bottom sheet on phones. |

### Notes (`notes/`)
| File | | Purpose |
|---|---|---|
| `note-editor.tsx` | ✎ | TipTap rich-text editor with pill toolbar. |

### History (`history/`)
| File | | Purpose |
|---|---|---|
| `day-navigator.tsx` | ★ | Previous / calendar / next day control. |
| `day-summary.tsx` | ★ | Day totals: eaten, burned, water, steps, macro split. |
| `log-entry.tsx` | ★ | One diet/workout log (collapsed row, expanded AI analysis, foods, activity). |
| `confirm-sheet.tsx` | ★ | Delete confirmation sheet. |
| `add-log-dialog.tsx` | ✎ | Add a log for a past day. |
| `history-task-list.tsx` | ✎ | That day's tasks. |
| `history-timeline.tsx` | ✎ | That day's timeline. |
| `history-log-card.tsx`, `../manual-log-fallback.tsx` | ⚠ | Unused. |

### Account & guides
| File | | Purpose |
|---|---|---|
| `account/profile-panel.tsx` | ✎ | Profile tab: identity, stats, badges, body/lifestyle/goals forms. |
| `account/form-row.tsx` | ★ | `SettingsSection`, `FieldRow`, `WithUnit` layout helpers for settings forms. |
| `account/auth-shell.tsx` | ★ | Split layout for sign-in/up and the Clerk `appearance` object. |
| `guides/mark-read-button.tsx` | ✎ | Marks a guide as read (server action). |

### Other
| File | | Purpose |
|---|---|---|
| `command-bar.tsx`, `dna-loader.tsx` | ⚠ | Unused. |

---

## 5. Server side (untouched in v8)

### Server actions (`src/app/actions*`)
| File | Exports | Purpose |
|---|---|---|
| `actions.ts` | `markGuideAsRead` | Records that the user read a guide. |
| `actions/habits.ts` | `getHabitTemplates`, `saveHabitTemplate`, `toggleHabitActive`, `deleteHabitTemplate`, `ensureTodaysHabits` | Habit template CRUD; creates today's habit tasks if the cron has not run. |
| `actions/deadlines.ts` | `getDeadlines`, `createDeadline`, `updateDeadline`, `deleteDeadline`, `toggleDeadline`, `toggleSubtask` | Deadline CRUD. |
| `actions/notes.ts` | `getNotes`, `saveNote`, `deleteNote` | Notes CRUD. |
| `actions/steps.ts` | `getDailySteps`, `updateDailySteps`, `syncGoogleSteps` | Daily step count (Google sync currently unused). |
| `actions/feedback.ts` | `submitFeedback`, `shouldRequestFeedback` | Stores feedback; decides when to prompt. |
| `actions/adaptive-goals.ts` | `recomputeAdaptiveGoal` | Recalculates the calorie goal from stats and trend. |

### API routes (`src/app/api`)
| Route | Methods | Purpose |
|---|---|---|
| `process-log` | POST | Sends the user's sentence to Gemini, validates, stores a `DailyLog`. |
| `manual-log` | POST | Stores a log without AI. |
| `get-logs` | GET | Logs in a date range. |
| `delete-log` | DELETE | Removes a log. |
| `log-water` | POST | Adds a water entry. |
| `tasks` | GET, POST, PATCH, DELETE | Task and subtask CRUD. |
| `habits/analysis` | GET | Streak and calendar data for one habit. |
| `insights`, `weekly-recap` | GET | AI insights / weekly summary. |
| `quote` | GET | Daily quote (cached). |
| `profile`, `profile-status`, `user/update-profile` | GET, POST | Profile data, completeness check, updates. |
| `settings` | GET, POST | Preferences and the encrypted Gemini key. |
| `export` | GET | Downloads the user's data. |
| `user/delete`, `user/restore` | DELETE, POST | Schedule / cancel account deletion. |
| `cron/generate-habits` | GET | Daily job: creates habit tasks for every user. |
| `cron/notifications` | GET | Job: sends due push notifications. |
| `cron/notifications/subscribe` | POST, DELETE | Saves / removes a push subscription. |
| `cron/weekly-recap` | GET | Weekly job. |

### Libraries (`src/lib`, `src/hooks`)
| File | Purpose |
|---|---|
| `lib/prisma.ts` | Prisma client singleton and `getSomaUser()` (maps the Clerk user to a DB row, creating it on first visit). |
| `lib/auth.ts` | `requireUser()` for API routes; `isValidCron()` for scheduled routes. |
| `lib/validation.ts` | Zod schemas for AI output, tasks and habit templates. |
| `lib/nutrition.ts` | BMR / TDEE / calorie and water goal formulas. |
| `lib/habits.ts` | Generates daily habit tasks from templates. |
| `lib/streak-utils.ts` | Streak maths for the analysis screen. |
| `lib/tz.ts` | Time-zone helpers (local day start, weekday, hour). |
| `lib/crypto.ts` | Encrypts / decrypts the user's Gemini API key. |
| `lib/check-profile.ts` | Lists missing profile fields. |
| `lib/guides.ts` | Guide content and lookup. |
| `lib/gsap.ts` | ⚠ GSAP setup; no longer imported. |
| `hooks/use-countdown.ts` | Live countdown to a date (deadline cards). |

### Outside `src`
| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Database models: User, DailyLog, Task, SubTask, HabitTemplate, HabitSubtaskTemplate, DailyMetrics, Deadline, DeadlineSubtask, Note, Feedback, UserReadGuide, PushSubscription. |
| `prisma/migrations/0_init/migration.sql` | Initial migration. |
| `worker/index.js` | Custom service-worker code (push notification display / click). |
| `scripts/backfill-habits.ts` | One-off script to backfill habit history. |
| `next.config.ts` | Next config: PWA plugin, image hosts. |
| `public/` | Icons, logos, OG image, generated service worker files. |
| `somafit-v7.md` | Repomix dump of the older codebase (reference only; now out of date). |
| `PROGRESS.md` | What was done and what is next. |
| `CODEMAP.md` | This file. |

---

## 6. Conventions for new work
- Start every signed-in page with `PageShell` + `PageHeader`. Do not hand-roll page padding.
- Use tokens (`bg-card`, `text-muted-foreground`, `bg-lime`, `bg-ink`, `text-protein` …). No raw palette classes or hex in components, except the fixed-colour hero vignettes and theme preview tiles.
- No glows, gradients, glass cards, `font-black`, or decorative emoji.
- Anything fixed to the bottom on mobile must sit above the dock: `bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-6`.
- Dialogs are bottom sheets on phones, centred from `sm`.
- Check new screens at 360px, 768px and 1280px, in light and dark.
