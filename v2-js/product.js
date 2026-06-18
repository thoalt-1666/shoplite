import { addToCart, updateBadge } from "./cart.js";

const id = new URLSearchParams(location.search).get("id");
const API = `https://dummyjson.com/products/${id}`;

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function renderProduct(p) {
  document.title = `${p.title} — ShopLite`;
  document.querySelector(".breadcrumb__list").innerHTML = `
    <li><a href="index.html">Sản phẩm</a></li>
    <li aria-current="page">${p.title}</li>
  `;
  document.querySelector(".product-detail__image").innerHTML = `
    <img src="${p.thumbnail}" alt="${p.title}">
  `;
  document.querySelector(".product-detail__name").textContent = p.title;
  document.querySelector(".product-detail__price").textContent = formatPrice(p.price);
  document.querySelector(".product-detail__desc").textContent = p.description;
  document.querySelector(".product-detail__specs").innerHTML = `
    <li><span>Category:</span> ${p.category}</li>
    <li><span>Rating:</span> ${p.rating} ⭐</li>
    <li><span>Stock:</span> ${p.stock} sản phẩm</li>
  `;

  const btn = document.querySelector(".product-detail__button");
  btn.addEventListener("click", () => {
    addToCart({ id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail });
    updateBadge();
    btn.textContent = "✓ Đã thêm vào giỏ";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Thêm vào giỏ hàng";
      btn.disabled = false;
    }, 1200);
  });
}

function renderError() {
  document.querySelector(".product-detail").innerHTML =
    `<p class="products__error">Không thể tải sản phẩm. <a href="index.html">Quay lại</a></p>`;
}

async function loadProduct() {
  if (!id) { renderError(); return; }

  document.querySelector(".product-detail__name").textContent = "Đang tải...";

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Lỗi ${res.status}`);
    renderProduct(await res.json());
  } catch (err) {
    renderError();
    console.error(err);
  }
}

updateBadge();
loadProduct();
