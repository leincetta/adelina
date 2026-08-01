import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="h-10 sm:h-11 w-auto" />
          <p className="mt-3 text-sm text-bone-dim">{siteConfig.city}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-bone-dim hover:text-bone transition-colors"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="text-bone-dim hover:text-bone transition-colors"
          >
            {siteConfig.instagramHandle}
          </a>
        </div>

        <nav className="flex gap-6 text-xs uppercase tracking-[0.2em] text-bone-dim">
          <Link href="/flavors" className="hover:text-bone transition-colors">
            Flavors
          </Link>
          <Link href="/story" className="hover:text-bone transition-colors">
            Story
          </Link>
          <Link href="/book" className="hover:text-bone transition-colors">
            Book
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-bone-dim/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Made by hand in Brooklyn.
        </p>
      </div>
    </footer>
  );
}
