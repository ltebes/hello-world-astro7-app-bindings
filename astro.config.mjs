import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { cloud1197Logs } from './scripts/cloud-1197-logs.mjs';

export default defineConfig({
  integrations: [cloud1197Logs({ fail: false })],
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
