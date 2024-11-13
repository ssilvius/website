'use server'

import { Octokit } from '@octokit/rest';
import { Base64 } from 'js-base64';
import matter from 'gray-matter';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER || '';
const repo = process.env.GITHUB_REPO || '';

export type FileContent = {
  content: string;
  frontmatter: Record<string, any>;
  path: string;
  sha: string;
}

export async function getFileContent(path: string): Promise<FileContent | null> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (Array.isArray(response.data)) {
      throw new Error('Path points to a directory, not a file');
    }

    if ('type' in response.data && response.data.type === 'file') {
      const { content: encodedContent, sha } = response.data;
      
      if (!encodedContent) {
        throw new Error('No content found in file');
      }

      const decodedContent = Base64.decode(encodedContent);
      
      // Parse the content with gray-matter to separate frontmatter
      const { data: frontmatter, content } = matter(decodedContent);

      return {
        content,
        frontmatter,
        path,
        sha
      };
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    return null;
  }
}