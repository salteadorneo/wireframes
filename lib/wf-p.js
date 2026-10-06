import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
p {
  font-family: var(--font-family);
  color: var(--line-color, black);
  text-wrap: pretty;
  margin: 0 0 .5rem;
}
`;

export const WfP = createElement({
  css: CSS,
  props: ['fontSize', 'textAlign'],
  build(root) {
    const p = document.createElement('p');
    p.innerHTML = '<slot></slot>';
    root.appendChild(p);
    return { p };
  },
  update({ p }, el) {
    applyStyle(p, { fontSize: el.fontSize, textAlign: el.textAlign });
  },
});

export const defineWfP = (tag = 'wf-p') => defineElement(tag, WfP);
