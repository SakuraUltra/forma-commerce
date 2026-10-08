"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCartStore } from "@/store/cart";
import { useClientReady } from "@/lib/use-client-ready";
import {
  createDemoOrder,
  exampleAddress,
  saveDemoOrder,
  type ShippingAddress,
} from "@/lib/orders";
import { formatMoney, orderTotals, storeConfig } from "@/lib/store-config";
import { Check, LockKeyhole } from "lucide-react";

const labels: Record<keyof ShippingAddress, string> = {
  name: "Full name",
  address: "Street address",
  city: "City",
  postalCode: "Postal code",
  country: "Country",
};
export default function CheckoutContent() {
  const ready = useClientReady();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [address, setAddress] = useState<ShippingAddress>({
    ...exampleAddress,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false);
  const router = useRouter();
  const totals = orderTotals(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  if (!ready)
    return (
      <p className="p-12" role="status">
        Loading your cart…
      </p>
    );
  if (!items.length && !submitting)
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="my-4 text-muted-foreground">
          Find something you like before checking out.
        </p>
        <Link className="underline" href="/products">
          Browse products
        </Link>
      </div>
    );
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link
        href="/products"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Continue shopping
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Demo checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Try the full experience. No payment, emails or shipments.
      </p>
      <form
        className="mt-10 grid gap-10 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (submitted.current) return;
          submitted.current = true;
          setSubmitting(true);
          setError("");
          try {
            const order = createDemoOrder(items, address);
            saveDemoOrder(order);
            clearCart();
            router.push(`/orders/${order.id}`);
          } catch (cause) {
            submitted.current = false;
            setSubmitting(false);
            setError(
              cause instanceof Error
                ? cause.message
                : "Could not save your order. Enable browser storage and try again.",
            );
          }
        }}
      >
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Shipping details</h2>
            <button
              type="button"
              onClick={() => setAddress({ ...exampleAddress })}
              className="text-sm underline"
            >
              Use example details
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Use fictional details. This demo saves orders in this browser only.
          </p>
          <div className="mt-6 space-y-4">
            {(Object.keys(labels) as (keyof ShippingAddress)[]).map((field) => (
              <label key={field} className="block text-sm font-medium">
                {labels[field]}
                <input
                  required
                  maxLength={200}
                  autoComplete="off"
                  name={field}
                  value={address[field]}
                  onChange={(event) =>
                    setAddress({ ...address, [field]: event.target.value })
                  }
                  className="mt-2 block w-full rounded-lg border bg-background px-3 py-2.5"
                />
              </label>
            ))}
          </div>
          <div className="mt-8 rounded-xl border p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <LockKeyhole size={18} /> Simulated payment
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No card details needed. Placing a demo order will never charge
              you.
            </p>
          </div>
        </section>
        <section className="h-fit rounded-2xl bg-muted/50 p-6 md:p-8">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="my-6 divide-y">
            {items.map((item) => (
              <li
                key={item.variantId}
                className="flex justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.color} / {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span className="shrink-0">
                  {formatMoney(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatMoney(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Demo shipping</dt>
              <dd>{totals.shipping ? formatMoney(totals.shipping) : "Free"}</dd>
            </div>
            <div className="flex justify-between border-t pt-4 text-lg font-semibold">
              <dt>Demo total</dt>
              <dd>{formatMoney(totals.total)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            Free shipping from {formatMoney(storeConfig.shipping.freeFrom)}.
            Taxes are not calculated in this demo.
          </p>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
            >
              {error}
            </p>
          )}
          <button
            disabled={submitting || !items.length}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 font-medium text-background disabled:opacity-50"
          >
            <Check size={18} />
            {submitting ? "Saving your order…" : "Place demo order"}
          </button>
        </section>
      </form>
    </div>
  );
}
