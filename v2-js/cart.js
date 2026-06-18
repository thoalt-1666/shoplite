const CART_KEY = "shoplite_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart({ id, title, price, thumbnail }) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, thumbnail, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
}

export function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);
  if (item) item.quantity = Math.max(1, qty);
  saveCart(cart);
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getTotalQty() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function updateBadge() {
  const badge = document.querySelector(".cart__badge");
  if (badge) badge.textContent = getTotalQty() || "0";
}
