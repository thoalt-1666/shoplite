export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortDir = "asc" | "desc";

/** Minimal data needed to render a product card on the list page. */
export type ProductListItem = Pick<
  Product,
  "id" | "title" | "price" | "thumbnail" | "category" | "rating"
>;