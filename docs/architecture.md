# Architecture and extension guide

## Responsibilities

| Module                       | Responsibility                                                              |
| ---------------------------- | --------------------------------------------------------------------------- |
| `src/lib/catalog.ts`         | One serializable catalog and stable variant IDs for every discovery surface |
| `src/lib/product-filters.ts` | URL input normalization, combined filters and sorting                       |
| `src/lib/cart.ts`            | Catalog-backed item creation, restored-cart repair and checkout validation  |
| `src/store/cart.ts`          | Zustand cart actions and browser persistence                                |
| `src/lib/orders.ts`          | Order snapshots, storage validation and simulated delivery progression      |
| `src/lib/use-orders.ts`      | Browser storage subscription with a stable server snapshot                  |
| `src/lib/store-config.ts`    | Branding, monetary formatting, shipping calculation and canonical URL       |

Catalog pages render through the App Router. Product pages are generated from the catalog. Interactive cart and order screens are client components. `useClientReady` prevents persisted browser data from creating a server/client hydration mismatch. Product filters use URL search parameters behind a Suspense boundary.

## Data lifecycle

- Cart key: `cart-storage`. On reload, stored IDs and quantities are checked against the current catalog. Unknown or unavailable variants are discarded, stock is capped and catalog prices replace stale values.
- Orders key: `my-shop-demo-orders-v1`. Orders preserve line-item, amount, currency, shipping-address and timestamp snapshots. Catalog changes do not rewrite past orders.
- An order is written before checkout clears the cart. Storage errors leave the user on checkout with their cart intact.
- Browser storage has capacity limits and may be unavailable in restricted browser modes. It is local convenience storage, not a database or trusted ledger.
- A storage event subscription updates order history across tabs. Cart state does not currently synchronize across tabs until reload.
- The delivery stage advances only when the visitor clicks the simulation control. No fabricated carrier, tracking number or delivery date is presented.

## Original backend scaffold

The original repository mixed database products on the home/detail pages with separate hardcoded listing/search products, so a database was required yet many listed products had no matching details. Authentication only set a browser boolean; checkout discarded the cart and opened a fixed order.

The default app now uses a coherent demo data flow. The relational model in `prisma/schema.prisma` is retained as a design reference. Unused Prisma/authentication/payment dependencies, SDK initialization and the divergent database seed are not part of the default app. The schema is not a supported backend integration and is not invoked during installation or builds.

## Adding production commerce

Implement these as a separate, tested server integration:

1. Replace catalog access with a repository/API backed by your database or commerce platform; keep stable variant IDs.
2. Add server authentication and order ownership checks. A browser flag or order URL is not authorization.
3. Recalculate prices, taxes and shipping on the server; atomically reserve inventory and reject unavailable variants.
4. Create provider checkout sessions on the server. Keep secrets out of client components and public environment variables.
5. Verify payment webhooks and use idempotency keys before marking an order paid. Do not trust a browser success redirect.
6. Persist orders and fulfillment in the database, with customer data handling and retention designed for the actual business.
7. Add integration tests for retries, duplicate notifications, payment failures, stock contention and unauthorized access.

Do not turn a `demo` flag off and assume a real commerce system exists.

## Dependency maintenance

The runtime no longer includes unused database/payment/auth SDKs. Next.js and the test runner were updated while building this version. The remaining audit findings at implementation time are in development tooling's `braces` / `micromatch` / `fast-glob` chain, with no compatible upstream fix reported. Do not blindly downgrade Next.js ESLint configuration or the UI toolkit to satisfy `npm audit --force`; inspect current advisories and test compatible updates.
