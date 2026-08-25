import React from "react";
import Link from "next/link";
import Image from "next/image";
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
const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  viewMode = "grid",
})=> {

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
      <Link
        href={`/products/${productId}`}
        className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
      >
        <article className="bg-white border border-gray-200 flex flex-row hover:border-primary transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm">
          {/* Thumbnail */}
          <div className="w-28 h-28 sm:w-56 sm:h-auto bg-gray-50 relative border-r border-gray-200 p-2 sm:p-4 shrink-0 overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 112px, 224px"
                className="object-contain p-2 sm:p-4 transition-transform duration-300 motion-safe:group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 stroke-1" aria-hidden="true" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase">No image</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-2.5 sm:p-5 flex flex-col grow justify-center sm:justify-start gap-0.5 sm:gap-2 min-w-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase text-gray-500 block">
              {categoryName}
            </span>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 leading-snug sm:leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-0.5 sm:mt-1">
                {product.description}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${productId}`}
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded h-full block"
    >
      <article className="bg-white border border-gray-200 flex flex-col hover:border-primary transition-colors rounded overflow-hidden shadow-xs hover:shadow-sm h-full">
        {/* Product Image */}
        <div className="aspect-3/2 sm:aspect-square bg-gray-50 relative w-full border-b border-gray-200 p-4 overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-4 transition-transform duration-300 motion-safe:group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1.5">
              <Package className="w-10 h-10 stroke-1" aria-hidden="true" />
              <span className="text-[11px] font-mono uppercase tracking-wider">
                No image
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col grow justify-start gap-2 min-w-0">
          <span className="font-mono text-xs uppercase text-gray-500 block">
            {categoryName}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
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

export default ProductCard;
