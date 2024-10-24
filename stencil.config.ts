import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'wireframes',
  globalStyle: 'src/global/global.css',
  sourceMap: false,
  outputTargets: [
    reactOutputTarget({
      outDir: 'packages/wireframes-react/src/components/stencil-generated/',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    vueOutputTarget({
      componentCorePackage: 'wireframes',
      proxiesFile: 'packages/wireframes-vue/src/components.ts',
    }),
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      copy: [
        {
          src: '**/*.{woff,woff2}',
          dest: 'dist/fonts',
          warn: true,
        }
      ]
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '**/*.{woff,woff2}',
          dest: 'fonts',
          warn: true,
        },
        {
          src: '*.html',
          warn: true,
        },
        {
          src: 'main.css',
          warn: true,
        }
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
