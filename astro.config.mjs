import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [{
    name: 'cloud-1198-build-failure',
    hooks: {
      'astro:build:start': () => {
        throw new Error('CLOUD-1198: intentional build failure for SAI EU validation');
      },
    },
  }],
  site: 'https://example.com',
  base: process.env.COSMIC_MOUNT_PATH || process.env.PUBLIC_BASE_PATH || '',
  compressHTML: true,
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
