import { createElement, defineElement } from './base.js';

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra nibh. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Sagittis purus sit amet volutpat Consequat mauris. Duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet mattis vulputate. Enim sed faucibus turpis in eu. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Nulla pharetra diam sit amet nisl suscipit. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Dis parturient montes nascetur ridiculus mus. Justo nec ultrices dui sapien eget. Enim tortor at auctor urna nunc. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc.`;

const WORDS = TEXT.split(' ');

export const WfLorem = createElement({
  props: ['words'],
  shadow: false,
  update(_refs, el) {
    const parsed = Number.parseInt(el.words, 10);
    const count = Number.isNaN(parsed) ? 2 : Math.max(parsed, 0);
    el.textContent = WORDS.slice(0, count).join(' ');
  },
});

export const defineWfLorem = (tag = 'wf-lorem') => defineElement(tag, WfLorem);
