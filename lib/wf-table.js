import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
:host {
  display: block;
}

.wrap {
  overflow: hidden;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: var(--font-family);
  color: var(--line-color, black);
}

th,
td {
  height: var(--cell-height, 2.5rem);
  padding: .25rem .75rem;
  text-align: left;
}

th {
  background: rgba(128, 128, 128, .2);
}

tr + tr > th,
tr + tr > td {
  border-top: var(--line-width, 2px) solid var(--line-color, black);
}

th + th,
td + td {
  border-left: var(--line-width, 2px) solid var(--line-color, black);
}
`;

const MAX = 100;

function count(value, fallback) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n >= 1 ? Math.min(n, MAX) : fallback;
}

export const WfTable = createElement({
  css: CSS,
  props: ['rows', 'cols', 'header', 'width', 'maxWidth', 'cellHeight'],
  build(root) {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    const table = document.createElement('table');
    wrap.appendChild(table);
    root.appendChild(wrap);
    return { wrap, table, key: null };
  },
  update(refs, el) {
    const { wrap, table } = refs;
    const rows = count(el.rows, 3);
    const cols = count(el.cols, 3);
    const header = el.header !== undefined && el.header !== 'false';
    const key = `${rows}x${cols}:${header}`;
    if (key !== refs.key) {
      refs.key = key;
      table.replaceChildren(
        ...Array.from({ length: rows }, (_, r) => {
          const tr = document.createElement('tr');
          const tag = header && r === 0 ? 'th' : 'td';
          for (let c = 0; c < cols; c++) tr.appendChild(document.createElement(tag));
          return tr;
        }),
      );
    }
    if (el.cellHeight) table.style.setProperty('--cell-height', el.cellHeight);
    else table.style.removeProperty('--cell-height');
    applyStyle(wrap, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfTable = (tag = 'wf-table') => defineElement(tag, WfTable);
