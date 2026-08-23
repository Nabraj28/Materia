"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Maximize2, Package } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FunctionComponent<ProductGalleryProps> =({ images, name })=> {

  const [activeImage, setActiveImage] = useState(0);

  const displayImages = images.length > 0 ? images : [];
  const currentImage = displayImages[activeImage] || null;

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="aspect-square w-full bg-gray-100 border border-gray-200 rounded overflow-hidden relative group flex items-center justify-center">
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <button
              type="button"
              onClick={() => window.open(currentImage, "_blank")}
              aria-label="View full size image"
              className="absolute bottom-3 right-3 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 shadow-sm hover:border-primary hover:text-primary transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
            <Package className="w-16 h-16 stroke-1" />
            <span className="font-mono text-xs uppercase tracking-wider">
              No Image Available
            </span>
          </div>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {displayImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(idx)}
              className={`aspect-square bg-gray-100 border overflow-hidden rounded transition-all cursor-pointer relative ${
                activeImage === idx
                  ? "border-primary ring-1 ring-primary"
                  : "border-gray-200 hover:border-primary opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${name} view ${idx + 1}`}
                fill
                sizes="120px"
                className={`object-contain p-1 transition-all ${
                  activeImage !== idx ? "grayscale" : ""
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
