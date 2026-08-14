import { useProduct } from "../hooks/useProducts";
import { formatPrice } from "../products";
import { ErrorState, Spinner } from "./QueryStates";
import type { ProductListItem } from "../types";

interface ProductDetailProps {
  id: number;
  onBack: () => void;
  onAddToCart: (product: ProductListItem) => void;
}

export function ProductDetail({ id, onBack, onAddToCart }: ProductDetailProps) {
  const { data: product, isPending, isError, error, refetch } = useProduct(id);

  return (
    <div>
      <nav className="mb-4 text-sm text-slate-500">
        <button type="button" onClick={onBack} className="hover:text-indigo-600">
          Sản phẩm
        </button>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product?.title ?? "..."}</span>
      </nav>

      {isPending && (
        <div className="grid place-items-center rounded-xl border border-slate-200 bg-white p-16">
          <Spinner />
        </div>
      )}

      {isError && <ErrorState message={error.message} onRetry={() => refetch()} />}

      {product && (
        <article className="grid gap-6 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 md:p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg bg-slate-100 object-cover"
          />

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
            <p className="text-2xl font-bold text-indigo-600">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-slate-600">{product.description}</p>

            <ul className="space-y-1 text-sm text-slate-600">
              <li>
                <span className="text-slate-400">Category:</span>{" "}
                {product.category}
              </li>
              <li>
                <span className="text-slate-400">Rating:</span> {product.rating} ⭐
              </li>
              <li>
                <span className="text-slate-400">Stock:</span> {product.stock} sản
                phẩm
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="mt-auto rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
