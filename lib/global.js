export const GLOBAL_CSS = `
:root {
  --line-width: 2px;
  --line-color: black;

  --color: black;
  --background: white;

  --color-hover: white;
  --background-hover: #111;

  --font-family: 'Virgil', sans-serif;
}

* {
  box-sizing: border-box;
  min-width: 0;
}

@font-face {
  font-family: 'Virgil';
  src: url('https://wireframes.salteadorneo.dev/fonts/Virgil.woff2') format('woff2'),
    url('https://wireframes.salteadorneo.dev/fonts/Virgil.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

// Variables and @font-face must live in the document; they do not work inside shadow roots
export function injectGlobalStyles() {
  if (typeof document === 'undefined' || !document.head) return;
  if (document.head.querySelector('style[data-wireframes]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-wireframes', '');
  style.textContent = GLOBAL_CSS;
  document.head.prepend(style);
}
