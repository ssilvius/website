'use client';

import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePath } from './FilePath';
import { FrontmatterForm } from '@/components/editor/content/FrontmatterEditor';
import { useEditorStore } from '@/stores/editor';

export function Header() {
  const { draft } = useEditorStore();
  
  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4">
        <FilePath />
        
        {draft && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Frontmatter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Frontmatter</DialogTitle>
              </DialogHeader>
              <FrontmatterForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}