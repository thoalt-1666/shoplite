import { SearchBar } from "./SearchBar";

interface HeaderProps {
  /** Search state lives in App (the common parent of SearchBar + ProductList). */
  query: string;
  onQueryChange: (value: string) => void;
  cartCount: number;
}

export function Header({ query, onQueryChange, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:gap-6 md:py-4">
        <a href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Shop<span className="text-indigo-600">Lite</span>
        </a>

        <SearchBar value={query} onChange={onQueryChange} />

        <a
          href="#cart"
          className="relative rounded-lg p-2 hover:bg-slate-100"
          aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
        >
          <span aria-hidden="true" className="text-xl">
            🛒
          </span>
          {/* Conditional rendering: show the badge only when the cart is non-empty */}
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </a>
      </div>
    </header>
  );
}
