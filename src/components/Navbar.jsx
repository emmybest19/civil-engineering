"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `px-3 py-2 font-medium transition ${
      isActive(href)
        ? "text-secondary-light border-b-2 border-secondary-light"
        : "text-white hover:text-secondary-light"
    }`;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  return (
    <nav className="bg-primary-dark text-white px-6 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-secondary-light">CE</span>
          <span>Portal</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-secondary-light text-primary-dark font-semibold rounded hover:brightness-95 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-secondary-light text-secondary-light rounded hover:bg-secondary-light hover:text-primary-dark transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-secondary-light text-secondary-light rounded hover:bg-secondary-light hover:text-primary-dark transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-secondary-light text-primary-dark font-semibold rounded hover:brightness-95 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-1 max-w-7xl mx-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={linkClass(l.href)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-secondary-light text-primary-dark font-semibold rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-secondary-light text-secondary-light rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-secondary-light text-secondary-light rounded"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-secondary-light text-primary-dark font-semibold rounded"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
