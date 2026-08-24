"use client";

import {
  LayoutGrid,
  List,
  Loader2,
  ArrowUp,
  SearchX,
  RotateCcw
} from "lucide-react";
import { useState } from "react";
import { Product } from "@prisma/client";
import { PaginationData } from "@/types/product";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

      const queryParams: Record<string, string | string[] | number | undefined> = {
        page: nextPage,
        pageSize,
      };

      searchParams.forEach((_, key) => {
        const allVals = searchParams.getAll(key);
        queryParams[key] = allVals.length > 1 ? allVals : allVals[0];
      });

      const res = await loadMoreProducts(queryParams);

      setExtraProducts((prev) => [...prev, ...res.products]);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  const router = useRouter();
  const pathname = usePathname();

  const handleResetFilters = () => {
    router.replace(pathname);
  };

  const searchQuery = searchParams.get("search") || searchParams.get("q");
  const hasAnyFilterOrSearch = Array.from(searchParams.keys()).length > 0;

  return (
    <section className="w-full lg:col-span-9 space-y-4">
      {/* Utilities Bar */}
      <div className="bg-white p-3 border border-gray-200 rounded flex items-center justify-between shadow-xs">
        <span className="text-xs sm:text-sm text-gray-600 font-medium">
          Showing <strong className="text-gray-900">{allProducts.length}</strong> of{" "}
          <strong className="text-gray-900">{totalResults}</strong> results
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2 border-l border-gray-200 pl-2.5 sm:pl-3">
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
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
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
            <List className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Product Cards Container */}
      {allProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              : "flex flex-col gap-3 sm:gap-4"
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
      ) : hasAnyFilterOrSearch ? (
        /* State 1: Active filters/search returned zero matches */
        <div className="bg-white border border-gray-200 p-8 sm:p-12 text-center rounded-lg shadow-xs space-y-4">
          <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-semibold text-gray-900">
              No matching materials found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {searchQuery
                ? `No products match "${searchQuery}". Try checking for spelling errors or adjusting your filter criteria.`
                : "No products match the selected criteria. Try adjusting or clearing your filters."}
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear All Filters</span>
            </button>
          </div>
        </div>
      ) : (
        /* State 2: Catalog is completely empty (no products in database yet) */
        <div className="bg-white border border-gray-200 p-8 sm:p-14 text-center rounded-lg shadow-xs space-y-4">
          <div className="w-14 h-14 bg-primary-light/40 text-primary rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-7 h-7" aria-hidden="true" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900">
              Materials catalog is empty
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              There are currently no architectural products or materials listed in the catalog. Please check back later or contact the administrator.
            </p>
          </div>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-xs"
            >
              <span>Back to Homepage</span>
            </button>
          </div>
        </div>
      )}

      {/* Load More / Back to Top Button */}
      {allProducts.length > 0 && (
        <div className="flex flex-col items-center justify-center pt-6 sm:pt-8 pb-4 gap-2">
          {hasMore ? (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Loading more…
                </>
              ) : (
                <>Load More Materials</>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowUp className="w-4 h-4 text-primary" aria-hidden="true" />
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
