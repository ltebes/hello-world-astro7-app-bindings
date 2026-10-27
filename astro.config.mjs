import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [{
    name: 'cloud-1198-slow-build',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        logger.info('CLOUD-1198: waiting 120 seconds for dashboard validation');
        await new Promise((resolve) => setTimeout(resolve, 120_000));
        logger.info('CLOUD-1198: wait complete; continuing the normal build');
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
