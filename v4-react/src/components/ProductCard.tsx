import type { ProductListItem } from "../types";
import { formatPrice } from "../products";

interface ProductCardProps {
  product: ProductListItem;
  /** The parent decides what happens on click — the child just reports the event up. */
  onAddToCart?: (product: ProductListItem) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { title, price, thumbnail, category, rating } = product;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid aspect-square place-items-center bg-slate-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="text-4xl opacity-40">
            📦
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {category}
        </p>
        <h2 className="line-clamp-2 text-sm font-medium text-slate-900 md:text-base">
          {title}
        </h2>

        <p className="flex items-center gap-1 text-sm text-amber-600">
          <span aria-hidden="true">★</span>
          <span>{rating.toFixed(1)}</span>
        </p>

        <p className="mt-auto text-lg font-bold text-indigo-600">
          {formatPrice(price)}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}