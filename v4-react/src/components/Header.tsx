interface HeaderProps {
  /** Items in the cart — hardcoded in App and passed down via props on day 1. */
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:gap-6 md:py-4">
        <a href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Shop<span className="text-indigo-600">Lite</span>
        </a>

        {/* Search box: UI only, no event handling yet (day 2 — useState) */}
        <form
          role="search"
          className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-indigo-400 focus-within:bg-white"
          onSubmit={(e) => e.preventDefault()}
        >
          <span aria-hidden="true" className="text-slate-400">
            🔍
          </span>
          <label className="sr-only" htmlFor="search-input">
            Tìm kiếm sản phẩm
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Tìm sản phẩm..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </form>

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