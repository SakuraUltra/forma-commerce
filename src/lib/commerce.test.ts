import { beforeEach, describe, expect, it } from "vitest";
import { products, findVariant } from "./catalog";
import { catalogItem, restoreCart, validateCart } from "./cart";
import {
  createDemoOrder,
  exampleAddress,
  parseOrders,
  saveDemoOrder,
  orderStorageKey,
  advanceDemoOrder,
} from "./orders";
import {
  defaultFilters,
  filterProducts,
  parseFilters,
  priceRanges,
} from "./product-filters";
import { orderTotals } from "./store-config";
import { useCartStore } from "@/store/cart";
const id = products[0].variants[0].id;
beforeEach(() => {
  localStorage.clear();
  useCartStore.setState({ items: [] });
});

describe("catalog and discovery", () => {
  it("has a unique routable slug and consistent positive variant price for every product", () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    const variants = products.flatMap((p) => p.variants);
    expect(new Set(variants.map((v) => v.id)).size).toBe(variants.length);
    for (const product of products) {
      expect(product.variants.length).toBeGreaterThan(0);
      expect(product.price).toBeGreaterThan(0);
      for (const variant of product.variants)
        expect(findVariant(variant.id)?.product.price).toBe(variant.price);
    }
  });
  it("honours the new arrivals URL and rejects unknown filters", () => {
    const filters = parseFilters(
      new URLSearchParams("sort=newest&category=invalid"),
    );
    expect(filters.category).toBe("All");
    const sorted = filterProducts(filters);
    expect(sorted[0].slug).toBe("linen-button-down");
    expect(parseFilters(new URLSearchParams("sort=invalid"))).toEqual(
      defaultFilters,
    );
  });
  it("combines category, colour, price and ordering without mutating the catalog", () => {
    const original = products.map((p) => p.slug);
    const matches = filterProducts({
      category: "Accessories",
      color: "White",
      price: priceRanges[1],
      sort: "price-asc",
    });
    expect(matches.map((p) => p.slug)).toEqual([
      "merino-wool-beanie",
      "soy-wax-candle",
    ]);
    expect(products.map((p) => p.slug)).toEqual(original);
    expect(
      filterProducts({
        ...defaultFilters,
        category: "Watches",
        price: priceRanges[1],
      }),
    ).toEqual([]);
  });
});

describe("cart invariants", () => {
  it("merges variants, respects stock, and removes quantity zero", () => {
    const cart = useCartStore.getState();
    cart.addItem({ variantId: id });
    cart.addItem({ variantId: id });
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    expect(useCartStore.getState().totalPrice()).toBe(5998);
    cart.updateQuantity(id, 8);
    expect(() => cart.addItem({ variantId: id })).toThrow("Only 8");
    expect(useCartStore.getState().totalItems()).toBe(8);
    cart.updateQuantity(id, 0);
    expect(useCartStore.getState().items).toEqual([]);
  });
  it.each([NaN, Infinity, -1, 0, 1.5, 9])(
    "rejects invalid order quantities: %s",
    (quantity) => {
      expect(() => catalogItem(id, quantity)).toThrow();
    },
  );
  it("rejects missing or unavailable variants and duplicate lines", () => {
    expect(() => catalogItem("missing", 1)).toThrow();
    const unavailable = products
      .flatMap((p) => p.variants)
      .find((v) => v.stock === 0)!;
    expect(() => catalogItem(unavailable.id, 1)).toThrow();
    expect(() =>
      validateCart([
        { variantId: id, quantity: 1 },
        { variantId: id, quantity: 1 },
      ]),
    ).toThrow("Duplicate");
  });
  it("repairs saved carts using current catalog prices and bounded quantities", () => {
    const restored = restoreCart([
      { variantId: id, quantity: 500, price: 1 },
      { variantId: id, quantity: 2 },
      { variantId: "deleted", quantity: 1 },
      null,
      { variantId: id, quantity: -3 },
    ]);
    expect(restored).toEqual([catalogItem(id, 8)]);
    expect(restoreCart("broken")).toEqual([]);
  });
  it("restores cart after a storage reload", async () => {
    useCartStore.getState().addItem({ variantId: id });
    const persisted = localStorage.getItem("cart-storage")!;
    useCartStore.setState({ items: [] });
    localStorage.setItem("cart-storage", persisted);
    await useCartStore.persist.rehydrate();
    expect(useCartStore.getState().items).toEqual([catalogItem(id, 1)]);
  });
});

describe("demo checkout and orders", () => {
  it.each([
    [0, 0],
    [2999, 499],
    [4899, 499],
    [4900, 0],
    [5998, 0],
  ])("applies shipping consistently at subtotal %s", (subtotal, shipping) => {
    expect(orderTotals(subtotal)).toEqual({
      subtotal,
      shipping,
      total: subtotal + shipping,
    });
  });
  it("creates unique orders from catalog prices and immutable cart snapshots", () => {
    const items = [{ ...catalogItem(id, 2), price: 1 }];
    const first = createDemoOrder(items, exampleAddress);
    const second = createDemoOrder(items, exampleAddress);
    expect(first.total).toBe(5998);
    expect(first.id).not.toBe(second.id);
    items[0].quantity = 7;
    expect(first.items[0].quantity).toBe(2);
    expect(first.stage).toBe(0);
  });
  it("blocks empty carts and whitespace-only addresses", () => {
    expect(() => createDemoOrder([], exampleAddress)).toThrow("empty");
    expect(() =>
      createDemoOrder([catalogItem(id, 1)], { ...exampleAddress, name: "   " }),
    ).toThrow("shipping address");
  });
  it("persists actual orders, avoids duplicate IDs, and advances only the requested order", () => {
    const first = createDemoOrder([catalogItem(id, 1)], exampleAddress);
    const second = createDemoOrder([catalogItem(id, 2)], exampleAddress);
    saveDemoOrder(first);
    saveDemoOrder(first);
    saveDemoOrder(second);
    const saved = () => parseOrders(localStorage.getItem(orderStorageKey));
    expect(saved()).toEqual([second, first]);
    for (let i = 0; i < 5; i++) advanceDemoOrder(first.id);
    expect(saved().find((o) => o.id === first.id)?.stage).toBe(3);
    expect(saved().find((o) => o.id === second.id)?.stage).toBe(0);
    expect(() => advanceDemoOrder("missing")).toThrow("not found");
  });
  it("tolerates corrupt storage while rejecting invalid order amounts", () => {
    expect(parseOrders("broken JSON")).toEqual([]);
    expect(parseOrders('{"items":[]}')).toEqual([]);
    const order = createDemoOrder([catalogItem(id, 1)], exampleAddress);
    expect(
      parseOrders(JSON.stringify([null, {}, { ...order, total: 1 }, order])),
    ).toEqual([order]);
  });
  it("propagates storage failures so checkout can preserve the cart", () => {
    const order = createDemoOrder([catalogItem(id, 1)], exampleAddress);
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("Storage full");
      },
    } as unknown as Storage;
    expect(() => saveDemoOrder(order, storage)).toThrow("Storage full");
  });
});
