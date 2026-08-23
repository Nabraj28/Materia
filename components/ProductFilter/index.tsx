"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Category } from "@prisma/client";
import FilterPanel from "@/components/Filter";

interface ProductFilterSectionProps {
  categories: Category[];
}

export default function ProductFilterSection({
  categories,
}: ProductFilterSectionProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden flex justify-between items-center bg-white p-3 border border-gray-200 rounded col-span-12">
        <button
          type="button"
          onClick={() => setMobileFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer"
        >
          <Filter className="w-4 h-4 text-primary" />
          Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <div className="md:col-span-3">
        <FilterPanel
          categories={categories}
          mobileFilterOpen={mobileFilterOpen}
        />
      </div>
    </>
  );
}
