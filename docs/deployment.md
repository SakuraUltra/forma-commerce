# Deploying the demo

## Local production check

```bash
npm ci
npm run lint
npm run test:run
npm run build
npm run start
```

Use Node.js 22.22+ and install development dependencies during the build (Tailwind and TypeScript are build tools). No database, seed or payment configuration is needed. Google font fetching at build time and Unsplash image delivery require network access.

## Vercel

1. Import your fork/repository in Vercel, using the Next.js preset and the repository root.
2. Select Node.js 22.x; use `npm ci` to install and `npm run build` to build.
3. Set `NEXT_PUBLIC_SITE_URL` to your public production URL, including `https://`.
4. Deploy. If you learn the final URL only after the first deployment, update the variable and redeploy.
5. Replace the repository's homepage link only after the public deployment passes the checks below.

The previous `my-shop-seven-iota.vercel.app` address returned `DEPLOYMENT_NOT_FOUND` during inspection. A successful build alone does not restore that alias. The repository owner must have access to the Vercel project and its production domain.

## Other Next.js hosts

This app also runs with `npm run build` followed by `npm run start`. Set the environment variable before building because public configuration is included in the client bundle. Use a Next.js-compatible Node host; the app includes dynamic order routes and is not configured for plain static file hosting.

## Verify the deployed site

- Home, product listing, all product details and sale pages load.
- `Products → choose variant → cart → checkout → Place demo order` produces the selected items and calculated total.
- Refreshing the order URL restores the order in the same browser.
- An order URL opened in a different browser shows the missing-order message.
- A cart below the shipping threshold has the configured demo shipping charge; one at or above it ships free.
- Mobile navigation, search, filters and theme switching work.
- `robots.txt` and `sitemap.xml` use the production origin, not localhost or the old alias.
- No page asks for payment credentials or represents the demo as a real purchase.

## Environment variables

Only `NEXT_PUBLIC_SITE_URL` is needed for correct production canonical URLs. It is a **public URL**, not a secret. See `.env.example`.
