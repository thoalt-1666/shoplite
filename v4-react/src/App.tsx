import { useState } from "react";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";
import { CartPanel } from "./components/CartPanel";
import { LoginForm } from "./components/LoginForm";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { ErrorState, ProductGridSkeleton } from "./components/QueryStates";
import { useProducts } from "./hooks/useProducts";
import { filterByKeyword } from "./products";
import { addItem, removeItem, setQty, getTotalQty } from "./cart";
import type { CartItem, ProductListItem } from "./types";

type Tab = "login" | "contact";

export default function App() {
  // --- Client state: owned by the UI, nobody else knows about it ---
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("login");

  // --- Server state: owned by the API, cached and refetched by TanStack Query ---
  const { data: products, isPending, isError, error, refetch } = useProducts();

  // Derived value: no extra state, recomputed on every render.
  const visibleProducts = filterByKeyword(products ?? [], query);

  // Updater form: build the next cart from the previous one, never mutate it.
  function handleAddToCart(product: ProductListItem) {
    setCart((prev) => addItem(prev, product));
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={getTotalQty(cart)}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:py-8">
        {selectedId !== null ? (
          <ProductDetail
            id={selectedId}
            onBack={() => setSelectedId(null)}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <div className="mb-4 flex items-baseline justify-between md:mb-6">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Sản phẩm
              </h1>
              {query && !isPending && (
                <p className="text-sm text-slate-500">
                  {visibleProducts.length} kết quả cho “{query}”
                </p>
              )}
            </div>

            {isPending && <ProductGridSkeleton />}
            {isError && (
              <ErrorState message={error.message} onRetry={() => refetch()} />
            )}
            {products && (
              <ProductList
                products={visibleProducts}
                onAddToCart={handleAddToCart}
                onSelect={setSelectedId}
              />
            )}
          </>
        )}

        <CartPanel
          items={cart}
          onChangeQty={(id, qty) => setCart((prev) => setQty(prev, id, qty))}
          onRemove={(id) => setCart((prev) => removeItem(prev, id))}
        />

        <section className="mt-10 max-w-md rounded-xl border border-slate-200 bg-white p-4 md:p-6">
          <div className="mb-4 flex gap-2" role="tablist">
            {(["login", "contact"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={
                  tab === value
                    ? "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
                    : "rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                }
              >
                {value === "login" ? "Đăng nhập" : "Liên hệ"}
              </button>
            ))}
          </div>

          {tab === "login" ? <LoginForm /> : <ContactForm />}
        </section>
      </main>

      <Footer />
    </div>
  );
}
