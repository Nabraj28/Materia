"use client";

import { Search, ArrowRight, X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  placeholder = "e.g. Adhesive, GlassWool Roll, Rockwool Panel...",
  value,
  onChange,
  onSearch,
  className = "",
}) => {
  const [internalQuery, setInternalQuery] = useState("");

  const isControlled = value !== undefined;
  const currentQuery = isControlled ? value : internalQuery;

  const handleChange = (newVal: string) => {
    if (!isControlled) {
      setInternalQuery(newVal);
    }
    onChange?.(newVal);
    // If user cleared the input (e.g. backspaced all or clicked native clear button)
    if (newVal.trim() === "") {
      onSearch?.("");
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalQuery("");
    }
    onChange?.("");
    onSearch?.("");
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
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
      <div className="relative flex-1 flex items-center bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-primary transition-colors rounded">
        <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" aria-hidden="true" />
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search materials and products"
          className="w-full h-12 bg-transparent border-none outline-none focus:ring-0 text-gray-900 px-3 text-base"
        />
        {currentQuery && (
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
      <button
        type="submit"
        className="w-full sm:w-auto h-12 px-7 bg-primary hover:bg-primary-hover text-white font-bold transition-colors whitespace-nowrap cursor-pointer rounded shadow-sm text-sm flex items-center justify-center gap-2"
      >
        Find Materials
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
