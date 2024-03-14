import mdx from '@astrojs/mdx'; // eslint-disable-line import/no-unresolved
import react from '@astrojs/react'; // eslint-disable-line import/no-unresolved
import sitemap from '@astrojs/sitemap'; // eslint-disable-line import/no-unresolved
import tailwind from '@astrojs/tailwind'; // eslint-disable-line import/no-unresolved
import { defineConfig } from 'astro/config'; // eslint-disable-line import/no-unresolved
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://akihiro-tj.dev',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  server: {
    port: 8000,
  },
  markdown: {
    remarkPlugins: [[remarkToc, { heading: '目次', maxDepth: 3 }]],
  },
});
