export type Variant = {
  id: string;
  color: string;
  size: string;
  price: number;
  stock: number;
};
type ProductSeed = {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  colors: string[];
  colorHexes: string[];
  category: string;
  createdAt: string;
};
export type Product = ProductSeed & {
  description: string;
  images: string[];
  variants: Variant[];
};

const seeds: ProductSeed[] = [
  {
    name: "Classic Cotton Tee",
    slug: "classic-cotton-tee",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Clothing",
    createdAt: "2026-03-01",
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 8999,
    compareAtPrice: 12900,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#8B4513", "#000000"],
    category: "Accessories",
    createdAt: "2026-03-05",
  },
  {
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    colors: ["Silver", "Gold"],
    colorHexes: ["#c0c0c0", "#FFD700"],
    category: "Watches",
    createdAt: "2026-03-10",
  },
  {
    name: "Wool Blend Scarf",
    slug: "wool-blend-scarf",
    price: 4999,
    compareAtPrice: 5900,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    colors: ["Brown", "Black"],
    colorHexes: ["#c19a6b", "#36454f"],
    category: "Accessories",
    createdAt: "2026-03-12",
  },
  {
    name: "Canvas Sneakers",
    slug: "canvas-sneakers",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    colors: ["White", "Black"],
    colorHexes: ["#ffffff", "#000000"],
    category: "Clothing",
    createdAt: "2026-03-15",
  },
  {
    name: "Aviator Sunglasses",
    slug: "aviator-sunglasses",
    price: 7999,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    colors: ["Gold", "Silver"],
    colorHexes: ["#FFD700", "#c0c0c0"],
    category: "Accessories",
    createdAt: "2026-03-18",
  },
  {
    name: "Soy Wax Candle",
    slug: "soy-wax-candle",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1714765419071-43670f176246?w=800&q=80",
    colors: ["White"],
    colorHexes: ["#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-20",
  },
  {
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-22",
  },
  {
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    price: 5499,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    colors: ["Black", "Brown"],
    colorHexes: ["#000000", "#8B4513"],
    category: "Clothing",
    createdAt: "2026-03-24",
  },
  {
    name: "Chronograph Watch",
    slug: "chronograph-watch",
    price: 19999,
    image:
      "https://images.unsplash.com/photo-1639037687665-4f60498e0498?w=800&q=80",
    colors: ["Silver", "Gold"],
    colorHexes: ["#c0c0c0", "#FFD700"],
    category: "Watches",
    createdAt: "2026-03-26",
  },
  {
    name: "Merino Wool Beanie",
    slug: "merino-wool-beanie",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
    colors: ["Black", "White"],
    colorHexes: ["#000000", "#ffffff"],
    category: "Accessories",
    createdAt: "2026-03-28",
  },
  {
    name: "Linen Button-Down",
    slug: "linen-button-down",
    price: 4499,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    colors: ["White", "Brown"],
    colorHexes: ["#ffffff", "#d2b48c"],
    category: "Clothing",
    createdAt: "2026-03-30",
  },
];

// Fictional demo inventory. Stable IDs keep carts valid across reloads.
export const products: Product[] = seeds.map((product) => {
  const sizes =
    product.slug === "canvas-sneakers"
      ? ["EU 38", "EU 40", "EU 42"]
      : product.category === "Clothing"
        ? ["S", "M", "L"]
        : ["One size"];
  return {
    ...product,
    description: `${product.name}: a considered addition to your everyday collection. Choose your favourite colour and fit. This is a sample product for exploring the store; no purchase will be made.`,
    images: [product.image],
    variants: product.colors.flatMap((color, ci) =>
      sizes.map((size, si) => ({
        id: `${product.slug}-${ci}-${si}`,
        color,
        size,
        price: product.price,
        stock: ci === 1 && si === 2 ? 0 : 8 + si,
      })),
    ),
  };
});
export const saleProducts = products.filter(
  (p) => p.compareAtPrice && p.compareAtPrice > p.price,
);
export function findVariant(id: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === id);
    if (variant) return { product, variant };
  }
}
