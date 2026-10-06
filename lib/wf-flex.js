import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
div.flex {
  display: flex;
}
`;

export const WfFlex = createElement({
  css: CSS,
  props: ['alignItems', 'justifyContent', 'gap', 'margin', 'height', 'flexDirection', 'flexWrap'],
  build(root) {
    const div = document.createElement('div');
    div.className = 'flex';
    div.innerHTML = '<slot></slot>';
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    applyStyle(div, {
      flexDirection: el.flexDirection,
      justifyContent: el.justifyContent,
      alignItems: el.alignItems,
      gap: el.gap,
      margin: el.margin,
      height: el.height,
      flexWrap: el.flexWrap,
    });
  },
});

export const defineWfFlex = (tag = 'wf-flex') => defineElement(tag, WfFlex);
