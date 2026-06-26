import type { CartItem, Product } from "./types";

const CART_KEY = "shoplite_cart";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity = 1): void {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
}

export function removeFromCart(id: number): void {
  saveCart(getCart().filter((item) => item.id !== id));
}

export function updateQty(id: number, qty: number): void {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);
  if (item) item.quantity = Math.max(1, qty);
  saveCart(cart);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getTotalQty(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function updateBadge(): void {
  const badge = document.querySelector(".cart__badge");
  if (badge) badge.textContent = String(getTotalQty() || "0");
}
