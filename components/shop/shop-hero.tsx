"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ShopHeroProps {
  searchQuery?: string;
}

export function ShopHero({ searchQuery }: ShopHeroProps) {
  const [query, setQuery] = useState(searchQuery || "");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-serif text-4xl italic tracking-tight text-stone-900 md:text-5xl">
          the treats
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-stone-600 md:text-lg">
          science-backed BPC-157 treats crafted for your dog's health and vitality—
          because your best friend deserves the best.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-stone-300 bg-white py-3 pl-12 pr-4 text-stone-900 placeholder-stone-400 transition-colors focus:border-stone-500 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
