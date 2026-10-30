# hello-world-astro7-app-bindings

## Temporary CLOUD-401 Acceptance test

This branch deliberately fails `astro build` with
`[CLOUD-401] EXPECTED_BUILD_FAILURE`. The failure comes from an
`astro:build:start` hook, so it also runs when Webflow Cloud invokes Astro
directly instead of the npm build script. Do not merge this fixture into `main`.

1. In **Acceptance** (`https://webflowtest.com`, not acceptance2), use a test
   environment connected to `test/cloud-401-ddtrace-build-failure` and deploy it.
2. Confirm the build log contains the marker above and the deployment reaches
   a terminal failed status. Record its deployment ID and time for Datadog.
   An install error, cancellation, or unrelated failure does not count.
3. After observing the failure, revert the commit titled
   `test: add controlled CLOUD-401 build failure` and push the revert to this
   same branch. Deploy the new commit in the **same app and environment**.
   Retrying the failed deployment's original commit will fail again.
4. Confirm the recovery build and deployment succeed. Open the mounted app
   and check its binding status cards. Record this deployment ID too.

The baseline is `main` at `343bd3b1e114753ab941d8dd7fe966d672e77a92`.
Reverting the fixture commit restores that source tree without changing
dependencies or binding declarations. An environment whose first deployment
is this intentional failure has no earlier successful version to serve.

For CLOUD-401, correlate the failed builder trace/logs and the successful
recovery builder/deployer traces in Datadog, verifying SDK version `5.131.1`.
This tests a normal application build failure, not a deployer failure or an
abruptly killed container.

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
