# Somafit — Progress log

Running record of what has been done and what comes next. Newest entry first.
Read this at the start of any new chat about Somafit, together with `CODEMAP.md`.

---

## v8 "Calm Structure" redesign — 3 Oct 2026

### Why
The previous UI (v6 "Iris & Ember" app + v4 landing) read as generic and AI-made: glow shadows,
gradient text, glass cards, five accent colours per screen, novelty fonts (Pirata One, Monoton),
bold uppercase labels everywhere.

### References studied
- aeline.webflow.io — inset rounded hero frame, mono uppercase labels, lime pill CTA with arrow chip, bento stat tiles, dark rounded footer card.
- evermind-template.webflow.io — warm paper background, serif display type, floating pill navbar that condenses on scroll, lime accent used sparingly.
- **Not reviewed:** modulabs-template.webflow.io and the Pinterest pin (pin.it/4AZKfGDfI). Both block automated reading (robots rules), so nothing from them is in this version.

### Design system (single source: `src/app/globals.css`)
- **Palette:** bone paper `#f3f2ec`, ink `#171713`, one signal colour volt lime `#d4f560`. Light: primary = ink. Dark: primary = lime.
  Fixed tokens `ink` / `lime` / `surface` plus data colours `protein` `carbs` `fats` `water` `burn` and the priority set.
- **Type:** Instrument Serif (display, `.display`), Geist (body), Geist Mono (labels, `.eyebrow`, `.label-mono`), `.numeral` for big figures.
- **Shape:** pill buttons and inputs-in-bars, 24–30px panel radius, 1px borders, two shadows only (`shadow-card`, `shadow-float`).
- **Primitives:** `PageShell`, `PageHeader`, `Panel`, `PanelHeader`, `StatTile`, `EmptyState`, `Segmented` (`src/components/layout/page.tsx`); `ArrowLink`; `Logo` / `SomaMark`; `ThemeToggle`.
- **Rule of the system:** colour is information, not decoration. Lime marks the one thing that matters on a surface.

### Navigation
- **Desktop:** left icon rail replaced by a floating glass pill bar at the top (logo, 7 destinations, More menu, theme toggle, avatar). It narrows and gains a shadow after scrolling. Labels collapse to icons below 1280px, except the active item.
- **Mobile:** quiet top bar (logo, theme toggle, avatar) plus a floating ink dock. The active tab expands into a lime pill with its label. Dock holds Today, Tasks, Habits, Deadlines; "More" opens a bottom sheet (drag down to close) with Notes, History, Analysis, Guides, Feedback, Account.
- Signed-out visitors on public guides get a simple bar with Sign in / Get started instead of the app nav.

### Pages
| Page | What changed |
|---|---|
| Landing `/` | Rebuilt. Inset hero with film backdrop, serif headline, fan of product cards drawn in code; product tour (list drives a framed media stage); "Why" statement with three fact tiles; 7-module grid; 3 steps; lime CTA frame; ink footer card with oversized wordmark. GSAP removed from the landing (framer-motion only). |
| Today `/dashboard` | Greeting header; ink composer with tap-to-fill examples (inline on all sizes — the second fixed bar on mobile is gone); Net balance + two SVG rings + macro split bar; Today's plan panel; Water (glass cells), Steps, Quote; Trends chart (area chart, token colours). Dialogs are bottom sheets on phones. |
| Tasks `/tasks` | PageShell/Header, one toolbar (prev/next day, date, Today, List/Timeline, Tasks/Habits), list rows in one panel, restyled 24-hour timeline, add/edit as bottom sheet. Page scrolls as a whole now. |
| Habits `/habits` | Stat tiles (due today, active, paused, steps), templates as rows with day strip, pause switch, edit/delete. |
| Analysis `/analysis` | Streak tiles, ink/lime month heatmap with legend, new Consistency panel (month rate + by weekday). |
| Deadlines `/deadlines` | Countdown cards with big numerals, elapsed bar, step checklist; most urgent active deadline is the lime card; overdue shows "Overdue by N days". |
| Notes `/notes` | Two-pane (list + editor) on desktop, list → editor on phones; pill toolbar; serif titles. |
| History `/history` | Day navigator, Diet/Tasks/Timeline switch, day summary tiles + macro split, log entries as rows/tiles. Page file went from ~780 to ~440 lines by extracting 4 components. |
| Account `/settings` | Section nav (sticky column on desktop, scrolling pills on phones), labelled form rows, theme tiles, separated danger zone. |
| Feedback, Guides, Soma protocol | Narrow editorial layouts on the same system. |
| Sign in / Sign up | Split layout: ink brand panel + Clerk widget (with a matching `appearance`). |

### Fixes that came along
- `dark:` utilities now follow the app's theme class (`@custom-variant dark` was missing, so they followed the OS setting instead).
- `tailwindcss-animate` is now registered (`@plugin`), so dialog/popover enter animations actually run.
- Font CSS variables moved to `<html>` so `font-display` / `font-mono` resolve correctly.
- Quick log sends the browser's real time zone instead of a hard-coded `Asia/Kolkata`.
- Water card uses the user's own `waterGoal` instead of a fixed 2500 ml.
- TipTap editor: `immediatelyRender: false` (removes the SSR warning); placeholder is now visible.
- Notes: deleting the open note closes the editor (prevents saving to a deleted id).
- History: exercise rows no longer print "undefined" when the AI returns `duration` / `calories`.
- Calendar popovers show month/year dropdowns (the caption was invisible).
- Fixed a type error in `guides/page.tsx`.

### How it was checked
- TypeScript: no errors in `src/app` pages or `src/components`.
- Every page rendered at 390×844 and 1440×900 (light), spot checks in dark and at 360px: no horizontal overflow, no console errors.
- **Limits of the check:** rendering used a stand-in for Clerk and an in-memory database, and Google Fonts were loaded from local copies.
  Not exercised against your real stack: Clerk widgets with the new `appearance`, saving/deleting data, drag-to-timeline, push notifications, the hero and tour media from S3. Run `npm run dev` and click through once before deploying.
- ESLint still reports ~109 problems, almost all pre-existing `any` types. Not addressed.

### Behaviour changes to be aware of
- Settings: the fixed bottom Save bar is gone; Save sits in the Body profile and Gemini key panels (same handler).
- Tasks: the timeline is no longer its own scroll area, so dragging a task to a far-away hour relies on the page auto-scrolling.
- History: delete buttons are always visible on touch screens (were hover-only).
- Soma protocol guide: scroll animations and the fake "abstract UI" panels were removed.
- Landing footer: the "System Online" badge was removed (it was not tied to any real status).

---

## Next up

### Needs your input
1. **Logo / icons.** The app now uses a code-drawn lime "S" mark (`src/components/brand/logo.tsx`). Favicon, PWA icons, `og-image.png` and `public/logo*.{png,webp}` are still the old blue S. Decide: keep the new mark (then regenerate those assets) or supply your own.
2. **Landing media.** The product-tour screenshots and videos on S3 still show the old dark UI. Re-capture them from the new UI (same file names = no code change).
3. **Modulabs + Pinterest references.** If there is something specific you liked there, send screenshots and it can be folded in.

### Recommended
- Add "mark as read" to the Soma protocol guide (needs the page split into a server wrapper + client content).
- Notes: keep the editor open after saving (needs `saveNote` to return the id).
- Tasks: auto-scroll the timeline to "now" on load.
- Replace `alert()` / `confirm()` in Tasks with the sheet components used elsewhere.
- History: show a toast when a log delete fails (state is set but nothing is displayed); remove the duplicate fetch effect.
- `complete-profile-modal.tsx`: the "Other" gender option submits `FEMALE` (existing bug).
- Promote the bottom-sheet dialog style into `components/ui/dialog.tsx` as a variant (currently applied per feature via class overrides).

### Clean-up candidates (unused files, safe to delete after a quick check)
`src/components/command-bar.tsx`, `src/components/Habitanalysisclient.tsx`, `src/components/dna-loader.tsx`,
`src/components/manual-log-fallback.tsx`, `src/components/dashboard/StatCard.tsx`,
`src/components/dashboard/CalorieRadialChart.tsx`, `src/components/history/history-log-card.tsx`,
`src/lib/gsap.ts` (and the `gsap` dependency), `src/app/fonts/*` (local fonts no longer loaded),
`public/slide-*.png`, `public/dashboard-preview.png`.

### Rollback
The commit `08a741f Changes Brefore Claude` is the state before this redesign. Nothing was committed
to git by this work — review with `git diff`, then commit when happy.
