import { createElement, defineElement, applyStyle, setAttr } from './base.js';

const CSS = `
textarea {
  font-family: var(--font-family);
  color: var(--line-color, black);
  background: transparent;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: .5rem 1rem;
  outline: none;
  appearance: none;
  resize: vertical;
  display: block;
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

export const WfTextarea = createElement({
  css: CSS,
  props: ['width', 'maxWidth', 'placeholder', 'rows', 'variant'],
  build(root) {
    const textarea = document.createElement('textarea');
    root.appendChild(textarea);
    return { textarea };
  },
  update({ textarea }, el) {
    textarea.className = el.variant || '';
    setAttr(textarea, 'placeholder', el.placeholder);
    setAttr(textarea, 'rows', el.rows || 4);
    applyStyle(textarea, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfTextarea = (tag = 'wf-textarea') => defineElement(tag, WfTextarea);
