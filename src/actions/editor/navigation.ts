'use server'

import { Octokit } from '@octokit/rest';
import { NavItem, NavData } from '@/types/editor/nav';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER || '';
const repo = process.env.GITHUB_REPO || '';

async function getDirectoryContent(path: string) {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
}

function formatTitle(filename: string): string {
  return filename
    .replace(/\.(mdx?|tsx?)$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function processDirectory(path: string): Promise<NavItem[]> {
  const contents = await getDirectoryContent(path);
  const items: NavItem[] = [];
  
  // First pass: collect directories
  const directories = contents.filter(item => item.type === 'dir');
  for (const dir of directories) {
    const subItems = await processDirectory(dir.path);
    if (subItems.length > 0) {
      items.push({
        title: formatTitle(dir.name),
        url: `#${dir.path}`,
        items: subItems
      });
    }
  }

  // Second pass: collect files
  const files = contents.filter(item => 
    item.type === 'file' && /\.(mdx?|tsx?)$/.test(item.name)
  );
  for (const file of files) {
    items.push({
      title: formatTitle(file.name),
      url: `#${file.path}`
    });
  }

  return items;
}

export async function getNavigation(): Promise<NavData> {
  // Get versions from the root directory
  const rootContents = await getDirectoryContent('');
  const versions = rootContents
    .filter(item => item.type === 'dir' && /^\d+\.\d+/.test(item.name))
    .map(item => item.name);

  // Process content and drafts directories
  const [contentNav, draftsNav] = await Promise.all([
    processDirectory('content'),
    processDirectory('drafts')
  ]);

  // Combine into final navigation structure
  const navData: NavData = {
    versions,
    navMain: [
      {
        title: 'Content',
        url: '#content',
        items: contentNav
      },
      {
        title: 'Drafts',
        url: '#drafts',
        items: draftsNav
      }
    ]
  };

  return navData;
}