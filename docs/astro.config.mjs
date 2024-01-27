import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

export default defineConfig({
  site: 'https://salteadorneo.github.io',
  base: '/Wireframe-UI',
  integrations: [
    starlight({
      title: 'Wireframe UI',
      social: {
        github: 'https://github.com/salteadorneo/Wireframe-UI'
      },
      sidebar: [
        {
          label: 'Components',
          autogenerate: {
            directory: 'components'
          }
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference'
          }
        }
      ]
    }),
    react()
  ]
});