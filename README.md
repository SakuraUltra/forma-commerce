# My Shop

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**A minimal Next.js storefront with a complete, no-keys-required demo shopping journey.**

Built as a portfolio project and a reusable storefront starter: browse a shared catalog, choose variants, save a cart, place a simulated order and explore its delivery timeline.

[中文说明](docs/README.zh-CN.md) · [Architecture & extension guide](docs/architecture.md) · [Deployment](docs/deployment.md)

> This is a **demo storefront**. It does not accept payments, register accounts, send emails or ship products. Cart and order data live in the visitor's browser. Use the fictional address provided at checkout.

## Quick start

Use Node.js **22.22+** (Node 22 LTS recommended).

```bash
git clone https://github.com/SakuraUltra/my-shop.git
cd my-shop
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No `.env`, database, seed command, payment key or account is required. Internet access is needed for dependency installation, Google fonts at build time and remote product photographs.

## Try the complete journey

1. Open **Products**, filter by category/colour/price, or search with **⌘K / Ctrl+K**.
2. Choose a product colour and size. Unavailable variants cannot be added.
3. Open the cart, adjust quantities and continue to checkout.
4. Keep the example shipping address and select **Place demo order**. There is no card form.
5. View the saved order, refresh the page, then open **Explore demo delivery**.
6. Advance the simulated delivery steps. The orders page keeps your history and lets you clear it.

## Features

- **One catalog, everywhere:** home, search, filtered listings, sale items, all 12 product pages and sitemap share one data source.
- **Shareable discovery:** category, colour, price and sorting are reflected in the URL; “New arrivals” works on direct visits.
- **Persistent cart:** variant quantities survive reloads; integer validation, unavailable-product handling and per-variant stock limits.
- **Guest checkout:** catalog-based price recalculation, consistent shipping thresholds, empty-cart protection and useful storage-error feedback.
- **Saved demo orders:** unique IDs, item and price snapshots, order history, missing-order states and interactive simulated delivery.
- **Responsive interface:** mobile navigation and filters, image gallery, dark/light themes, labelled controls and a skip link.
- **Configurable branding:** store name, description, currency, shipping and canonical URL in one file.
- **Validation:** domain and component tests plus lint, TypeScript and production build checks, with a ready-to-enable CI workflow.

## Make it your own

| Change                                                               | File                                        |
| -------------------------------------------------------------------- | ------------------------------------------- |
| Store name, currency, locale, shipping threshold and repository link | `src/lib/store-config.ts`                   |
| Products, images, categories, colours, prices and sample stock       | `src/lib/catalog.ts`                        |
| Home page copy and sections                                          | `src/components/home/`                      |
| Theme and visual tokens                                              | `src/app/globals.css`                       |
| Allowed external image hosts                                         | `next.config.ts`                            |
| Public canonical URL                                                 | `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |

All monetary values are **integer cents**. The initial catalog is priced in USD. Changing `currency` changes presentation, **not exchange rates**; update catalog prices, price-filter thresholds and shipping amounts for a different market. Product photos illustrate the sample catalog and do not change when selecting a colour.

## Development

```bash
npm run lint
npm run test:run
npm run build
npm run start
```

`npm run test` starts watch mode. `npm run typecheck` performs a separate type check (the production build also checks types). A ready-to-enable GitHub Actions workflow is provided in `docs/storefront-checks.yml`. To activate it, copy it to `.github/workflows/ci.yml` using a GitHub connection with workflow-write permission. It will then check pull requests and pushes to `main`.

Tests cover stock and quantity limits, duplicate and stale cart data, price recalculation, shipping boundaries, unique order IDs, persistence, malformed saved orders, failed storage, missing orders and the guest checkout UI.

## Architecture and boundaries

Next.js App Router · React · TypeScript · Tailwind CSS · Base UI · Zustand · Vitest

```text
Shared catalog → browsing / search / product detail
                          ↓
                persistent variant cart
                          ↓
           validate catalog prices and quantities
                          ↓
         order snapshot saved to browser storage
                          ↓
              order history / demo delivery
```

This is a frontend commerce demo, not a production transaction system. Browser storage can be edited or cleared and is not an authentication or security boundary. Inventory limits apply per cart; placing orders does not reserve shared stock. Shipping is simulated and taxes are not calculated.

`prisma/schema.prisma` preserves the original relational design **as a reference only**. Prisma, Stripe and authentication are not connected to the app. The unused SDK wrappers and outdated database seed were removed from the default installation; adding production commerce requires server-side ownership and validation. See the [extension guide](docs/architecture.md).

## Deployment

Run `npm run build` and deploy to a host supporting Next.js. Set `NEXT_PUBLIC_SITE_URL` to the actual public address before the production build. Full instructions and post-deployment checks are in [docs/deployment.md](docs/deployment.md).

The repository's previous Vercel address is not advertised as a working demo until a new deployment is verified.

## Images and licensing

Sample imagery is served from Unsplash; photographs are not included under the application's code license. Updated images: [candle by Jack Baxter](https://unsplash.com/photos/a-lit-candle-in-a-glass-jar-on-a-table-fCe0oFccURY), [tote by Rahul Bhogal](https://unsplash.com/photos/white-tote-bag-lihCTIOP28U), and [watch by Lucas Kepner](https://unsplash.com/photos/a-watch-sitting-on-top-of-a-black-table-KqmdTLEji08). Replace imagery and branding before presenting the template as your own commercial store.

Application code is available under the [MIT License](LICENSE).
