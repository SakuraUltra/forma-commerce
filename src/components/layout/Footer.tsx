import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export default function Footer() {
  return (
    <footer className="bg-[#293523] text-[#f4f3e9]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 sm:grid-cols-[2fr_1fr_1fr] sm:px-10 lg:px-14 lg:py-16 xl:px-20">
        <div>
          <Link href="/" className="text-3xl font-medium tracking-[0.18em]">
            {storeConfig.name}
          </Link>
          <p className="mt-5 max-w-xs font-display text-2xl leading-snug">
            A little more room
            <br />
            for the everyday.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-6 text-[#c4ccbb]">
            A thoughtfully simple shopping demo.
            <br />
            Explore freely. Make it your own.
          </p>
        </div>
        <div>
          <h2 className="eyebrow mb-5 text-[#c4ccbb]">The collection</h2>
          <div className="flex flex-col items-start gap-3.5 text-xs">
            <Link href="/products" className="collection-link">
              All pieces
            </Link>
            <Link
              href="/products?category=Clothing"
              className="collection-link"
            >
              Clothing
            </Link>
            <Link
              href="/products?category=Accessories"
              className="collection-link"
            >
              Accessories
            </Link>
            <Link href="/products?category=Watches" className="collection-link">
              Watches
            </Link>
            <Link href="/on-sale" className="collection-link">
              The sale edit
            </Link>
          </div>
        </div>
        <div>
          <h2 className="eyebrow mb-5 text-[#c4ccbb]">A little more</h2>
          <div className="flex flex-col items-start gap-3.5 text-xs">
            <Link href="/orders" className="collection-link">
              Your demo orders
            </Link>
            <Link href="/about" className="collection-link">
              About & privacy
            </Link>
            <a
              href={storeConfig.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="collection-link"
            >
              Source on GitHub <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 border-t border-[#f4f3e9]/15 px-6 py-5 text-[10px] leading-5 text-[#c4ccbb] sm:px-10 lg:px-14 xl:px-20">
        <span>
          {storeConfig.name} · An open-source storefront by SakuraUltra.
        </span>
        <span>
          Demo only · No real payments or shipments · Imagery by Unsplash
        </span>
      </div>
    </footer>
  );
}
