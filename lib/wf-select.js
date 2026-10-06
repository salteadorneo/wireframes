import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
.wrap {
  position: relative;
  display: block;
  width: 100%;
}

.wrap::after {
  content: "";
  position: absolute;
  right: 1rem;
  top: 50%;
  width: .45em;
  height: .45em;
  border-right: var(--line-width, 2px) solid var(--line-color, black);
  border-bottom: var(--line-width, 2px) solid var(--line-color, black);
  transform: translateY(-75%) rotate(45deg);
  pointer-events: none;
}

select {
  font-family: var(--font-family);
  color: var(--line-color, black);
  background: transparent;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: .5rem 2.5rem .5rem 1rem;
  outline: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &.sm {
    font-size: .75rem;
    padding: .25rem 2rem .25rem .5rem;
  }

  &.lg {
    font-size: 1.25rem;
    padding: .75rem 3rem .75rem 1.5rem;
  }

  &.xl {
    font-size: 1.5rem;
    padding: 1rem 3.5rem 1rem 2rem;
  }
}

option {
  color: black;
  background: white;
}
`;

const DEFAULT_OPTIONS = 'Option 1,Option 2,Option 3';

const parseOptions = (value) =>
  (value ?? DEFAULT_OPTIONS)
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

export const WfSelect = createElement({
  css: CSS,
  props: ['width', 'maxWidth', 'options', 'placeholder', 'value', 'variant'],
  build(root, host) {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    const select = document.createElement('select');
    wrap.appendChild(select);
    root.appendChild(wrap);
    select.addEventListener('change', () => {
      host.setAttribute('value', select.value);
      host.dispatchEvent(new Event('change', { bubbles: true }));
    });
    return { wrap, select, key: null };
  },
  update(refs, el) {
    const { wrap, select } = refs;
    const options = parseOptions(el.options);
    const key = JSON.stringify([options, el.placeholder ?? null]);
    if (key !== refs.key) {
      refs.key = key;
      select.replaceChildren();
      if (el.placeholder) {
        const placeholder = new Option(el.placeholder, '');
        placeholder.disabled = true;
        placeholder.hidden = true;
        select.appendChild(placeholder);
      }
      for (const text of options) select.appendChild(new Option(text, text));
    }
    select.value = el.value ?? (el.placeholder ? '' : options[0] ?? '');
    select.className = el.variant || '';
    applyStyle(wrap, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfSelect = (tag = 'wf-select') => defineElement(tag, WfSelect);
