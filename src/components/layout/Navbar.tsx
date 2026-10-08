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
  { href: "/products", label: "Products" },
  { href: "/on-sale", label: "On Sale" },
  { href: "/about", label: "About the demo" },
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
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight dark:text-white"
        >
          {storeConfig.name}
        </Link>

        {/* Center: Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide text-gray-900 transition-colors hover:text-gray-500 dark:text-neutral-200 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 text-gray-700 transition-colors hover:text-gray-500 dark:text-neutral-300 dark:hover:text-white"
          >
            <Search className="h-5 w-5" />
            <kbd className="hidden rounded border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-400 dark:border-neutral-700 md:inline">
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
            className="text-gray-700 dark:text-neutral-300"
          >
            <Package className="h-5 w-5" />
          </Link>

          {/* Mobile: Hamburger menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="cursor-pointer text-gray-700 transition-colors hover:text-gray-500 dark:text-neutral-300 dark:hover:text-white"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
                <nav className="mt-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium tracking-wide text-gray-900 transition-colors hover:text-gray-500 dark:text-neutral-200 dark:hover:text-white"
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
