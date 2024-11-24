import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Editor, useEditor as useTipTap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import { Frontmatter } from '@/types/content';
import { getFileContent } from '@/actions/editor/content';

interface DraftAuthor {
  name?: string;
  email?: string;
}

interface DraftVersion {
  content: string;
  timestamp: number;
  message?: string;
  author?: DraftAuthor;
}

export interface Draft {
  path: string;
  content: string;
  frontmatter: Frontmatter;
  isDirty: boolean;
  lastSaved: number;
  lastAuthor?: DraftAuthor;
  versions: DraftVersion[];
}

interface EditorState {
  draft: Draft | null;
  activePath: string | null;
  editor: Editor | null;

  setEditor: (editor: Editor | null) => void;
  setActivePath: (path: string | null) => void;
  updateContent: (content: string) => void;
  saveDraft: (content: string, message?: string, author?: DraftAuthor) => void;
  clearDraft: () => void;
}

const AUTOSAVE_INTERVAL = 30000;

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      draft: null,
      activePath: null,
      editor: null,

      setEditor: (editor) => set({ editor }),

      setActivePath: async (path) => {
        if (!path) {
          set({ activePath: null, draft: null });
          return;
        }

        set({ activePath: path });

        try {
          const result = await getFileContent(path);
          if ('content' in result) {
            set({
              draft: {
                path,
                content: result.content,
                frontmatter: result.frontmatter as Frontmatter,
                isDirty: false,
                lastSaved: Date.now(),
                versions: [],
              },
            });
          } else {
            console.error('Error:', result.message);
          }
        } catch (error) {
          console.error('Error reading file content:', error);
        }
      },

      updateContent: (content) => {
        set((state) => ({
          draft: {
            ...state.draft!,
            content,
            isDirty: true,
          },
        }));
      },

      saveDraft: (content, message, author) => {
        const timestamp = Date.now();
        const draft = get().draft;

        if (!draft) return;

        const newVersion: DraftVersion = {
          content,
          timestamp,
          message,
          author,
        };

        set({
          draft: {
            ...draft,
            content,
            isDirty: false,
            lastSaved: timestamp,
            lastAuthor: author,
            versions: [...draft.versions, newVersion],
          },
        });
      },

      clearDraft: () => {
        set({ draft: null, activePath: null });
      },
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({ draft: state.draft, activePath: state.activePath }),
      skipHydration: true,
    }
  )
);

export function useInitEditor() {
  const { activePath, draft } = useEditorStore();

  const editor = useTipTap({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing...' }),
      Markdown.configure({ transformPastedText: true, transformCopiedText: true }),
    ],
    content: draft?.content || '',
    onUpdate: ({ editor }) => {
      if (!editor || !activePath) return;
      try {
        const markdown = editor.storage.markdown.getMarkdown();
        useEditorStore.getState().updateContent(markdown);
      } catch (error) {
        console.error('Error updating markdown content:', error);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate max-w-none focus:outline-none',
      },
    },
    autofocus: 'end',
    enableCoreExtensions: true,
  });

  return editor;
}

let autoSaveTimeout: NodeJS.Timeout | null = null;

export function setupAutoSave() {
  const checkAndSave = () => {
    const state = useEditorStore.getState();
    const { draft } = state;

    if (draft?.isDirty) {
      state.saveDraft(
        draft.content,
        'Auto-saved draft'
      );
    }

    autoSaveTimeout = setTimeout(checkAndSave, AUTOSAVE_INTERVAL);
  };

  autoSaveTimeout = setTimeout(checkAndSave, AUTOSAVE_INTERVAL);

  return () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
  };
}