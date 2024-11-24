'use client';

import { useEffect, useCallback } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { EditorContent } from '@tiptap/react';
import { useEditorStore, useInitEditor } from '@/stores/editor';

export const Editor = () => {
  const editor = useInitEditor();
  const { setEditor, draft, activePath } = useEditorStore();

  const updateEditorContent = useCallback(() => {
    if (editor && draft?.content) {
      if (editor.getHTML() !== draft.content) {
        editor.commands.setContent(draft.content);
      }
    }
  }, [editor, draft?.content]);

  useEffect(() => {
    if (editor) {
      setEditor(editor);
      return () => setEditor(null);
    }
  }, [editor, setEditor]);

  useEffect(() => {
    updateEditorContent();
  }, [updateEditorContent, activePath]);

  if (!activePath) {
    return (
      <Card className="h-full border-0">
        <ScrollArea className="h-full">
          <div className="p-2 text-muted-foreground text-center">
            Select a file to start editing
          </div>
        </ScrollArea>
      </Card>
    );
  }

  return (
    <Card className="h-full border-0 rounded-none bg-slate-100">
      <ScrollArea className="h-full">
        <div className="px-8 py-6">
          <div className="p-8 rounded prose-lg max-w-none bg-white">
            <EditorContent editor={editor} />
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};