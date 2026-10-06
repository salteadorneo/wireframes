import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 3333;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.md': 'text/markdown; charset=utf-8',
};

// Serves src/ directly, with /lib and /cdn mapped like in the built site
function resolve(urlPath) {
  const rel = decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath);
  if (rel.startsWith('/lib/')) return path.join(root, rel);
  if (rel.startsWith('/cdn/')) return path.join(root, 'packages', 'cdn', 'dist', rel.slice(5));
  return path.join(root, 'src', rel);
}

createServer(async (req, res) => {
  const file = path.normalize(resolve(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
