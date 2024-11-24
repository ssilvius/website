'use client';

import { useEffect, useState } from 'react';
import { useEditorStore, useInitEditor, setupAutoSave } from '@/stores/editor';
import { EditorContent } from '@tiptap/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditorToolbar from './toolbar';

export default function Editor() {
  const { 
    activePath,
    setEditor,
    draft,
    saveDraft,
    clearDraft,
  } = useEditorStore();
  
  const editor = useInitEditor();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setEditor(editor);
    return () => setEditor(null);
  }, [editor, setEditor]);

  useEffect(() => {
    const cleanup = setupAutoSave();
    return () => cleanup();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            {activePath || 'New File'}
          </span>
          {draft?.isDirty && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (draft) {
                saveDraft(
                  draft.content,
                  'Manual save',
                  draft.lastAuthor
                );
              }
            }}
            disabled={!draft?.isDirty}
          >
            Save Draft
          </Button>
        </div>
      </div>

      <Card className="flex-grow overflow-auto">
        <CardContent className="p-4">
          <EditorToolbar />
          <EditorContent 
            editor={editor} 
            className="prose prose-sm max-w-none min-h-[500px]" 
          />
        </CardContent>
      </Card>
    </div>
  );
}