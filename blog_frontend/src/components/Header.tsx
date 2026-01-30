"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEME } from "@/lib/theme";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/editor", label: "New Post" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur bg-white/80"
      style={{ borderColor: THEME.colors.border }}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <div
            className="h-8 w-8 rounded bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(135deg, ${THEME.colors.primary}33, ${THEME.colors.success}33)`,
            }}
            aria-hidden="true"
          />
          <span className="text-lg font-semibold" style={{ color: THEME.colors.text }}>
            Blog CMS
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors ${
                      active ? "font-semibold" : "font-normal"
                    }`}
                    style={{
                      color: active ? THEME.colors.primary : THEME.colors.text,
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
