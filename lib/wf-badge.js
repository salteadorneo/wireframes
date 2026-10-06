import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
span {
  display: inline-block;
  font-family: var(--font-family);
  font-size: .85rem;
  line-height: 1.2;
  color: var(--line-color, black);
  background: transparent;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: .1rem .7rem;
  white-space: nowrap;

  &.sm {
    font-size: .7rem;
    padding: 0 .5rem;
  }

  &.lg {
    font-size: 1.05rem;
    padding: .2rem .9rem;
  }

  &.xl {
    font-size: 1.3rem;
    padding: .3rem 1.1rem;
  }
}
`;

export const WfBadge = createElement({
  css: CSS,
  props: ['backgroundColor', 'color', 'borderColor', 'variant'],
  build(root) {
    const span = document.createElement('span');
    span.innerHTML = '<slot>Badge</slot>';
    root.appendChild(span);
    return { span };
  },
  update({ span }, el) {
    span.className = el.variant || '';
    applyStyle(span, {
      background: el.backgroundColor,
      color: el.color,
      borderColor: el.borderColor,
    });
  },
});

export const defineWfBadge = (tag = 'wf-badge') => defineElement(tag, WfBadge);
