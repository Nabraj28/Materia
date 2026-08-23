"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductSearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function ProductSearchBar({
  placeholder = "Search technical materials, specs, or SKUs...",
  className = "",
}: ProductSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const urlSearch = searchParams.get("search") || searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);

  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchQuery(urlSearch);
  }

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      if (term.trim()) {
        params.set("search", term.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");
      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      startTransition(() => {
        router.push(nextUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router, startTransition]
  );

  const handleClear = () => {
    setSearchQuery("");
    setPrevUrlSearch("");
    handleSearch("");
  };

  const debouncedQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (debouncedQuery.trim() !== urlSearch.trim()) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery, handleSearch, urlSearch]);

  return (
    <div
      className={`glass-panel p-2 md:p-3 border border-gray-200 shadow-sm rounded ${className}`}
    >
      <div className="relative flex items-center bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-primary transition-colors rounded">
        <Search
          className="w-5 h-5 text-gray-400 ml-3 shrink-0"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search materials and products"
          className="w-full h-12 bg-transparent border-none outline-none focus:ring-0 text-gray-900 px-3 text-base"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="p-1.5 mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
