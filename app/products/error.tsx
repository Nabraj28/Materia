"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products Segment Error:", error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center container-main padding-y min-h-[50vh]">
      <div className="max-w-lg w-full text-center space-y-6 bg-white p-8 sm:p-10 border border-gray-200 rounded-lg shadow-xs">
        <div className="w-14 h-14 bg-primary-light/40 text-primary rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Catalog Error
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Failed to load materials
          </h1>
          <p className="text-sm text-gray-600">
            We encountered a problem fetching the materials list or specifications.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Reload Materials</span>
          </button>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Reset Filters</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
