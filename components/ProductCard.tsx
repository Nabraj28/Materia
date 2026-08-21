"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { ProductItem } from "@/data/products";

interface ProductCardProps {
  product: ProductItem;
  viewMode?: "grid" | "list";
  onAdd?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onAdd,
}: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <article className="bg-white border border-gray-200 flex flex-col sm:flex-row group hover:border-[#9c4000] transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm">
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
        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase text-gray-500 block mb-1">
              {product.category}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-[#9c4000] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Technical Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between sm:flex-col gap-0.5">
                <span className="text-gray-500 text-[11px]">{spec.label}</span>
                <span className="text-gray-900 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono text-[10px] font-medium border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onAdd ? onAdd(product) : alert(`Added ${product.name} to specification list`)}
              aria-label={`Add ${product.name}`}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-[#9c4000] hover:bg-[#9c4000] hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white border border-gray-200 flex flex-col group hover:border-[#9c4000] transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm">
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
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase text-gray-500 block mb-0.5">
            {product.category}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#9c4000] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Technical Data Table */}
        <div className="font-mono text-xs text-gray-600 space-y-1.5 flex-grow pt-1">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between border-b border-gray-100 pb-1 text-xs"
            >
              <span className="text-gray-500">{spec.label}</span>
              <span className="text-gray-900 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom Tags & Action */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono text-[10px] font-medium border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onAdd ? onAdd(product) : alert(`Added ${product.name} to specification list`)}
            aria-label={`Add ${product.name}`}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-[#9c4000] hover:bg-[#9c4000] hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
