import { formatMoney } from "@/lib/store-config";
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
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 md:group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" />
        )}
        {badge && (
          <span
            className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-medium text-white ${
              isSaleBadge ? "bg-red-500" : "bg-emerald-500"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Product info */}
      <h3 className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {name}
      </h3>

      {/* Price */}
      <div className="mt-1 flex flex-nowrap items-center gap-2">
        <span className="text-sm font-semibold text-neutral-900 dark:text-white">
          {formatMoney(price)}
        </span>
        {originalPrice && (
          <span className="text-sm text-neutral-400 line-through">
            {formatMoney(originalPrice)}
          </span>
        )}
      </div>

      {/* Color swatches */}
      {colors && colors.length > 0 && (
        <div className="mt-2 flex flex-nowrap gap-1.5">
          {colors.map((color) => (
            <span
              key={color}
              className="h-3.5 w-3.5 rounded-full border border-neutral-200 dark:border-neutral-600"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
