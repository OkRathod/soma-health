"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, Lock } from "lucide-react";
import { Info } from "lucide-react";
import { X , Download, AlertTriangle, Check} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DNALoader } from "@/components/dna-loader";


// Helper functions to convert between metric and imperial
const toImperialHeight = (cm: string) => (Number(cm) / 30.48).toFixed(1); // cm -> ft
const toMetricHeight = (ft: string) => (Number(ft) * 30.48).toFixed(0);   // ft -> cm

const toImperialWeight = (kg: string) => (Number(kg) * 2.20462).toFixed(0); // kg -> lbs
const toMetricWeight = (lbs: string) => (Number(lbs) / 2.20462).toFixed(1); // lbs -> kg

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const { user, isLoaded } = useUser();

  // 👇 STATE FOR DEACTIVATION MODAL (2-Steps)
  const [deleteStep, setDeleteStep] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 👇 NEW: STATE FOR GENERIC SUCCESS/ERROR MODALS
  // This replaces ugly browser alerts for things like "Settings Saved"
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  
  const [form, setForm] = useState({
    nationality: "",
    height: "",
    weight: "",
    apiKey: "",
    unitPreference: "metric"
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

      // Create a copy of the data to send
      let payload = { ...form };

      // If user is in Imperial mode, we must convert BACK to Metric for the database
      if (form.unitPreference === "imperial") {
        payload.height = toMetricHeight(form.height);
        payload.weight = toMetricWeight(form.weight);
      }
      
      try {
        const res = await fetch("/api/settings", {
          method: "POST",
          body: JSON.stringify({ userId: user.id, ...payload }), // 👈 Use real user.id
        });
        const data = await res.json();
        
        if (data.success) {
          setSimpleModal({ title: "Settings Saved", msg: "Your profile has been updated successfully." });
          if (form.apiKey) setHasKey(true);
          setForm(prev => ({ ...prev, apiKey: "" }));
        }
      } catch (err) {
        setSimpleModal({ title: "Error", msg: "Could not save settings. Please try again.", isError: true });
      } finally {
        setSaving(false);
      }
    }

    async function handleExport() {
      if (!user) return;
      // 👈 Use real user.id for the download link
      window.open(`/api/export?userId=${user.id}`, "_blank");
    }


  // 👇 FINAL API CALL (Called by the Modal, not the button directly)
    async function confirmDeactivation() {
      setIsDeleting(true);
      try {
        const res = await fetch("/api/user/delete", { method: "DELETE" });
        const data = await res.json();
        
        if (data.success) {
          window.location.href = "/"; 
        } else {
          setDeleteStep(0);
          setSimpleModal({ title: "Error", msg: "Could not deactivate account.", isError: true });
          setIsDeleting(false);
        }
      } catch (err) {
        setDeleteStep(0);
        setSimpleModal({ title: "Error", msg: "Something went wrong.", isError: true });
        setIsDeleting(false);
      }
    }

  // 👇 If loading, show the full screen DNA animation instead of the tiny spinner
  if (!isLoaded || loading) return <DNALoader />;

  const toggleUnit = (newUnit: string) => {
  if (newUnit === form.unitPreference) return; // No change

  setForm(prev => {
    // If switching TO Imperial (so current data is Metric)
    if (newUnit === "imperial") {
      return {
        ...prev,
        unitPreference: "imperial",
        height: prev.height ? toImperialHeight(prev.height) : "",
        weight: prev.weight ? toImperialWeight(prev.weight) : ""
      };
    } 
    // If switching TO Metric (so current data is Imperial)
    else {
      return {
        ...prev,
        unitPreference: "metric",
        height: prev.height ? toMetricHeight(prev.height) : "",
        weight: prev.weight ? toMetricWeight(prev.weight) : ""
      };
    }
  });
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className={`max-w-2xl mx-auto space-y-8 transition-all ${deleteStep > 0 || simpleModal ? 'blur-sm scale-[0.98] opacity-80' : ''}`}>
        
        {/* Header */}
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
           {/* <p className="text-slate-500">Manage your profile and privacy configurations.</p> */}
        </div>

        {/* Section 1: Physical Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                Physical Profile
                <InfoPopup text="This data helps the AI calibrate calories specifically for your body type." />
              </CardTitle>
              
              {/* 👇 UNIT TOGGLE SWITCH */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => toggleUnit("metric")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    form.unitPreference === "metric" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => toggleUnit("imperial")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    form.unitPreference === "imperial" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Nationality / Cultural Background</Label>
              <Input 
                value={form.nationality} 
                onChange={e => setForm({...form, nationality: e.target.value})}
                placeholder="e.g. Indian, Japanese, Mediterranean" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                {/* 👇 Dynamic Label: Change based on Unit Preference */}
                <Label>Height ({form.unitPreference === "metric" ? "cm" : "ft"})</Label>
                <Input 
                  type="text" // Changed to text to allow "5'10" format if needed
                  value={form.height} 
                  onChange={e => setForm({...form, height: e.target.value})}
                  placeholder={form.unitPreference === "metric" ? "175" : "5.9"}
                />
              </div>
              <div className="grid gap-2">
                {/* 👇 Dynamic Label */}
                <Label>Weight ({form.unitPreference === "metric" ? "kg" : "lbs"})</Label>
                <Input 
                  type="number" 
                  value={form.weight} 
                  onChange={e => setForm({...form, weight: e.target.value})}
                  placeholder={form.unitPreference === "metric" ? "70" : "150"}
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
                onClick={() => setDeleteStep(1)}
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

      {/* =================MODALS SECTION================= */}

      {/* 1. THE 2-STEP DEACTIVATION MODAL SYSTEM */}
      {deleteStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
          
          {/* STEP 1: INITIAL CONFIRMATION */}
          {deleteStep === 1 && (
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 animate-in zoom-in-95">
               <div className="mx-auto bg-red-100 h-12 w-12 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-lg font-bold text-slate-900">Are you sure?</h3>
                 <p className="text-sm text-slate-500">This will begin the process of deactivating your account.</p>
               </div>
               <div className="flex gap-3 justify-center">
                 <Button variant="outline" onClick={() => setDeleteStep(0)} className="w-auto">Cancel</Button>
                 <Button onClick={() => setDeleteStep(2)} className="w-auto bg-slate-900 hover:bg-slate-800">Continue</Button>
               </div>
            </div>
          )}

          {/* STEP 2: GRACE PERIOD INFO */}
          {deleteStep === 2 && (
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-in slide-in-from-right-8">
               <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">Safety & Grace Period</h3>
                    <div className="text-sm text-slate-500 leading-relaxed">
                      <p className="mb-3">We don't want you to lose data by accident.</p>
                      <ul className="list-disc pl-4 space-y-2 text-slate-700">
                        <li>Your account will be <strong>hidden immediately</strong>.</li>
                        <li>You have <strong>15 days</strong> to log back in and restore everything.</li>
                        <li>After 15 days, your data is <strong>deleted forever</strong>.</li>
                      </ul>
                    </div>
                  </div>
               </div>
               <div className="flex gap-3 justify-end pt-2">
                 <Button variant="ghost" onClick={() => setDeleteStep(1)}>Back</Button>
                 <Button 
                   variant="destructive" 
                   onClick={confirmDeactivation} 
                   disabled={isDeleting}
                   className="bg-red-600 hover:bg-red-700 gap-2"
                 >
                   {isDeleting ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                   Confirm Deactivation
                 </Button>
               </div>
            </div>
          )}
        </div>
      )}

      {/* 2. GENERIC SUCCESS/ERROR MODAL */}
      {simpleModal && (
         <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold text-slate-900">{simpleModal.title}</h3>
                        <p className="text-sm text-slate-500">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} className={simpleModal.isError ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'}>
                        Okay, got it
                    </Button>
                </div>
            </div>
         </div>
      )}

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