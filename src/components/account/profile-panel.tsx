"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Briefcase, Target, Flame, Trophy, Activity } from "lucide-react";
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
      <div className="space-y-6">
        <div className="h-28 rounded-2xl bg-secondary/50 shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-secondary/50 shimmer" />
          ))}
        </div>
        <div className="h-52 rounded-2xl bg-secondary/50 shimmer" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* IDENTITY */}
      <Card className="border-border bg-card shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5 min-w-0">
            <div className="h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0 ring-2 ring-primary/10">
              <img src={user?.imageUrl} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold leading-tight text-foreground truncate">
                {user?.fullName}
              </h2>
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge variant="outline" className="border-primary/40 text-primary px-2.5 py-0.5 text-xs font-medium">
                  {form.plan} Plan
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Member since {new Date(form.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:justify-end justify-center border border-border/70 rounded-lg">
            <Button
              variant="ghost"
              onClick={() => {
                toast("Signed out");
                signOut();
              }}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 px-4 py-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-[var(--gradient-to)] text-primary-foreground border-none shadow-md h-full hover-lift">
          <CardContent className="p-6 text-center flex flex-col justify-center h-full items-center">
            <Flame className="w-10 h-10 opacity-90 mb-2" />
            <div className="text-4xl font-extrabold tracking-tight">{stats.streak}</div>
            <p className="text-sm opacity-90 font-medium">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="h-full border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">All-Time Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full"><Activity className="w-4 h-4 text-primary" /></div>
                <span className="text-sm font-medium">Total Logs</span>
              </div>
              <div className="text-xl font-bold">{stats.totalLogs}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full"><Flame className="w-4 h-4 text-destructive" /></div>
                <span className="text-sm font-medium">Burned</span>
              </div>
              <div className="text-xl font-bold">{(stats.totalCaloriesBurned / 1000).toFixed(1)}k</div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Earned Badges</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center justify-center">
            {stats.badges.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {stats.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="px-2 py-1 gap-1">
                    <Trophy className="w-3 h-3 text-yellow-600" /> {badge}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Trophy className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs">No badges yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FORMS */}
      <div className="space-y-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Physical Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Age</Label>
              <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="25" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <div className="relative">
                <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
                <div className="absolute right-2 top-2 bottom-2 w-8 opacity-20">
                  <svg viewBox="0 0 20 10" className="stroke-primary fill-none stroke-2"><path d="M0 5 L5 8 L10 4 L15 6 L20 2" /></svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Lifestyle & Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={form.activityLevel} onValueChange={(v) => setForm({ ...form, activityLevel: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Activity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedentary">Sedentary (Office Job)</SelectItem>
                    <SelectItem value="Moderate">Moderate (Light Exercise)</SelectItem>
                    <SelectItem value="Active">Active (Daily Training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input value={form.jobType || ""} onChange={(e) => setForm({ ...form, jobType: e.target.value })} placeholder="e.g. Software Engineer (Sedentary)" />
                <p className="text-xs text-muted-foreground">Your work hours affect your burn rate.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dietary Preferences</Label>
              <Input value={form.dietaryPreferences || ""} onChange={(e) => setForm({ ...form, dietaryPreferences: e.target.value })} placeholder="e.g. Vegetarian, Keto, No Dairy..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Goals & Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-primary font-semibold">Your Main Purpose</Label>
              <Input value={form.customPurpose || ""} onChange={(e) => setForm({ ...form, customPurpose: e.target.value })} placeholder="e.g. Training for a marathon, Recovering from injury..." className="border-primary/20 bg-primary/5" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label>Weight Goal</Label>
                <Select value={form.weightGoal} onValueChange={(v) => setForm({ ...form, weightGoal: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lose">Lose Weight</SelectItem>
                    <SelectItem value="Maintain">Maintain</SelectItem>
                    <SelectItem value="Gain">Gain Muscle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target Weight (kg)</Label>
                <Input type="number" value={form.targetWeight} onChange={(e) => setForm({ ...form, targetWeight: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Daily Calorie Goal</Label>
                <Input type="number" value={form.dailyCalorieGoal} onChange={(e) => setForm({ ...form, dailyCalorieGoal: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Daily Water Goal (ml)</Label>
                <Input type="number" value={form.waterGoal} onChange={(e) => setForm({ ...form, waterGoal: Number(e.target.value) })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto shadow-sm hover-lift">
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}