import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pages from '@/app/(content)/posts/page'
import { getContentTree, getAllPosts } from '@/lib/content'
import { contentTreeFactory, contentFileFactory } from '@/__factories__';
import { notFound } from "next/navigation";

jest.mock('next/navigation', () => ({ notFound: jest.fn(), }));

jest.mock('@/lib/content', () => ({
  getContentTree: jest.fn(),
  getAllPosts: jest.fn(),
}));

describe('Pages Component', () => {
  const mockPages = [contentFileFactory.build()];

  beforeEach(() => {
    (getContentTree as jest.Mock).mockReturnValue(contentTreeFactory.build());
    (getAllPosts as jest.Mock).mockReturnValue(mockPages);
  });

  const renderPages = async () => {
    const pagesElement = await Pages();
    render(<>{pagesElement}</>);
  };

  it('renders the pages correctly', async () => {
    await renderPages();

    const expectedDate = new Intl.DateTimeFormat('en-US').format(new Date('2024-01-01T00:00:00Z'));

    expect(screen.getByText('index')).toBeInTheDocument();
    expect(screen.getByText('collection of things I\'ve written down for some reason or another — mostly because I can\'t believe I had to say it in the first place.')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post.')).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders the notFound page when there are no pages', async () => {(
    getAllPosts as jest.Mock).mockReturnValue([]); 
    await renderPages(); 
    
    expect(notFound).toHaveBeenCalled()
  })

})