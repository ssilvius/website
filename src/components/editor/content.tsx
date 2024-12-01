'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEditorStore } from "@/stores/editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Toolbar } from "./toolbar"
import { FrontmatterDialog } from "@/components/forms/frontmatter"

export function Editor() {
  const { content, updateContent } = useEditorStore()
  
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      updateContent(editor.getHTML())
    },
  })

  return (
    <div className="h-full flex flex-col">
      <Card className="m-4 flex-1">
        <div className="border-b p-2 flex items-center justify-between">
          <Toolbar editor={editor} />
          <FrontmatterDialog />
        </div>
        <EditorContent 
          editor={editor} 
          className="prose max-w-none p-4"
        />
      </Card>
    </div>
  )
} 