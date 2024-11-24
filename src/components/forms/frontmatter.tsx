import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_AUTHOR_PICTURE = '/images/profile.jpg';

interface Author {
  name: string;
  picture: string;
}

interface FrontmatterData {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: Author;
}

interface FormErrors {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  authorName?: string;
}

interface FrontmatterFormProps {
  frontmatter?: Partial<FrontmatterData>;
  onSubmit?: (data: FrontmatterData) => void;
}

// Function to generate a SQID
const generateSqid = (): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => 
    charset.charAt(Math.floor(Math.random() * charset.length))
  ).join('');
};

const getInitialFormData = (initialFrontmatter?: Partial<FrontmatterData>): FrontmatterData => ({
  id: initialFrontmatter?.id || generateSqid(),
  slug: initialFrontmatter?.slug || '',
  featured: initialFrontmatter?.featured || false,
  title: initialFrontmatter?.title || '',
  date: initialFrontmatter?.date 
    ? new Date(initialFrontmatter.date).toISOString().split('.')[0]
    : new Date().toISOString().split('.')[0],
  excerpt: initialFrontmatter?.excerpt || '',
  tags: initialFrontmatter?.tags || [],
  author: {
    name: initialFrontmatter?.author?.name || '',
    picture: initialFrontmatter?.author?.picture || DEFAULT_AUTHOR_PICTURE,
  },
});

export default function Form({ 
  frontmatter: initialFrontmatter,
  onSubmit: externalOnSubmit,
}: FrontmatterFormProps) {
  const [formData, setFormData] = useState<FrontmatterData>(
    getInitialFormData(initialFrontmatter)
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const regenerateId = (): void => {
    setFormData(prev => ({
      ...prev,
      id: generateSqid()
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.excerpt) newErrors.excerpt = 'Excerpt is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.author.name) newErrors.authorName = 'Author name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const frontmatterContent = `---\n${JSON.stringify(formData, null, 2)}\n---\n`;
    console.log('Updated frontmatter:', frontmatterContent);
    
    if (externalOnSubmit) {
      externalOnSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<FrontmatterData, 'author' | 'tags'>
  ): void => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAuthorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Author
  ): void => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      author: {
        ...prev.author,
        [field]: value,
      },
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const tagsArray = e.target.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    setFormData(prev => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleFeaturedChange = (checked: boolean): void => {
    setFormData(prev => ({
      ...prev,
      featured: checked,
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Frontmatter</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">ID</label>
              <div className="flex gap-2">
                <Input
                  value={formData.id}
                  readOnly
                  className="bg-gray-50"
                />
                <Button 
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={regenerateId}
                  className="flex-shrink-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Slug</label>
              <Input
                value={formData.slug}
                onChange={(e) => handleInputChange(e, 'slug')}
                placeholder="url-friendly-slug"
                className={errors.slug ? 'border-red-500' : ''}
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange(e, 'title')}
              placeholder="Article title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Excerpt</label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange(e, 'excerpt')}
              placeholder="Social media excerpt and article headline"
              className={`min-h-[100px] ${errors.excerpt ? 'border-red-500' : ''}`}
            />
            {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date</label>
              <Input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleInputChange(e, 'date')}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 mt-6">
              <label className="text-sm font-medium">Featured Post</label>
              <Switch
                checked={formData.featured}
                onCheckedChange={handleFeaturedChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Tags</label>
            <Input
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="startups, a/b testing"
            />
            <p className="text-sm text-gray-500">Comma-separated list of tags</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Author Name</label>
              <Input
                value={formData.author.name}
                onChange={(e) => handleAuthorChange(e, 'name')}
                placeholder="Author name"
                className={errors.authorName ? 'border-red-500' : ''}
              />
              {errors.authorName && <p className="text-sm text-red-500">{errors.authorName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Author Picture</label>
              <Input
                value={formData.author.picture}
                onChange={(e) => handleAuthorChange(e, 'picture')}
                placeholder="/images/profile.jpg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Update Frontmatter</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}