'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { NavItem, NavData } from '@/types/editor/nav';

const CONTENT_ROOT = process.cwd();

async function getDirectoryContent(dirPath: string) {
  try {
    const fullPath = path.join(CONTENT_ROOT, dirPath);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    
    return entries.map(entry => ({
      name: entry.name,
      path: path.join(dirPath, entry.name),
      type: entry.isDirectory() ? 'dir' : 'file'
    }));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
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

async function isEmptyDirectory(dirPath: string): Promise<boolean> {
  try {
    const fullPath = path.join(CONTENT_ROOT, dirPath);
    const entries = await fs.readdir(fullPath);

    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry);
      const stat = await fs.stat(entryPath);
      
      if (stat.isDirectory()) return false;
      if (stat.isFile() && /\.(mdx?|tsx?)$/.test(entry)) return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking directory ${dirPath}:`, error);
    return true;
  }
}

async function processDirectory(dirPath: string): Promise<NavItem[]> {
  const contents = await getDirectoryContent(dirPath);
  const items: NavItem[] = [];
  const directories = contents.filter(item => item.type === 'dir');
  
  for (const dir of directories) {
    if (await isEmptyDirectory(dir.path)) continue;
    
    const subItems = await processDirectory(dir.path);
    if (subItems.length > 0) {
      items.push({
        title: formatTitle(dir.name),
        url: `#${dir.path}`,
        items: subItems
      });
    }
  }

  const files = contents.filter(item => 
    item.type === 'file' && /\.(mdx?|tsx?)$/.test(item.name)
  );
  for (const file of files) {
    items.push({
      title: formatTitle(file.name),
      url: `#${file.path}`
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getNavigation(): Promise<NavData> {
  try {
    const [contentNav, draftsNav] = await Promise.all([
      processDirectory('content'),
      processDirectory('drafts')
    ]);

    const navData: NavData = {
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
  } catch (error) {
    console.error('Error generating navigation:', error);
    return {
      navMain: [
        { title: 'Content', url: '#content', items: [] },
        { title: 'Drafts', url: '#drafts', items: [] }
      ]
    };
  }
}

export async function pathExists(checkPath: string): Promise<boolean> {
  try {
    await fs.access(path.join(CONTENT_ROOT, checkPath));
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirectories() {
  const requiredDirs = ['content', 'drafts'];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(CONTENT_ROOT, dir);
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
}