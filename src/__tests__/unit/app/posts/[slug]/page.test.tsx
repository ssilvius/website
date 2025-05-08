import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage from '@/app/posts/[slug]/page';
import { getContentTree, findPostBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { contentTreeFactory, contentFileFactory } from '@/__factories__';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock the MDX component
jest.mock('@/components/ui/mdx', () => ({
  Mdx: ({ source }: { source: string }) => <div data-testid="mdx-content">{source}</div>,
}));

// Mock the content library
jest.mock('@/lib/content', () => ({
  getContentTree: jest.fn(),
  findPostBySlug: jest.fn(),
}));

describe('PostPage Component', () => {
  const mockPost = contentFileFactory.build({
    schema: {
      headline: 'Test Post Title',
      description: 'Test Post Description',
      datePublished: '2024-10-26T09:37:57.804Z',
      // Include other required fields
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      author: { '@type': 'Person', name: 'Test Author', image: 'test.jpg' },
      dateModified: '2024-10-26T09:37:57.804Z',
      image: 'test-image.jpg',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://example.com',
        additionalType: 'Article',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Test Publisher',
        logo: {
          '@type': 'ImageObject',
          url: 'test-logo.jpg',
        },
      },
      keywords: 'test, keywords',
      articleBody: 'Test article body',
      articleSection: 'Blog',
      wordcount: 100,
      featured: true,
    },
    rawContent: '# Test Content',
    readingTime: '3 min read'
  });

  beforeEach(() => {
    (getContentTree as jest.Mock).mockReturnValue(contentTreeFactory.build());
    (findPostBySlug as jest.Mock).mockReturnValue(mockPost);
    (notFound as unknown as jest.Mock).mockClear(); // Clear previous mock calls
  });

  const renderPostPage = async (slug: string) => {
    const postPageElement = await PostPage({ params: { slug } });
    render(<>{postPageElement}</>);
  };

  it('renders the post correctly', async () => {
    await renderPostPage('test-post');

    // Check for post title and meta information
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test Post Description')).toBeInTheDocument();
    expect(screen.getByText('10/26/2024')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();
    
    // Check for MDX content placeholder
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
  });

  it('calls notFound when post is not found', async () => {
    // Set up findPostBySlug to return undefined
    (findPostBySlug as jest.Mock).mockReturnValueOnce(undefined);
    
    // We need to handle the notFound() call that will happen
    // Instead of awaiting the renderPostPage call, we need to expect it to throw
    await expect(async () => {
      await PostPage({ params: { slug: 'non-existent-slug' } });
    }).rejects.toThrow();
    
    // Verify notFound was called
    expect(notFound).toHaveBeenCalled();
  });
});
