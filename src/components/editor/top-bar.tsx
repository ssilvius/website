'use client'

import { useEditorStore } from "@/stores/editor"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

export function TopBar() {
  const { currentFile, isDirty, saveCurrentFile } = useEditorStore()
  
  const handleSave = async () => {
    await saveCurrentFile("Updated content")
  }

  return (
    <div className="border-b border-gray-200 bg-white/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 h-14">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/editor">content</BreadcrumbLink>
          </BreadcrumbItem>
          {currentFile?.path.split('/').map((segment, i, arr) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink href="#">{segment}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>

        <div className="flex items-center gap-2">
          {isDirty && (
            <Badge variant="outline">Unsaved</Badge>
          )}
          <Button 
            onClick={handleSave}
            disabled={!isDirty}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
} 