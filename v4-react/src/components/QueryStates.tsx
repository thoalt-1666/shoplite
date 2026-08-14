/** Placeholder card shown while the product list is loading. */
export function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="aspect-square bg-slate-200" />
      <div className="space-y-2 p-3 md:p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-200" />
        <div className="h-5 w-1/2 rounded bg-slate-200" />
        <div className="h-9 w-full rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner() {
  return (
    <span
      role="status"
      aria-label="Đang tải"
      className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"
    />
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <p className="text-sm text-red-700">
        Không thể tải dữ liệu. {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Thử lại
      </button>
    </div>
  );
}
