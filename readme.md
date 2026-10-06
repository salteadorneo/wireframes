# Wireframes

**Wireframes** is a set of Web Components for building wireframes and prototypes in any project or framework.

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

Install the package:

```bash
npm install wireframes
```

Import it once in your application entry point. This registers all `wf-*` custom elements; no framework-specific package is required.

```js
import 'wireframes';
```

To load it without a package manager, use the CDN build:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/wireframes/lib/index.js"></script>
```

See the [project examples](https://github.com/salteadorneo/wireframes/tree/main/examples) for working integrations.

### Framework integration

The components are standard custom elements, so you can use them directly in HTML templates. Import `wireframes` once in the application entry point, or follow the framework-specific notes below.

#### React

Use the elements directly in JSX. With React 18, use kebab-case attributes such as `aspect-ratio`. For TypeScript, add `/// <reference types="wireframes/react" />`.

#### Vue

Tell Vue that `wf-*` tags are custom elements:

```js
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('wf-');
```

You can also register only selected components instead of importing the full library:

```js
import { defineWfButton } from 'wireframes';

defineWfButton();
```

#### Svelte

Import the package once from your app entry point or a component:

```svelte
<script>
  import 'wireframes';
</script>

<wf-button>Click me</wf-button>
```

In SvelteKit, import it on the client with `onMount`:

```svelte
<script>
  import { onMount } from 'svelte';

  onMount(() => import('wireframes'));
</script>
```

#### Next.js

In the App Router, load the package from a client component so its custom elements are registered in the browser:

```tsx
/// <reference types="wireframes/react" />
'use client';

import { useEffect } from 'react';

export function WireframesButton() {
  useEffect(() => {
    import('wireframes');
  }, []);

  return <wf-button>Click me</wf-button>;
}
```

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