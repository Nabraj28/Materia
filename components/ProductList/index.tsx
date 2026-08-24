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

  // function updateParams(modifier: (params: URLSearchParams) => void) {
  //   const params = new URLSearchParams(searchParams.toString())
  //   modifier(params)
  //   params.delete('page')
  //
  //   const queryString = params.toString()
  //   window.history.replaceState(null, '', queryString ? `?${queryString}` : window.location.pathname)
  // }

  // function toggleSelect(field: string, val: string) {
  //   updateParams((params) => {
  //     if (params.get(field) === val) {
  //       params.delete(field)
  //     } else {
  //       params.set(field, val)
  //     }
  //   })
  // }

  // function toggleMulti(field: string, val: string) {
  //   updateParams((params) => {
  //     const current = params.getAll(field)
  //     params.delete(field)
  //
  //     const next = current.includes(val)
  //         ? current.filter((v) => v !== val)
  //         : [...current, val]
  //
  //     next.forEach((v) => params.append(field, v))
  //   })
  // }

  // function updateRange(field: string, type: 'min' | 'max', value: string) {
  //   updateParams((params) => {
  //     const key = `${field}_${type}`
  //     if (!value) {
  //       params.delete(key)
  //     } else {
  //       params.set(key, value)
  //     }
  //   })
  // }

  return (
    <section className="w-full md:col-span-9 space-y-4">
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

      {/*<div>*/}
      {/*  {categoryFilters && categoryFilters.length > 0 && (*/}
      {/*      <div className="bg-white border border-gray-200 rounded p-4 space-y-4">*/}

      {/*        <h3 className="text-sm font-semibold text-gray-900">*/}
      {/*          Filters*/}
      {/*        </h3>*/}

      {/*        <div className="flex flex-col gap-4">*/}

      {/*          {categoryFilters.map((filter, index) => {*/}
      {/*            const type = filter.type.toUpperCase()*/}

      {/*            // SELECT*/}
      {/*            if (type === 'SELECT') {*/}
      {/*              const selected = searchParams.get(filter.specKey)*/}

      {/*              return (*/}
      {/*                  <div key={filter.id} className="space-y-2">*/}
      {/*                    <p className="text-xs font-semibold text-gray-600 uppercase">*/}
      {/*                      {filter.label}*/}
      {/*                    </p>*/}

      {/*                    <div className="flex flex-wrap gap-2">*/}
      {/*                      {filter.options?.map((opt) => {*/}
      {/*                        const active = selected === opt*/}

      {/*                        return (*/}
      {/*                            <button*/}
      {/*                                key={opt}*/}
      {/*                                onClick={() => toggleSelect(filter.specKey, opt)}*/}
      {/*                                className={`px-3 py-1 text-xs rounded border ${*/}
      {/*                                    active*/}
      {/*                                        ? 'bg-primary text-white border-primary'*/}
      {/*                                        : 'bg-gray-100 text-gray-700 border-gray-200'*/}
      {/*                                }`}*/}
      {/*                            >*/}
      {/*                              {opt}*/}
      {/*                            </button>*/}
      {/*                        )*/}
      {/*                      })}*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*              )*/}
      {/*            }*/}

      {/*            // MULTI SELECT*/}
      {/*            if (type === 'MULTI_SELECT') {*/}
      {/*              const selected = searchParams.getAll(filter.specKey)*/}

      {/*              return (*/}
      {/*                  <div key={filter.id} className="space-y-2">*/}
      {/*                    <p className="text-xs font-semibold text-gray-600 uppercase">*/}
      {/*                      {filter.label}*/}
      {/*                    </p>*/}

      {/*                    <div className="flex flex-wrap gap-3">*/}
      {/*                      {filter.options?.map((opt) => {*/}
      {/*                        const isChecked = selected.includes(opt)*/}

      {/*                        return (*/}
      {/*                            <label*/}
      {/*                                key={opt}*/}
      {/*                                className="flex items-center gap-2 text-sm"*/}
      {/*                            >*/}
      {/*                              <input*/}
      {/*                                  type="checkbox"*/}
      {/*                                  checked={isChecked}*/}
      {/*                                  onChange={() =>*/}
      {/*                                      toggleMulti(filter.specKey, opt)*/}
      {/*                                  }*/}
      {/*                              />*/}
      {/*                              <span>{opt}</span>*/}
      {/*                            </label>*/}
      {/*                        )*/}
      {/*                      })}*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*              )*/}
      {/*            }*/}

      {/*            // RANGE*/}
      {/*            if (type === 'RANGE') {*/}
      {/*              const minVal = searchParams.get(`${filter.specKey}_min`) || ''*/}
      {/*              const maxVal = searchParams.get(`${filter.specKey}_max`) || ''*/}

      {/*              return (*/}
      {/*                  <div key={index} className="space-y-2">*/}
      {/*                    <p className="text-xs font-semibold text-gray-600 uppercase">*/}
      {/*                      {filter.label}*/}
      {/*                    </p>*/}

      {/*                    <div className="flex gap-2 items-center">*/}
      {/*                      <input*/}
      {/*                          type="number"*/}
      {/*                          placeholder={`Min ${filter.unit || ''}`}*/}
      {/*                          value={minVal}*/}
      {/*                          onChange={(e) =>*/}
      {/*                              updateRange(filter.specKey, 'min', e.target.value)*/}
      {/*                          }*/}
      {/*                          className="w-full border rounded px-2 py-1 text-sm"*/}
      {/*                      />*/}

      {/*                      <span className="text-xs text-gray-400">—</span>*/}

      {/*                      <input*/}
      {/*                          type="number"*/}
      {/*                          placeholder={`Max ${filter.unit || ''}`}*/}
      {/*                          value={maxVal}*/}
      {/*                          onChange={(e) =>*/}
      {/*                              updateRange(filter.specKey, 'max', e.target.value)*/}
      {/*                          }*/}
      {/*                          className="w-full border rounded px-2 py-1 text-sm"*/}
      {/*                      />*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*              )*/}
      {/*            }*/}

      {/*            return null*/}
      {/*          })}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*  )}*/}
      {/*</div>*/}

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
      ) : (
        <div className="bg-white border border-dashed border-gray-300 p-8 sm:p-12 text-center rounded">
          <p className="text-gray-500 text-sm">
            No materials found for the selected filter.
          </p>
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
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
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
