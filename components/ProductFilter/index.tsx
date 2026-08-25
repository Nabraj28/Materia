"use client";

import { Filter, X } from "lucide-react";
import { Category } from "@prisma/client";
import FilterPanel from "@/components/Filter";
import React, { useState, useEffect } from "react";

interface ProductFilterSectionProps {
  categories: Category[];
}

const ProductFilterSection: React.FunctionComponent<ProductFilterSectionProps> = ({
  categories,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Mobile / Tablet: floating filter icon button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open filters"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          <span>
            Filters
          </span>
        </button>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Drawer (right → left) */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-semibold text-gray-900 text-sm">
              Filters
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto p-4">
          <FilterPanel categories={categories} />
        </div>


      </div>

      {/* Desktop Sidebar Filter Panel */}
      <div className="hidden lg:block w-full lg:col-span-3 sticky top-24">
        <FilterPanel categories={categories} />
      </div>
    </>
  );
};

export default ProductFilterSection;
