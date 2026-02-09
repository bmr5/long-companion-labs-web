"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  {
    src: "/products/carousel-1-studio.png",
    alt: "Puptides BPC-157 Joint & Recovery dog treat pouch - studio shot",
  },
  {
    src: "/products/carousel-2-treats-overhead.png",
    alt: "Bone-shaped BPC-157 dog treats close-up on marble",
  },
  {
    src: "/products/carousel-3-feeding.png",
    alt: "Senior golden retriever taking a Puptides treat from owner's hand",
  },
  {
    src: "/products/carousel-4-flatlay.png",
    alt: "Puptides treats styled flat lay with product bag and accessories",
  },
  {
    src: "/products/carousel-5-infographic.png",
    alt: "5 Ways BPC-157 Supports Your Senior Dog - benefits infographic",
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
      <div className="grid grid-cols-5 gap-2">
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
