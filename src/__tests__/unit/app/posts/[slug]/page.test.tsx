import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage from '@/app/(content)/posts/[slug]/page';
import { getContentTree, findPostBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { contentTreeFactory, contentFileFactory } from '@/__factories__';

jest.mock('@/lib/content', () => ({
  getContentTree: jest.fn(),
  findPostBySlug: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('PostPage Component', () => {
  const mockPost = contentFileFactory.build();

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
    await renderPostPage('test');

    expect(screen.getByText(mockPost.schema.headline)).toBeInTheDocument();
    expect(screen.getByText(mockPost.schema.description)).toBeInTheDocument();
    expect(screen.getByText(new Intl.DateTimeFormat('en-US').format(new Date(mockPost.schema.datePublished)))).toBeInTheDocument();
    expect(screen.getByAltText(`Image for ${mockPost.schema.headline}`)).toBeInTheDocument();
    expect(screen.getByText(mockPost.readingTime)).toBeInTheDocument();
  });

  it('calls notFound when post is not found', async () => {
    (findPostBySlug as jest.Mock).mockReturnValueOnce(undefined);

    await renderPostPage('non-existent-slug');

    expect(notFound).toHaveBeenCalled();
  });
});
