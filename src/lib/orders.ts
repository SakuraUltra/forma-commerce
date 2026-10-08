import { validateCart, type CartItem } from "./cart";
import { orderTotals, storeConfig } from "./store-config";
export const orderStorageKey = "my-shop-demo-orders-v1";
export const orderEvent = "my-shop-orders-changed";
export const orderStages = [
  "Confirmed",
  "Preparing",
  "Shipped",
  "Delivered",
] as const;
export type ShippingAddress = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
export type DemoOrder = {
  id: string;
  createdAt: string;
  currency: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  stage: number;
};
export const exampleAddress: ShippingAddress = {
  name: "Alex Demo",
  address: "123 Sample Street",
  city: "Example City",
  postalCode: "00000",
  country: "United States",
};
export function createDemoOrder(
  items: CartItem[],
  address: ShippingAddress,
): DemoOrder {
  const checked = validateCart(items);
  const fields = Object.keys(exampleAddress) as (keyof ShippingAddress)[];
  const shippingAddress = { ...exampleAddress };
  for (const field of fields) {
    if (
      typeof address[field] !== "string" ||
      !address[field].trim() ||
      address[field].length > 200
    ) {
      throw new Error(
        "Please complete the demo shipping address (up to 200 characters per field).",
      );
    }
    shippingAddress[field] = address[field].trim();
  }
  return {
    id: `DEMO-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    currency: storeConfig.currency,
    items: checked,
    shippingAddress,
    ...orderTotals(
      checked.reduce((sum, item) => sum + item.price * item.quantity, 0),
    ),
    stage: 0,
  };
}
// Reject malformed saved data instead of letting it break the orders screens.
export function parseOrders(raw: string | null): DemoOrder[] {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(data)) return [];
    return data.filter((order): order is DemoOrder => {
      if (!order || typeof order !== "object") return false;
      const o = order as DemoOrder;
      if (
        typeof o.id !== "string" ||
        !/^DEMO-[\da-f-]{36}$/.test(o.id) ||
        !Number.isFinite(Date.parse(o.createdAt))
      )
        return false;
      if (
        typeof o.currency !== "string" ||
        !/^[A-Z]{3}$/.test(o.currency) ||
        !Number.isInteger(o.stage) ||
        o.stage < 0 ||
        o.stage >= orderStages.length
      )
        return false;
      if (
        !o.shippingAddress ||
        !Object.keys(exampleAddress).every(
          (key) =>
            typeof o.shippingAddress[key as keyof ShippingAddress] === "string",
        )
      )
        return false;
      if (
        !Array.isArray(o.items) ||
        !o.items.length ||
        !o.items.every(
          (item) =>
            item &&
            [
              item.variantId,
              item.productName,
              item.color,
              item.size,
              item.image,
            ].every((value) => typeof value === "string") &&
            Number.isSafeInteger(item.quantity) &&
            item.quantity > 0 &&
            Number.isSafeInteger(item.price) &&
            item.price >= 0,
        )
      )
        return false;
      return (
        [o.subtotal, o.shipping, o.total].every(
          (value) => Number.isSafeInteger(value) && value >= 0,
        ) &&
        o.subtotal ===
          o.items.reduce((sum, item) => sum + item.price * item.quantity, 0) &&
        o.total === o.subtotal + o.shipping
      );
    });
  } catch {
    return [];
  }
}
export function saveDemoOrder(
  order: DemoOrder,
  storage: Storage = localStorage,
) {
  const orders = parseOrders(storage.getItem(orderStorageKey));
  if (orders.some((saved) => saved.id === order.id)) return;
  // Complete persistence before the caller clears its cart. Storage failures propagate.
  storage.setItem(orderStorageKey, JSON.stringify([order, ...orders]));
  window.dispatchEvent(new Event(orderEvent));
}
export function advanceDemoOrder(id: string) {
  const orders = parseOrders(localStorage.getItem(orderStorageKey));
  const order = orders.find((saved) => saved.id === id);
  if (!order) throw new Error("Order not found in this browser.");
  order.stage = Math.min(orderStages.length - 1, order.stage + 1);
  localStorage.setItem(orderStorageKey, JSON.stringify(orders));
  window.dispatchEvent(new Event(orderEvent));
}
export function clearDemoOrders() {
  localStorage.removeItem(orderStorageKey);
  window.dispatchEvent(new Event(orderEvent));
}
