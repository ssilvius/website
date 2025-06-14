import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pages from '@/app/posts/page'
import { getContentTree, getAllPosts } from '@/lib/content'
import { contentTreeFactory, contentFileFactory } from '../../../factories/content';

// Mock modules
const mockNotFound = jest.fn();
jest.mock('next/navigation', () => ({
  get notFound() {
    return mockNotFound;
  }
}));

jest.mock('@/lib/content', () => ({
  getContentTree: jest.fn(),
  getAllPosts: jest.fn(),
}));

describe('Pages Component', () => {
  const mockPost = contentFileFactory.build({
    schema: {
      headline: 'Crudelis alias vergo valeo deprecator tracto aro.',
      description: 'Delinquo culpa doloremque adulescens. Cupiditas arto summisse apparatus demergo. Thesis advoco subseco absconditus admoneo.',
      datePublished: '2024-10-26T09:37:57.804Z',
      // Include other required fields from the schema
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      author: {
        '@type': 'Person',
        name: 'Test Author',
        image: 'test-image.jpg',
      },
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
    slug: 'cruciamentum-curtus-assumenda',
  });

  beforeEach(() => {
    (getContentTree as jest.MockedFunction<typeof getContentTree>).mockReturnValue(contentTreeFactory.build());
    (getAllPosts as jest.MockedFunction<typeof getAllPosts>).mockReturnValue([mockPost]);
  });

  const renderPages = async () => {
    const pagesElement = await Pages();
    render(<>{pagesElement}</>);
  };

  it('renders the pages correctly', async () => {
    await renderPages();
    
    // Check for the heading and description
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText(/Collection of things I've written down for some reason or another/)).toBeInTheDocument();
    
    // Check for the mock post content
    expect(screen.getByText('Crudelis alias vergo valeo deprecator tracto aro.')).toBeInTheDocument();
    expect(screen.getByText('Delinquo culpa doloremque adulescens. Cupiditas arto summisse apparatus demergo. Thesis advoco subseco absconditus admoneo.')).toBeInTheDocument();
    expect(screen.getByText('10/26/2024')).toBeInTheDocument();
  });  it('renders the notFound page when there are no pages', async () => {
    (getAllPosts as jest.MockedFunction<typeof getAllPosts>).mockReturnValue([]); 
    await renderPages();
    
    expect(mockNotFound).toHaveBeenCalled();
  });
});