"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/products";

interface ProductCardProps {
  product: ProductItem;
  viewMode?: "grid" | "list";
  onAdd?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.id}`} className="group outline-none">
        <article className="bg-white border border-gray-200 flex flex-col sm:flex-row hover:border-[#9c4000] transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm">
          {/* Thumbnail */}
          <div className="sm:w-56 h-48 sm:h-auto bg-gray-50 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center justify-center p-4 shrink-0">
            <div className="relative w-full h-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow justify-start gap-2">
            <span className="font-mono text-xs uppercase text-gray-500 block">
              {product.category}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-[#9c4000] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`} className="group outline-none h-full block">
      <article className="bg-white border border-gray-200 flex flex-col hover:border-[#9c4000] transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm h-full">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 relative w-full border-b border-gray-200 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col flex-grow justify-start gap-2">
          <span className="font-mono text-xs uppercase text-gray-500 block">
            {product.category}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#9c4000] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
