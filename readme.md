# Wireframes

**Wireframes** is a set of components for building wireframes and prototypes with React, Vue or JavaScript.

<p align="center">
  <a href="./LICENSE">
    <img alt="Released under the BSD license." src="https://img.shields.io/badge/license-BSD-blue.svg"  />
  </a>
  <a href="https://www.npmjs.com/package/wireframes">
    <img alt="npm downloads/month" src="https://img.shields.io/npm/dm/wireframes"  />
  </a>
  <a href="../../issues">
    <img alt="PRs welcome!" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"  />
  </a>
  <a href="https://twitter.com/salteadorneodev">
    <img alt="Follow me on Twitter" src="https://img.shields.io/twitter/follow/salteadorneodev.svg?label=follow+@salteadorneodev&style=social&logo=twitter"/>
  </a>
</p>

![Wireframes](https://raw.githubusercontent.com/salteadorneo/wireframes/main/src/assets/og.png)

## Installation

```bash
npm i wireframes
```

Then import it once. It registers the `wf-*` custom elements and works in plain JavaScript, React and Vue; there are no framework-specific packages.

```js
import 'wireframes';
```

Or from a CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/wireframes/lib/index.js"></script>
```

### React

Use the elements directly in JSX. With React 18 attributes are kebab-case (`aspect-ratio`). For TypeScript, add `/// <reference types="wireframes/react" />`.

### Vue

Tell Vue that `wf-*` tags are custom elements:

```js
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('wf-');
```

You can also register only some components: `import { defineWfButton } from 'wireframes'; defineWfButton();`

## Usage

```html
<wf-image aspect-ratio="16/9" />

<wf-title>
    Hello world!
</wf-title>

<wf-button>
    Click me!
</wf-button>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

BSD-3-Clause