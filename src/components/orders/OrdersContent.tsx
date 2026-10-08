"use client";
import Link from "next/link";
import { useState } from "react";
import { Package, CheckCircle2, Circle } from "lucide-react";
import { useOrders } from "@/lib/use-orders";
import { useClientReady } from "@/lib/use-client-ready";
import { advanceDemoOrder, clearDemoOrders, orderStages } from "@/lib/orders";
import { formatMoney } from "@/lib/store-config";

export default function OrdersContent({
  id,
  tracking = false,
}: {
  id?: string;
  tracking?: boolean;
}) {
  const orders = useOrders();
  const ready = useClientReady();
  const [error, setError] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const act = (action: () => void) => {
    try {
      action();
      setError("");
    } catch {
      setError("Could not update browser storage. Please try again.");
    }
  };
  if (!ready)
    return (
      <p className="p-12" role="status">
        Loading your orders…
      </p>
    );
  const order = orders.find((saved) => saved.id === id);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Link
        href={id ? "/orders" : "/products"}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← {id ? "All demo orders" : "Continue shopping"}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">
        {id ? (tracking ? "Demo delivery" : "Demo order") : "Your demo orders"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        Saved on this browser. No real purchase or delivery takes place.
      </p>
      {error && (
        <p role="alert" className="mt-4 text-red-600">
          {error}
        </p>
      )}
      {id ? (
        !order ? (
          <div className="my-12 rounded-xl border p-8">
            <h2 className="text-xl font-medium">
              Order not found in this browser
            </h2>
            <p className="my-3 text-muted-foreground">
              It may have been created on another device or cleared from
              storage.
            </p>
            <Link className="underline" href="/products">
              Start a new demo order
            </Link>
          </div>
        ) : (
          <>
            <div className="my-8 rounded-xl border p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900">
                  {orderStages[order.stage]} · Demo
                </span>
                <time
                  className="text-sm text-muted-foreground"
                  dateTime={order.createdAt}
                >
                  {new Date(order.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="mt-4 break-all font-mono text-xs text-muted-foreground">
                {order.id}
              </p>
            </div>
            {tracking ? (
              <section className="rounded-xl border p-6">
                <h2 className="text-lg font-semibold">
                  Explore the delivery timeline
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Advance each step to preview the experience. This is not a
                  live carrier feed.
                </p>
                <ol className="my-8 space-y-6">
                  {orderStages.map((stage, index) => (
                    <li
                      key={stage}
                      className={`flex items-center gap-3 ${index > order.stage ? "text-muted-foreground" : ""}`}
                    >
                      {index <= order.stage ? (
                        <CheckCircle2 size={22} className="text-emerald-600" />
                      ) : (
                        <Circle size={22} />
                      )}
                      <span>{stage}</span>
                      {index === order.stage && (
                        <span className="text-xs">Current demo stage</span>
                      )}
                    </li>
                  ))}
                </ol>
                <button
                  disabled={order.stage === orderStages.length - 1}
                  onClick={() => act(() => advanceDemoOrder(order.id))}
                  className="rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background disabled:opacity-40"
                >
                  {order.stage === orderStages.length - 1
                    ? "Demo complete"
                    : "Simulate next delivery step"}
                </button>
                <Link
                  className="ml-4 inline-block py-3 text-sm underline"
                  href={`/orders/${order.id}`}
                >
                  Order details
                </Link>
              </section>
            ) : (
              <>
                <ul className="divide-y rounded-xl border px-6">
                  {order.items.map((item) => (
                    <li
                      key={item.variantId}
                      className="flex justify-between gap-4 py-5"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.color} / {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <span>
                        {formatMoney(
                          item.price * item.quantity,
                          order.currency,
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="my-8 grid gap-8 sm:grid-cols-2">
                  <section>
                    <h2 className="font-semibold">Demo shipping address</h2>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {Object.values(order.shippingAddress).join("\n")}
                    </p>
                  </section>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{formatMoney(order.subtotal, order.currency)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Demo shipping</dt>
                      <dd>
                        {order.shipping
                          ? formatMoney(order.shipping, order.currency)
                          : "Free"}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t pt-3 font-semibold">
                      <dt>Demo total · No charge</dt>
                      <dd>{formatMoney(order.total, order.currency)}</dd>
                    </div>
                  </dl>
                </div>
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background"
                  href={`/orders/${order.id}/tracking`}
                >
                  <Package size={18} /> Explore demo delivery
                </Link>
              </>
            )}
          </>
        )
      ) : orders.length ? (
        <>
          <ul className="my-8 space-y-4">
            {orders.map((saved) => (
              <li key={saved.id}>
                <Link
                  href={`/orders/${saved.id}`}
                  className="block rounded-xl border p-6 transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <span className="font-medium">
                      {saved.items[0].productName}
                      {saved.items.length > 1
                        ? ` + ${saved.items.length - 1} more`
                        : ""}
                    </span>
                    <span>{formatMoney(saved.total, saved.currency)}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {new Date(saved.createdAt).toLocaleDateString()} ·{" "}
                    {orderStages[saved.stage]} ·{" "}
                    {saved.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items
                  </p>
                  <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                    {saved.id}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          {confirmClear ? (
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span>Delete all demo orders from this browser?</span>
              <button
                className="text-red-600 underline"
                onClick={() =>
                  act(() => {
                    clearDemoOrders();
                    setConfirmClear(false);
                  })
                }
              >
                Delete demo orders
              </button>
              <button
                className="underline"
                onClick={() => setConfirmClear(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-sm text-muted-foreground underline"
              onClick={() => setConfirmClear(true)}
            >
              Clear demo order history
            </button>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <Package className="mx-auto mb-4 text-muted-foreground" size={36} />
          <h2 className="text-xl font-medium">No orders yet</h2>
          <p className="my-3 text-muted-foreground">
            Place a demo order to see your items and try the delivery timeline.
          </p>
          <Link
            className="mt-3 inline-block rounded-lg bg-foreground px-5 py-3 text-sm text-background"
            href="/products"
          >
            Browse products
          </Link>
        </div>
      )}
    </div>
  );
}
