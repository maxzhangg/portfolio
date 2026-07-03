import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/work", label: "Product Work" },
  { to: "/profile", label: "Profile" },
  { to: "/photographer", label: "Image Studio" },
];

const isActive = (pathname, to) => {
  if (to === "/profile") {
    return pathname === "/profile" || pathname === "/resume";
  }
  return pathname === to;
};

const SiteNav = ({ tone = "light" }) => {
  const { pathname } = useLocation();
  const isDark = tone === "dark";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-[#070b12]/82 text-white"
          : "border-[#dedbd4] bg-white/86 text-[#111111]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 text-sm font-semibold transition hover:text-[#0f5e4f]"
        >
          Max Zhang
        </Link>

        <nav className="flex min-w-0 flex-wrap items-center justify-start gap-1 text-[11px] font-medium uppercase sm:flex-1 sm:justify-end sm:gap-2">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`whitespace-nowrap px-2.5 py-2 transition sm:px-3 ${
                isActive(pathname, item.to)
                  ? isDark
                    ? "text-[#72f0d1]"
                    : "text-[#0f5e4f]"
                  : isDark
                  ? "text-slate-300 hover:text-white"
                  : "text-[#66615b] hover:text-[#111111]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="mailto:maxzhangggg@gmail.com"
            className={`whitespace-nowrap border-l pl-3 transition ${
              isDark
                ? "border-white/10 text-slate-300 hover:text-white"
                : "border-[#dedbd4] text-[#66615b] hover:text-[#111111]"
            }`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default SiteNav;
