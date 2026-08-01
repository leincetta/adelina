"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/flavors", label: "Flavors" },
  { href: "/story", label: "Story" },
];

const REVEAL_THRESHOLD = 40;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > REVEAL_THRESHOLD);

      if (currentY <= REVEAL_THRESHOLD) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 12) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 12) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || open
            ? "bg-ink/95 backdrop-blur-md border-b border-bone/10"
            : "bg-gradient-to-b from-ink/90 via-ink/40 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Adelina, home">
            <Logo className="h-9 sm:h-11 w-auto" />
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
              Book an Event
            </Link>
          </nav>
        </div>
      </div>

      {/* Rendered outside the animated/will-change wrapper above so it always
          stays on top of the full-screen mobile overlay (will-change:transform
          creates its own stacking context, which would otherwise trap this
          button underneath the overlay despite z-index). */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden fixed z-[60] top-6 right-5 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

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
            Book an Event
          </Link>
        </nav>
      </div>
    </header>
  );
}
