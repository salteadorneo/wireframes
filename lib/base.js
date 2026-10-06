import { injectGlobalStyles } from './global.js';

// SSR-safe: HTMLElement does not exist on the server
export const Base = typeof HTMLElement === 'undefined' ? class {} : HTMLElement;

const sheets = new Map();

function adoptStyles(root, css) {
  if (typeof CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype) {
    let sheet = sheets.get(css);
    if (!sheet) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      sheets.set(css, sheet);
    }
    root.adoptedStyleSheets = [sheet];
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    root.appendChild(style);
  }
}

const kebab = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export function applyStyle(el, styles) {
  for (const [key, value] of Object.entries(styles)) {
    el.style[key] = value ?? '';
  }
}

/**
 * Creates a custom element class.
 *  - props: camelCase property names, mirrored to kebab-case attributes
 *  - build(root, host): runs once, returns the refs passed to update
 *  - update(refs, host): runs on connect and whenever an observed attribute changes
 *  - shadow: false renders into the light DOM (no build/styles)
 */
export function createElement({ css = '', props = [], extraAttrs = [], shadow = true, build, update, init }) {
  const attrs = props.map(kebab);

  class WfElement extends Base {
    static get observedAttributes() {
      return [...attrs, ...extraAttrs];
    }

    constructor() {
      super();
      this._refs = {};
      if (shadow) {
        const root = this.attachShadow({ mode: 'open' });
        adoptStyles(root, css);
        this._refs = (build && build(root, this)) || {};
      }
      if (init) init(this);
    }

    connectedCallback() {
      // Properties set before the element was upgraded would shadow the accessors
      for (const prop of props) {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          const value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      }
      if (update) update(this._refs, this);
    }

    attributeChangedCallback() {
      if (update) update(this._refs, this);
    }
  }

  props.forEach((prop, i) => {
    const attr = attrs[i];
    Object.defineProperty(WfElement.prototype, prop, {
      get() {
        return this.getAttribute(attr) ?? undefined;
      },
      set(value) {
        if (value === undefined || value === null || value === false) this.removeAttribute(attr);
        else this.setAttribute(attr, String(value));
      },
      configurable: true,
      enumerable: true,
    });
  });

  return WfElement;
}

export function defineElement(tag, ctor) {
  injectGlobalStyles();
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) customElements.define(tag, ctor);
}

export function setAttr(el, name, value) {
  if (value === null || value === undefined || value === '') el.removeAttribute(name);
  else el.setAttribute(name, value);
}
