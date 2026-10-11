"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import {
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, CheckSquare,
  Heading1, Heading2, Quote, Link as LinkIcon,
  Undo, Redo
} from 'lucide-react';

function ToolbarButton({ onClick, active, icon: Icon, label }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active === undefined ? undefined : Boolean(active)}
      title={label}
      className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
        active
          ? 'bg-ink text-ink-foreground dark:bg-lime dark:text-lime-foreground'
          : 'text-muted-foreground hover:bg-card hover:text-foreground'
      }`}
    >
      <Icon className="size-[18px]" />
    </button>
  );
}

function ToolbarDivider() {
  return <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-border" />;
}

export function NoteEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start typing...' }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false, // User needs to Ctrl+Click to open
        autolink: true,
      }),
    ],
    content: content,
    // Next.js: render on the client only (this is what Tiptap already does in production builds).
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[300px] pb-10 text-[16px] leading-relaxed focus:outline-none prose-a:underline prose-a:underline-offset-4 prose-blockquote:font-normal',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex w-full flex-col">

      {/* Toolbar: one pill row, scrolls sideways when it does not fit */}
      <div className="sticky top-0 z-20 bg-card py-2">
        <div
          role="toolbar"
          aria-label="Formatting"
          className="no-scrollbar flex items-center gap-0.5 overflow-x-auto rounded-full bg-surface p-1"
        >
          {/* History */}
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} label="Undo" />
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} label="Redo" />
          <ToolbarDivider />

          {/* Inline formatting */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={Bold} label="Bold" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={Italic} label="Italic" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon={UnderlineIcon} label="Underline" />
          <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={LinkIcon} label="Link" />
          <ToolbarDivider />

          {/* Headings */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={Heading1} label="Heading 1" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={Heading2} label="Heading 2" />
          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={List} label="Bullet list" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={ListOrdered} label="Numbered list" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} icon={CheckSquare} label="Checklist" />
          <ToolbarDivider />

          {/* Extras */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={Quote} label="Quote" />
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="mt-3 min-h-[300px] [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:h-0 [&_p.is-editor-empty:first-child]:before:text-muted-foreground [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:p-0 [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-start [&_li[data-type='taskItem']]:gap-2.5 [&_li[data-type='taskItem']_p]:my-0 [&_li[data-type='taskItem']>div]:min-w-0 [&_li[data-type='taskItem']>div]:flex-1 [&_input[type='checkbox']]:mt-1.5 [&_input[type='checkbox']]:size-4 [&_input[type='checkbox']]:accent-[var(--foreground)]"
      />
    </div>
  );
}
