import "./style.css";
import type { Product } from "./types";
import { fetchProduct } from "./api";
import { addToCart, updateBadge } from "./cart";
import { formatPrice } from "./products";

const id = new URLSearchParams(location.search).get("id");

function renderProduct(p: Product): void {
  document.title = `${p.title} — ShopLite`;

  document.querySelector(".breadcrumb__list")!.innerHTML = `
    <li><a href="index.html">Sản phẩm</a></li>
    <li aria-current="page">${p.title}</li>
  `;
  document.querySelector(".product-detail__image")!.innerHTML = `
    <img src="${p.thumbnail}" alt="${p.title}">
  `;
  document.querySelector(".product-detail__name")!.textContent = p.title;
  document.querySelector(".product-detail__price")!.textContent = formatPrice(p.price);
  document.querySelector(".product-detail__desc")!.textContent = p.description;
  document.querySelector(".product-detail__specs")!.innerHTML = `
    <li><span>Category:</span> ${p.category}</li>
    <li><span>Rating:</span> ${p.rating} ⭐</li>
    <li><span>Stock:</span> ${p.stock} sản phẩm</li>
  `;

  const btn = document.querySelector<HTMLButtonElement>(".product-detail__button")!;
  btn.addEventListener("click", () => {
    addToCart(p);
    updateBadge();
    btn.textContent = "✓ Đã thêm vào giỏ";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Thêm vào giỏ hàng";
      btn.disabled = false;
    }, 1200);
  });
}

function renderError(): void {
  document.querySelector(".product-detail")!.innerHTML =
    `<p class="products__error">Không thể tải sản phẩm. <a href="index.html">Quay lại</a></p>`;
}

async function loadProduct(): Promise<void> {
  if (!id) {
    renderError();
    return;
  }

  document.querySelector(".product-detail__name")!.textContent = "Đang tải...";

  try {
    const product = await fetchProduct(Number(id));
    renderProduct(product);
  } catch (err) {
    renderError();
    console.error(err);
  }
}

updateBadge();
loadProduct();
