import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import puppeteer from 'puppeteer';

const dir = path.dirname(fileURLToPath(import.meta.url));
const entry = pathToFileURL(path.join(dir, 'index.js')).href;
let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(dir, 'package.json')).href);
  await page.evaluate((url) => import(url), entry);
});

after(async () => {
  await browser?.close();
});

// Renders html and returns the shadow root HTML of the first element (without <style>)
const shadow = (html, sel = 'button') =>
  page.evaluate(
    (h, s) => {
      document.body.innerHTML = h;
      const root = document.body.firstElementChild.shadowRoot;
      return root.querySelector(s).outerHTML;
    },
    html,
    sel,
  );

test('registers all elements', async () => {
  const tags = ['button', 'checkbox', 'container', 'flex', 'grid', 'hr', 'image', 'input', 'link', 'lorem', 'p', 'tabs', 'tab-header', 'tab-content', 'title', 'video'];
  const missing = await page.evaluate((t) => t.filter((n) => !customElements.get(`wf-${n}`)), tags);
  assert.deepEqual(missing, []);
});

test('injects global styles once', async () => {
  const n = await page.evaluate(() => document.head.querySelectorAll('style[data-wireframes]').length);
  assert.equal(n, 1);
});

test('button', async () => {
  assert.equal(await shadow('<wf-button></wf-button>'), '<button class=""><slot>Button</slot></button>');
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-button variant="sm">Test</wf-button>';
    const el = document.querySelector('wf-button');
    const b = el.shadowRoot.querySelector('button');
    const cls = b.className;
    el.backgroundColor = 'red';
    el.variant = 'xl';
    el.setAttribute('border-color', 'blue');
    return { text: el.textContent, cls, bg: b.style.background, after: b.className, border: b.style.borderColor, attr: el.getAttribute('background-color') };
  });
  assert.deepEqual(res, { text: 'Test', cls: 'sm', bg: 'red', after: 'xl', border: 'blue', attr: 'red' });
});

test('properties set before upgrade are kept', async () => {
  const cls = await page.evaluate(() => {
    const el = document.createElement('wf-button');
    el.variant = 'lg';
    document.body.replaceChildren(el);
    return el.shadowRoot.querySelector('button').className;
  });
  assert.equal(cls, 'lg');
});

test('checkbox', async () => {
  assert.equal(await shadow('<wf-checkbox></wf-checkbox>', 'label'), '<label><input type="checkbox"><slot>Checkbox</slot></label>');
});

test('container sets host styles', async () => {
  const s = await page.evaluate(() => {
    document.body.innerHTML = '<wf-container width="150px" padding="24px"></wf-container>';
    const el = document.querySelector('wf-container');
    return [el.style.width, el.style.padding];
  });
  assert.deepEqual(s, ['150px', '24px']);
});

test('flex and grid', async () => {
  const flex = await page.evaluate(() => {
    document.body.innerHTML = '<wf-flex gap="2rem" align-items="center" flex-wrap="wrap"></wf-flex>';
    const d = document.querySelector('wf-flex').shadowRoot.querySelector('div');
    return [d.className, d.style.gap, d.style.alignItems, d.style.flexWrap];
  });
  assert.deepEqual(flex, ['flex', '2rem', 'center', 'wrap']);
  const grid = await page.evaluate(() => {
    document.body.innerHTML = '<wf-grid gap="1rem" justify-items="center"></wf-grid>';
    const d = document.querySelector('wf-grid').shadowRoot.querySelector('div');
    return [d.className, d.style.gap, d.style.justifyItems];
  });
  assert.deepEqual(grid, ['grid', '1rem', 'center']);
});

test('hr', async () => {
  assert.equal(await shadow('<wf-hr width="220px"></wf-hr>', 'hr'), '<hr style="width: 220px;">');
});

test('image', async () => {
  assert.equal(await shadow('<wf-image width="50px"></wf-image>', 'div'), '<div class="img empty" style="width: 50px;"></div>');
  assert.equal(await shadow('<wf-image text="User"></wf-image>', 'div'), '<div class="img">User</div>');
});

test('input', async () => {
  assert.equal(await shadow('<wf-input placeholder="Name" variant="lg"></wf-input>', 'input'), '<input class="lg" placeholder="Name">');
});

test('link', async () => {
  assert.equal(await shadow('<wf-link href="/x" target="_blank"></wf-link>', 'a'), '<a href="/x" target="_blank"><slot>Link</slot></a>');
});

test('lorem', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-lorem></wf-lorem><wf-lorem words="5"></wf-lorem><wf-lorem words="9999"></wf-lorem>';
    return Array.from(document.querySelectorAll('wf-lorem')).map((e) => e.textContent.split(' ').length);
  });
  assert.equal(res[0], 2);
  assert.equal(res[1], 5);
  assert.ok(res[2] > 50);
});

test('p', async () => {
  assert.equal(await shadow('<wf-p text-align="center" font-size="20px">x</wf-p>', 'p'), '<p style="font-size: 20px; text-align: center;"><slot></slot></p>');
});

test('title switches tag and keeps content', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-title tag="h3" variant="sm">Hi</wf-title>';
    const el = document.querySelector('wf-title');
    const first = el.shadowRoot.querySelector('h3').className;
    el.tag = 'h5';
    const h5 = !!el.shadowRoot.querySelector('h5 > slot');
    el.tag = 'script';
    return { first, h5, fallback: el.shadowRoot.querySelector('h1') !== null, text: el.textContent };
  });
  assert.deepEqual(res, { first: 'sm', h5: true, fallback: true, text: 'Hi' });
});

test('video', async () => {
  const s = await page.evaluate(() => {
    document.body.innerHTML = '<wf-video width="300px"></wf-video>';
    const d = document.querySelector('wf-video').shadowRoot.querySelector('div');
    return [d.style.width, d.style.aspectRatio, !!d.querySelector('svg')];
  });
  assert.deepEqual(s, ['300px', '16 / 9', true]);
});

const TABS = `
<wf-tabs>
  <wf-tab-header slot="header" name="a">A</wf-tab-header>
  <wf-tab-header slot="header" name="b">B</wf-tab-header>
  <wf-tab-content slot="content" name="a">content a</wf-tab-content>
  <wf-tab-content slot="content" name="b">content b</wf-tab-content>
</wf-tabs>`;

const visible = () =>
  Array.from(document.querySelectorAll('wf-tab-content'))
    .filter((c) => getComputedStyle(c).display !== 'none')
    .map((c) => c.textContent);

test('tabs select first tab and switch on click', async () => {
  const res = await page.evaluate(
    async (html, vis) => {
      document.body.innerHTML = html;
      const state = (v) => ({
        visible: eval(`(${v})`)(),
        selected: Array.from(document.querySelectorAll('wf-tab-header[selected]')).map((h) => h.getAttribute('name')),
        cls: Array.from(document.querySelectorAll('wf-tab-header')).map((h) => h.shadowRoot.querySelector('div').classList.contains('selected')),
      });
      const initial = state(vis);
      document.querySelectorAll('wf-tab-header')[1].shadowRoot.querySelector('div').click();
      return { initial, clicked: state(vis) };
    },
    TABS,
    visible.toString(),
  );
  assert.deepEqual(res.initial, { visible: ['content a'], selected: ['a'], cls: [true, false] });
  assert.deepEqual(res.clicked, { visible: ['content b'], selected: ['b'], cls: [false, true] });
});

test('nested tabs do not interfere', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = `
<wf-tabs id="outer">
  <wf-tab-header slot="header" name="o1">O1</wf-tab-header>
  <wf-tab-header slot="header" name="o2">O2</wf-tab-header>
  <wf-tab-content slot="content" name="o1">
    <wf-tabs id="inner">
      <wf-tab-header slot="header" name="i1">I1</wf-tab-header>
      <wf-tab-header slot="header" name="i2">I2</wf-tab-header>
      <wf-tab-content slot="content" name="i1">c1</wf-tab-content>
      <wf-tab-content slot="content" name="i2">c2</wf-tab-content>
    </wf-tabs>
  </wf-tab-content>
  <wf-tab-content slot="content" name="o2">o2 content</wf-tab-content>
</wf-tabs>`;
    document.querySelector('#inner wf-tab-header[name=i2]').shadowRoot.querySelector('div').click();
    const sel = (id) => Array.from(document.querySelectorAll(`#${id} > wf-tab-header[selected]`)).map((h) => h.getAttribute('name'));
    return { outer: sel('outer'), inner: sel('inner') };
  });
  assert.deepEqual(res, { outer: ['o1'], inner: ['i2'] });
});
