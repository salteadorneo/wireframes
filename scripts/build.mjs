import { cp, rm, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const www = path.join(root, 'www');

await rm(www, { recursive: true, force: true });
await mkdir(www, { recursive: true });

// Site pages, styles, scripts, fonts and assets
for (const entry of await readdir(path.join(root, 'src'), { withFileTypes: true })) {
  const from = path.join(root, 'src', entry.name);
  if (entry.isDirectory()) {
    if (['fonts', 'assets'].includes(entry.name)) await cp(from, path.join(www, entry.name), { recursive: true });
  } else if (/\.(html|css|js)$/.test(entry.name)) {
    await cp(from, path.join(www, entry.name));
  }
}

// Component library
await cp(path.join(root, 'lib'), path.join(www, 'lib'), {
  recursive: true,
  filter: (src) => !src.endsWith('.test.js'),
});

// CSS-only build
await cp(path.join(root, 'packages', 'cdn', 'dist'), path.join(www, 'cdn'), { recursive: true });

console.log('Site built in www/');
