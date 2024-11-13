'use client';

import { EditorProvider } from '@/contexts/editor';

export default function ClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <EditorProvider>
      {children}
    </EditorProvider>
  );
}