import { filterByKeyword } from "./products.js";
import { addToCart, updateBadge } from "./cart.js";

const API = "https://dummyjson.com/products?limit=20&select=id,title,price,thumbnail,category,rating";

const grid = document.querySelector(".products__grid");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector(".search");

let allProducts = [];

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function renderSkeleton(count = 8) {
  grid.innerHTML = Array.from({ length: count })
    .map(() => `<div class="product-card product-card--skeleton"></div>`)
    .join("");
}

function renderCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card__image-link">
        <img
          class="product-card__image"
          src="${product.thumbnail}"
          alt="${product.title}"
          loading="lazy"
        >
      </a>
      <h2 class="product-card__name">${product.title}</h2>
      <p class="product-card__price">${formatPrice(product.price)}</p>
      <button class="product-card__button" type="button">Thêm vào giỏ</button>
    </article>
  `;
}

function renderGrid(list) {
  if (list.length === 0) {
    grid.innerHTML = `<p class="products__empty">Không tìm thấy sản phẩm nào.</p>`;
    return;
  }
  grid.innerHTML = list.map(renderCard).join("");
}

function renderError(message) {
  grid.innerHTML = `<p class="products__error">${message}</p>`;
}

async function loadProducts() {
  renderSkeleton();
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Lỗi ${res.status}`);
    const data = await res.json();
    allProducts = data.products;
    renderGrid(allProducts);
  } catch (err) {
    renderError("Không thể tải sản phẩm. Vui lòng thử lại.");
    console.error(err);
  }
}

searchInput.addEventListener("input", (e) => {
  renderGrid(filterByKeyword(allProducts, e.target.value));
});

searchForm.addEventListener("submit", (e) => e.preventDefault());

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".product-card__button");
  if (!btn) return;

  const card = btn.closest(".product-card");
  const id = Number(card.dataset.id);
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  addToCart(product);
  updateBadge();

  btn.textContent = "✓ Đã thêm";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Thêm vào giỏ";
    btn.disabled = false;
  }, 1200);
});

updateBadge();
loadProducts();
