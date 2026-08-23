"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import {Product} from "@prisma/client";

interface ProductCardProps {
  product: {
    id?: string;
    slug?: string;
    name: string;
    category?: string | { name: string };
    description?: string;
    imageUrl?: string | null;
    images?: string[];
  };
  viewMode?: "grid" | "list";
  onAdd?: (product: Product) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const productId = product.slug || product.id || "";
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "Materials";

  const rawImage =
    product.imageUrl ||
    (product.images && product.images.length > 0 ? product.images[0] : null);
  const imageSrc = rawImage && rawImage.trim() !== "" ? rawImage : null;

  if (viewMode === "list") {
    return (
      <Link href={`/products/${productId}`} className="group outline-none">
        <article className="bg-white border border-gray-200 flex flex-col sm:flex-row hover:border-primary transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm">
          {/* Thumbnail */}
          <div className="sm:w-56 h-48 sm:h-auto bg-gray-50 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center justify-center p-4 shrink-0">
            <div className="relative w-full h-full flex items-center justify-center">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 gap-1">
                  <Package className="w-8 h-8 stroke-1" />
                  <span className="text-[10px] font-mono uppercase">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col grow justify-start gap-2">
            <span className="font-mono text-xs uppercase text-gray-500 block">
              {categoryName}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/products/${productId}`} className="group outline-none h-full block">
      <article className="bg-white border border-gray-200 flex flex-col hover:border-primary transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm h-full">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 relative w-full border-b border-gray-200 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 gap-1.5">
                <Package className="w-10 h-10 stroke-1" />
                <span className="text-[11px] font-mono uppercase tracking-wider">No image</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col grow justify-start gap-2">
          <span className="font-mono text-xs uppercase text-gray-500 block">
            {categoryName}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
