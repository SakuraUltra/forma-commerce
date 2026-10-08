import CollectionStory from "@/components/home/CollectionStory";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import HeroBanner from "@/components/home/HeroBanner";
import OnSale from "@/components/home/OnSale";
import TrustSignals from "@/components/home/TrustSignals";
import { products, saleProducts } from "@/lib/catalog";

export default function Home() {
  const featuredSlugs = [
    "classic-cotton-tee",
    "linen-button-down",
    "canvas-tote-bag",
    "minimalist-watch",
  ];
  const featuredProducts = featuredSlugs.flatMap((slug) =>
    products.filter((product) => product.slug === slug),
  );

  return (
    <main>
      <HeroBanner />
      <FeaturedCollection products={featuredProducts} />
      <CollectionStory />
      <OnSale products={saleProducts} />
      <TrustSignals />
    </main>
  );
}
