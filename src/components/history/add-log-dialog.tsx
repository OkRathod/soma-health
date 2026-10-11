"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface AddLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  text: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function AddLogDialog({ isOpen, onOpenChange, date, text, onTextChange, onSave, isSaving }: AddLogDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 left-0 top-auto max-h-[90dvh] max-w-none translate-x-0 translate-y-0 gap-5 rounded-b-none rounded-t-[2rem] border-border bg-card pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:bottom-auto sm:left-[50%] sm:top-[50%] sm:max-w-md sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl sm:pb-6">
        <DialogHeader className="gap-3 text-left">
          <p className="eyebrow">Backfill a day</p>
          <DialogTitle className="display text-3xl font-normal leading-none">
            Add entry for {date ? format(date, "MMM do") : ""}
          </DialogTitle>
          <DialogDescription>
            Type what you ate or how you exercised. AI will calculate the stats.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Textarea
            placeholder="E.g. I ate a cheese sandwich and ran 2km..."
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[120px] resize-none rounded-2xl"
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            This will be processed by AI and added to your history without overwriting existing data.
          </p>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-3 sm:flex">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={onSave} disabled={isSaving || !text.trim()}>
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : "Save entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}