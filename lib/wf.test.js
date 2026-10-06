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
  const tags = ['button', 'checkbox', 'container', 'flex', 'grid', 'hr', 'image', 'input', 'link', 'lorem', 'p', 'tabs', 'tab-header', 'tab-content', 'title', 'video', 'badge', 'progress', 'radio', 'radio-group', 'select', 'slider', 'table', 'textarea'];
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

test('textarea', async () => {
  assert.equal(await shadow('<wf-textarea placeholder="Msg" rows="6" variant="lg" width="200px"></wf-textarea>', 'textarea'), '<textarea class="lg" placeholder="Msg" rows="6" style="width: 200px;"></textarea>');
  assert.equal(await shadow('<wf-textarea></wf-textarea>', 'textarea'), '<textarea class="" rows="4"></textarea>');
});

test('select builds options, placeholder and keeps value in sync', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-select options="A, B ,C"></wf-select><wf-select placeholder="Pick" options="X,Y"></wf-select><wf-select></wf-select>';
    const [a, b, d] = Array.from(document.querySelectorAll('wf-select')).map((e) => e.shadowRoot.querySelector('select'));
    const out = { a: Array.from(a.options).map((o) => o.value), aValue: a.value, b: Array.from(b.options).map((o) => o.value), bValue: b.value, defaults: d.options.length };
    const host = document.querySelector('wf-select');
    let changes = 0;
    host.addEventListener('change', () => changes++);
    a.value = 'C';
    a.dispatchEvent(new Event('change'));
    out.attr = host.getAttribute('value');
    out.changes = changes;
    host.options = 'A,B,C,D';
    out.kept = a.value;
    host.value = 'B';
    out.set = a.value;
    return out;
  });
  assert.deepEqual(res, { a: ['A', 'B', 'C'], aValue: 'A', b: ['', 'X', 'Y'], bValue: '', defaults: 3, attr: 'C', changes: 1, kept: 'C', set: 'B' });
});

test('radio is exclusive within a group and by name', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = `<wf-radio-group direction="row" gap="1rem"><wf-radio value="a" checked>A</wf-radio><wf-radio value="b">B</wf-radio></wf-radio-group>
      <wf-radio id="n1" name="n">1</wf-radio><wf-radio id="n2" name="n" checked>2</wf-radio><wf-radio id="solo">3</wf-radio>`;
    const [a, b] = document.querySelectorAll('wf-radio-group wf-radio');
    const input = (el) => el.shadowRoot.querySelector('input');
    const click = (el) => input(el).click();
    const out = { init: [input(a).checked, input(b).checked] };
    let changes = 0;
    b.addEventListener('change', () => changes++);
    click(b);
    out.group = [a.hasAttribute('checked'), b.hasAttribute('checked'), input(a).checked, input(b).checked];
    out.changes = changes;
    const n1 = document.getElementById('n1');
    const n2 = document.getElementById('n2');
    click(n1);
    out.named = [n1.hasAttribute('checked'), n2.hasAttribute('checked'), b.hasAttribute('checked')];
    const grp = document.querySelector('wf-radio-group');
    out.role = grp.getAttribute('role');
    const div = grp.shadowRoot.querySelector('div');
    out.layout = [div.style.flexDirection, div.style.gap];
    return out;
  });
  assert.deepEqual(res, {
    init: [true, false],
    group: [false, true, false, true],
    changes: 1,
    named: [true, false, true],
    role: 'radiogroup',
    layout: ['row', '1rem'],
  });
});

test('slider', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-slider min="10" max="20" step="2" value="14" width="150px"></wf-slider>';
    const el = document.querySelector('wf-slider');
    const input = el.shadowRoot.querySelector('input');
    const out = { type: input.type, min: input.min, max: input.max, step: input.step, value: input.value, width: input.style.width };
    input.value = '18';
    input.dispatchEvent(new Event('input'));
    out.attr = el.getAttribute('value');
    el.value = 12;
    out.after = input.value;
    return out;
  });
  assert.deepEqual(res, { type: 'range', min: '10', max: '20', step: '2', value: '14', width: '150px', attr: '18', after: '12' });
});

test('badge', async () => {
  assert.equal(await shadow('<wf-badge variant="sm" color="red"></wf-badge>', 'span'), '<span class="sm" style="color: red;"><slot>Badge</slot></span>');
});

test('progress', async () => {
  const res = await page.evaluate(() => {
    document.body.innerHTML = '<wf-progress value="25"></wf-progress><wf-progress value="5" max="10" width="100px"></wf-progress><wf-progress value="500"></wf-progress><wf-progress></wf-progress>';
    return Array.from(document.querySelectorAll('wf-progress')).map((e) => {
      const track = e.shadowRoot.querySelector('.track');
      return [track.querySelector('.bar').style.width, track.getAttribute('aria-valuenow'), track.classList.contains('indeterminate'), track.style.width];
    });
  });
  assert.deepEqual(res, [
    ['25%', '25', false, ''],
    ['50%', '5', false, '100px'],
    ['100%', '100', false, ''],
    ['', null, true, ''],
  ]);
});

test('table generates empty rows and columns', async () => {
  const res = await page.evaluate(() => {
    const cells = (el) => Array.from(el.shadowRoot.querySelectorAll('tr')).map((tr) => Array.from(tr.children).map((c) => c.tagName + (c.textContent ? '!' : '')).join(','));
    document.body.innerHTML = '<wf-table rows="2" cols="3" header cell-height="3rem"></wf-table><wf-table></wf-table><wf-table rows="0" cols="abc"></wf-table><wf-table rows="9999" cols="2"></wf-table>';
    const [a, b, c, d] = document.querySelectorAll('wf-table');
    const out = { a: cells(a), b: cells(b), c: cells(c), rows: d.shadowRoot.querySelectorAll('tr').length };
    out.height = a.shadowRoot.querySelector('table').style.getPropertyValue('--cell-height');
    a.rows = 3;
    a.cols = 1;
    a.header = false;
    out.updated = cells(a);
    return out;
  });
  assert.deepEqual(res, {
    a: ['TH,TH,TH', 'TD,TD,TD'],
    b: ['TD,TD,TD', 'TD,TD,TD', 'TD,TD,TD'],
    c: ['TD,TD,TD', 'TD,TD,TD', 'TD,TD,TD'],
    rows: 100,
    height: '3rem',
    updated: ['TD', 'TD', 'TD'],
  });
});
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
