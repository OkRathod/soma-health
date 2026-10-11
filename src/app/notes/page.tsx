"use client";

import { useState, useEffect } from "react";
import { getNotes, saveNote, deleteNote } from "@/app/actions/notes";
import { ArrowLeft, Plus, Search, Trash2, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteEditor } from "@/components/notes/note-editor";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { PageShell, PageHeader, EmptyState } from "@/components/layout/page";
import { cn } from "@/lib/utils";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<any>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [saving, setSaving] = useState(false);
  // Bumped on every open so the rich-text editor remounts with fresh content.
  const [editorSession, setEditorSession] = useState(0);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const res = await getNotes();
    if (res.success) setNotes(res.data);
    setLoading(false);
  }

  // On phones the editor replaces the list, so start it from the top of the page.
  function revealEditor() {
    setEditorSession(s => s + 1);
    if (typeof window !== "undefined" && window.innerWidth < 1024) window.scrollTo({ top: 0 });
  }

  function openNew() {
    setCurrentNote(null);
    setEditorTitle("");
    setEditorContent("");
    setIsEditorOpen(true);
    revealEditor();
  }

  function openEdit(note: any) {
    setCurrentNote(note);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setIsEditorOpen(true);
    revealEditor();
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
    // The editor is no longer a modal, so close it if it was showing this note.
    if (currentNote?.id === id) setIsEditorOpen(false);
    loadNotes();
  }

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <DNALoader />;

  return (
    <PageShell>
      <PageHeader
        className={cn(isEditorOpen && "max-lg:hidden")}
        eyebrow="Notes"
        title={<>Think on <em>paper</em></>}
        description="Ideas, lists and training logs, kept in one quiet place."
        actions={
          <Button onClick={openNew} className="w-full sm:w-auto">
            <Plus /> New note
          </Button>
        }
      />

      <div className="grid gap-3 md:gap-4 lg:h-[calc(100dvh-8.5rem)] lg:min-h-[560px] lg:grid-cols-[340px_minmax(0,1fr)]">

        {/* Pane 1: search + note list */}
        <aside
          aria-label="Your notes"
          className={cn("panel flex min-h-0 min-w-0 flex-col overflow-hidden", isEditorOpen && "max-lg:hidden")}
        >
          <div className="border-b border-border p-3">
            <label className="relative block">
              <span className="sr-only">Search notes</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-11 w-full min-w-0 rounded-full bg-surface pl-11 pr-4 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
              />
            </label>
            <p className="label-mono mt-3 px-2">
              {filtered.length} {filtered.length === 1 ? "note" : "notes"}
              {search && notes.length !== filtered.length ? ` of ${notes.length}` : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              className="m-3 flex-1 py-10"
              icon={<FileText />}
              title={notes.length === 0 ? "A blank page." : "No notes found."}
              description={notes.length === 0 ? "Create your first note to get started." : "Try a different search, or create one."}
              action={
                <Button variant="outline" onClick={openNew}>
                  <Plus /> New note
                </Button>
              }
            />
          ) : (
            <ul className="custom-scrollbar min-h-0 flex-1 divide-y divide-border lg:overflow-y-auto">
              {filtered.map(note => {
                const active = isEditorOpen && currentNote?.id === note.id;
                return (
                  <li key={note.id} className={cn("group relative transition-colors", active ? "bg-surface" : "hover:bg-surface/60")}>
                    <button
                      type="button"
                      onClick={() => openEdit(note)}
                      aria-current={active ? "true" : undefined}
                      className="block w-full px-5 py-4 pr-14 text-left"
                    >
                      <span className="flex items-center gap-2">
                        {active && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-lime ring-1 ring-foreground/20" />}
                        <span className="truncate font-display text-[1.375rem] leading-tight">{note.title}</span>
                      </span>
                      <span className="mt-1.5 line-clamp-2 break-words text-sm leading-relaxed text-muted-foreground">
                        {/* Strip tags for the plain-text preview */}
                        {note.content.replace(/<[^>]+>/g, ' ').trim() || "No additional text"}
                      </span>
                      <span className="label-mono mt-3 block">
                        {formatDistanceToNow(new Date(note.updatedAt))} ago
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                      aria-label={`Delete "${note.title}"`}
                      className="absolute right-2 top-2.5 grid size-10 place-items-center rounded-full text-muted-foreground transition-[opacity,color,background-color] hover:bg-priority-high-bg hover:text-destructive focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Pane 2: editor */}
        <section
          aria-label="Editor"
          className={cn("panel flex min-h-0 min-w-0 flex-col lg:overflow-hidden", !isEditorOpen && "max-lg:hidden")}
        >
          {isEditorOpen ? (
            <>
              <div className="flex items-center gap-2 border-b border-border p-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditorOpen(false)}
                  className="lg:hidden"
                  aria-label="Back to notes"
                >
                  <ArrowLeft /> Notes
                </Button>
                <p className="label-mono hidden min-w-0 truncate pl-2 lg:block">
                  {currentNote ? `Edited ${formatDistanceToNow(new Date(currentNote.updatedAt))} ago` : "New note"}
                </p>
                <div className="ml-auto flex items-center gap-1.5">
                  {currentNote && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(currentNote.id)}
                      aria-label="Delete this note"
                      className="text-muted-foreground hover:bg-priority-high-bg hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => setIsEditorOpen(false)} className="hidden lg:inline-flex">
                    <X /> Close
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save note"}
                  </Button>
                </div>
              </div>

              <div className="custom-scrollbar min-h-[60dvh] flex-1 px-4 pb-6 sm:px-6 lg:min-h-0 lg:overflow-y-auto lg:px-10">
                <div className="mx-auto w-full max-w-3xl">
                  <input
                    value={editorTitle}
                    onChange={e => setEditorTitle(e.target.value)}
                    placeholder="Title"
                    aria-label="Note title"
                    className="display mt-6 w-full min-w-0 bg-transparent text-[1.875rem] outline-none placeholder:text-muted-foreground/60 md:mt-8 md:text-5xl"
                  />
                  <div className="mt-3">
                    <NoteEditor key={editorSession} content={editorContent} onChange={setEditorContent} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
              <div className="mb-4 grid size-12 place-items-center rounded-full bg-surface text-muted-foreground">
                <FileText className="size-5" />
              </div>
              <p className="font-display text-3xl leading-tight">Pick a note, or start a new one.</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Select a note from the list to read and edit it here.
              </p>
              <Button onClick={openNew} variant="outline" className="mt-5">
                <Plus /> New note
              </Button>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}
