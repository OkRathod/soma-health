"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DNALoader } from "@/components/dna-loader";
import { LogOut, User, Briefcase, Target, Flame, Trophy, Activity } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Stats from API
  const [stats, setStats] = useState({ streak: 0, totalLogs: 0, totalCaloriesBurned: 0, badges: [] });

  const [form, setForm] = useState({
    // Identity
    plan: "Free",
    joinedAt: new Date(),
    
    // Physical
    age: "",
    gender: "",
    height: "",
    weight: "",
    
    // Lifestyle
    activityLevel: "",
    jobType: "",           // 👈 Your Request
    dietaryPreferences: "",

    // Goals
    customPurpose: "",     // 👈 Your Request
    weightGoal: "",
    targetWeight: "",
    dailyCalorieGoal: 2500,
    waterGoal: 2500,
  });

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchData();
  }, [isLoaded, user]);

async function fetchData() {
    try {
        const res = await fetch(`/api/profile?userId=${user?.id}`);
        const data = await res.json();
        
        if (data.success && data.data) {
            // 👇 FIX: Create a 'safe' object where nulls become empty strings
            const safeData = {
                ...data.data,
                // Text/Selection Fields (Ensure "" instead of null)
                gender: data.data.gender ?? "",
                activityLevel: data.data.activityLevel ?? "",
                jobType: data.data.jobType ?? "",
                dietaryPreferences: data.data.dietaryPreferences ?? "",
                customPurpose: data.data.customPurpose ?? "",
                weightGoal: data.data.weightGoal ?? "",
                plan: data.data.plan ?? "Free",

                // Number Fields (Convert to string for Input, or keep number if valid)
                // We use ?? "" so if it's null, the input gets an empty string
                age: data.data.age ?? "",
                height: data.data.height ?? "",
                weight: data.data.weight ?? "",
                targetWeight: data.data.targetWeight ?? "",
                
                // Fallbacks for critical numbers
                dailyCalorieGoal: data.data.dailyCalorieGoal ?? 2500,
                waterGoal: data.data.waterGoal ?? 2500,
            };

            setForm(prev => ({ ...prev, ...safeData }));
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
    try {
        await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({ userId: user?.id, ...form })
        });
        alert("Profile Updated!"); // You can replace with your simpleModal later
    } catch (e) { alert("Failed to save"); }
    finally { setSaving(false); }
  }

  if (loading) return <DNALoader />;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. HEADER CARD (Identity + Logout) */}
        <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-muted">
                        <img src={user?.imageUrl} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{user?.fullName}</h1>
                        <p className="text-muted-foreground text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="border-primary text-primary">
                                {form.plan} Plan
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                                Member since {new Date(form.joinedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* LOGOUT BUTTON (Your Request) */}
                <Button variant="ghost" onClick={() => signOut()} className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                </Button>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: The "Soma" Core (Inputs) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 2. PHYSICAL STATS */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary"/> Physical Stats</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Age</Label>
                            <Input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="25" />
                        </div>
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select value={form.gender} onValueChange={v => setForm({...form, gender: v})}>
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
                            <Input type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Weight (kg)</Label>
                            <div className="relative">
                                <Input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
                                {/* Tiny Sparkline Visual (Static for now) */}
                                <div className="absolute right-2 top-2 bottom-2 w-8 opacity-20">
                                    <svg viewBox="0 0 20 10" className="stroke-primary fill-none stroke-2"><path d="M0 5 L5 8 L10 4 L15 6 L20 2" /></svg>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. LIFESTYLE & WORK (Your Job Type Request) */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Lifestyle & Work</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Activity Level</Label>
                                <Select value={form.activityLevel} onValueChange={v => setForm({...form, activityLevel: v})}>
                                    <SelectTrigger><SelectValue placeholder="Select Activity" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sedentary">Sedentary (Office Job)</SelectItem>
                                        <SelectItem value="Moderate">Moderate (Light Exercise)</SelectItem>
                                        <SelectItem value="Active">Active (Daily Training)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {/* JOB TYPE (User Request) */}
                            <div className="space-y-2">
                                <Label>Job Type</Label>
                                <Input 
                                    value={form.jobType || ""} 
                                    onChange={e => setForm({...form, jobType: e.target.value})} 
                                    placeholder="e.g. Software Engineer (Sedentary)" 
                                />
                                <p className="text-xs text-muted-foreground">Your work hours affect your burn rate.</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Dietary Preferences</Label>
                            <Input 
                                value={form.dietaryPreferences || ""} 
                                onChange={e => setForm({...form, dietaryPreferences: e.target.value})} 
                                placeholder="e.g. Vegetarian, Keto, No Dairy..." 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* 4. GOALS & PURPOSE */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary"/> Goals & Purpose</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {/* CUSTOM PURPOSE (User Request) */}
                        <div className="space-y-2">
                            <Label className="text-primary font-semibold">Your Main Purpose</Label>
                            <Input 
                                value={form.customPurpose || ""} 
                                onChange={e => setForm({...form, customPurpose: e.target.value})} 
                                placeholder="e.g. Training for a marathon, Recovering from injury..." 
                                className="border-primary/20 bg-primary/5"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                                <Label>Weight Goal</Label>
                                <Select value={form.weightGoal} onValueChange={v => setForm({...form, weightGoal: v})}>
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
                                <Input type="number" value={form.targetWeight} onChange={e => setForm({...form, targetWeight: e.target.value})} />
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label>Daily Calorie Goal</Label>
                                <Input type="number" value={form.dailyCalorieGoal} onChange={e => setForm({...form, dailyCalorieGoal: Number(e.target.value)})} />
                             </div>
                             <div className="space-y-2">
                                <Label>Daily Water Goal (ml)</Label>
                                <Input type="number" value={form.waterGoal} onChange={e => setForm({...form, waterGoal: Number(e.target.value)})} />
                             </div>
                         </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                        {saving ? "Saving..." : "Save Profile"}
                    </Button>
                </div>
            </div>

            {/* RIGHT COLUMN: Gamification & Stats */}
            <div className="space-y-8">
                
                {/* 5. STREAKS CARD */}
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
                    <CardContent className="p-6 text-center space-y-2">
                        <Flame className="w-12 h-12 mx-auto opacity-90" />
                        <div className="text-4xl font-bold">{stats.streak} Days</div>
                        <p className="text-sm opacity-90 font-medium">Current Streak</p>
                        <p className="text-xs opacity-70">Keep logging to keep the fire alive!</p>
                    </CardContent>
                </Card>

                {/* 6. TOTAL STATS */}
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">All-Time Stats</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary rounded-full">
                                <Activity className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.totalLogs}</div>
                                <div className="text-xs text-muted-foreground">Total Logs Created</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary rounded-full">
                                <Flame className="w-5 h-5 text-destructive" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{(stats.totalCaloriesBurned / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-muted-foreground">Calories Burned</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 7. BADGES */}
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Earned Badges</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {stats.badges.length > 0 ? stats.badges.map(badge => (
                                <Badge key={badge} variant="secondary" className="px-3 py-1 gap-1">
                                    <Trophy className="w-3 h-3 text-yellow-600" /> {badge}
                                </Badge>
                            )) : (
                                <p className="text-sm text-muted-foreground">No badges yet. Start logging!</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
      </div>
    </div>
  );
}