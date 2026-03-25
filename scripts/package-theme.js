#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const doZip = args.includes('--zip');

const themeDir = path.resolve('src/theme');
const releaseDir = path.resolve('release');
const themeName = 'shopify-theme';
const outDir = path.join(releaseDir, themeName);

// Folders Shopify actually needs
const includeFolders = [
  'assets',
  'blocks',
  'config',
  'layout',
  'locales',
  'sections',
  'snippets',
  'templates',
];

// ── Helpers ────────────────────────────────────────

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return; // skip if folder doesn't exist (e.g. blocks)
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

// ── 1) Prepare release/shopify-theme/ ─────────────
console.log('📦 Packaging theme...');
cleanDir(outDir);

for (const folder of includeFolders) {
  const src = path.join(themeDir, folder);
  const dest = path.join(outDir, folder);
  if (fs.existsSync(src)) {
    copyDir(src, dest);
    console.log(`  ✓ ${folder}/`);
  } else {
    console.log(`  ⚠ skipped ${folder}/ (not found)`);
  }
}

// ── 2) Optionally zip ──────────────────────────────
if (doZip) {
  const zipPath = path.join(releaseDir, `${themeName}.zip`);
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
  execSync(`cd ${releaseDir} && zip -r ${themeName}.zip ${themeName}`);
  console.log(`\n🎉 Zip created → release/${themeName}.zip`);
} else {
  console.log(`\n🎉 Theme folder ready → release/${themeName}/`);
}
