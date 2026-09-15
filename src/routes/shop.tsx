import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { productsQueryOptions } from "@/lib/products";
import { CATEGORIES } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Clothing | Aadmoz Kempton Park" },
      {
        name: "description",
        content:
          "Browse the full Aadmoz collection — tops, bottoms, accessories and footwear in South African Rand. Enquire directly, no checkout needed.",
      },
      { property: "og:title", content: "Shop All Clothing | Aadmoz" },
      {
        property: "og:description",
        content: "The complete Aadmoz clothing collection, curated from Kempton Park, Gauteng.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: products = [] } = useQuery(productsQueryOptions);
  const [filter, setFilter] = useState<"All" | (typeof CATEGORIES)[number]>("All");
  const navigate = useNavigate();

  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  const enquire = (product: Product) => {
    navigate({ to: "/", search: { enquire: product.name } as never, hash: "contact" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Aadmoz
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-500"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <span className="eyebrow">The full collection</span>
        <h1 className="mt-3 text-4xl sm:text-5xl">Shop All</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Every piece currently in the Aadmoz range. Found something you like? Send an enquiry and
          we&apos;ll reply personally.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "border-navy-900 bg-navy-900 text-mist"
                  : "border-border text-muted-foreground hover:border-gold-500 hover:text-navy-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onEnquire={enquire} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
