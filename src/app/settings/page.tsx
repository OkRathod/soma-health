"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, Lock } from "lucide-react";
import { Info } from "lucide-react";
import { X , Download, AlertTriangle} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DNALoader } from "@/components/dna-loader";


export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const { user, isLoaded } = useUser();
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [form, setForm] = useState({
    nationality: "",
    height: "",
    weight: "",
    apiKey: ""
  });

  // 1. Fetch data ONLY when we have the real User ID
  useEffect(() => {
    if (!isLoaded || !user) return; // Wait for Clerk to load

    fetch(`/api/settings?userId=${user.id}`) // 👈 Use real user.id
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
  }, [isLoaded, user]);


  async function handleSave() {
      if (!user) return;
      setSaving(true);
      try {
        const res = await fetch("/api/settings", {
          method: "POST",
          body: JSON.stringify({ userId: user.id, ...form }), // 👈 Use real user.id
        });
        const data = await res.json();
        
        if (data.success) {
          alert("Settings Saved!");
          if (form.apiKey) setHasKey(true);
          setForm(prev => ({ ...prev, apiKey: "" }));
        }
      } catch (err) {
        alert("Error saving settings");
      } finally {
        setSaving(false);
      }
    }

    async function handleExport() {
      if (!user) return;
      // 👈 Use real user.id for the download link
      window.open(`/api/export?userId=${user.id}`, "_blank");
    }


    async function handleDeactivateAccount() {
    const confirmed = window.confirm(
        "Deactivate Account?\n\nYour data will be kept safe for 15 days. If you sign back in during this time, you can restore your account.\n\nAfter 15 days, it is gone forever."
    );
    
    if (confirmed) {
      setIsDeleting(true);
      try {
        const res = await fetch("/api/user/delete", { method: "DELETE" }); // Calls the soft-delete API
        const data = await res.json();
        
        if (data.success) {
          alert("Account deactivated. You have 15 days to reactivate.");
          window.location.href = "/"; // Send them to home page
        } else {
          alert("Error deactivating account.");
        }
      } catch (err) {
        alert("Something went wrong.");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  // 👇 If loading, show the full screen DNA animation instead of the tiny spinner
  if (!isLoaded || loading) return <DNALoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
           {/* <p className="text-slate-500">Manage your profile and privacy configurations.</p> */}
        </div>

        {/* Section 1: Body Profile */}
        <Card>
          <CardHeader>
            <CardTitle>
              Physical Profile
              <InfoPopup text="This data helps the AI calibrate calories specifically for your body and culture." />
            </CardTitle>
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
                    <InfoPopup text="Bring your own Gemini API key. It is encrypted using AES-256 before being stored. Soma cannot see your key." />
                </CardTitle>
                {hasKey && (
                    <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3"/> Key Active
                    </div>
                )}
            </div>
            
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

        {/* 👇 SECTION 3: DATA MANAGEMENT (New!) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              Data Management
              <InfoPopup text="Download a copy of all your health logs, calories, and history in a format compatible with Excel or Google Sheets." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-slate-300 rounded-lg bg-slate-50/50">
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Export Health Data</p>
                <p className="text-sm text-slate-500">
                  Get a CSV file containing your entire history.
                </p>
              </div>
              <Button 
                onClick={handleExport}
                variant="outline" 
                className="border-slate-300 hover:bg-white hover:text-blue-600 gap-2 w-full md:w-auto"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </div>
          </CardContent>
        </Card>


        {/* 👇 UPDATED: Danger Zone (Deactivate) */}
        <Card className="border-red-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-red-50/50 border-b border-red-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-red-700">
               <AlertTriangle className="w-5 h-5" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Deactivate Account</p>
                <p className="text-sm text-slate-500">
                  Schedule account for deletion. You have a 15-day grace period to restore it.
                </p>
              </div>
              
              <Button 
                onClick={handleDeactivateAccount}
                disabled={isDeleting}
                variant="destructive" 
                className="bg-red-600 hover:bg-red-700 w-full md:w-auto"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                Deactivate Account
              </Button>
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

function InfoPopup({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex ml-2 items-center">
      {/* Icon Trigger */}
      <Info 
        onClick={() => setOpen(!open)} 
        className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
      />

      {/* The Popup Bubble */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Bubble Container */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50">
            <div className="relative bg-slate-900 text-slate-100 text-xs rounded-lg shadow-2xl p-4 pr-10 w-96 animate-in fade-in zoom-in-95 duration-200">
              
              {/* THE TEXT */}
              <p className="leading-relaxed">
                {text}
              </p>

              {/* THE X BUTTON (Fixed to Top-Right Corner) */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
              
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}