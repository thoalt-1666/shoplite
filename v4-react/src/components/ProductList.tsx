import type { ProductListItem } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: ProductListItem[];
  onAddToCart?: (product: ProductListItem) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        Không tìm thấy sản phẩm nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        // key lets React tell which items were added/removed/reordered
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}