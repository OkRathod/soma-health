"use client";

import { useState, useEffect } from "react";
import { getNotes, saveNote, deleteNote } from "@/app/actions/notes";
import { Plus, Search, Trash2, Edit2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { NoteEditor } from "@/components/notes/note-editor";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { SomaLoader as DNALoader } from "@/components/soma-loader";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const res = await getNotes();
    if (res.success) setNotes(res.data);
    setLoading(false);
  }

  function openNew() {
    setCurrentNote(null);
    setEditorTitle("");
    setEditorContent("");
    setIsEditorOpen(true);
  }

  function openEdit(note: any) {
    setCurrentNote(note);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setIsEditorOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveNote({
        id: currentNote?.id,
        title: editorTitle,
        content: editorContent
      });
      toast.success("Note saved");
      setIsEditorOpen(false);
      loadNotes();
    } catch (e) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    toast.success("Note deleted");
    loadNotes();
  }

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <DNALoader />;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          {/* <div>
             <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileText className="w-8 h-8 text-primary"/> Notes
             </h1>
             <p className="text-muted-foreground">Capture ideas, lists, and thoughts.</p>
          </div> */}
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                   placeholder="Search notes..." 
                   className="pl-9" 
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                />
             </div>
             <Button onClick={openNew} className="gap-2 shadow-lg">
                <Plus className="w-4 h-4"/> New Note
             </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
           {filtered.map(note => (
              <div 
                 key={note.id} 
                 onClick={() => openEdit(note)}
                 className="group relative bg-card hover:bg-muted/30 border border-border p-5 rounded-xl transition-all cursor-pointer hover:shadow-md h-[200px] flex flex-col"
              >
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg truncate pr-8">{note.title}</h3>
                    <button 
                       onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                       className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-all absolute top-4 right-4"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 
                  {/* Preview Content (Cleaned up) */}
                 <div className="flex-1 overflow-hidden relative mt-2">
                    <p className="text-sm text-muted-foreground line-clamp-5 break-words leading-relaxed">
                       {/* 👇 Fix: Replace tags with spaces, then trim. */}
                       {note.content.replace(/<[^>]+>/g, ' ').trim() || "No additional text"}
                    </p>
                    
                    {/* Optional: Adds a subtle fade-out effect at the bottom for a polished look */}
                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-card to-transparent" />
                 </div>

                 <div className="text-xs text-muted-foreground/60 mt-4 font-medium pt-3 border-t border-border/30 flex items-center gap-2">
                    <span>{formatDistanceToNow(new Date(note.updatedAt))} ago</span>
                 </div>
              </div>
           ))}
           
           {/* Empty State */}
           {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed rounded-xl">
                 No notes found. Create one!
              </div>
           )}
        </div>

      </div>

      {/* Editor Modal */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
      {/* 👇 FIXED: 
            1. w-[90vw] & h-[85vh]: Makes it a centered floating box on mobile (instead of full screen).
            2. rounded-xl: Adds curves to the mobile box.
            3. border: Adds a border back for the floating look.
            4. Desktop (md:) styles remain exactly the same. 
      */}
      <DialogContent className="w-[90vw] h-[85vh] md:max-w-4xl md:h-[90vh] rounded-xl flex flex-col p-0 gap-0 overflow-hidden bg-white text-black border shadow-xl">
            
            {/* Header Input */}
            <div className="p-4 md:p-6 pb-2 border-b border-gray-200 bg-white shrink-0">
               <Input 
               value={editorTitle}
               onChange={e => setEditorTitle(e.target.value)}
               className="text-xl md:text-3xl w-full/50 font-bold border-none shadow-none px-3 focus-visible:ring-0 h-auto bg-transparent text-black placeholder:text-gray-400"
               placeholder="Title"
            />
            </div>

            {/* Editor Area */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 bg-white">
               <NoteEditor content={editorContent} onChange={setEditorContent} />
            </div>

            {/* Footer */}
            <div className="p-3 md:p-4 pb-6 md:pb-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
               <Button variant="ghost" onClick={() => setIsEditorOpen(false)}>Close</Button>
               <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Note"}
               </Button>
            </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}