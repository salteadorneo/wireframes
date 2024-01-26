import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    starlight({
      title: 'Wireframe UI',
      social: {
        github: 'https://github.com/salteadorneo/wireframeui'
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