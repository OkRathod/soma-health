"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PenLine } from "lucide-react";
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
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            Add Entry for {date ? format(date, "MMM do") : ""}
          </DialogTitle>
          <DialogDescription>
            Type what you ate or how you exercised. AI will calculate the stats.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea 
            placeholder="E.g. I ate a cheese sandwich and ran 2km..." 
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[100px] resize-none bg-background focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            This will be processed by AI and added to your history without overwriting existing data.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={onSave} disabled={isSaving || !text.trim()}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Save Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}