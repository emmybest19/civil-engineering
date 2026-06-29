"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

export default function DashboardSidebar({ user, items }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  // Shared inner content (header + nav + footer). Used by both the desktop
  // aside and the mobile drawer.
  const Panel = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="text-lg font-bold flex items-center gap-2">
          <span className="text-secondary-light">CE</span>
          <span>Portal</span>
        </Link>
        <p className="mt-2 text-sm text-white/70 capitalize">{user.role} dashboard</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
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
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-primary-dark text-white px-4 py-3">
        <Link href="/" className="font-bold flex items-center gap-2">
          <span className="text-secondary-light">CE</span>
          <span>Portal</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-2xl">
          <IoMdMenu />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-primary-dark text-white shadow-xl">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-xl z-10"
            >
              <FaTimes />
            </button>
            {Panel}
          </aside>
        </div>
      )}

      {/* Desktop sidebar — sticky full-height, stays in place while content scrolls */}
      <aside className="hidden md:block w-64 shrink-0 bg-primary-dark text-white sticky top-0 h-screen">
        {Panel}
      </aside>
    </>
  );
}
