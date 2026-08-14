# ShopLite

A front-end learning project built progressively — same shop idea, different tech stack each version.

## Versions

| Version     | Stack         | Status      |
| ----------- | ------------- | ----------- |
| `v1-html/`  | HTML + CSS    | In progress |
| `v2-js/`    | + JavaScript  | Planned     |
| `v3-ts/`    | + TypeScript  | Planned     |
| `v4-react/` | React + Tailwind | In progress |
| `v5-next/`  | Next.js       | Planned     |

## v1-html

- `index.html` — page structure (header / main / footer)
- `style.css` — reset + web font + styles
- `assets/` — images, icons

Open `v1-html/index.html` in a browser, or use **Live Server** (VS Code) for auto-reload.

## v4-react

Vite + React + TypeScript + Tailwind v4 (qua `@tailwindcss/vite`, import trong `src/styles.css`).

- `src/types.ts` — `Product`, `CartItem`, `ProductListItem` (mang từ v3-ts sang)
- `src/data.ts` — data hardcode (port từ `v2-js/data.js`)
- `src/products.ts` — hàm thuần: lọc / sắp xếp / `formatPrice`
- `src/cart.ts` — pure, immutable cart helpers (`addItem`, `setQty`, ...)
- `src/schemas/` — Zod schemas (`loginSchema` reused by the Next.js checkout form later)
- `src/components/` — `Header`, `SearchBar`, `ProductCard`, `ProductList`, `CartPanel`, `LoginForm`, `ContactForm`, `Footer`

State lives in `App`: `query` (lifted so `SearchBar` and `ProductList` share it) and
`cart` (temporary — a global store replaces it in day 4).

```bash
cd v4-react && npm install && npm run dev
```
