import "./style.css";
import {
  getCart,
  removeFromCart,
  updateQty,
  getCartTotal,
  updateBadge,
} from "./cart";
import { formatPrice } from "./products";

const SHIPPING = 5;

const list = document.querySelector<HTMLDivElement>(".cart-items__list")!;
const title = document.querySelector<HTMLHeadingElement>(".cart-items__title")!;
const subtotalEl = document.querySelector<HTMLSpanElement>(".cart-summary__subtotal")!;
const totalEl = document.querySelector<HTMLSpanElement>(".cart-summary__total")!;
const shippingEl = document.querySelector<HTMLSpanElement>(".cart-summary__shipping")!;

function renderCart(): void {
  const cart = getCart();

  title.textContent = `Sản phẩm (${cart.reduce((s, i) => s + i.quantity, 0)})`;

  if (cart.length === 0) {
    list.innerHTML = `<p class="products__empty">Giỏ hàng trống. <a href="index.html">Tiếp tục mua sắm</a></p>`;
    subtotalEl.textContent = "$0.00";
    shippingEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item__image" src="${item.thumbnail}" alt="${item.title}">
      <div class="cart-item__info">
        <p class="cart-item__name">${item.title}</p>
        <p class="cart-item__price">${formatPrice(item.price)}</p>
        <div class="cart-item__qty">
          <label for="qty-${item.id}" class="visually-hidden">Số lượng</label>
          <input
            id="qty-${item.id}"
            class="cart-item__qty-input"
            type="number"
            value="${item.quantity}"
            min="1"
          >
        </div>
      </div>
      <div class="cart-item__actions">
        <span class="cart-item__subtotal">${formatPrice(item.price * item.quantity)}</span>
        <button class="cart-item__remove" type="button">Xóa</button>
      </div>
    </div>
  `
    )
    .join("");

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? SHIPPING : 0;
  subtotalEl.textContent = formatPrice(subtotal);
  shippingEl.textContent = formatPrice(shipping);
  totalEl.textContent = formatPrice(subtotal + shipping);
}

list.addEventListener("change", (e) => {
  const target = e.target as HTMLElement;
  if (!target.matches(".cart-item__qty-input")) return;
  const id = Number(target.closest<HTMLElement>(".cart-item")!.dataset.id);
  updateQty(id, Number((target as HTMLInputElement).value));
  updateBadge();
  renderCart();
});

list.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!target.matches(".cart-item__remove")) return;
  const id = Number(target.closest<HTMLElement>(".cart-item")!.dataset.id);
  removeFromCart(id);
  updateBadge();
  renderCart();
});

updateBadge();
renderCart();
