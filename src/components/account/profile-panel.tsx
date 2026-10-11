"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Flame, LogOut, Trophy, Zap } from "lucide-react";
import { StatTile } from "@/components/layout/page";
import { SettingsSection, FieldRow, WithUnit } from "@/components/account/form-row";
import { toast } from "sonner";

/**
 * The full Profile editor, extracted from the old /profile page so it can be
 * rendered inside the merged Account (Settings) hub. Keeps its own state and
 * talks to /api/profile exactly as before — no behaviour change.
 */
export function ProfilePanel() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState<{ streak: number; totalLogs: number; totalCaloriesBurned: number; badges: string[] }>(
    { streak: 0, totalLogs: 0, totalCaloriesBurned: 0, badges: [] }
  );

  const [form, setForm] = useState({
    plan: "Free",
    joinedAt: new Date(),
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    jobType: "",
    dietaryPreferences: "",
    customPurpose: "",
    weightGoal: "",
    targetWeight: "",
    dailyCalorieGoal: 2500,
    waterGoal: 2500,
  });

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/profile?userId=${user?.id}`);
      const data = await res.json();

      if (data.success && data.data) {
        const safeData = {
          ...data.data,
          gender: data.data.gender ?? "",
          activityLevel: data.data.activityLevel ?? "",
          jobType: data.data.jobType ?? "",
          dietaryPreferences: data.data.dietaryPreferences ?? "",
          customPurpose: data.data.customPurpose ?? "",
          weightGoal: data.data.weightGoal ?? "",
          plan: data.data.plan ?? "Free",
          age: data.data.age ?? "",
          height: data.data.height ?? "",
          weight: data.data.weight ?? "",
          targetWeight: data.data.targetWeight ?? "",
          dailyCalorieGoal: data.data.dailyCalorieGoal ?? 2500,
          waterGoal: data.data.waterGoal ?? 2500,
        };
        setForm((prev) => ({ ...prev, ...safeData }));
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Error fetching profile", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    const savePromise = fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, ...form }),
    });
    toast.promise(savePromise, {
      loading: "Saving changes...",
      success: "Profile updated successfully!",
      error: "Failed to save profile. Please try again.",
    });
    try {
      await savePromise;
    } catch {
      /* handled by toast */
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-28 rounded-3xl bg-surface shimmer" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-32 rounded-3xl bg-surface shimmer ${i === 0 ? "col-span-2 md:col-span-1" : ""}`} />
          ))}
        </div>
        <div className="h-52 rounded-3xl bg-surface shimmer" />
      </div>
    );
  }

  const initials =
    (user?.fullName || user?.primaryEmailAddress?.emailAddress || "S")
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Identity */}
      <section className="panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-lime text-lime-foreground md:size-[4.5rem]">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-2xl">{initials}</span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-display text-[1.75rem] leading-tight tracking-[-0.02em] md:text-3xl">
              {user?.fullName}
            </h2>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="inline-flex h-6 items-center rounded-full border border-border px-2.5 font-mono text-[11px] uppercase tracking-[0.1em]">
                {form.plan} plan
              </span>
              <span className="label-mono">Member since {new Date(form.joinedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            toast("Signed out");
            signOut();
          }}
          className="w-full shrink-0 sm:w-auto"
        >
          <LogOut />
          Sign out
        </Button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <StatTile
          tone="lime"
          label="Day streak"
          value={stats.streak}
          unit={stats.streak === 1 ? "day" : "days"}
          icon={<Zap className="size-4" />}
          className="col-span-2 md:col-span-1"
        />
        <StatTile label="Total logs" value={stats.totalLogs} hint="All time" icon={<Activity className="size-4" />} />
        <StatTile
          label="Burned"
          value={`${(stats.totalCaloriesBurned / 1000).toFixed(1)}k`}
          unit="kcal"
          hint="All time"
          icon={<Flame className="size-4 text-burn" />}
        />
      </div>

      {/* Badges */}
      <section className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="label-mono shrink-0">Earned badges</p>
        {stats.badges.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {stats.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[13px] font-medium"
              >
                <Trophy className="size-3.5 text-energy" /> {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="size-4" /> No badges yet.
          </p>
        )}
      </section>

      {/* Forms */}
      <SettingsSection label="Body" title="Physical stats">
        <FieldRow label="Age">
          <WithUnit unit="yrs">
            <Input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="25"
            />
          </WithUnit>
        </FieldRow>
        <FieldRow label="Gender">
          <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
        <FieldRow label="Height">
          <WithUnit unit="cm">
            <Input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
          </WithUnit>
        </FieldRow>
        <FieldRow label="Weight">
          <WithUnit unit="kg">
            <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          </WithUnit>
        </FieldRow>
      </SettingsSection>

      <SettingsSection label="Routine" title="Lifestyle and work">
        <FieldRow label="Activity level">
          <Select value={form.activityLevel} onValueChange={(v) => setForm({ ...form, activityLevel: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sedentary">Sedentary (Office Job)</SelectItem>
              <SelectItem value="Moderate">Moderate (Light Exercise)</SelectItem>
              <SelectItem value="Active">Active (Daily Training)</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
        <FieldRow label="Job type" hint="Your work hours affect your burn rate.">
          <Input
            value={form.jobType || ""}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
            placeholder="e.g. Software Engineer (Sedentary)"
          />
        </FieldRow>
        <FieldRow label="Dietary preferences">
          <Input
            value={form.dietaryPreferences || ""}
            onChange={(e) => setForm({ ...form, dietaryPreferences: e.target.value })}
            placeholder="e.g. Vegetarian, Keto, No Dairy..."
          />
        </FieldRow>
      </SettingsSection>

      <SettingsSection
        label="Direction"
        title="Goals and purpose"
        footer={
          <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
            {saving ? "Saving..." : "Save profile"}
          </Button>
        }
      >
        <FieldRow label="Your main purpose" hint="The one thing the coach should keep in mind.">
          <Input
            value={form.customPurpose || ""}
            onChange={(e) => setForm({ ...form, customPurpose: e.target.value })}
            placeholder="e.g. Training for a marathon, Recovering from injury..."
          />
        </FieldRow>
        <FieldRow label="Weight goal">
          <Select value={form.weightGoal} onValueChange={(v) => setForm({ ...form, weightGoal: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lose">Lose Weight</SelectItem>
              <SelectItem value="Maintain">Maintain</SelectItem>
              <SelectItem value="Gain">Gain Muscle</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
        <FieldRow label="Target weight">
          <WithUnit unit="kg">
            <Input
              type="number"
              value={form.targetWeight}
              onChange={(e) => setForm({ ...form, targetWeight: e.target.value })}
            />
          </WithUnit>
        </FieldRow>
        <FieldRow label="Daily calorie goal">
          <WithUnit unit="kcal">
            <Input
              type="number"
              value={form.dailyCalorieGoal}
              onChange={(e) => setForm({ ...form, dailyCalorieGoal: Number(e.target.value) })}
            />
          </WithUnit>
        </FieldRow>
        <FieldRow label="Daily water goal">
          <WithUnit unit="ml">
            <Input
              type="number"
              value={form.waterGoal}
              onChange={(e) => setForm({ ...form, waterGoal: Number(e.target.value) })}
            />
          </WithUnit>
        </FieldRow>
      </SettingsSection>
    </div>
  );
}
