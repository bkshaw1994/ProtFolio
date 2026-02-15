#!/usr/bin/env node

/**
 * SSR Build Configuration Helper
 *
 * This script helps configure the application for SSR builds.
 * React Scripts doesn't support direct SSR builds, so we use a hybrid approach:
 * - Client-side: React Scripts handles the build
 * - Server-side: Standard Node.js with Express
 *
 * The server renders an HTML shell that gets hydrated on the client.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 SSR Build Configuration Helper\n');

// Check if build directories exist
const clientBuild = path.join(__dirname, '../client/build');
const serverPath = path.join(__dirname, '../server');

console.log('Checking configuration...\n');

const checks = [
  {
    name: 'Client build directory',
    check: () => fs.existsSync(clientBuild),
    path: clientBuild,
  },
  {
    name: 'Server SSR module',
    check: () => fs.existsSync(path.join(serverPath, 'ssr.js')),
    path: path.join(serverPath, 'ssr.js'),
  },
  {
    name: 'Server index.js',
    check: () => fs.existsSync(path.join(serverPath, 'index.js')),
    path: path.join(serverPath, 'index.js'),
  },
  {
    name: 'Client index.server.js',
    check: () => fs.existsSync(path.join(__dirname, '../client/src/index.server.js')),
    path: path.join(__dirname, '../client/src/index.server.js'),
  },
];

const results = checks.map(({ name, check, path: checkPath }) => {
  const exists = check();
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${name}`);
  if (exists) {
    console.log(`  → ${checkPath}\n`);
  } else {
    console.log(`  ✗ Missing: ${checkPath}\n`);
  }
  return exists;
});

const allGood = results.every(r => r);

if (allGood) {
  console.log('\n✅ All SSR files are in place!\n');
  console.log('To build for SSR:');
  console.log('  1. Build client: npm run client:build');
  console.log('  2. Ensure server/index.js is configured (already done)');
  console.log('  3. Start server: npm start\n');
} else {
  console.log('\n⚠️  Some files are missing. Please ensure all SSR files are created.');
  process.exit(1);
}
