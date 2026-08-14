import type { CartItem } from "../types";
import { formatPrice } from "../products";
import { getCartTotal } from "../cart";

interface CartPanelProps {
  items: CartItem[];
  onChangeQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

/**
 * Temporary cart view fed by state in App.
 * Day 4 replaces this plumbing with a global store.
 */
export function CartPanel({ items, onChangeQty, onRemove }: CartPanelProps) {
  return (
    <section
      id="cart"
      className="mt-10 rounded-xl border border-slate-200 bg-white p-4 md:p-6"
    >
      <h2 className="text-lg font-bold text-slate-900">Giỏ hàng tạm</h2>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">Giỏ hàng đang trống.</p>
      ) : (
        <>
          <ul className="mt-4 divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <span className="flex-1 text-sm text-slate-900">
                  {item.title}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, item.quantity - 1)}
                    aria-label={`Giảm số lượng ${item.title}`}
                    className="h-7 w-7 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, item.quantity + 1)}
                    aria-label={`Tăng số lượng ${item.title}`}
                    className="h-7 w-7 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>

                <span className="w-28 text-right text-sm font-semibold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Xoá ${item.title}`}
                  className="text-slate-400 hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right text-base font-bold text-slate-900">
            Tổng: <span className="text-indigo-600">{formatPrice(getCartTotal(items))}</span>
          </p>
        </>
      )}
    </section>
  );
}
