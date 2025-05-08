// filepath: /home/sean/projects/ssilvius/website/src/__factories__/content.ts
import { ContentFile, ContentTree, ContentPostingSchema } from '@/types/content';

/**
 * Factory for creating ContentFile objects for testing
 */
export const contentFileFactory = {
  build: (overrides = {}): ContentFile => ({
    path: `test-post-${Math.floor(Math.random() * 1000)}`,
    slug: `test-post-${Math.floor(Math.random() * 1000)}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Test Post',
      description: 'This is a test post description',
      author: {
        '@type': 'Person',
        name: 'Test Author',
        image: ''
      },
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: '',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'http://localhost:3000/posts/test',
        additionalType: 'Article'
      },
      keywords: 'test, mock',
      articleBody: '# Test Content\n\nThis is mock content for testing.',
      articleSection: 'Blog',
      wordcount: 50,
      featured: false,
      draft: false
    } as ContentPostingSchema,
    readingTime: '1 min',
    rawContent: '# Test Content\n\nThis is mock content for testing.',
    ...overrides,
  }),

  buildList: (count: number, overrides = {}): ContentFile[] => 
    Array.from({ length: count }, () => contentFileFactory.build(overrides)),
};

/**
 * Factory for creating ContentTree objects for testing
 */
export const contentTreeFactory = {
  build: (overrides = {}): ContentTree => ({
    name: 'content',
    path: '/content',
    type: 'dir',
    children: [
      {
        name: 'test-post-1.md',
        path: '/content/test-post-1.md',
        type: 'file',
        children: [],
      },
      {
        name: 'test-post-2.md',
        path: '/content/test-post-2.md',
        type: 'file',
        children: [],
      },
      {
        name: 'test-post-3.md',
        path: '/content/test-post-3.md',
        type: 'file',
        children: [],
      },
    ],
    ...overrides,
  }),

  /**
   * Creates a ContentTree with actual file content objects
   */
  buildWithContent: (overrides = {}): ContentTree => {
    const baseTree = contentTreeFactory.build(overrides);
    
    // Add content to each file in the tree
    if (baseTree.children) {
      baseTree.children = baseTree.children.map(child => {
        if (child.type === 'file') {
          const slug = child.name.replace(/\.md$/, '');
          return {
            ...child,
            content: contentFileFactory.build({
              slug,
              path: child.path,
              rawContent: `# ${slug}\n\nThis is content for ${slug}.`,
            }),
          };
        }
        return child;
      });
    }
    
    return baseTree;
  },
  
  /**
   * Creates a ContentTree with a nested directory structure
   */
  buildNested: (overrides = {}): ContentTree => ({
    name: 'content',
    path: '/content',
    type: 'dir',
    children: [
      {
        name: 'category-1',
        path: '/content/category-1',
        type: 'dir',
        children: [
          {
            name: 'nested-post-1.md',
            path: '/content/category-1/nested-post-1.md',
            type: 'file',
            children: [],
            content: contentFileFactory.build({
              slug: 'nested-post-1',
              path: '/content/category-1/nested-post-1.md',
            }),
          },
        ],
      },
      {
        name: 'test-post-1.md',
        path: '/content/test-post-1.md',
        type: 'file',
        children: [],
        content: contentFileFactory.build({
          slug: 'test-post-1',
          path: '/content/test-post-1.md',
        }),
      },
    ],
    ...overrides,
  }),
};