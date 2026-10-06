import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
div {
  display: flex;
}
`;

export const WfRadioGroup = createElement({
  css: CSS,
  props: ['direction', 'gap'],
  build(root) {
    const div = document.createElement('div');
    div.innerHTML = '<slot></slot>';
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    if (!el.hasAttribute('role')) el.setAttribute('role', 'radiogroup');
    applyStyle(div, {
      flexDirection: el.direction === 'row' ? 'row' : 'column',
      flexWrap: el.direction === 'row' ? 'wrap' : 'nowrap',
      gap: el.gap || '.5rem',
    });
  },
});

export const defineWfRadioGroup = (tag = 'wf-radio-group') => defineElement(tag, WfRadioGroup);
