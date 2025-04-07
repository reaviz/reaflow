import fs from 'fs';
import path from 'path';

// Copy elk-worker.min.js from node_modules to storybook-static/assets directory
const sourceFile = 'node_modules/elkjs/lib/elk-worker.min.js';
const targetDir = 'storybook-static/assets';
const targetFile = path.join(targetDir, 'elk-worker.min.js');

// Create assets directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the file
if (fs.existsSync(sourceFile)) {
  const content = fs.readFileSync(sourceFile);
  fs.writeFileSync(targetFile, content);
  console.log('Successfully copied elk-worker.min.js to storybook-static/assets directory');
} else {
  console.error('Error: Could not find elk-worker.min.js in node_modules');
}
