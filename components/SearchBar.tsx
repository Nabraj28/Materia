"use client";

import { useState, type FormEvent } from "react";
import { Search, ArrowRight } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "e.g. Plasterboard, fire-rated insulation, 12.5mm GK...",
  value,
  onChange,
  onSearch,
  className = "",
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const isControlled = value !== undefined;
  const currentQuery = isControlled ? value : internalQuery;

  const handleChange = (newVal: string) => {
    if (!isControlled) {
      setInternalQuery(newVal);
    }
    onChange?.(newVal);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(currentQuery);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`glass-panel p-2 md:p-3 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center border border-gray-200 shadow-sm rounded ${className}`}
      role="search"
    >
      <div className="relative flex-1 flex items-center bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-[#9c4000] focus-within:border-[#9c4000] transition-colors rounded">
        <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" aria-hidden="true" />
        <input
          type="search"
          value={currentQuery}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search materials and products"
          className="w-full h-12 bg-transparent border-none outline-none focus:ring-0 text-gray-900 placeholder:text-gray-500 px-3 text-base"
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto h-12 px-7 bg-[#9c4000] hover:bg-[#803400] text-white font-bold transition-colors whitespace-nowrap cursor-pointer rounded shadow-sm text-sm flex items-center justify-center gap-2"
      >
        Find Materials
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
