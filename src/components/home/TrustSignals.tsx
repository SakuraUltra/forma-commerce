import { Package, ShoppingBag, Sparkles } from "lucide-react";
import { formatMoney, storeConfig } from "@/lib/store-config";

export default function TrustSignals() {
  const items = [
    {
      icon: ShoppingBag,
      title: "Make yourself at home",
      detail: "Explore the full shopping demo. No real charges.",
    },
    {
      icon: Package,
      title: `Demo delivery, on us from ${formatMoney(storeConfig.shipping.freeFrom)}`,
      detail: "Shipping totals update as you build your cart.",
    },
    {
      icon: Sparkles,
      title: "A space to make your own",
      detail: "An open-source storefront with room for your ideas.",
    },
  ];
  return (
    <section className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 sm:px-10 md:grid-cols-3 md:gap-10 lg:px-14 xl:px-20">
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-start gap-4">
            <Icon
              className="mt-0.5 shrink-0 text-primary"
              size={23}
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <div>
              <h2 className="text-xs font-medium leading-5">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
