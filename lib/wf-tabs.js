import { createElement, defineElement } from './base.js';

const TABS_CSS = `
.header {
  display: flex;
  gap: 10px;
  font-family: var(--font-family);
  color: var(--line-color, black);
  border-bottom: 1px solid var(--line-color, white);
}

.content {
  font-family: var(--font-family);
  color: var(--line-color, black);
  padding: 16px 0;
}
`;

const HEADER_CSS = `
div {
  cursor: default;
  padding: 4px 16px;
}

.selected {
  border-bottom: var(--line-width, 2px) solid var(--line-color, white);
}
`;

const CONTENT_CSS = `
:host(:not([selected])) {
  display: none;
}
`;

// The selected state is the `selected` attribute, so it works whatever the upgrade order of the elements
export const WfTabHeader = createElement({
  css: HEADER_CSS,
  props: ['name'],
  extraAttrs: ['selected'],
  build(root, host) {
    const div = document.createElement('div');
    div.innerHTML = '<slot></slot>';
    div.addEventListener('click', () => {
      host.dispatchEvent(new CustomEvent('selected', { detail: host, bubbles: true, composed: true }));
    });
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    div.classList.toggle('selected', el.hasAttribute('selected'));
  },
});

export const WfTabContent = createElement({
  css: CONTENT_CSS,
  props: ['name'],
  build(root) {
    const div = document.createElement('div');
    div.innerHTML = '<slot></slot>';
    root.appendChild(div);
  },
});

export const WfTabs = createElement({
  css: TABS_CSS,
  props: ['names'],
  build(root, host) {
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = '<slot name="header"></slot>';
    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = '<slot name="content"></slot>';
    root.append(header, content);

    header.firstChild.addEventListener('slotchange', () => host._sync());
    content.firstChild.addEventListener('slotchange', () => host._sync());
  },
  init(host) {
    host._current = null;
    host._sync = () => syncTabs(host);
    host.addEventListener('selected', (event) => {
      if (event.target === host || !host.contains(event.target)) return;
      host._current = event.detail.name;
      host._sync();
      event.stopPropagation();
    });
  },
  update(_refs, el) {
    el._sync();
  },
});

function ownTabs(host, tag) {
  return Array.from(host.querySelectorAll(tag)).filter((el) => el.closest('wf-tabs') === host);
}

function syncTabs(host) {
  const headers = ownTabs(host, 'wf-tab-header');
  const contents = ownTabs(host, 'wf-tab-content');
  if (!headers.length) return;

  const names = headers.map((h) => h.getAttribute('name'));
  if (host._current === null || !names.includes(host._current)) host._current = names[0];

  for (const el of [...headers, ...contents]) {
    el.toggleAttribute('selected', el.getAttribute('name') === host._current);
  }
}

export const defineWfTabs = () => {
  defineElement('wf-tab-header', WfTabHeader);
  defineElement('wf-tab-content', WfTabContent);
  defineElement('wf-tabs', WfTabs);
};
