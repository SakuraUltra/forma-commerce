import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catalogItem, restoreCart, type CartItem } from "@/lib/cart";
export type { CartItem } from "@/lib/cart";

type CartState = {
  items: CartItem[];
  addItem: (item: Pick<CartItem, "variantId">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: ({ variantId }) => {
        const existing = get().items.find(
          (item) => item.variantId === variantId,
        );
        const item = catalogItem(variantId, (existing?.quantity ?? 0) + 1);
        set({
          items: existing
            ? get().items.map((current) =>
                current.variantId === variantId ? item : current,
              )
            : [...get().items, item],
        });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((item) => item.variantId !== id) }),
      updateQuantity: (id, quantity) => {
        if (!get().items.some((item) => item.variantId === id)) return;
        if (quantity === 0) return get().removeItem(id);
        const updated = catalogItem(id, quantity);
        set({
          items: get().items.map((item) =>
            item.variantId === id ? updated : item,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({
        ...current,
        items: restoreCart(
          (persisted as { items?: unknown } | undefined)?.items,
        ),
      }),
    },
  ),
);
