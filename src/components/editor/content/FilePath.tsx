'use client';

import { ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useEditorStore } from '@/stores/editor';

export const FilePath = () => {
  const { activePath } = useEditorStore();
  
  if (!activePath) return null;

  const pathParts = activePath.split('/');
  
  return (
    <Breadcrumb>
      {pathParts.map((part, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href="#">
            {part}
          </BreadcrumbLink>
          {index < pathParts.length - 1 && <ChevronRight className="h-4 w-4" />}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};