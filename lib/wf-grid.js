import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
div.grid {
  display: grid;
}
`;

export const WfGrid = createElement({
  css: CSS,
  props: ['alignItems', 'justifyContent', 'justifyItems', 'gap'],
  build(root) {
    const div = document.createElement('div');
    div.className = 'grid';
    div.innerHTML = '<slot></slot>';
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    applyStyle(div, {
      alignItems: el.alignItems,
      justifyContent: el.justifyContent,
      justifyItems: el.justifyItems,
      gap: el.gap,
    });
  },
});

export const defineWfGrid = (tag = 'wf-grid') => defineElement(tag, WfGrid);
