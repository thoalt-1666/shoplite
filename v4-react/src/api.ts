import type { Product, ProductListItem } from "./types";

const BASE = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductListItem[]> {
  const res = await fetch(
    `${BASE}?limit=20&select=id,title,price,thumbnail,category,rating`
  );
  if (!res.ok) throw new Error(`Lỗi ${res.status}`);
  const data: { products: ProductListItem[] } = await res.json();
  return data.products;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Lỗi ${res.status}`);
  return res.json();
}
