import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family);
  font-size: 2rem;
  color: var(--line-color, black);
  text-wrap: balance;
  margin: .5rem 0;

  &.xs {
    font-size: 1.2rem;
  }

  &.sm {
    font-size: 1.5rem;
  }

  &.lg {
    font-size: 2.5rem;
  }

  &.xl {
    font-size: 3rem;
  }
}
`;

const TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const WfTitle = createElement({
  css: CSS,
  props: ['tag', 'fontWeight', 'textAlign', 'variant'],
  build(root) {
    const heading = document.createElement('h1');
    heading.innerHTML = '<slot></slot>';
    root.appendChild(heading);
    return { heading };
  },
  update(refs, el) {
    const tag = TAGS.includes(el.tag) ? el.tag : 'h1';
    if (refs.heading.localName !== tag) {
      const next = document.createElement(tag);
      next.append(...refs.heading.childNodes);
      refs.heading.replaceWith(next);
      refs.heading = next;
    }
    refs.heading.className = el.variant || '';
    applyStyle(refs.heading, { fontWeight: el.fontWeight, textAlign: el.textAlign });
  },
});

export const defineWfTitle = (tag = 'wf-title') => defineElement(tag, WfTitle);
