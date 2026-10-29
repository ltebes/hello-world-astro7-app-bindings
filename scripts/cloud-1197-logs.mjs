import { setTimeout as delay } from 'node:timers/promises';

// Run inside Astro: Webflow Cloud may invoke `astro build` without npm scripts.
export function cloud1197Logs({ fail }) {
  return {
    name: 'cloud-1197-log-probe',
    hooks: {
      'astro:build:start': async () => {
        console.log(`[CLOUD-1197] START expected=${fail ? 'failure' : 'success'}`);
        for (let step = 1; step <= 6; step += 1) {
          await delay(5000);
          console.log(`[CLOUD-1197] LIVE ${step}/6 ${new Date().toISOString()}`);
        }
        if (fail) {
          throw new Error('[CLOUD-1197] EXPECTED_BUILD_FAILURE');
        }
        console.log('[CLOUD-1197] PROBE_COMPLETE continuing normal Astro build');
      },
      'astro:build:done': () => {
        console.log('[CLOUD-1197] BUILD_SUCCESS');
      },
    },
  };
}
