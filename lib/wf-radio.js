import { createElement, defineElement, setAttr } from './base.js';

const CSS = `
label {
  font-family: var(--font-family);
  color: var(--line-color, black);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  input[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--background);
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;

    display: grid;
    place-content: center;
    cursor: inherit;
  }

  input[type="radio"]::before {
    content: "";
    width: 0.55em;
    height: 0.55em;
    border-radius: 50%;
    transform: scale(0);
    background-color: var(--line-color, black);
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }
}
`;

// Radios live in different shadow roots, so exclusivity is handled on the host elements
function peersOf(host) {
  const group = host.closest('wf-radio-group');
  const name = host.getAttribute('name');
  if (group) return Array.from(group.querySelectorAll('wf-radio'));
  if (!name) return [];
  return Array.from(host.getRootNode().querySelectorAll('wf-radio')).filter((r) => r.getAttribute('name') === name);
}

export const WfRadio = createElement({
  css: CSS,
  props: ['name', 'value', 'checked'],
  build(root, host) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    label.append(input);
    label.insertAdjacentHTML('beforeend', '<slot>Radio</slot>');
    root.appendChild(label);
    input.addEventListener('change', () => {
      if (!input.checked) return;
      for (const peer of peersOf(host)) if (peer !== host) peer.removeAttribute('checked');
      host.setAttribute('checked', '');
      host.dispatchEvent(new Event('change', { bubbles: true }));
    });
    return { input };
  },
  update({ input }, el) {
    input.checked = el.hasAttribute('checked') && el.getAttribute('checked') !== 'false';
    setAttr(input, 'name', el.name);
    setAttr(input, 'value', el.value);
  },
});

export const defineWfRadio = (tag = 'wf-radio') => defineElement(tag, WfRadio);
