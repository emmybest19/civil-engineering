"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardSidebar({ user, items }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-primary-dark text-white flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="text-lg font-bold flex items-center gap-2">
          <span className="text-secondary-light">CE</span>
          <span>Portal</span>
        </Link>
        <p className="mt-2 text-sm text-white/70 capitalize">{user.role} dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition ${
                active ? "bg-white/15 font-medium" : "hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-sm font-medium truncate">{user.name}</p>
        <p className="text-xs text-white/60 truncate">{user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 w-full px-3 py-2 text-sm border border-secondary-light text-secondary-light rounded hover:bg-secondary-light hover:text-primary-dark transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
