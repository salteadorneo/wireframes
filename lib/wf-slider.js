import { createElement, defineElement, applyStyle, setAttr } from './base.js';

const CSS = `
:host {
  display: block;
}

input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  color: var(--line-color, black);
  width: 100%;
  height: 1.5rem;
  margin: 0;
  cursor: pointer;
  outline: none;
}

input::-webkit-slider-runnable-track {
  height: var(--line-width, 2px);
  background: var(--line-color, black);
  border-radius: 2px;
}

input::-moz-range-track {
  height: var(--line-width, 2px);
  background: var(--line-color, black);
  border-radius: 2px;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: calc((var(--line-width, 2px) - 1.1rem) / 2);
  box-sizing: border-box;
  border: var(--line-width, 2px) solid var(--line-color, black);
  border-radius: 50%;
  background: var(--background, white);
}

input::-moz-range-thumb {
  width: 1.1rem;
  height: 1.1rem;
  box-sizing: border-box;
  border: var(--line-width, 2px) solid var(--line-color, black);
  border-radius: 50%;
  background: var(--background, white);
}

input:focus-visible {
  outline: 1px dashed var(--line-color, black);
  outline-offset: 2px;
}
`;

export const WfSlider = createElement({
  css: CSS,
  props: ['width', 'maxWidth', 'min', 'max', 'step', 'value'],
  build(root, host) {
    const input = document.createElement('input');
    input.type = 'range';
    root.appendChild(input);
    input.addEventListener('input', () => host.setAttribute('value', input.value));
    input.addEventListener('change', () => host.dispatchEvent(new Event('change', { bubbles: true })));
    return { input };
  },
  update({ input }, el) {
    setAttr(input, 'min', el.min);
    setAttr(input, 'max', el.max);
    setAttr(input, 'step', el.step);
    if (el.value !== undefined && input.value !== el.value) input.value = el.value;
    applyStyle(input, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfSlider = (tag = 'wf-slider') => defineElement(tag, WfSlider);
