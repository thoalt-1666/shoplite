interface SearchBarProps {
  /** Controlled input: React state is the source of truth for the value. */
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm sản phẩm..."
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Xoá từ khoá"
          className="text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      )}
    </form>
  );
}
