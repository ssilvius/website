#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { stringify } = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content');

function updateDraftStatus(filePath) {
  try {
    // Read the file
    const source = fs.readFileSync(filePath, 'utf8');
    
    // Parse front matter
    const { data: frontmatter, content } = matter(source);
    
    // Check if draft status exists
    if (frontmatter.draft === undefined) {
      console.log(`Adding draft: false to ${path.basename(filePath)}`);
      
      // Add draft: false
      frontmatter.draft = false;
      
      // Convert back to markdown with updated frontmatter
      const updatedSource = stringify(content, frontmatter);
      
      // Write back to file
      fs.writeFileSync(filePath, updatedSource);
      return true;
    } else {
      console.log(`${path.basename(filePath)} already has draft status: ${frontmatter.draft}`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // If it's a subdirectory, process it recursively
      updatedCount += processDirectory(filePath);
    } else if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
      // If it's a markdown file, update its draft status
      if (updateDraftStatus(filePath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

// Start processing
console.log('Updating draft status in markdown files...');
const updatedCount = processDirectory(contentDirectory);
console.log(`\nFinished! Updated ${updatedCount} files.`);
