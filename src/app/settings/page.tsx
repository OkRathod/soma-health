"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PageShell, PageHeader, Segmented } from "@/components/layout/page";
import { SettingsSection, FieldRow, WithUnit } from "@/components/account/form-row";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Bell,
  Check,
  Download,
  Info,
  KeyRound,
  Loader2,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  User,
  X,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePanel } from "@/components/account/profile-panel";
import { EnableNotifications } from "@/components/EnableNotifications";

// Helper functions to convert between metric and imperial
const toImperialHeight = (cm: string) => (Number(cm) / 30.48).toFixed(1); // cm -> ft
const toMetricHeight = (ft: string) => (Number(ft) * 30.48).toFixed(0);   // ft -> cm
const toImperialWeight = (kg: string) => (Number(kg) * 2.20462).toFixed(0); // kg -> lbs
const toMetricWeight = (lbs: string) => (Number(lbs) / 2.20462).toFixed(1); // lbs -> kg

const SECTIONS = [
  { value: "profile", label: "Profile", icon: User },
  { value: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "data", label: "Data & privacy", icon: ShieldCheck },
];

// Fixed swatches for the theme previews: each tile depicts a theme regardless
// of the one currently active, so these cannot come from the live tokens.
const PREVIEW = {
  light: { bg: "#f3f2ec", card: "#fbfaf6", line: "#dddbcf", ink: "#171713" },
  dark: { bg: "#10100e", card: "#181816", line: "#2b2b27", ink: "#eeede6" },
};

const THEMES = [
  { value: "light", label: "Light", hint: "Bone paper", icon: Sun },
  { value: "dark", label: "Dark", hint: "Graphite", icon: Moon },
  { value: "system", label: "System", hint: "Follows your device", icon: Monitor },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const { user, isLoaded } = useUser();
  const { setTheme, theme } = useTheme();

  const [tab, setTab] = useState("profile");

  const [deleteStep, setDeleteStep] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);

  const [form, setForm] = useState({
    nationality: "",
    height: "",
    weight: "",
    apiKey: "",
    unitPreference: "metric",
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch(`/api/settings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm((prev) => ({
            ...prev,
            nationality: data.data.nationality || "",
            height: data.data.height || "",
            weight: data.data.weight || "",
            unitPreference: data.data.unitPreference || "metric",
          }));
          setHasKey(data.data.hasKey);
        }
        setLoading(false);
      });
  }, [isLoaded, user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);

    let payload = { ...form };
    if (form.unitPreference === "imperial") {
      payload.height = toMetricHeight(form.height);
      payload.weight = toMetricWeight(form.weight);
    }

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, ...payload }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Settings Saved", { description: "Your preferences have been updated." });
        if (form.apiKey) setHasKey(true);
        setForm((prev) => ({ ...prev, apiKey: "" }));
      }
    } catch {
      toast.error("Error", { description: "Could not save settings." });
    } finally {
      setSaving(false);
    }
  }

  async function handleExport() {
    if (!user) return;
    window.open(`/api/export?userId=${user.id}`, "_blank");
  }

  async function confirmDeactivation() {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        window.location.href = "/";
      } else {
        setDeleteStep(0);
        toast.error("Failed to Deactivate", { description: "Please try again later." });
        setIsDeleting(false);
      }
    } catch {
      setDeleteStep(0);
      setSimpleModal({ title: "Error", msg: "Something went wrong.", isError: true });
      setIsDeleting(false);
    }
  }

  if (!isLoaded || loading) return <DNALoader />;

  const toggleUnit = (newUnit: string) => {
    if (newUnit === form.unitPreference) return;
    setForm((prev) => {
      if (newUnit === "imperial") {
        return {
          ...prev,
          unitPreference: "imperial",
          height: prev.height ? toImperialHeight(prev.height) : "",
          weight: prev.weight ? toImperialWeight(prev.weight) : "",
        };
      } else {
        return {
          ...prev,
          unitPreference: "metric",
          height: prev.height ? toMetricHeight(prev.height) : "",
          weight: prev.weight ? toMetricWeight(prev.weight) : "",
        };
      }
    });
  };

  const metric = form.unitPreference === "metric";

  const saveButton = (
    <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
      {saving ? <Loader2 className="size-4 animate-spin" /> : null}
      Save changes
    </Button>
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Account"
        title={
          <>
            You, your goals, <em>your data.</em>
          </>
        }
        description="Your profile, preferences and privacy, all in one place."
      />

      <Tabs
        value={tab}
        onValueChange={setTab}
        className="gap-5 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:items-start lg:gap-10"
      >
        {/* Section nav: scrollable pill row on phones, a vertical list from lg */}
        <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0 lg:sticky lg:top-28 lg:overflow-visible">
          <TabsList className="w-max justify-start lg:h-auto lg:w-full lg:flex-col lg:items-stretch lg:gap-1 lg:rounded-none lg:bg-transparent lg:p-0">
            {SECTIONS.map((s) => (
              <TabsTrigger
                key={s.value}
                value={s.value}
                className="flex-none lg:h-11 lg:justify-start lg:gap-3 lg:px-4 lg:text-sm lg:hover:bg-accent lg:data-[state=active]:hover:bg-ink dark:lg:data-[state=active]:hover:bg-lime"
              >
                <s.icon className="hidden lg:block" />
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-w-0">
          {/* ---------- Profile ---------- */}
          <TabsContent value="profile">
            <ProfilePanel />
          </TabsContent>

          {/* ---------- Preferences ---------- */}
          <TabsContent value="preferences" className="space-y-4 animate-fade-in">
            <SettingsSection
              label="Calibration"
              title={
                <>
                  Body profile
                  <InfoPopup text="This data helps the AI calibrate calories specifically for your body type." />
                </>
              }
              description="Calibrate Soma for your body metrics."
              action={
                <Segmented
                  size="sm"
                  value={form.unitPreference}
                  onChange={toggleUnit}
                  options={[
                    { value: "metric", label: "Metric" },
                    { value: "imperial", label: "Imperial" },
                  ]}
                />
              }
              footer={saveButton}
            >
              <FieldRow label="Nationality" hint="Or cultural background. It shapes food estimates.">
                <Input
                  value={form.nationality}
                  onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  placeholder="e.g. Indian, Japanese, Mediterranean"
                />
              </FieldRow>
              <FieldRow label="Height">
                <WithUnit unit={metric ? "cm" : "ft"}>
                  <Input
                    value={form.height}
                    onChange={(e) => setForm({ ...form, height: e.target.value })}
                    placeholder={metric ? "175" : "5.9"}
                    inputMode="decimal"
                  />
                </WithUnit>
              </FieldRow>
              <FieldRow label="Weight">
                <WithUnit unit={metric ? "kg" : "lbs"}>
                  <Input
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder={metric ? "70" : "150"}
                    inputMode="decimal"
                  />
                </WithUnit>
              </FieldRow>
            </SettingsSection>
          </TabsContent>

          {/* ---------- Appearance ---------- */}
          <TabsContent value="appearance" className="animate-fade-in">
            <SettingsSection
              label="Theme"
              title={
                <>
                  How Soma looks
                  <InfoPopup text="Choose how Soma looks on your device." />
                </>
              }
              description="Light, dark, or matched to your device."
            >
              <div className="grid grid-cols-3 gap-2.5 py-5 sm:gap-4 md:py-6" role="radiogroup" aria-label="Theme">
                {THEMES.map((t) => {
                  const active = theme === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setTheme(t.value)}
                      className={cn(
                        "press group rounded-3xl border p-2 text-left transition-colors sm:p-2.5",
                        active ? "border-foreground bg-surface" : "border-border hover:border-foreground/30"
                      )}
                    >
                      <ThemePreview mode={t.value as "light" | "dark" | "system"} />
                      <span className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-3 sm:px-2">
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-sm font-medium">
                            <t.icon className="hidden size-4 text-muted-foreground sm:block" />
                            {t.label}
                          </span>
                          <span className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">{t.hint}</span>
                        </span>
                        <span
                          className={cn(
                            "size-6 shrink-0 place-items-center rounded-full border",
                            active
                              ? "grid border-transparent bg-lime text-lime-foreground"
                              : "hidden border-border text-transparent sm:grid"
                          )}
                        >
                          <Check className="size-3.5" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </SettingsSection>
          </TabsContent>

          {/* ---------- Notifications ---------- */}
          <TabsContent value="notifications" className="space-y-4 animate-fade-in">
            <p className="label-mono">Push notifications</p>
            <EnableNotifications />
            <p className="max-w-prose text-[13px] leading-relaxed text-muted-foreground">
              Reminders are delivered to this device. You can turn them off any time, and each device manages its own
              subscription.
            </p>
          </TabsContent>

          {/* ---------- Data & privacy ---------- */}
          <TabsContent value="data" className="space-y-4 animate-fade-in">
            <SettingsSection
              label="AI configuration"
              title={
                <>
                  <KeyRound className="size-4.5 text-muted-foreground" />
                  Your Gemini key
                </>
              }
              description="Bring your own Gemini API key. Stored with AES-256 encryption."
              action={
                hasKey ? (
                  <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-lime px-3 font-mono text-[11px] uppercase tracking-[0.1em] text-lime-foreground">
                    <Check className="size-3.5" /> Key active
                  </span>
                ) : null
              }
              footer={saveButton}
            >
              <FieldRow
                label="Google Gemini API key"
                hint={
                  <>
                    Don&apos;t have one?{" "}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                    >
                      Get it free here
                    </a>
                    .
                  </>
                }
              >
                <Input
                  type="password"
                  placeholder={hasKey ? "••••••••••••••••" : "AIzaSy..."}
                  value={form.apiKey}
                  onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                />
              </FieldRow>
            </SettingsSection>

            <SettingsSection
              label="Export"
              title="Take your data with you"
              description="Download your entire health history as CSV."
              action={
                <Button variant="outline" onClick={handleExport}>
                  <Download />
                  Export
                </Button>
              }
            />

            {/* Destructive zone: set apart and quiet until it is needed */}
            <div className="pt-8">
              <p className="label-mono mb-3">Danger zone</p>
              <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-border p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div className="min-w-0">
                  <h2 className="text-[15px] font-medium">Deactivate account</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hides your account right away. You get 15 days to change your mind.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setDeleteStep(1)}
                  className="shrink-0 text-destructive hover:border-destructive/40 hover:bg-priority-high-bg hover:text-destructive"
                >
                  Deactivate
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* ---------- Dialogs ---------- */}
      {deleteStep > 0 && (
        <Sheet>
          {deleteStep === 1 && (
            <div className="animate-fade-in">
              <span className="grid size-11 place-items-center rounded-full bg-priority-high-bg text-destructive">
                <AlertTriangle className="size-5" />
              </span>
              <h3 className="display mt-5 text-3xl">Are you sure?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This will begin the process of deactivating your account.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setDeleteStep(0)}>
                  Cancel
                </Button>
                <Button onClick={() => setDeleteStep(2)}>Continue</Button>
              </div>
            </div>
          )}

          {deleteStep === 2 && (
            <div className="animate-slide-right">
              <p className="eyebrow">Safety and grace period</p>
              <h3 className="display mt-3 text-3xl">Before you go</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We don&apos;t want you to lose data by accident.
              </p>
              <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border text-sm">
                <li className="p-3.5">
                  Your account will be <span className="font-medium">hidden immediately</span>.
                </li>
                <li className="p-3.5">
                  You have <span className="font-medium">15 days</span> to log back in and restore everything.
                </li>
                <li className="p-3.5">
                  After 15 days, your data is <span className="font-medium">deleted forever</span>.
                </li>
              </ul>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="ghost" onClick={() => setDeleteStep(1)}>
                  Back
                </Button>
                <Button variant="destructive" onClick={confirmDeactivation} disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="size-4 animate-spin" /> : null}
                  Confirm deactivation
                </Button>
              </div>
            </div>
          )}
        </Sheet>
      )}

      {simpleModal && (
        <Sheet>
          <button
            onClick={() => setSimpleModal(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <div className="flex items-start gap-4 pr-8">
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full",
                simpleModal.isError ? "bg-priority-high-bg text-destructive" : "bg-lime text-lime-foreground"
              )}
            >
              {simpleModal.isError ? <AlertTriangle className="size-5" /> : <Check className="size-5" />}
            </span>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.02em]">{simpleModal.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{simpleModal.msg}</p>
            </div>
          </div>
          <Button
            onClick={() => setSimpleModal(null)}
            variant={simpleModal.isError ? "destructive" : "default"}
            className="mt-6 w-full sm:ml-auto sm:flex sm:w-auto"
          >
            Okay, got it
          </Button>
        </Sheet>
      )}
    </PageShell>
  );
}

/** Overlay + sheet for the account dialogs. Bottom sheet on phones, centred from `sm`. */
function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-end bg-[var(--overlay)] p-0 backdrop-blur-[3px] animate-fade-in sm:place-items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[90dvh] w-full overflow-y-auto rounded-t-[2rem] border border-border bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float animate-scale-in sm:max-w-md sm:rounded-3xl">
        {children}
      </div>
    </div>
  );
}

/** A miniature app window drawn in the colours of the theme it stands for. */
function ThemePreview({ mode }: { mode: "light" | "dark" | "system" }) {
  const pane = (c: (typeof PREVIEW)["light"]) => (
    <span className="flex h-full w-full flex-col gap-1.5 p-2 sm:p-3" style={{ background: c.bg }}>
      <span className="h-1.5 w-2/5 rounded-full" style={{ background: c.ink }} />
      <span
        className="flex flex-1 flex-col justify-end gap-1 rounded-lg border p-1.5 sm:p-2"
        style={{ background: c.card, borderColor: c.line }}
      >
        <span className="h-1 w-3/5 rounded-full" style={{ background: c.line }} />
        <span className="h-1 w-2/5 rounded-full" style={{ background: c.line }} />
        <span className="mt-0.5 h-2 w-6 rounded-full bg-lime sm:h-2.5 sm:w-8" />
      </span>
    </span>
  );
  return (
    <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border" aria-hidden="true">
      {mode === "system" ? (
        <>
          <span className="absolute inset-0">{pane(PREVIEW.light)}</span>
          <span className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]">{pane(PREVIEW.dark)}</span>
        </>
      ) : (
        pane(PREVIEW[mode])
      )}
    </span>
  );
}

function InfoPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="More information"
          className="-m-2 grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        collisionPadding={16}
        className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border-0 bg-ink p-4 pr-11 text-[13px] font-normal leading-relaxed tracking-normal text-ink-foreground shadow-float"
      >
        {text}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-full text-ink-foreground/70 hover:text-ink-foreground"
        >
          <X className="size-4" />
        </button>
      </PopoverContent>
    </Popover>
  );
}
