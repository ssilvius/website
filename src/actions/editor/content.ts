'use server';

import fs from 'fs'; 
import path from 'path';
import matter from 'gray-matter';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER || '';
const repo = process.env.GITHUB_REPO || '';

export type FileContent = {
  content: string;
  frontmatter: Record<string, any>;
  path: string;
  sha?: string;
  type: 'mdx' | 'md' | 'tsx';
  versions?: {
    sha: string;
    date: string;
    message: string;
    author: string;
  }[];
}

export type FileError = {
  message: string;
  code: 'NOT_FOUND' | 'UNAUTHORIZED' | 'RATE_LIMITED' | 'UND_ERR_CONNECT_TIMEOUT' | 'SERVER_ERROR' | 'UNKNOWN';
  path: string;
}

export type CommitOptions = {
  message: string;
  author?: {
    name: string;
    email: string;
  };
}

export async function getFileContent(filePath: string): Promise<FileContent | FileError> {
  try {
    const absolutePath = path.resolve(filePath);

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return {
        message: 'File not found',
        code: 'NOT_FOUND',
        path: filePath,
      };
    }

    // Read file content
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const type = filePath.endsWith('mdx') ? 'mdx' :
                filePath.endsWith('md') ? 'md' :
                'tsx';
    const versions: any[] = [];

    return {
      content,
      frontmatter,
      path: filePath,
      type,
      versions
    };
  } catch (error: any) {
    console.error(`Error reading file ${filePath}:`, error);
    return {
      message: error.message || 'Unknown error occurred',
      code: 'UNKNOWN',
      path: filePath,
    };
  }
}

export async function saveFile(
  filePath: string, 
  content: string, 
  commitOptions: CommitOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current file SHA if it exists
    let sha: string | undefined;
    try {
      const currentFile = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
      });
      
      if (!Array.isArray(currentFile.data)) {
        sha = currentFile.data.sha;
      }
    } catch (error: any) {
      if (error.status !== 404) {
        throw error;
      }
    }

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitOptions.message,
      content: Buffer.from(content).toString('base64'),
      sha,
      author: commitOptions.author ? {
        name: commitOptions.author.name,
        email: commitOptions.author.email,
      } : undefined,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error saving file:', error);
    return { 
      success: false, 
      error: error.message || 'Error saving file' 
    };
  }
}

async function getFileVersionHistory(filePath: string) {
  if (!owner || !repo) return undefined;

  try {
    const commits = await octokit.repos.listCommits({
      owner,
      repo,
      path: filePath,
    });

    return commits.data.map(commit => ({
      sha: commit.sha,
      date: commit.commit.author?.date || '',
      message: commit.commit.message,
      author: commit.commit.author?.name || 'Unknown',
    }));
  } catch (error) {
    console.error('Error fetching version history:', error);
    return undefined;
  }
}

function sanitizeContent(content: string, type: FileContent['type']): string {
  if (type === 'tsx') return content;
  
  return content
    .replace(/(\d+)\./g, '$1\\.') // Escapes numeric list indicators
    .replace(/\\`/g, '`') // Fix escaped backticks
    .replace(/\\\[/g, '[') // Fix escaped brackets
    .replace(/\\\]/g, ']')
    .trim();
}
