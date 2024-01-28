import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'wireframe-ui',
  globalStyle: 'src/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
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
        }
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
