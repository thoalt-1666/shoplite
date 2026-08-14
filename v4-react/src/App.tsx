import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Footer } from "./components/Footer";
import { products } from "./data";
import type { ProductListItem } from "./types";

export default function App() {
  // No state yet on day 1: "Add to cart" only logs to the console.
  function handleAddToCart(product: ProductListItem) {
    console.log("Thêm vào giỏ:", product.title);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header cartCount={3} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:py-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 md:mb-6 md:text-3xl">
          Sản phẩm
        </h1>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>

      <Footer />
    </div>
  );
}