import { createElement, defineElement, applyStyle, setAttr } from './base.js';

const CSS = `
input {
  font-family: var(--font-family);
  color: var(--line-background, black);
  background: transparent;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: .5rem 1rem;
  outline: none;
  appearance: none;
  width: 100%;
  box-sizing: border-box;

  &.sm {
    font-size: .75rem;
    padding: .25rem .5rem;
  }

  &.lg {
    font-size: 1.25rem;
    padding: .75rem 1.5rem;
  }

  &.xl {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
}
`;

export const WfInput = createElement({
  css: CSS,
  props: ['width', 'maxWidth', 'placeholder', 'variant'],
  build(root) {
    const input = document.createElement('input');
    root.appendChild(input);
    return { input };
  },
  update({ input }, el) {
    input.className = el.variant || '';
    setAttr(input, 'placeholder', el.placeholder);
    applyStyle(input, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfInput = (tag = 'wf-input') => defineElement(tag, WfInput);
