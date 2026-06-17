import { products } from "./data.js";
import { filterByKeyword, formatPrice } from "./products.js";

const grid = document.querySelector(".products__grid");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector(".search");

function renderCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html" class="product-card__image-link">
        <div class="product-card__image" aria-hidden="true"></div>
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

// Initial render
renderGrid(products);

// Search — filter on every keystroke
searchInput.addEventListener("input", (e) => {
  const filtered = filterByKeyword(products, e.target.value);
  renderGrid(filtered);
});

// Prevent form submit from reloading the page
searchForm.addEventListener("submit", (e) => e.preventDefault());

// Event delegation — one listener on the grid catches all "Thêm vào giỏ" clicks
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".product-card__button");
  if (!btn) return;

  const card = btn.closest(".product-card");
  const id = Number(card.dataset.id);
  const product = products.find((p) => p.id === id);

  console.log("Thêm vào giỏ:", product);
});
