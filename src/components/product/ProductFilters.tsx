"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { products } from "@/lib/catalog";
import { priceRanges, type Filters } from "@/lib/product-filters";
export type { Filters } from "@/lib/product-filters";

const categories = ["All", ...new Set(products.map((p) => p.category))];
const colorOptions = [
  { label: "All", value: "All", hex: "" },
  ...Array.from(
    new Map(
      products.flatMap((p) =>
        p.colors.map(
          (color, i) =>
            [
              color,
              { label: color, value: color, hex: p.colorHexes[i] },
            ] as const,
        ),
      ),
    ).values(),
  ),
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onChange }: Props) {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const activeFilters: { key: keyof Filters; label: string }[] = [];
  if (filters.category !== "All")
    activeFilters.push({ key: "category", label: filters.category });
  if (filters.color !== "All")
    activeFilters.push({ key: "color", label: filters.color });
  if (filters.price !== "All")
    activeFilters.push({ key: "price", label: filters.price });

  const clearFilter = (key: keyof Filters) =>
    onChange({ ...filters, [key]: "All" });
  const clearAll = () =>
    onChange({ ...filters, category: "All", color: "All", price: "All" });

  return (
    <>
      {/* Toolbar */}
      <div className="my-8 flex items-center justify-between gap-3 border-y border-border py-5">
        {/* Left — Filters */}
        {/* Desktop filters */}
        <div className="hidden gap-2 md:flex">
          {/* Category */}
          <FilterDropdown
            label="Category"
            options={categories}
            value={filters.category}
            onSelect={(v) => set("category", v)}
          />
          {/* Color */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
              Color
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={4}>
              {colorOptions.map((c) => (
                <DropdownMenuItem
                  key={c.value}
                  onClick={() => set("color", c.value)}
                  className={
                    filters.color === c.value ? "font-medium text-primary" : ""
                  }
                >
                  {c.hex && (
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-border"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Price */}
          <FilterDropdown
            label="Price"
            options={priceRanges}
            value={filters.price}
            onSelect={(v) => set("price", v)}
          />
        </div>

        {/* Mobile filter button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </SheetTrigger>
            <SheetContent
              side="left"
              className="overflow-y-auto p-6 data-[side=left]:w-80"
            >
              <SheetTitle className="font-display text-3xl font-normal">
                Filters
              </SheetTitle>
              <div className="mt-6 space-y-6">
                <MobileFilterSection
                  title="Category"
                  options={categories}
                  value={filters.category}
                  onSelect={(v) => set("category", v)}
                />
                <div>
                  <h3 className="mb-2 text-sm font-medium">Color</h3>
                  <div className="space-y-1">
                    {colorOptions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => set("color", c.value)}
                        aria-pressed={filters.color === c.value}
                        className={`flex min-h-10 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring ${
                          filters.color === c.value
                            ? "bg-primary/10 font-medium text-primary"
                            : ""
                        }`}
                      >
                        {c.hex && (
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full border border-border"
                            style={{ backgroundColor: c.hex }}
                          />
                        )}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <MobileFilterSection
                  title="Price"
                  options={priceRanges}
                  value={filters.price}
                  onSelect={(v) => set("price", v)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right — Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Sort by
          </span>
          <Select
            value={filters.sort}
            onValueChange={(v) => v && set("sort", v)}
          >
            <SelectTrigger
              aria-label="Sort products"
              className="h-10 w-[172px] rounded-md border-border bg-background"
            >
              <SelectValue>
                {
                  sortOptions.find((option) => option.value === filters.sort)
                    ?.label
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs"
            >
              {f.label}
              <button
                aria-label={`Remove ${f.label} filter`}
                onClick={() => clearFilter(f.key)}
                className="cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearAll}
            className="cursor-pointer px-2 py-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}
    </>
  );
}

/* Reusable desktop filter dropdown */
function FilterDropdown({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4}>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onClick={() => onSelect(opt)}
            className={value === opt ? "font-medium text-primary" : ""}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* Reusable mobile filter section */
function MobileFilterSection({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            aria-pressed={value === opt}
            className={`min-h-10 w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring ${
              value === opt ? "bg-primary/10 font-medium text-primary" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
