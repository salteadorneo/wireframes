import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
div.video {
  display: flex;
  justify-content: center;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  position: relative;
  background-color: var(--background, white);
  background-image:
    linear-gradient(to top left,
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

  & > svg {
    fill: var(--background);
  }
}
`;

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=".1" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
</svg>`;

export const WfVideo = createElement({
  css: CSS,
  props: ['width', 'maxWidth', 'height', 'aspectRatio', 'margin'],
  build(root) {
    const div = document.createElement('div');
    div.className = 'video';
    div.innerHTML = SVG;
    root.appendChild(div);
    return { div };
  },
  update({ div }, el) {
    applyStyle(div, {
      width: el.width,
      maxWidth: el.maxWidth,
      height: el.height,
      aspectRatio: el.aspectRatio ?? '16 / 9',
      margin: el.margin,
    });
  },
});

export const defineWfVideo = (tag = 'wf-video') => defineElement(tag, WfVideo);
