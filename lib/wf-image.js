import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
div.img {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background, white);
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  aspect-ratio: 1 / 1;
  position: relative;
  font-family: var(--font-family);
  color: var(--line-color, black) !important;
  box-sizing: border-box;

  &.empty {
    background-image: linear-gradient(to top left,
        transparent 0%,
        transparent calc(50% - var(--line-width, 2px)),
        var(--line-color, black) 50%,
        transparent calc(50% + var(--line-width, 2px)),
        transparent 100%),
      linear-gradient(to top right,
        transparent 0%,
        transparent calc(50% - var(--line-width, 2px)),
        var(--line-color, black) 50%,
        transparent calc(50% + var(--line-width, 2px)),
        transparent 100%);
  }
}
`;

export const WfImage = createElement({
  css: CSS,
  props: ['width', 'height', 'aspectRatio', 'text', 'borderRadius'],
  build(root) {
    const div = document.createElement('div');
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    div.className = el.text ? 'img' : 'img empty';
    div.textContent = el.text || '';
    applyStyle(div, {
      width: el.width,
      height: el.height,
      aspectRatio: el.aspectRatio,
      borderRadius: el.borderRadius,
    });
  },
});

export const defineWfImage = (tag = 'wf-image') => defineElement(tag, WfImage);
