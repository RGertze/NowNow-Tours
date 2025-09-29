#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Build Verification Check\n');

const distDir = './dist';
const requiredFiles = [
  'index.html',
  'favicon.svg', 
  '_redirects'
];

const requiredDirs = [
  'assets'
];

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('❌ dist directory not found');
  process.exit(1);
}

console.log('✅ dist directory exists');

// Check required files
for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    console.log(`✅ ${file} (${size} bytes)`);
  } else {
    console.log(`❌ ${file} missing`);
  }
}

// Check required directories
for (const dir of requiredDirs) {
  const dirPath = path.join(distDir, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    console.log(`✅ ${dir}/ directory (${files.length} files)`);
    files.forEach(file => console.log(`   - ${file}`));
  } else {
    console.log(`❌ ${dir}/ directory missing`);
  }
}

// Check index.html content
const indexPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  
  if (content.includes('assets/')) {
    console.log('✅ index.html references bundled assets');
  } else {
    console.log('⚠️  index.html may not have correct asset references');
  }
  
  if (content.includes('NowNow Tours')) {
    console.log('✅ index.html has correct title');
  } else {
    console.log('⚠️  index.html title check failed');
  }
}

console.log('\n🚀 Build verification complete!');