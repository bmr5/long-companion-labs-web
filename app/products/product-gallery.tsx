"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  {
    src: "/products/carousel-1-lifestyle-golden.png",
    alt: "Puptides BPC-157 Joint & Recovery pouch with golden retriever in kitchen",
  },
  {
    src: "/products/carousel-2-multi-breed.png",
    alt: "Puptides BPC-157 pouch with German Shepherd, Labrador, and Cavalier King Charles",
  },
  {
    src: "/products/carousel-3-hero-treats.png",
    alt: "Puptides BPC-157 Joint & Recovery pouch with treats and trust badges",
  },
  {
    src: "/products/carousel-4-owner-feeding.png",
    alt: "Owner feeding a Puptides BPC-157 treat to golden retriever",
  },
];

export function ProductGallery() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={images[selected]!.src}
          alt={images[selected]!.alt}
          fill
          priority={selected === 0}
          className="object-cover transition-opacity duration-300"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute top-4 left-4 rounded-full bg-[#C4A484] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          New
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setSelected(i)}
            className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
              selected === i
                ? "ring-2 ring-[#C4A484] ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-1">
        <div className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-3 text-center">
          <span className="text-lg">🇺🇸</span>
          <span className="mt-1 text-xs font-medium text-stone-600">Made in USA</span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-3 text-center">
          <span className="text-lg">🔬</span>
          <span className="mt-1 text-xs font-medium text-stone-600">Lab Tested</span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-3 text-center">
          <span className="text-lg">👨‍⚕️</span>
          <span className="mt-1 text-xs font-medium text-stone-600">Vet Reviewed</span>
        </div>
      </div>
    </div>
  );
}
