"use client";

import {
  Filter,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { Category } from "@prisma/client";
import FilterPanel from "@/components/Filter";
import { useSearchParams } from "next/navigation";

interface ProductFilterSectionProps {
  categories: Category[];
}

const ProductFilterSection: React.FunctionComponent<ProductFilterSectionProps> =({
  categories,
})=> {

  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("category");
  const hasActiveFilters = selectedCategories.length > 0;

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="w-full md:col-span-3">
      {/* Mobile Filter Toggle Button Bar */}
      <div className="md:hidden w-full bg-white p-3 border border-gray-200 rounded shadow-xs mb-4">
        <button
          type="button"
          onClick={() => setMobileFilterOpen((prev) => !prev)}
          className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 cursor-pointer"
          aria-expanded={mobileFilterOpen}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary/10 text-primary font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                {selectedCategories.length}
              </span>
            )}
          </div>
          {mobileFilterOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Collapsible content for mobile */}
        {mobileFilterOpen && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <FilterPanel categories={categories} />
          </div>
        )}
      </div>

      {/* Desktop Sidebar Filter Panel */}
      <div className="hidden md:block sticky top-24">
        <FilterPanel categories={categories} />
      </div>
    </div>
  );
}

export default ProductFilterSection;
