import { Package, ShoppingBag, Sparkles } from "lucide-react";
import { formatMoney, storeConfig } from "@/lib/store-config";
export default function TrustSignals() {
  const items = [
    {
      icon: ShoppingBag,
      title: "Try the whole journey",
      detail: "From first find to demo checkout",
    },
    {
      icon: Package,
      title: `Free demo shipping from ${formatMoney(storeConfig.shipping.freeFrom)}`,
      detail: "See totals update with your cart",
    },
    {
      icon: Sparkles,
      title: "Make it your own",
      detail: "A storefront template built to explore",
    },
  ];
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-center gap-4">
            <Icon className="shrink-0" size={28} />
            <div>
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
