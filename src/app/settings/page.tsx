"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, Lock } from "lucide-react";

// 🔴 PASTE YOUR USER ID HERE (We will remove this when we do Auth next!)
const USER_ID = "PASTE_YOUR_ID_HERE";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  
  const [form, setForm] = useState({
    nationality: "",
    height: "",
    weight: "",
    apiKey: ""
  });

  useEffect(() => {
    // Load current data when page opens
    fetch(`/api/settings?userId=${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setForm(prev => ({
            ...prev,
            nationality: data.data.nationality || "",
            height: data.data.height || "",
            weight: data.data.weight || "",
          }));
          setHasKey(data.data.hasKey);
        }
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify({
          userId: USER_ID,
          ...form
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Settings Saved!");
        if (form.apiKey) setHasKey(true); // If they added a key, update status
        setForm(prev => ({ ...prev, apiKey: "" })); // Clear the key field for security
      }
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
           <p className="text-slate-500">Manage your profile and privacy configurations.</p>
        </div>

        {/* Section 1: Body Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Physical Profile</CardTitle>
            <CardDescription>
              This data helps the AI calibrate calories specifically for your body and culture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid gap-2">
              <Label>Nationality / Cultural Background</Label>
              <Input 
                value={form.nationality} 
                onChange={e => setForm({...form, nationality: e.target.value})}
                placeholder="e.g. Indian, Japanese, Mediterranean" 
              />
              <p className="text-xs text-slate-400">Used to identify local cuisine types.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Height (cm)</Label>
                <Input 
                  type="number" 
                  value={form.height}
                  onChange={e => setForm({...form, height: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={form.weight}
                  onChange={e => setForm({...form, weight: e.target.value})}
                />
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Section 2: The Vault (API Key) */}
        <Card className="border-slate-300 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-600"/> 
                    The Vault (AI Key)
                </CardTitle>
                {hasKey && (
                    <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3"/> Key Active
                    </div>
                )}
            </div>
            <CardDescription>
              Bring your own Gemini API key. It is encrypted using AES-256 before being stored. 
              Soma cannot see your key.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Google Gemini API Key</Label>
              <Input 
                type="password" 
                placeholder={hasKey ? "••••••••••••••••" : "AIzaSy..."}
                value={form.apiKey}
                onChange={e => setForm({...form, apiKey: e.target.value})}
              />
              <p className="text-xs text-slate-400">
                Don't have one? <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline text-blue-600">Get it free here</a>.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-slate-900 hover:bg-slate-800">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                Save Changes
            </Button>
        </div>

      </div>
    </div>
  );
}