import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { ContentFile, ContentTree, ContentPostingSchema } from '@/types/content';
import { SiteConfig } from '@/types/site';

const contentDirectory = path.join(process.cwd(), 'content');

const siteConfig: Readonly<SiteConfig> = {
  name: 'Sean Silvius',
  url: 'https://sean.silvius.me',
  twitterHandle: 'ssilvius',
  defaultAuthor: 'Sean Silvius',
  featuredCount: 6,
  organization: 'sean.silvius.me',
  logo: '/logo.svg',
};

const parseMarkdownToSchema = (
  source: string, 
  filePath: string, 
  slug: string
): ContentPostingSchema => {
  const { data: frontmatter, content } = matter(source);
  const wordCount = content.split(/\s+/).length;

  if (!frontmatter.title || !frontmatter.excerpt || !frontmatter.date) {
    throw new Error(`Invalid frontmatter in file: ${filePath}`);
  }

  // Generate canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/posts/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    author: {
      '@type': 'Person',
      name: frontmatter.author?.name || 'Anonymous',
      image: frontmatter.author?.image || ''
    },
    publisher: {
      '@type': "Organization",
      name: siteConfig.organization,
      logo: {
          "@type": "ImageObject",
          url: siteConfig.logo
      }
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.modified || frontmatter.date,
    image: frontmatter.image || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
      additionalType: frontmatter.type || 'Article'
    },
    keywords: (frontmatter.tags || []).join(','),
    articleBody: content,
    articleSection: frontmatter.section || 'Blog',
    wordcount: wordCount
  };
};

export const getContentTree = (dir: string = contentDirectory): ContentTree => {
  const name = path.basename(dir);
  const stats = fs.statSync(dir);

  if (!stats.isDirectory()) {
    if (path.extname(dir) === '.md' || path.extname(dir) === '.mdx') {
      const relativePath = path.relative(contentDirectory, dir);
      const slug = relativePath.replace(/\.(mdx?|markdown|md)$/, '');
      const source = fs.readFileSync(dir, 'utf8');
      const schema = parseMarkdownToSchema(source, relativePath, slug);
      
      return {
        path: relativePath,
        type: 'file',
        name,
        content: {
          path: relativePath,
          slug,
          schema,
          readingTime: readingTime(schema.articleBody).text,
          rawContent: source
        }
      };
    }
    return {
      path: path.relative(contentDirectory, dir),
      type: 'file',
      name,
    };
  }

  const children = fs
    .readdirSync(dir)
    .map(file => getContentTree(path.join(dir, file)))
    .filter(Boolean);

  return {
    path: path.relative(contentDirectory, dir),
    type: 'dir',
    name,
    children,
  };
};

export const getAllPosts = (tree: ContentTree): ContentFile[] => {
  const posts: ContentFile[] = [];
  function traverse(tree: ContentTree) {
    if (tree.type === 'file' && tree.content) {
      posts.push(tree.content);
    } else if (tree.children) {
      tree.children.forEach(traverse);
    }
  }
  traverse(tree);
  return posts.sort((a, b) => Date.parse(b.schema.datePublished) - Date.parse(a.schema.datePublished));
}

export const getFeaturedPosts = (tree: ContentTree): ContentFile[] => {
  const posts = getAllPosts(tree);
  return posts
    .sort((a, b) => Date.parse(b.schema.datePublished) - Date.parse(a.schema.datePublished))
    .slice(0, siteConfig.featuredCount);
}

export const findPostBySlug = (tree: ContentTree, slug: string): ContentFile | undefined => {
  if (tree.type === 'file' && tree.content?.slug === slug) {
    return tree.content;
  }

  if (tree.type === 'dir' && tree.children) {
    for (const child of tree.children) {
      const result = findPostBySlug(child, slug);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}
