'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useEditorStore, useInitEditor, setupAutoSave } from '@/stores/editor';
import { Draft } from '@/stores/editor'; // Import the Draft type

interface EditorContextType {
  isLoading: boolean;
  isHydrated: boolean;
}

const EditorContext = createContext<EditorContextType>({
  isLoading: true,
  isHydrated: false,
});

export const useEditorContext = () => useContext(EditorContext);

export default function EditorProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setEditor, setDraft } = useEditorStore();
  const editor = useInitEditor();

  useEffect(() => {
    const hydrateStore = async () => {
      try {
        console.log('Hydration: Retrieving state from local storage'); // Debug log
        const persistedState = localStorage.getItem('editor-storage');
        if (persistedState) {
          const { state } = JSON.parse(persistedState);
          console.log('Hydration: Persisted state', state); // Debug log

          if (state.draft) {
            console.log('Hydration: Setting draft', state.draft); // Debug log
            setDraft(state.draft as Draft); // Ensure the draft is typed as Draft
          }
        }
      } catch (error) {
        console.error('Error hydrating editor store:', error);
      } finally {
        setIsHydrated(true);
        setIsLoading(false);
      }
    };

    hydrateStore();
  }, [setDraft]);

  useEffect(() => {
    if (isHydrated && editor) {
      console.log('Editor initialization'); // Debug log
      setEditor(editor);
      return () => setEditor(null);
    }
  }, [editor, setEditor, isHydrated]);

  const contextValue = {
    isLoading,
    isHydrated,
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
}