import {
  getCart,
  removeFromCart,
  updateQty,
  getCartTotal,
  updateBadge,
} from "./cart.js";

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

const SHIPPING = 5;

function renderCart() {
  const cart = getCart();
  const list = document.querySelector(".cart-items__list");
  const title = document.querySelector(".cart-items__title");
  const subtotalEl = document.querySelector(".cart-summary__subtotal");
  const totalEl = document.querySelector(".cart-summary__total");
  const shippingEl = document.querySelector(".cart-summary__shipping");

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

// Event delegation — handles qty change + remove
document.querySelector(".cart-items__list").addEventListener("change", (e) => {
  if (!e.target.matches(".cart-item__qty-input")) return;
  const id = Number(e.target.closest(".cart-item").dataset.id);
  updateQty(id, Number(e.target.value));
  updateBadge();
  renderCart();
});

document.querySelector(".cart-items__list").addEventListener("click", (e) => {
  if (!e.target.matches(".cart-item__remove")) return;
  const id = Number(e.target.closest(".cart-item").dataset.id);
  removeFromCart(id);
  updateBadge();
  renderCart();
});

updateBadge();
renderCart();
