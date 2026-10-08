import { products } from "@/lib/catalog";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";
export const metadata = { title: "About the demo" };
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        An interactive storefront
      </p>
      <h1 className="mt-4 text-4xl font-semibold">
        Small details. A complete journey.
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        {storeConfig.name} is a portfolio project and a starting point for
        building your own storefront. Explore the collection, choose a variant,
        fill a cart and follow a demo order through delivery.
      </p>
      <div className="my-10 grid gap-4 sm:grid-cols-3">
        {[
          `${products.length} sample products`,
          "No account needed",
          "No real payments",
        ].map((text) => (
          <div
            key={text}
            className="rounded-xl bg-muted/50 p-5 text-sm font-medium"
          >
            {text}
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-xl font-semibold">How to try it</h2>
      <ol className="mt-4 list-inside list-decimal space-y-3 text-muted-foreground">
        <li>Pick a product, colour and size.</li>
        <li>Add it to your cart and proceed to checkout.</li>
        <li>Keep the example address and place a demo order.</li>
        <li>Open demo delivery to advance the timeline.</li>
      </ol>
      <h2 className="mt-10 text-xl font-semibold">
        Your data stays in this browser
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Cart contents, demo orders and theme preferences are saved in browser
        storage. Use the fictional address provided; please do not enter real
        personal information. Orders do not sync across devices. You can clear
        demo order history from the orders page and remove cart items using the
        cart controls.
      </p>
      <p className="mt-4 leading-7 text-muted-foreground">
        Product photographs load from Unsplash through the image service.
        Hosting providers may receive normal web request information. This
        application does not include analytics, account registration, payment
        processing or a live shipping service.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          className="rounded-lg bg-foreground px-5 py-3 text-sm text-background"
          href="/products"
        >
          Explore the collection
        </Link>
        <a
          className="rounded-lg border px-5 py-3 text-sm"
          href={storeConfig.repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          Explore the source ↗
        </a>
      </div>
    </main>
  );
}
