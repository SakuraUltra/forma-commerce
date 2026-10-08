"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useClientReady } from "@/lib/use-client-ready";
import { findVariant } from "@/lib/catalog";
import { formatMoney } from "@/lib/store-config";
import { toast } from "sonner";

export default function CartSheet() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);

  // Prevent hydration mismatch — zustand persist rehydrates after mount
  const mounted = useClientReady();
  const [open, setOpen] = useState(false);
  const changeQuantity = (id: string, quantity: number) => {
    try {
      updateQuantity(id, quantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update cart",
      );
    }
  };

  const count = mounted ? totalItems() : 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="relative cursor-pointer text-gray-700 transition-colors hover:text-gray-500 dark:text-neutral-300 dark:hover:text-white"
        aria-label="Cart"
      >
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white"
          >
            {count}
          </motion.span>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetTitle className="text-lg font-semibold">Your cart</SheetTitle>

        {/* Cart items */}
        {mounted && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-neutral-500 dark:text-neutral-400">
              Your cart is empty
            </p>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-black underline underline-offset-4 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.productName}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.variantId);
                            toast("Item removed");
                          }}
                          className="cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {formatMoney(item.price)}
                        </span>

                        {/* Quantity */}
                        <div className="flex items-center rounded border dark:border-neutral-700">
                          <button
                            onClick={() =>
                              changeQuantity(item.variantId, item.quantity - 1)
                            }
                            className="cursor-pointer px-2 py-1 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                            aria-label={`Decrease ${item.productName}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeQuantity(item.variantId, item.quantity + 1)
                            }
                            className="cursor-pointer px-2 py-1 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                            disabled={
                              item.quantity >=
                              (findVariant(item.variantId)?.variant.stock ?? 0)
                            }
                            aria-label={`Increase ${item.productName}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Subtotal
                </span>
                <span className="text-lg font-semibold">
                  {formatMoney(totalPrice())}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 block w-full rounded-lg bg-black py-3 text-center text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
