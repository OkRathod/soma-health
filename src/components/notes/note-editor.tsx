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
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] text-black marker:text-black prose-headings:text-black prose-p:text-black prose-strong:text-black',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, icon: Icon }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        active 
          ? 'bg-black text-white' 
          : 'hover:bg-gray-200 text-gray-700'
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

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
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
      
      {/* Frosted Glass Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-white/70 backdrop-blur-md rounded-lg border border-gray-200/50 items-center sticky top-0 z-50 transition-all shadow-sm">
        
        {/* History Group */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} />
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Formatting Group */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={Bold} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={Italic} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon={UnderlineIcon} />
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={LinkIcon} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={Heading1} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={Heading2} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={List} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={ListOrdered} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} icon={CheckSquare} />
        
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Extras */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={Quote} />

      </div>

      <EditorContent 
        editor={editor} 
        className="min-h-[500px] text-lg text-black [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:outline-none [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:p-0 [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:gap-2 [&_li[data-type='taskItem']]:items-start [&_input[type='checkbox']]:mt-1" 
      />
    </div>
  );
}