import type { CartItem, Product, ProductListItem } from "./types";

/**
 * The list page only carries a subset of Product fields, so fill the rest
 * with safe defaults before storing a full CartItem (same trick as v3-ts).
 */
function toFullProduct(item: ProductListItem): Product {
  return {
    ...item,
    description: "",
    discountPercentage: 0,
    stock: 0,
    images: item.thumbnail ? [item.thumbnail] : [],
  };
}

/** Pure and immutable: returns a new cart, never mutates the one passed in. */
export function addItem(
  cart: CartItem[],
  product: ProductListItem,
  quantity = 1
): CartItem[] {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  return [...cart, { ...toFullProduct(product), quantity }];
}

export function removeItem(cart: CartItem[], id: number): CartItem[] {
  return cart.filter((item) => item.id !== id);
}

export function setQty(cart: CartItem[], id: number, qty: number): CartItem[] {
  if (qty < 1) return removeItem(cart, id);
  return cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
}

export function getTotalQty(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
