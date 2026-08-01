"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/flavors", label: "Flavors" },
  { href: "/story", label: "Story" },
  { href: "/book", label: "Book" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-medium uppercase tracking-[0.15em] text-bone"
          onClick={() => setOpen(false)}
        >
          Adelina
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.25em] transition-colors hover:text-bone ${
                pathname === link.href ? "text-bone" : "text-bone-dim"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-xs uppercase tracking-[0.25em] border border-bone/40 px-5 py-2.5 hover:border-bone hover:bg-bone hover:text-ink transition-colors"
          >
            Inquire
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-ink transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl uppercase tracking-[0.2em] text-bone"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-4 text-xs uppercase tracking-[0.25em] border border-bone/40 px-6 py-3"
          >
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
