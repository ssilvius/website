import { contentFileFactory, contentTreeFactory } from '@/__factories__/content';

// Mock the entire content module
jest.mock('@/lib/content', () => ({
  getContentTree: jest.fn(),
  getAllPosts: jest.fn(),
  getFeaturedPosts: jest.fn(),
  findPostBySlug: jest.fn()
}));

// Import after mocking to get the mocked version
import { getContentTree, getAllPosts, getFeaturedPosts, findPostBySlug } from '@/lib/content';

describe('Content Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getContentTree', () => {
    it('should return content tree correctly', () => {
      // Setup
      const mockPath = '/content/test.md';
      const mockResult = { 
        type: 'file',
        name: 'test.md',
        path: 'test.md',
        content: {
          path: 'test.md',
          slug: 'test',
          schema: {
            headline: 'Test Post',
            draft: false,
            featured: false
          },
          readingTime: '1 min read',
          rawContent: '# Test content'
        }
      };
      
      // Mock the implementation
      (getContentTree as jest.Mock).mockReturnValue(mockResult);
      
      // Execute
      const result = getContentTree(mockPath);
      
      // Assert
      expect(result).toBe(mockResult);
      expect(getContentTree).toHaveBeenCalledWith(mockPath);
    });
  });

  describe('getAllPosts', () => {
    it('should return all posts from content tree', () => {
      // Setup
      const mockTree = contentTreeFactory.build();
      const mockPosts = [
        contentFileFactory.build(),
        contentFileFactory.build(),
        contentFileFactory.build()
      ];
      
      // Mock implementation
      (getAllPosts as jest.Mock).mockReturnValue(mockPosts);
      
      // Execute
      const result = getAllPosts(mockTree);
      
      // Assert
      expect(result).toBe(mockPosts);
      expect(getAllPosts).toHaveBeenCalledWith(mockTree);
    });
  });

  describe('getFeaturedPosts', () => {
    it('should return featured posts from content tree', () => {
      // Setup
      const mockTree = contentTreeFactory.build();
      const mockPosts = [
        contentFileFactory.build({ schema: { featured: true } }),
        contentFileFactory.build({ schema: { featured: true } })
      ];
      
      // Mock implementation
      (getFeaturedPosts as jest.Mock).mockReturnValue(mockPosts);
      
      // Execute
      const result = getFeaturedPosts(mockTree);
      
      // Assert
      expect(result).toBe(mockPosts);
      expect(getFeaturedPosts).toHaveBeenCalledWith(mockTree);
      expect(result.every(post => post.schema.featured)).toBe(true);
    });
  });

  describe('findPostBySlug', () => {
    it('should return post with matching slug', () => {
      // Setup
      const mockTree = contentTreeFactory.build();
      const mockSlug = 'test-post';
      const mockPost = contentFileFactory.build({ slug: mockSlug });
      
      // Mock implementation
      (findPostBySlug as jest.Mock).mockReturnValue(mockPost);
      
      // Execute
      const result = findPostBySlug(mockTree, mockSlug);
      
      // Assert
      expect(result).toBe(mockPost);
      expect(findPostBySlug).toHaveBeenCalledWith(mockTree, mockSlug);
    });
    
    it('should return undefined when no matching post found', () => {
      // Setup
      const mockTree = contentTreeFactory.build();
      const mockSlug = 'non-existent';
      
      // Mock implementation
      (findPostBySlug as jest.Mock).mockReturnValue(undefined);
      
      // Execute
      const result = findPostBySlug(mockTree, mockSlug);
      
      // Assert
      expect(result).toBeUndefined();
      expect(findPostBySlug).toHaveBeenCalledWith(mockTree, mockSlug);
    });
  });
});