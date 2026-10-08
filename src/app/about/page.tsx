import { products } from "@/lib/catalog";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";
export const metadata = { title: "About the demo" };
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        An interactive storefront
      </p>
      <h1 className="mt-5 max-w-xl font-display text-5xl leading-[1.1] tracking-tight md:text-6xl">
        Small details. A complete journey.
      </h1>
      <p className="mt-7 text-base leading-8 text-muted-foreground">
        {storeConfig.name} is a portfolio project and a starting point for
        building your own storefront. Explore the collection, choose a variant,
        fill a cart and follow a demo order through delivery.
      </p>
      <div className="my-12 grid gap-3 sm:grid-cols-3">
        {[
          `${products.length} sample products`,
          "No account needed",
          "No real payments",
        ].map((text) => (
          <div
            key={text}
            className="rounded-lg border border-border bg-muted/50 p-5 text-center text-xs font-medium text-primary"
          >
            {text}
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-display text-3xl">How to try it</h2>
      <ol className="mt-5 list-inside list-decimal space-y-3 text-sm leading-7 text-muted-foreground marker:text-primary">
        <li>Pick a product, colour and size.</li>
        <li>Add it to your cart and proceed to checkout.</li>
        <li>Keep the example address and place a demo order.</li>
        <li>Open demo delivery to advance the timeline.</li>
      </ol>
      <h2 className="mt-12 border-t border-border pt-10 font-display text-3xl">
        Your data stays in this browser
      </h2>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        Cart contents, demo orders and theme preferences are saved in browser
        storage. Use the fictional address provided; please do not enter real
        personal information. Orders do not sync across devices. You can clear
        demo order history from the orders page and remove cart items using the
        cart controls.
      </p>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        Product photographs load from Unsplash through the image service.
        Hosting providers may receive normal web request information. This
        application does not include analytics, account registration, payment
        processing or a live shipping service.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          className="rounded-md bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="/products"
        >
          Explore the collection
        </Link>
        <a
          className="rounded-md border border-border px-6 py-3.5 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
