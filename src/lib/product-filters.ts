import { formatMoney } from "./store-config";
import { products } from "./catalog";
export type Filters = {
  category: string;
  color: string;
  price: string;
  sort: string;
};
export const defaultFilters: Filters = {
  category: "All",
  color: "All",
  price: "All",
  sort: "featured",
};
export const priceRanges = [
  "All",
  `Under ${formatMoney(3000)}`,
  `${formatMoney(3000)}–${formatMoney(6000)}`,
  `${formatMoney(6000)}–${formatMoney(10000)}`,
  `Over ${formatMoney(10000)}`,
];
export function parseFilters(params: Pick<URLSearchParams, "get">): Filters {
  const choose = (key: keyof Filters, allowed: string[]) => {
    const value = params.get(key);
    return value && allowed.includes(value) ? value : defaultFilters[key];
  };
  return {
    category: choose("category", ["All", ...products.map((p) => p.category)]),
    color: choose("color", ["All", ...products.flatMap((p) => p.colors)]),
    price: choose("price", priceRanges),
    sort: choose("sort", ["featured", "price-asc", "price-desc", "newest"]),
  };
}
function matchPrice(price: number, range: string): boolean {
  const dollars = price / 100;
  switch (range) {
    case priceRanges[1]:
      return dollars < 30;
    case priceRanges[2]:
      return dollars >= 30 && dollars <= 60;
    case priceRanges[3]:
      return dollars > 60 && dollars <= 100;
    case priceRanges[4]:
      return dollars > 100;
    default:
      return true;
  }
}

export function filterProducts(filters: Filters) {
  const result = products.filter(
    (p) =>
      (filters.category === "All" || p.category === filters.category) &&
      (filters.color === "All" || p.colors.includes(filters.color)) &&
      matchPrice(p.price, filters.price),
  );
  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "newest":
      return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default:
      return result;
  }
}
