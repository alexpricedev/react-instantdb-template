#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.entries(replacements).forEach(([placeholder, value]) => {
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, value);
  });
  
  fs.writeFileSync(filePath, content);
}

function replaceInDirectory(dir, replacements, extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.md']) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(file)) {
      replaceInDirectory(filePath, replacements, extensions);
    } else if (stat.isFile() && extensions.some(ext => file.endsWith(ext))) {
      replaceInFile(filePath, replacements);
    }
  });
}

async function main() {
  console.log('🚀 React + InstantDB Template Setup');
  console.log('====================================\n');
  
  const projectName = await question('📦 Project name (kebab-case): ');
  const projectTitle = await question('📋 Project title (display name): ');
  const projectDescription = await question('📝 Project description: ');
  const appId = await question('🔑 InstantDB App ID (from https://instantdb.com/dash): ');
  
  const replacements = {
    '{{PROJECT_NAME}}': projectName,
    '{{PROJECT_TITLE}}': projectTitle,
    '{{PROJECT_DESCRIPTION}}': projectDescription,
    '{{INSTANTDB_APP_ID}}': appId,
  };
  
  console.log('\n🔄 Replacing template variables...');
  
  // Replace in all relevant files
  replaceInDirectory(__dirname, replacements);
  
  // Create .env file
  const envContent = `# InstantDB Configuration
VITE_INSTANTDB_APP_ID=${appId}

# Optional: Development settings
# NODE_ENV=development
`;
  
  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  
  // Remove setup script
  fs.unlinkSync(path.join(__dirname, 'setup-template.js'));
  
  console.log('✅ Template setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. pnpm install');
  console.log('2. pnpm run dev');
  console.log('3. Customize your app in src/');
  console.log('4. Update the schema in instant.schema.ts (project root) for your data model');
  console.log('\n🧪 Testing:');
  console.log('- pnpm run test (Vitest tests)');
  
  rl.close();
}

main().catch(console.error);
