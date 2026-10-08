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
        className="relative cursor-pointer rounded-sm text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        aria-label="Cart"
      >
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
          >
            {count}
          </motion.span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-6 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="font-display text-3xl font-normal">
          Your cart
        </SheetTitle>

        {/* Cart items */}
        {mounted && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-foreground"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-5">
                    {/* Thumbnail */}
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.variantId);
                            toast("Item removed");
                          }}
                          className="cursor-pointer rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                          aria-label={`Remove ${item.productName}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {formatMoney(item.price)}
                        </span>

                        {/* Quantity */}
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            onClick={() =>
                              changeQuantity(item.variantId, item.quantity - 1)
                            }
                            className="cursor-pointer px-2.5 py-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40"
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
                            className="cursor-pointer px-2.5 py-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40"
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
            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold">
                  {formatMoney(totalPrice())}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 block w-full rounded-md bg-primary py-3.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Checkout
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Demo checkout. No payment is taken.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
