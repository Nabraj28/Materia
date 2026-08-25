import React from "react";

export function ProductCardSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 flex flex-row rounded overflow-hidden shadow-xs animate-pulse">
        <div className="w-28 h-28 sm:w-56 sm:h-44 bg-gray-100 shrink-0" />
        <div className="p-3 sm:p-5 flex-1 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-full hidden sm:block" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 flex flex-col rounded overflow-hidden shadow-xs animate-pulse h-full">
      <div className="aspect-3/2 sm:aspect-square bg-gray-100 w-full" />
      <div className="p-4 space-y-3 flex-1">
        <div className="h-3 bg-gray-200 rounded w-20" />
        <div className="h-5 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="bg-white p-4 sm:p-5 border border-gray-200 rounded space-y-5 shadow-xs animate-pulse">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="space-y-3 border-b border-gray-100 pb-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="space-y-2 pt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-100 rounded w-28" />
              <div className="h-3 bg-gray-100 rounded w-6" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="space-y-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-100 rounded w-32" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <section className="w-full lg:col-span-9 space-y-4">
      <div className="bg-white p-3 border border-gray-200 rounded flex items-center justify-between shadow-xs animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-36" />
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} viewMode="grid" />
        ))}
      </div>
    </section>
  );
}
