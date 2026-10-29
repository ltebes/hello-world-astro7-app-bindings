# hello-world-astro7-app-bindings

## CLOUD-1197: controlled build failure

Temporary QA branch `test/cloud-1197-failed-build`, based on main commit
`343bd3b1e114753ab941d8dd7fe966d672e77a92`. Do not merge this branch into main.

Deploy this branch through the SAI EU dashboard with the Cloudflare Containers
builder enabled for the initiating identity. Open the deployment while building.
The Astro build hook prints `[CLOUD-1197] START`, then six `LIVE` lines five
seconds apart, and fails deliberately with `[CLOUD-1197] EXPECTED_BUILD_FAILURE`.
Confirm the lines arrive without refreshing, then reload after failure and
confirm the same markers and error remain available in saved logs.

The hook runs during `astro build`, even if the platform skips `npm run build`.
The branch does not change builder routing, app bindings, or dependencies.
Select main again after testing to restore the normal build.

An **Astro 7** starter for [**Webflow Cloud**](https://webflow.com/cloud) with Cloudflare bindings (D1, R2, KV) wired in.

At deploy time, Webflow Cloud provisions the configured services and injects them into your app as typed bindings — no API keys, no connection strings.

> Looking for the plain vanilla variant (no bindings)?
> See [`hello-world-astro7-app`](https://github.com/Webflow-Examples/hello-world-astro7-app).

[![Deploy to Webflow](https://webflow.com/img/deploy-dark.svg)](https://webflow.com/dashboard/cloud/deploy?repo=https://github.com/Webflow-Examples/hello-world-astro7-app-bindings)

> **Sentry / observability example:** the
> [`feat/sentry-integration-example`](https://github.com/Webflow-Examples/hello-world-astro7-app-bindings/tree/feat/sentry-integration-example)
> branch adds a working Sentry setup — browser + server logs on every request,
> error capture, and a recurring ping endpoint — validated on the Cloudflare
> Workers runtime Webflow Cloud uses. See its README for setup.

## Requirements

- Node **22.12+** (see `engines`).

## What's included

- Astro 7 with `@astrojs/cloudflare` adapter (SSR mode)
- Tailwind CSS v4 via `@tailwindcss/vite`
- `wrangler.json` with **D1**, **R2**, **KV · Sessions**, **KV · Flags**
- `src/pages/api/binding-status.ts` — live health check for every binding
- Branded landing page that renders real-time binding status

## Quickstart

```bash
nvm use
npm install

# Run locally (no bindings)
npm run dev

# Build + preview against real bindings (wrangler)
npm run preview
```

## Deploy to Webflow Cloud

1. Fork this repo.
2. In your Webflow site, open **Apps → Webflow Cloud → Create new app** and select this repo.
3. Webflow Cloud reads `wrangler.json` and provisions D1, R2, and KV automatically.

## Bindings map

| Binding    | Type | Declared in     |
| ---------- | ---- | --------------- |
| `DB`       | D1   | `wrangler.json` |
| `MEDIA`    | R2   | `wrangler.json` |
| `SESSIONS` | KV   | `wrangler.json` |
| `FLAGS`    | KV   | `wrangler.json` |

## Learn more

- [Webflow Cloud docs](https://developers.webflow.com/webflow-cloud)
- [Bindings guide](https://developers.webflow.com/webflow-cloud/storing-data/overview)
- [Astro on Webflow Cloud](https://developers.webflow.com/webflow-cloud/frameworks/astro)

---

Built with Astro · Deployed on Webflow Cloud.
