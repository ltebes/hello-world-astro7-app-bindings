import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://example.com',
  base: process.env.COSMIC_MOUNT_PATH || process.env.PUBLIC_BASE_PATH || '',
  compressHTML: true,
  output: 'server',
  integrations: [
    {
      name: 'cloud-401-ddtrace-build-failure',
      hooks: {
        'astro:build:start': () => {
          throw new Error(
            '[CLOUD-401] EXPECTED_BUILD_FAILURE: intentional Acceptance build failure for dd-trace verification'
          );
        },
      },
    },
  ],
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
