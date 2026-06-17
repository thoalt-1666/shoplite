// Pure functions that operate on the product array.
// No side effects — easy to reuse and test independently.

/**
 * Filter products whose title matches a keyword (case-insensitive).
 * @param {Array} list - Full product array
 * @param {string} q   - Search keyword
 * @returns {Array}    - Filtered array (original list unchanged)
 */
export function filterByKeyword(list, q) {
  const keyword = q.trim().toLowerCase();
  if (!keyword) return list;
  return list.filter((p) => p.title.toLowerCase().includes(keyword));
}

/**
 * Sort products by price.
 * @param {Array}  list - Product array
 * @param {"asc"|"desc"} dir - Sort direction
 * @returns {Array} - New sorted array (original list unchanged)
 */
export function sortByPrice(list, dir = "asc") {
  return [...list].sort((a, b) =>
    dir === "asc" ? a.price - b.price : b.price - a.price
  );
}

/**
 * Filter products by category.
 * @param {Array}  list     - Product array
 * @param {string} category - Category slug
 * @returns {Array}
 */
export function filterByCategory(list, category) {
  if (!category) return list;
  return list.filter((p) => p.category === category);
}

/**
 * Format a price number to Vietnamese currency string.
 * @param {number} price
 * @returns {string} e.g. "1.890.000₫"
 */
export function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}
