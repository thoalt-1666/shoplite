import type { Product } from "./types";

const BASE = "https://dummyjson.com/products";

export type ProductListItem = Pick<
  Product,
  "id" | "title" | "price" | "thumbnail" | "category" | "rating"
>;

export async function fetchProducts(): Promise<ProductListItem[]> {
  const res = await fetch(
    `${BASE}?limit=20&select=id,title,price,thumbnail,category,rating`
  );
  if (!res.ok) throw new Error(`Lỗi ${res.status}`);
  const data: { products: ProductListItem[] } = await res.json();
  return data.products;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Lỗi ${res.status}`);
  return res.json();
}
