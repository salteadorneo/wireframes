import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
hr {
  border-bottom: 1px solid var(--line-color, black);
}
`;

export const WfHr = createElement({
  css: CSS,
  props: ['width'],
  build(root) {
    const hr = document.createElement('hr');
    root.appendChild(hr);
    return { hr };
  },
  update({ hr }, el) {
    applyStyle(hr, { width: el.width });
  },
});

export const defineWfHr = (tag = 'wf-hr') => defineElement(tag, WfHr);
