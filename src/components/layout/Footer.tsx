import Link from "next/link";
import { storeConfig } from "@/lib/store-config";
export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <Link href="/" className="text-lg font-bold">
            {storeConfig.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Everyday essentials. A thoughtfully simple shopping demo.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold">Explore</h2>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link href="/products">All products</Link>
            <Link href="/products?sort=newest">New arrivals</Link>
            <Link href="/on-sale">On sale</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold">The project</h2>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link href="/orders">Your demo orders</Link>
            <Link href="/about">About & privacy</Link>
            <a
              href={storeConfig.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source on GitHub ↗
            </a>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
        Demo storefront · No real payments · Product imagery from Unsplash
      </div>
    </footer>
  );
}
