import Link from "next/link";
import { PackageX, ArrowLeft, Home } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex-1 flex items-center justify-center container-main padding-y min-h-[50vh]">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 border border-gray-200 rounded-lg shadow-xs">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
          <PackageX className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
            Product Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Material Not Available
          </h1>
          <p className="text-sm text-gray-600">
            The architectural material or product specification you requested could not be found.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Products</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:border-primary text-gray-800 hover:text-primary text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
