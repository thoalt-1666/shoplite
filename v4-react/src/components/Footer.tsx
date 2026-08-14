const linkGroups = [
  { title: "Về chúng tôi", links: ["Giới thiệu", "Liên hệ", "Chính sách"] },
  { title: "Hỗ trợ", links: ["Câu hỏi thường gặp", "Vận chuyển", "Đổi trả"] },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-slate-900">
            Shop<span className="text-indigo-600">Lite</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Cửa hàng trực tuyến đơn giản — dự án học Front-End.
          </p>
        </div>

        {linkGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold text-slate-900">
              {group.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-indigo-600">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <p className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © 2026 ShopLite. Dự án học tập.
      </p>
    </footer>
  );
}