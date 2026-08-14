import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../api";

/**
 * Query keys in one place so a mutation can invalidate them without typos.
 * The key is also the cache key: two components calling useProducts() share
 * one request instead of firing two.
 */
export const productKeys = {
  all: ["products"] as const,
  detail: (id: number) => ["product", id] as const,
};

/** Server state: the product list belongs to the API, not to the UI. */
export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
  });
}

export function useProduct(id: number | null) {
  return useQuery({
    queryKey: productKeys.detail(id ?? 0),
    queryFn: () => getProduct(id!),
    // Nothing to fetch until a product is actually selected.
    enabled: id !== null,
  });
}
