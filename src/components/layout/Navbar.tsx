"use client";

import CartSheet from "@/components/cart/CartSheet";
import SearchDialog from "@/components/layout/SearchDialog";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, Package } from "lucide-react";
import Link from "next/link";
import { storeConfig } from "@/lib/store-config";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/products", label: "The collection" },
  { href: "/on-sale", label: "The sale edit" },
  { href: "/about", label: "Our demo" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-20 sm:px-10 lg:px-14 xl:px-20">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-[22px] font-medium tracking-[0.16em] sm:text-[28px]"
        >
          {storeConfig.name}
        </Link>

        {/* Center: Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] font-medium tracking-[0.04em] text-foreground transition-colors hover:text-muted-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <kbd className="hidden rounded-sm border px-1 py-0.5 text-[10px] text-muted-foreground xl:inline">
              ⌘K
            </kbd>
          </button>

          <SearchDialog
            key={String(searchOpen)}
            open={searchOpen}
            onOpenChange={setSearchOpen}
          />

          <CartSheet />

          <Link
            href="/orders"
            aria-label="Demo orders"
            className="text-foreground hover:text-muted-foreground"
          >
            <Package className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>

          {/* Mobile: Hamburger menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="cursor-pointer text-foreground transition-colors hover:text-muted-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-background px-6 py-8"
              >
                <SheetTitle className="text-xl font-medium tracking-[0.16em]">
                  {storeConfig.name}
                </SheetTitle>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl tracking-tight transition-colors hover:text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
