import { createElement, defineElement, applyStyle } from './base.js';

const CSS = `
:host {
  display: block;
}

.track {
  height: 1rem;
  overflow: hidden;
  border-width: var(--line-width, 2px);
  border-style: solid;
  border-color: var(--line-color, black);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;

  &.sm {
    height: .6rem;
  }

  &.lg {
    height: 1.5rem;
  }

  &.xl {
    height: 2rem;
  }
}

.bar {
  height: 100%;
  background: var(--line-color, black);
}

.indeterminate .bar {
  width: 40%;
  animation: slide 1.2s ease-in-out infinite;
}

@keyframes slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(250%); }
}

@media (prefers-reduced-motion: reduce) {
  .indeterminate .bar {
    animation: none;
  }
}
`;

export const WfProgress = createElement({
  css: CSS,
  props: ['value', 'max', 'width', 'maxWidth', 'variant'],
  build(root) {
    const track = document.createElement('div');
    track.setAttribute('role', 'progressbar');
    const bar = document.createElement('div');
    bar.className = 'bar';
    track.appendChild(bar);
    root.appendChild(track);
    return { track, bar };
  },
  update({ track, bar }, el) {
    const max = Number(el.max) > 0 ? Number(el.max) : 100;
    const value = el.value === undefined || el.value === '' ? NaN : Number(el.value);
    const determinate = Number.isFinite(value);
    track.className = `track ${el.variant || ''} ${determinate ? '' : 'indeterminate'}`.trim();
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', String(max));
    if (determinate) {
      const clamped = Math.min(Math.max(value, 0), max);
      track.setAttribute('aria-valuenow', String(clamped));
      bar.style.width = `${(clamped / max) * 100}%`;
    } else {
      track.removeAttribute('aria-valuenow');
      bar.style.width = '';
    }
    applyStyle(track, { width: el.width, maxWidth: el.maxWidth });
  },
});

export const defineWfProgress = (tag = 'wf-progress') => defineElement(tag, WfProgress);
