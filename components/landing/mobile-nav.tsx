"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "TREATS", href: "/products" },
  { name: "WELLNESS", href: "#benefits" },
  { name: "SCIENCE", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
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
              Puptides
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-stone-200">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="-mx-3 block rounded-full bg-[#C4A484] px-3 py-2.5 text-center text-sm font-medium uppercase tracking-wider text-white hover:bg-[#B8997A]"
              >
                Shop Treats
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
