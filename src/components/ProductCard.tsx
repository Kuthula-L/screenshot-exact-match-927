import { Shirt, Footprints, Watch, PanelBottom } from "lucide-react";
import type { Product } from "@/data/products";
import { formatZar } from "@/lib/products";

const categoryIcon = {
  Tops: Shirt,
  Bottoms: PanelBottom,
  Accessories: Watch,
  Footwear: Footprints,
} as const;

export function ProductCard({
  product,
  onEnquire,
}: {
  product: Product;
  onEnquire: (product: Product) => void;
}) {
  const Icon = categoryIcon[product.category] ?? Shirt;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-4/5 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="placeholder-gradient flex h-full w-full items-center justify-center">
            <Icon className="h-10 w-10 text-navy-700/40" strokeWidth={1.25} />
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
          {product.category}
        </span>

        {!product.in_stock && (
          <span className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base leading-snug font-semibold">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        {product.restock_note && (
          <p className="text-xs italic text-muted-foreground">{product.restock_note}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg font-semibold text-gold-500">
            {formatZar(product.price_zar)}
          </span>
          <button
            type="button"
            onClick={() => onEnquire(product)}
            className="text-sm font-medium text-navy-900 underline-offset-4 transition-colors hover:text-gold-500 hover:underline"
          >
            Enquire →
          </button>
        </div>
      </div>
    </article>
  );
}
