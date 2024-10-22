# Wireframes

**Wireframes** is a set of components for building wireframes and prototypes with Vue.

<p align="center">
  <a href="../../LICENSE">
    <img alt="Released under the BSD license." src="https://img.shields.io/badge/license-BSD-blue.svg"  />
  </a>
  <a href="https://www.npmjs.com/package/wireframes-vue">
    <img alt="npm downloads/month" src="https://img.shields.io/npm/dm/wireframes-vue"  />
  </a>
  <a href="../../issues">
    <img alt="PRs welcome!" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"  />
  </a>
  <a href="https://twitter.com/salteadorneodev">
    <img alt="Follow me on Twitter" src="https://img.shields.io/twitter/follow/salteadorneodev.svg?label=follow+@salteadorneodev&style=social&logo=twitter"/>
  </a>
</p>

## Installation

```bash
npm install wireframes-vue@latest
```

## Usage

In your main.js file, import your component library plugin and use it:

```javascript
import { ComponentLibrary } from 'wireframes-vue';

createApp(App).use(ComponentLibrary).mount('#app');
```

In your page or component, you can now import and use your component wrappers:

```html
<template>
  <wf-title>Demo</wf-title>
  <wf-button>Click me!</wf-button>
</template>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

BSD-3-Clause
