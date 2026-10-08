import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";

export default function HeroBanner() {
  return (
    <section className="border-b" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between px-6 pb-10 pt-12 sm:px-10 sm:pt-16 lg:px-14 lg:py-16 xl:px-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span className="h-px w-7 bg-current" aria-hidden="true" />A
              slower kind of everyday
            </p>
            <h1
              id="hero-heading"
              className="mt-7 font-display text-[clamp(3.75rem,6.6vw,6.5rem)] leading-[0.98] tracking-[-0.055em]"
            >
              Less noise.
              <br />
              <span className="italic">More you.</span>
            </h1>
            <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
              Easy layers. Thoughtful details. Discover everyday pieces that
              make getting dressed feel a little more like you.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex min-h-12 items-center justify-between gap-10 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore the collection
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 flex items-end justify-between border-t pt-5 lg:mt-14">
            <div>
              <p className="eyebrow text-muted-foreground">The everyday edit</p>
              <p className="mt-2 text-xs">
                Clothing, accessories & little rituals.
              </p>
            </div>
            <ArrowDownRight size={24} strokeWidth={1} aria-hidden="true" />
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden bg-[#dedbd2] sm:min-h-[480px] lg:min-h-[650px]">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
            alt="A sunlit boutique with clothing rails, natural wood and green plants"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover object-[60%_center]"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
          <span className="eyebrow absolute right-6 top-6 border border-white/50 px-3 py-2 text-white sm:right-10 sm:top-8">
            {storeConfig.name} / THE EDIT
          </span>
          <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between gap-6 text-white sm:bottom-10 sm:left-10 sm:right-10">
            <p className="max-w-[260px] font-display text-3xl leading-tight sm:text-4xl">
              Room for the
              <br />
              things you love.
            </p>
            <span className="pb-1 text-xs tracking-[0.15em]">
              01 — EVERYDAY
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-[11px] tracking-[0.13em] sm:gap-x-14">
        <Link href="/products?category=Clothing" className="collection-link">
          CLOTHING <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
        <Link href="/products?category=Accessories" className="collection-link">
          ACCESSORIES <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
        <Link href="/products?category=Watches" className="collection-link">
          WATCHES <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
