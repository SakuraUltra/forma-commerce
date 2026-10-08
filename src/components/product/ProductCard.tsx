import { formatMoney } from "@/lib/store-config";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  slug: string;
  colors?: string[];
  badge?: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  slug,
  colors,
  badge,
}: ProductCardProps) {
  const isSaleBadge =
    badge && (badge.includes("%") || badge.toLowerCase().includes("sale"));

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:md:group-hover:scale-[1.04]"
          />
        )}
        {badge && (
          <span
            className={`absolute left-3 top-3 px-2.5 py-1.5 text-[9px] font-medium tracking-[0.08em] ${isSaleBadge ? "bg-[#36452f] text-[#faf9f3]" : "bg-background/95 text-foreground"}`}
          >
            {badge}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/95 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight size={17} strokeWidth={1.25} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <h3 className="text-xs font-medium leading-5 sm:text-sm">{name}</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs leading-5 sm:text-sm">
          <span>{formatMoney(price)}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through">
              {formatMoney(originalPrice)}
            </span>
          )}
        </div>
      </div>
      {colors && colors.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
          {colors.map((color) => (
            <span
              key={color}
              className="h-2.5 w-2.5 rounded-full border border-foreground/20"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">
            {colors.length} {colors.length === 1 ? "colour" : "colours"}
          </span>
        </div>
      )}
    </Link>
  );
}
