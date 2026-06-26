import "./style.css";
import type { Product } from "./types";
import { fetchProducts, type ProductListItem } from "./api";
import { filterByKeyword, formatPrice } from "./products";
import { addToCart, updateBadge } from "./cart";

const grid = document.querySelector<HTMLDivElement>(".products__grid")!;
const searchInput = document.querySelector<HTMLInputElement>("#search-input")!;
const searchForm = document.querySelector<HTMLFormElement>(".search")!;

let allProducts: ProductListItem[] = [];

function renderSkeleton(count = 8): void {
  grid.innerHTML = Array.from({ length: count })
    .map(() => `<div class="product-card product-card--skeleton"></div>`)
    .join("");
}

function renderCard(product: ProductListItem): string {
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

function renderGrid(list: ProductListItem[]): void {
  if (list.length === 0) {
    grid.innerHTML = `<p class="products__empty">Không tìm thấy sản phẩm nào.</p>`;
    return;
  }
  grid.innerHTML = list.map(renderCard).join("");
}

function renderError(message: string): void {
  grid.innerHTML = `<p class="products__error">${message}</p>`;
}

async function loadProducts(): Promise<void> {
  renderSkeleton();
  try {
    allProducts = await fetchProducts();
    renderGrid(allProducts);
  } catch (err) {
    renderError("Không thể tải sản phẩm. Vui lòng thử lại.");
    console.error(err);
  }
}

// List page only fetches a subset of Product fields (via `select=`),
// so fill the rest with safe defaults before storing a full CartItem.
function toFullProduct(item: ProductListItem): Product {
  return {
    ...item,
    description: "",
    discountPercentage: 0,
    stock: 0,
    images: [item.thumbnail],
  };
}

searchInput.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement).value;
  renderGrid(filterByKeyword(allProducts, value));
});

searchForm.addEventListener("submit", (e) => e.preventDefault());

grid.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest<HTMLButtonElement>(".product-card__button");
  if (!btn) return;

  const card = btn.closest<HTMLElement>(".product-card")!;
  const id = Number(card.dataset.id);
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  addToCart(toFullProduct(product));
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
