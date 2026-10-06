import { createElement, defineElement, setAttr } from './base.js';

const CSS = `
a {
  font-family: var(--font-family);
  color: var(--line-color, black) !important;
  border-bottom: var(--line-width, 2px) solid var(--line-color, black) !important;
  text-decoration: none;

  &:hover {
    border-width: 0 !important;
  }
}
`;

export const WfLink = createElement({
  css: CSS,
  props: ['href', 'target'],
  build(root) {
    const a = document.createElement('a');
    a.innerHTML = '<slot>Link</slot>';
    root.appendChild(a);
    return { a };
  },
  update({ a }, el) {
    setAttr(a, 'href', el.href);
    setAttr(a, 'target', el.target);
  },
});

export const defineWfLink = (tag = 'wf-link') => defineElement(tag, WfLink);
