import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useEditor as useTipTap, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import type { FileContent } from '@/actions/editor/content';

interface EditorContextType {
  // Navigation state
  selectedPath: string | null;
  setSelectedPath: (path: string | null) => void;
  
  // Editor state
  editor: Editor | null;
  content: string;
  setContent: (content: string) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  // Navigation state
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  // Editor state
  const [content, setContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize TipTap editor with SSR handling
  const editor = useTipTap({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // Configure codeBlock through StarterKit instead of separate extension
        codeBlock: {
          languageClassPrefix: 'language-',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      setContent(markdown);
      setIsDirty(true);
    },
    // Add these configurations for SSR handling
    enableCoreExtensions: true,
    immediatelyRender: false,
  });

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render editor content until client-side
  if (!isMounted) {
    return (
      <EditorContext.Provider 
        value={{ 
          selectedPath, 
          setSelectedPath,
          editor: null,
          content,
          setContent,
          isDirty,
          setIsDirty,
        }}
      >
        {children}
      </EditorContext.Provider>
    );
  }

  return (
    <EditorContext.Provider 
      value={{ 
        selectedPath, 
        setSelectedPath,
        editor,
        content,
        setContent,
        isDirty,
        setIsDirty,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}