// Edit this file to give the template your own identity. Prices use minor units (cents).
export const storeConfig = {
  name: "FORMA",
  description:
    "Everyday pieces, thoughtfully brought together. Explore FORMA, a boutique storefront demo with a complete guest shopping journey.",
  currency: "USD",
  locale: "en-US",
  shipping: { freeFrom: 4900, standard: 499 },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  repositoryUrl: "https://github.com/SakuraUltra/forma-commerce",
};
export function formatMoney(cents: number, currency = storeConfig.currency) {
  return new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}
export function orderTotals(subtotal: number) {
  const shipping =
    subtotal === 0 || subtotal >= storeConfig.shipping.freeFrom
      ? 0
      : storeConfig.shipping.standard;
  return { subtotal, shipping, total: subtotal + shipping };
}
