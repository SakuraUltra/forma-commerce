"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { products } from "@/lib/catalog";
import { formatMoney } from "@/lib/store-config";

const popularSearches = ["Watch", "Bag", "Tee", "Scarf"];

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  const handleSelect = (slug: string) => {
    onOpenChange(false);
    router.push(`/products/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Search products</DialogTitle>

        {/* Search input */}
        <div className="flex items-center border-b px-4 dark:border-neutral-800">
          <Search className="h-5 w-5 shrink-0 text-neutral-400" />
          <input
            aria-label="Search products"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="h-14 flex-1 border-none bg-transparent px-3 text-lg outline-none placeholder:text-neutral-400"
          />
          <kbd className="hidden rounded border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-400 dark:border-neutral-700 sm:inline">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div className="max-h-80 overflow-y-auto p-2">
          {!query.trim() ? (
            /* Popular searches */
            <div className="p-3">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Product results */
            <ul>
              {results.map((product) => (
                <li key={product.slug}>
                  <button
                    onClick={() => handleSelect(product.slug)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatMoney(product.price)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            /* No results */
            <p className="px-3 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              No products found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
