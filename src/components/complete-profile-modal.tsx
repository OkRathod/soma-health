"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export function CompleteProfileModal({ userId, missingFields }: { userId: string, missingFields: string[] }) {
  const [open, setOpen] = useState(true); // Always open if rendered
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "MALE", // Default
    activityLevel: "MODERATE",
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: JSON.stringify({ userId, ...formData }),
      });

      if (res.ok) {
        setOpen(false); // Close modal
        router.refresh(); // Refresh page to update context
      }
    } catch (e) {
      console.error("Failed to update", e);
    } finally {
      setLoading(false);
    }
  }

  // Prevent closing by clicking outside (Force completion)
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="gap-0 sm:max-w-md"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="gap-0 text-left">
          <p className="eyebrow">One-time setup</p>
          <DialogTitle className="display mt-3 text-[2rem] font-normal sm:text-4xl">
            Set up your <em>profile</em>
          </DialogTitle>
          <DialogDescription className="mt-2 leading-relaxed">
            Soma needs your body metrics to calculate accurate calorie goals.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input
                type="number"
                placeholder="175"
                onChange={(e) => setFormData({...formData, height: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                placeholder="70"
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Age</Label>
              <Input
                type="number"
                placeholder="25"
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select onValueChange={(val) => setFormData({...formData, gender: val})}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="FEMALE">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading} size="lg" className="w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Save and continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
