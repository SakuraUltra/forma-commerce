import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";

export default function CollectionStory() {
  const shirt = products.find(
    (product) => product.slug === "linen-button-down",
  )!;
  return (
    <section
      className="mx-auto grid max-w-[1440px] md:grid-cols-2"
      aria-labelledby="story-heading"
    >
      <div className="relative min-h-[360px] bg-muted md:min-h-[540px]">
        <Image
          src={shirt.image}
          alt="A relaxed button-down shirt in the everyday collection"
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="eyebrow absolute bottom-6 left-6 bg-background/95 px-4 py-3 sm:bottom-9 sm:left-10">
          In focus / The everyday shirt
        </span>
      </div>
      <div className="flex flex-col justify-center bg-[#e8e9df] px-6 py-12 dark:bg-[#292f25] sm:px-10 lg:px-20 lg:py-20">
        <p className="eyebrow text-muted-foreground">Wear it your way</p>
        <h2
          id="story-heading"
          className="mt-5 max-w-sm font-display text-5xl leading-[1.06] tracking-[-0.04em] lg:text-6xl"
        >
          A little less.
          <br />
          <span className="italic">A little better.</span>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
          A favourite shirt. The bag you take everywhere. Small details that
          bring a day together. Start with the pieces that feel like you, and go
          from there.
        </p>
        <Link
          href={`/products/${shirt.slug}`}
          className="collection-link mt-8 w-fit border-b border-foreground/40 pb-2 text-sm"
        >
          Discover the everyday shirt{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
