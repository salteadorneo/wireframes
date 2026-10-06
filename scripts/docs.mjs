// Generates src/components/<tag>/readme.md from lib/index.d.ts (the single source of truth).
//   node scripts/docs.mjs           write the readmes
//   node scripts/docs.mjs --check   fail if a readme is outdated or the typings do not match the runtime props
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lib = path.join(root, 'lib');
const components = path.join(root, 'src', 'components');
const check = process.argv.includes('--check');

const normalize = (text) => text.replace(/\r\n/g, '\n');
const kebab = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function parseDoc(raw = '') {
  const lines = raw
    .replace(/^\s*\/\*\*|\*\/\s*$/g, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*? ?/, '').trim())
    .filter((l, i, all) => l || (i > 0 && i < all.length - 1));
  const doc = { description: [], default: undefined, slots: [] };
  for (const line of lines) {
    const slot = line.match(/^@slot\s*(\S*)\s*(?:-\s*)?(.*)$/);
    const def = line.match(/^@default\s+(.*)$/);
    if (slot) doc.slots.push({ name: slot[1] === '-' ? '' : slot[1], description: slot[2] });
    else if (def) doc.default = def[1];
    else if (line) doc.description.push(line);
  }
  doc.description = doc.description.join(' ');
  return doc;
}

function parseTypings(source) {
  const aliases = Object.fromEntries([...source.matchAll(/^type (\w+) = (.+);$/gm)].map((m) => [m[1], m[2]]));
  const tags = Object.fromEntries([...source.matchAll(/'(wf-[\w-]+)': (Wf\w+);/g)].map((m) => [m[2], m[1]]));

  const expand = (type) => type.replace(/\b[A-Z]\w*\b/g, (name) => aliases[name] ?? name);
  const format = (type) =>
    '`' +
    expand(type)
      .split(' | ')
      .map((t) => t.replace(/'/g, '"'))
      .join(' \\| ') +
    '`';

  const result = [];
  const classRe = /(\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s*)?export declare class (\w+) extends HTMLElement \{([^}]*)\}/g;
  for (const [, docRaw, name, body] of source.matchAll(classRe)) {
    const props = [...body.matchAll(/(\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s*)?(\w+)\?: ([^;]+);/g)].map(([, raw, prop, type]) => {
      const doc = parseDoc(raw);
      return { name: prop, attr: kebab(prop), description: doc.description, type: format(type), default: doc.default ?? 'undefined' };
    });
    const doc = parseDoc(docRaw);
    result.push({ className: name, tag: tags[name], description: doc.description, slots: doc.slots, props });
  }
  return result;
}

const cell = (text) => text.replace(/\|/g, '\\|');

function table(headers, rows) {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
  const line = (cells) => `| ${cells.map((c, i) => c.padEnd(widths[i])).join(' | ')} |`;
  return [line(headers), line(widths.map((w) => '-'.repeat(w))), ...rows.map(line)].join('\n');
}

function sections(el, level) {
  const parts = [];
  if (el.props.length) {
    parts.push(
      `${level} Properties`,
      table(
        ['Property', 'Attribute', 'Description', 'Type', 'Default'],
        el.props.map((p) => [`\`${p.name}\``, `\`${p.attr}\``, cell(p.description), p.type, `\`${p.default}\``]),
      ),
    );
  }
  if (el.slots.length) {
    parts.push(
      `${level} Slots`,
      table(
        ['Slot', 'Description'],
        el.slots.map((s) => [s.name ? `\`${s.name}\`` : '', cell(s.description)]),
      ),
    );
  }
  return parts;
}

// Tab headers and contents are documented inside the wf-tabs readme
const NESTED = { 'wf-tab-header': 'wf-tabs', 'wf-tab-content': 'wf-tabs' };

function render(el, nested) {
  const parts = [`# ${el.tag}`];
  if (el.description) parts.push(el.description);
  parts.push(...sections(el, '##'));
  for (const child of nested) {
    parts.push(`### ${child.tag}`);
    if (child.description) parts.push(child.description);
    parts.push(...sections(child, '###'));
  }
  return parts.join('\n\n') + '\n';
}

// Props registered at runtime: the `props: [...]` arrays of lib/<tag>.js
async function runtimeProps(tag) {
  const file = NESTED[tag] ?? tag;
  const source = await readFile(path.join(lib, `${file}.js`), 'utf8');
  return [...source.matchAll(/^\s*props: \[([^\]]*)\]/gm)].flatMap((m) => [...m[1].matchAll(/'(\w+)'/g)].map((x) => x[1]));
}

const elements = parseTypings(await readFile(path.join(lib, 'index.d.ts'), 'utf8'));
const errors = [];

// Element files registered in lib/index.js must all be documented
const indexSource = await readFile(path.join(lib, 'index.js'), 'utf8');
const registered = [...indexSource.matchAll(/from '\.\/(wf-[\w-]+)\.js'/g)].map((m) => m[1]);
for (const file of new Set(registered)) {
  if (!elements.some((e) => e.tag === file)) errors.push(`${file}: missing from lib/index.d.ts`);
}

// Typings and runtime must declare the same props
const byFile = new Map();
for (const el of elements) {
  if (!el.tag) {
    errors.push(`${el.className}: missing from HTMLElementTagNameMap in lib/index.d.ts`);
    continue;
  }
  const file = NESTED[el.tag] ?? el.tag;
  byFile.set(file, [...(byFile.get(file) ?? []), ...el.props.map((p) => p.name)]);
}
for (const [file, typed] of byFile) {
  const actual = new Set(await runtimeProps(file));
  const declared = new Set(typed);
  for (const p of actual) if (!declared.has(p)) errors.push(`${file}: prop "${p}" is registered in the element but not typed in lib/index.d.ts`);
  for (const p of declared) if (!actual.has(p)) errors.push(`${file}: prop "${p}" is typed in lib/index.d.ts but not registered in the element`);
}

const stale = [];
for (const el of elements.filter((e) => e.tag && !NESTED[e.tag])) {
  const children = elements.filter((e) => NESTED[e.tag] === el.tag);
  const content = render(el, children);
  const file = path.join(components, el.tag, 'readme.md');
  if (check) {
    const current = await readFile(file, 'utf8').then(normalize, () => null);
    if (current !== content) stale.push(path.relative(root, file));
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);
  }
}

if (check) {
  for (const f of stale) errors.push(`${f}: outdated, run "node scripts/docs.mjs"`);
}

if (errors.length) {
  console.error(errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}
console.log(check ? 'Docs are up to date' : `Generated ${elements.filter((e) => e.tag && !NESTED[e.tag]).length} readmes`);
