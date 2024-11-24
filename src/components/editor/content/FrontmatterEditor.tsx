import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEditorStore } from '@/stores/editor';

export function FrontmatterForm() {
  const { draft } = useEditorStore();
  const [formData, setFormData] = useState(draft?.frontmatter || {});

  if (!draft) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement frontmatter update logic
    console.log('Updated frontmatter:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(draft.frontmatter).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <Input
            id={key}
            value={formData[key] as string || ''}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                [key]: e.target.value
              }));
            }}
          />
        </div>
      ))}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}