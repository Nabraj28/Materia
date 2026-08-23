"use client";

import {
  LayoutGrid,
  List,
  Loader2,
  ArrowUp
} from "lucide-react";
import { useState } from "react";
import { Product } from "@prisma/client";
import { PaginationData } from "@/types/product";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { loadMoreProducts } from "@/app/products/actions";

interface ProductListSectionProps {
  initialProducts: Product[];
  pagination?: PaginationData;
}

export default function ProductListSection({
  initialProducts,
  pagination: initialPagination,
}: ProductListSectionProps) {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [extraProducts, setExtraProducts] = useState<Product[]>([]);
  const [prevInitialProducts, setPrevInitialProducts] = useState(initialProducts);

  if (prevInitialProducts !== initialProducts) {
    setPrevInitialProducts(initialProducts);
    setExtraProducts([]);
  }

  const [loadingMore, setLoadingMore] = useState(false);

  const allProducts = [...initialProducts, ...extraProducts];
  const totalResults = initialPagination?.total ?? allProducts.length;
  const hasMore = allProducts.length < totalResults;

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const pageSize = initialPagination?.pageSize || 6;
      const nextPage = 1 + Math.floor(allProducts.length / pageSize);

      const categoriesParam = searchParams.getAll("category");
      const searchParam =
        searchParams.get("search") || searchParams.get("q") || undefined;

      const res = await loadMoreProducts({
        category: categoriesParam.length > 0 ? categoriesParam : undefined,
        search: searchParam,
        page: nextPage,
        pageSize,
      });

      setExtraProducts((prev) => [...prev, ...res.products]);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <section className="md:col-span-9 space-y-4">
      {/* Utilities Bar */}
      <div className="bg-white p-3 border border-gray-200 rounded flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <span className="text-sm text-gray-600 font-medium">
          Showing <strong className="text-gray-900">
          {allProducts.length}</strong> of{" "}
          <strong className="text-gray-900">
            {totalResults}
          </strong> results
        </span>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 ml-auto">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-1.5 rounded transition-colors cursor-pointer flex items-center justify-center ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`p-1.5 rounded transition-colors cursor-pointer flex items-center justify-center ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Cards Container */}
      {allProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {allProducts.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center rounded">
          <p className="text-gray-500 text-sm">
            No materials found for the selected filter.
          </p>
        </div>
      )}

      {/* Load More / Back to Top Button */}
      {allProducts.length > 0 && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-2">
          {hasMore ? (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Loading more...
                </>
              ) : (
                <>Load More Materials</>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4 text-primary" />
              Back to Top
            </button>
          )}
          <span className="text-xs text-gray-500 font-mono">
            {hasMore
              ? `Showing ${allProducts.length} of ${totalResults}`
              : `Showing all ${allProducts.length} materials`}
          </span>
        </div>
      )}
    </section>
  );
}
