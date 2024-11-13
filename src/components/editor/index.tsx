'use client';

import { useEditor } from '@/contexts/editor';
import { useEffect } from 'react';
import { getFileContent } from '@/actions/editor/content';
import { EditorContent } from '@tiptap/react';
import { Card, CardContent } from '@/components/ui/card';

export default function Editor() {
  const { 
    selectedPath, 
    editor, 
    setContent, 
    isDirty 
  } = useEditor();

  useEffect(() => {
    async function loadContent() {
      if (!selectedPath) return;

      try {
        const fileContent = await getFileContent(selectedPath);
        if (fileContent) {
          setContent(fileContent.content);
          editor?.commands.setContent(fileContent.content);
        }
      } catch (error) {
        console.error('Error loading file:', error);
      }
    }

    loadContent();
  }, [selectedPath, editor, setContent]);

  if (!selectedPath) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a file to edit</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-muted-foreground">
            {selectedPath}
          </span>
          {isDirty && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Unsaved changes
            </span>
          )}
        </div>
      </div>
      <Card className="flex-grow overflow-auto">
        <CardContent className="p-4">
          <EditorContent editor={editor} className="min-h-[500px]" />
        </CardContent>
      </Card>
    </div>
  );
}