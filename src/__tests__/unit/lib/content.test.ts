import fs from 'fs';
import path from 'path';

import { getContentTree, getAllPosts, getFeaturedPosts, findPostBySlug } from '@/lib/content';
import { ContentTree } from '@/types/content';
import { contentTreeFactory, contentFileFactory } from '@/__factories__';

jest.mock('fs');
jest.mock('path');

describe('Content Library', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (path.join as jest.Mock).mockImplementation((...paths) => paths.join('/'));
    (path.basename as jest.Mock).mockImplementation((p) => p.split('/').pop());
  });

  describe('getContentTree', () => {
    it('should get content tree for markdown file', () => {
      // Setup
      const mockFileName = 'test.md';
      const mockFilePath = `content/${mockFileName}`;
      const mockStats = { isDirectory: () => false };
      const mockContentFile = contentFileFactory.build();

      // Mock filesystem operations
      (fs.statSync as jest.Mock).mockReturnValue(mockStats);
      (path.relative as jest.Mock).mockReturnValue(mockFileName);
      (path.extname as jest.Mock).mockReturnValue('.md');
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContentFile.rawContent);

      // Execute
      const result = getContentTree(mockFilePath);

      // Assert
      expect(result).toEqual({
        path: mockFileName,
        type: 'file',
        name: mockFileName,
        content: expect.objectContaining({
          path: mockFileName,
          slug: expect.any(String),
          schema: expect.objectContaining({
            '@type': 'BlogPosting',
            headline: expect.any(String)
          }),
          readingTime: expect.any(String),
          rawContent: expect.any(String)
        })
      });
    });
    
    it('should handle non-markdown files', () => {
      // Setup
      const mockFileName = 'image.png';
      const mockFilePath = `content/${mockFileName}`;
      const mockStats = { isDirectory: () => false };

      (fs.statSync as jest.Mock).mockReturnValue(mockStats);
      (path.relative as jest.Mock).mockReturnValue(mockFileName);
      (path.extname as jest.Mock).mockReturnValue('.png');

      // Execute
      const result = getContentTree(mockFilePath);

      // Assert
      expect(result).toEqual({
        path: mockFileName,
        type: 'file',
        name: mockFileName
      });
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts sorted by date', () => {
      // Setup
      const oldPost = contentFileFactory.build({
        schema: { datePublished: '2023-01-01' }
      });
      const newPost = contentFileFactory.build({
        schema: { datePublished: '2024-01-01' }
      });

      const mockTree: ContentTree = {
        path: 'content',
        type: 'dir',
        name: 'content',
        children: [
          {
            path: 'old-post.md',
            type: 'file',
            name: 'old-post.md',
            content: oldPost
          },
          {
            path: 'new-post.md',
            type: 'file',
            name: 'new-post.md',
            content: newPost
          }
        ]
      };

      // Execute
      const result = getAllPosts(mockTree);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].schema.datePublished).toBe('2024-01-01');
      expect(result[1].schema.datePublished).toBe('2023-01-01');
    });
  });

  describe('getFeaturedPosts', () => {
    it('should return only featured posts', () => {
      // Setup
      const featuredPost = contentFileFactory.build({
        schema: { featured: true }
      });
      const normalPost = contentFileFactory.build({
        schema: { featured: false }
      });

      const mockTree: ContentTree = {
        path: 'content',
        type: 'dir',
        name: 'content',
        children: [
          {
            path: 'featured.md',
            type: 'file',
            name: 'featured.md',
            content: featuredPost
          },
          {
            path: 'normal.md',
            type: 'file',
            name: 'normal.md',
            content: normalPost
          }
        ]
      };

      // Execute
      const result = getFeaturedPosts(mockTree);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].schema.featured).toBe(true);
    });
  });

  describe('findPostBySlug', () => {
    it('should find post by slug in nested directory structure', () => {
      // Setup
      const targetSlug = 'target-post';
      const targetPost = contentFileFactory.build({
        slug: targetSlug,
        schema: { headline: 'Target Post' }
      });

      const mockTree: ContentTree = {
        path: 'content',
        type: 'dir',
        name: 'content',
        children: [
          {
            path: 'category1',
            type: 'dir',
            name: 'category1',
            children: [
              {
                path: 'target-post.md',
                type: 'file',
                name: 'target-post.md',
                content: targetPost
              }
            ]
          },
          {
            path: 'other-post.md',
            type: 'file',
            name: 'other-post.md',
            content: contentFileFactory.build()
          }
        ]
      };

      // Execute
      const result = findPostBySlug(mockTree, targetSlug);

      // Assert
      expect(result).toBeDefined();
      expect(result?.slug).toBe(targetSlug);
      expect(result?.schema.headline).toBe('Target Post');
    });

    it('should return undefined for non-existent slug', () => {
      // Setup
      const mockTree = contentTreeFactory.build();

      // Execute
      const result = findPostBySlug(mockTree, 'non-existent-slug');

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
