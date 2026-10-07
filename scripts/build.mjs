import { cp, rm, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
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

// Component readmes shown in the docs
await cp(path.join(root, 'src', 'components'), path.join(www, 'components'), {
  recursive: true,
  filter: (src) => !path.extname(src) || src.endsWith('readme.md'),
});

// Component library
await cp(path.join(root, 'lib'), path.join(www, 'lib'), {
  recursive: true,
  filter: (src) => !src.endsWith('.test.js'),
});

// CSS-only build
await cp(path.join(root, 'packages', 'cdn', 'dist'), path.join(www, 'cdn'), { recursive: true });

// Sitemap and robots.txt: one entry per page, using its canonical URL (pages canonicalised elsewhere are deduplicated)
const site = 'https://wireframes.salteadorneo.dev';
const urls = new Map();
for (const entry of await readdir(www)) {
  if (!entry.endsWith('.html')) continue;
  const html = await readFile(path.join(www, entry), 'utf8');
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) continue;
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  const alternates = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)]
    .map(([tag]) => [tag.match(/hreflang=["']([^"']+)["']/i)?.[1], tag.match(/href=["']([^"']+)["']/i)?.[1]])
    .filter(([lang, href]) => lang && href);
  const loc = canonical ?? `${site}/${entry}`;
  if (!urls.has(loc) || alternates.length) urls.set(loc, alternates);
}
const lastmod = new Date().toISOString().slice(0, 10);
const entries = [...urls].sort(([a], [b]) => a.localeCompare(b)).map(([loc, alternates]) => {
  const links = alternates.map(([lang, href]) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`).join('');
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${links}\n  </url>`;
});
await writeFile(path.join(www, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);
await writeFile(path.join(www, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log('Site built in www/');
