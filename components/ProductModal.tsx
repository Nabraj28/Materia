"use client";

import Image from "next/image";
import { X, Download } from "lucide-react";
import type { ProductItem } from "@/data/products";

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-mono font-semibold">
              {product.category} • {product.application}
            </span>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative h-64 w-full rounded overflow-hidden border border-gray-200 bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 font-mono">
              Key Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded border border-gray-200 font-mono text-xs">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <span className="text-gray-500 block text-xs">{spec.label}</span>
                  <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 font-mono">
              Tags & Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-100 text-gray-800 font-medium text-xs rounded border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(`Spec sheet downloaded for: ${product.name}`);
              onClose();
            }}
            className="px-5 py-2 text-sm font-bold bg-[#9c4000] hover:bg-[#803400] text-white transition-colors rounded shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download BIM / EPD
          </button>
        </div>
      </div>
    </div>
  );
}

