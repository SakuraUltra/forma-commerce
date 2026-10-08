import FeaturedCollection from "@/components/home/FeaturedCollection";
import HeroBanner from "@/components/home/HeroBanner";
import OnSale from "@/components/home/OnSale";
import TrustSignals from "@/components/home/TrustSignals";
import FadeIn from "@/components/ui/FadeIn";
import { products, saleProducts } from "@/lib/catalog";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <FadeIn>
        <HeroBanner />
      </FadeIn>
      <FadeIn delay={0.1}>
        <FeaturedCollection products={featuredProducts} />
      </FadeIn>
      <FadeIn delay={0.2}>
        <TrustSignals />
      </FadeIn>
      <FadeIn delay={0.3}>
        <OnSale products={saleProducts} />
      </FadeIn>
    </main>
  );
}
