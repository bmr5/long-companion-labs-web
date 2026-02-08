"use client";

import { useRef, useState } from "react";
import { Menu, Search, X, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartButton } from "./woo-cart/cart-button";
import { useAuth } from "lib/auth/context";
import clsx from "clsx";

const navigation = [
  { name: "SHOP", href: "/products" },
  { name: "ABOUT", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
];

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  const openSearch = () => {
    setSearchOpen(true);
    // Focus input after animation starts
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav
          aria-label="Global"
          className="flex h-16 items-center justify-between"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Genesis Peptides</span>
            <span className="font-serif text-2xl text-stone-900">Genesis</span>
          </Link>

          {/* Mobile menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={openSearch}
              className="text-stone-600 hover:text-stone-900"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <CartButton />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-m-2.5 text-stone-600 hover:bg-transparent hover:text-stone-900"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="size-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full border-stone-200 bg-stone-50 sm:max-w-sm"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="font-serif text-2xl text-stone-900">
                      Genesis
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-2 flow-root px-6">
                  <div className="-my-6 divide-y divide-stone-200">
                    {/* Mobile search */}
                    <div className="py-6">
                      <form onSubmit={handleSearch}>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-full border border-stone-300 py-2 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    {/* Mobile auth section */}
                    {!isLoading && (
                      <div className="border-t border-stone-200 py-6">
                        {isAuthenticated ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-stone-600">
                              <User className="h-4 w-4" />
                              {user?.displayName}
                            </div>
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                handleLogout();
                              }}
                              className="-mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                            >
                              <LogOut className="h-4 w-4" />
                              Logout
                            </button>
                          </div>
                        ) : (
                          <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                          >
                            <User className="h-4 w-4" />
                            Login
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:ml-12 lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop search + cart */}
          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-x-4">
            <div className="relative flex items-center">
              {/* Search input - animated */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div
                  className={clsx(
                    "overflow-hidden transition-all duration-300 ease-out",
                    searchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
                  )}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-full border border-stone-300 py-1.5 pl-4 pr-10 text-sm text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") closeSearch();
                    }}
                  />
                </div>
                <button
                  type={searchOpen ? "button" : "button"}
                  onClick={searchOpen ? closeSearch : openSearch}
                  className={clsx(
                    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-stone-600 transition-colors hover:text-stone-900",
                    searchOpen && "-ml-8"
                  )}
                  aria-label={searchOpen ? "Close search" : "Open search"}
                >
                  {searchOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </form>
            </div>
            <CartButton />
            {/* Auth button */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-600">
                      {user?.displayName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex cursor-pointer items-center gap-1 text-xs font-medium text-stone-600 transition-colors hover:text-stone-900"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-stone-900"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
