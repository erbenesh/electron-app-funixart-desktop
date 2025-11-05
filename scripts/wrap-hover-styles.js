#!/usr/bin/env node

/**
 * Script to wrap all :hover styles in @media (hover: hover) media query
 * This disables hover effects on touch devices
 * 
 * Usage: node scripts/wrap-hover-styles.js
 */

const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  'src/ui/components',
  'src/ui/sections',
  'src/ui/pages',
  'src/ui-kit/components',
  'src/ui/auth',
];

/**
 * Recursively find all CSS files in a directory
 * @param {string} dir - Directory path
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} - List of CSS files
 */
function findCSSFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findCSSFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Wrap hover rules in @media (hover: hover)
 * @param {string} cssContent - CSS file content
 * @returns {string} - Modified CSS content
 */
function wrapHoverStyles(cssContent) {
  // Skip if file is already wrapped or empty
  if (!cssContent.trim() || cssContent.includes('@media (hover: hover)')) {
    return cssContent;
  }

  // Pattern to match CSS rules with :hover
  // This matches: selector:hover { properties }
  // Supports multi-line rules and nested selectors
  const hoverPattern = /([^{}]+:hover[^{]*)\s*\{([^}]*)\}/g;
  
  let matches = [];
  let match;
  
  // Find all hover rules
  while ((match = hoverPattern.exec(cssContent)) !== null) {
    matches.push({
      fullMatch: match[0],
      selector: match[1].trim(),
      properties: match[2].trim(),
      index: match.index
    });
  }

  // If no hover rules found, return original content
  if (matches.length === 0) {
    return cssContent;
  }

  // Group consecutive hover rules
  let result = cssContent;
  let hoverRules = [];
  
  matches.forEach(match => {
    hoverRules.push(`${match.selector} {\n  ${match.properties}\n}`);
  });

  // Remove original hover rules
  matches.reverse().forEach(match => {
    result = result.substring(0, match.index) + result.substring(match.index + match.fullMatch.length);
  });

  // Add wrapped hover rules at the end of the file
  const wrappedHoverStyles = `\n\n/* Hover effects - only on devices with hover capability */\n@media (hover: hover) {\n  ${hoverRules.join('\n\n  ')}\n}\n`;
  
  result = result.trimEnd() + wrappedHoverStyles;
  
  return result;
}

/**
 * Process a single CSS file
 * @param {string} filePath - Path to CSS file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const modifiedContent = wrapHoverStyles(content);
    
    // Only write if content changed
    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`✓ Processed: ${filePath}`);
      return true;
    } else {
      console.log(`- Skipped: ${filePath} (no changes needed)`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting hover styles wrapper...\n');
  
  let totalProcessed = 0;
  let totalModified = 0;
  
  // Process each directory
  for (const dir of directories) {
    const files = findCSSFiles(dir);
    
    console.log(`\n📁 Processing directory: ${dir}`);
    console.log(`   Found ${files.length} CSS files\n`);
    
    for (const file of files) {
      totalProcessed++;
      if (processFile(file)) {
        totalModified++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Done!`);
  console.log(`   Total files processed: ${totalProcessed}`);
  console.log(`   Total files modified: ${totalModified}`);
  console.log('='.repeat(50));
}

// Run the script
try {
  main();
} catch (error) {
  console.error('Fatal error:', error);
  process.exit(1);
}

