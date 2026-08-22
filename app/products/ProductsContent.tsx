"use client";

import {
  X,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const ALL_CATEGORIES = ["Insulation", "Adhesives & Sealants"] as const;

const ALL_APPLICATIONS = [
  "Interior Walls",
  "Ceilings",
  "Roofs",
] as const;

export default function ProductsContent({ dbProducts }: { dbProducts: any[] }) {

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Map db products to UI expected structure if needed, or use directly
  const PRODUCTS_CATALOG = dbProducts.map(p => ({
    id: p.slug,
    name: p.name,
    category: p.category?.name || "Uncategorized",
    application: p.applications[0] || "Interior Walls",
    thickness: 12.5, // dummy if not present
    imageUrl: p.images[0] || "",
    description: p.description
  }));

  // Toggle category
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Toggle application
  const toggleApplication = (app: string) => {
    setSelectedApplications((prev) =>
      prev.includes(app)
        ? prev.filter((a) => a !== app)
        : [...prev, app]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedApplications([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_CATEGORIES.forEach(cat => counts[cat] = 0);
    PRODUCTS_CATALOG.forEach(p => {
      if (counts[p.category] !== undefined) counts[p.category]++;
    });
    return counts;
  }, [PRODUCTS_CATALOG]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Application filter
      if (
        selectedApplications.length > 0 &&
        !selectedApplications.includes(product.application)
      ) {
        return false;
      }

      // Search query
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesApp = product.application.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesApp) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategories, selectedApplications, searchQuery, PRODUCTS_CATALOG]);

  // Active filters for chips
  const activeChips = useMemo(() => {
    const chips: { type: string; value: string; onRemove: () => void }[] = [];
    selectedCategories.forEach((cat) => {
      chips.push({
        type: "Category",
        value: cat,
        onRemove: () => toggleCategory(cat),
      });
    });
    selectedApplications.forEach((app) => {
      chips.push({
        type: "Application",
        value: app,
        onRemove: () => toggleApplication(app),
      });
    });
    if (searchQuery) {
      chips.push({
        type: "Search",
        value: searchQuery,
        onRemove: () => setSearchQuery(""),
      });
    }
    return chips;
  }, [selectedCategories, selectedApplications, searchQuery]);

  // Pagination calculation
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="grow flex flex-col pt-16">
      {/* Hero Search Section */}
      <section
        className="w-full h-44 sm:h-48 relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_GvHbP6FmfO97qNYkf-h9IRXtP1KMtwW-nomlyg1-3_Mxwi4QU0vur6y5S-cRiGN9nKeQbT7LL0VZRFZrkxIbNH8OcQXjvoHbzAdeSkuLfvNLmXQ0WZ5Oe_aET-e2WXODOHbHOu4F53kLjOJXzGmp2icNFJKgr-sAwZ7X8PHPQjkOp9rNSmZXwB6BSSWuEXlMTCuABDfY1PfDIH1gHlNJ0EPd7DUIIRXYNOMmGR2uLOn026fqvtty4Q')`,
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />
        <div className="relative z-10 w-full max-w-4xl px-4 md:px-12">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Search technical materials, specs, or SKUs..."
          />
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="grow w-full max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-3 border border-gray-200 rounded">
          <button
            type="button"
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <Filter className="w-4 h-4 text-primary" />
            Filters {activeChips.length > 0 && `(${activeChips.length})`}
          </button>
          {activeChips.length > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-mono text-primary hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`${
            mobileFilterOpen ? "block" : "hidden"
          } md:block md:col-span-3 space-y-6`}
        >
          <div className="bg-white p-4 border border-gray-200 rounded space-y-5 shadow-xs">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Filters
              </h2>
              {activeChips.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Category</h3>
              <div className="space-y-2 pt-1">
                {ALL_CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  const count = categoryCounts[cat] || 0;
                  return (
                    <label
                      key={cat}
                      className="flex items-center justify-between gap-2 cursor-pointer group select-none text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat)}
                          className="h-4 w-4 text-primary accent-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                        />
                        <span
                          className={`transition-colors ${
                            isChecked
                              ? "text-gray-900 font-medium"
                              : "text-gray-600 group-hover:text-primary"
                          }`}
                        >
                          {cat}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Area of Application */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Area of Application</h3>
              <div className="space-y-2 pt-1">
                {ALL_APPLICATIONS.map((app) => {
                  const isChecked = selectedApplications.includes(app);
                  return (
                    <label
                      key={app}
                      className="flex items-center gap-2 cursor-pointer group select-none text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleApplication(app)}
                        className="h-4 w-4 text-primary accent-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                      />
                      <span
                        className={`transition-colors ${
                          isChecked
                            ? "text-gray-900 font-medium"
                            : "text-gray-600 group-hover:text-primary"
                        }`}
                      >
                        {app}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="md:col-span-9 space-y-4">
          {/* Utilities Bar */}
          <div className="bg-white p-3 border border-gray-200 rounded flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
            <span className="text-sm text-gray-600 font-medium">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> results
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

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip, index) => (
                <div
                  key={`${chip.type}-${chip.value}-${index}`}
                  className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded text-xs"
                >
                  <span className="font-mono text-gray-500">{chip.type}:</span>
                  <span className="text-gray-900 font-medium">{chip.value}</span>
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    aria-label={`Remove ${chip.value}`}
                    className="text-gray-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="font-mono text-xs text-primary hover:underline px-2 py-1 cursor-pointer font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Container */}
          {paginatedProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product as unknown as import("@/data/products").ProductItem}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 p-12 text-center rounded">
              <p className="text-gray-500 text-sm mb-3">
                No materials match your selected filters.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center pt-6 gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-primary text-white font-bold"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
