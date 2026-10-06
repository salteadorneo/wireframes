import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
:host {
  display: inline-block;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
`;

export const WfContainer = createElement({
  css: CSS,
  props: ['width', 'padding'],
  build(root) {
    root.appendChild(document.createElement('slot'));
  },
  update(_refs, el) {
    applyStyle(el, { width: el.width, padding: el.padding });
  },
});

export const defineWfContainer = (tag = 'wf-container') => defineElement(tag, WfContainer);
