import type { Product, SortDir } from "./types";

export function filterByKeyword<T extends Pick<Product, "title">>(
  list: T[],
  q: string
): T[] {
  const keyword = q.trim().toLowerCase();
  if (!keyword) return list;
  return list.filter((p) => p.title.toLowerCase().includes(keyword));
}

export function sortByPrice<T extends Pick<Product, "price">>(
  list: T[],
  dir: SortDir = "asc"
): T[] {
  return [...list].sort((a, b) =>
    dir === "asc" ? a.price - b.price : b.price - a.price
  );
}

export function filterByCategory<T extends Pick<Product, "category">>(
  list: T[],
  category: string
): T[] {
  if (!category) return list;
  return list.filter((p) => p.category === category);
}

const vnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function formatPrice(price: number): string {
  return vnd.format(price);
}