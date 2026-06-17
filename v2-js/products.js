export function filterByKeyword(list, q) {
  const keyword = q.trim().toLowerCase();
  if (!keyword) return list;
  return list.filter((p) => p.title.toLowerCase().includes(keyword));
}

export function sortByPrice(list, dir = "asc") {
  return [...list].sort((a, b) =>
    dir === "asc" ? a.price - b.price : b.price - a.price
  );
}

export function filterByCategory(list, category) {
  if (!category) return list;
  return list.filter((p) => p.category === category);
}

export function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}
