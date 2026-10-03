"use client";

/**
 * Structured fallback so logging never hard-fails when the AI is rate-limited
 * (429) or down. Writes a MEAL log directly with user-entered numbers.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ManualLogFallback({ onSaved }: { onSaved?: () => void }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name.trim() || !calories) return;
    setSaving(true);
    try {
      const r = await fetch("/api/manual-log", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          calories: Number(calories) || 0,
          protein: Number(protein) || 0,
        }),
      });
      if (!r.ok) throw new Error();
      toast.success("Saved manually");
      setName(""); setCalories(""); setProtein("");
      onSaved?.();
    } catch {
      toast.error("Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
      <p className="text-sm text-muted-foreground">
        AI is busy right now — you can still log this meal by hand.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1 sm:col-span-1">
          <Label className="text-xs">Food</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dal & rice" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Calories</Label>
          <Input type="number" inputMode="numeric" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="450" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Protein (g)</Label>
          <Input type="number" inputMode="numeric" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="20" />
        </div>
      </div>
      <Button onClick={save} disabled={saving || !name.trim() || !calories} className="w-full sm:w-auto">
        {saving ? "Saving…" : "Save manually"}
      </Button>
    </div>
  );
}