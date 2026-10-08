import { findVariant } from "./catalog";
export type CartItem = {
  variantId: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};
export function catalogItem(variantId: string, quantity: number): CartItem {
  const match = findVariant(variantId);
  if (!match)
    throw new Error(
      "This product is no longer available. Remove it from your cart.",
    );
  if (!Number.isSafeInteger(quantity) || quantity < 1)
    throw new Error("Choose a whole-number quantity of at least one.");
  const { product, variant } = match;
  if (quantity > variant.stock)
    throw new Error(
      `Only ${variant.stock} available for ${product.name} (${variant.color}, ${variant.size}).`,
    );
  return {
    variantId,
    quantity,
    productName: product.name,
    color: variant.color,
    size: variant.size,
    price: variant.price,
    image: product.image,
  };
}
// Only IDs and quantities are trusted from persistence; names and prices come from the catalog.
export function restoreCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result = new Map<string, CartItem>();
  for (const item of value) {
    if (
      !item ||
      typeof item.variantId !== "string" ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1
    )
      continue;
    const match = findVariant(item.variantId);
    if (!match || match.variant.stock < 1) continue;
    const quantity = Math.min(
      match.variant.stock,
      (result.get(item.variantId)?.quantity ?? 0) + item.quantity,
    );
    result.set(item.variantId, catalogItem(item.variantId, quantity));
  }
  return [...result.values()];
}
export function validateCart(
  items: Pick<CartItem, "variantId" | "quantity">[],
) {
  if (!items.length) throw new Error("Your cart is empty.");
  if (new Set(items.map((item) => item.variantId)).size !== items.length)
    throw new Error("Duplicate cart item. Please update your cart.");
  return items.map((item) => catalogItem(item.variantId, item.quantity));
}
