"use client";

import React, { useState } from "react";
import { ShoppingCart, Bookmark } from "lucide-react";

interface ProductActionsProps {
  productName: string;
}

const ProductActions: React.FunctionComponent<ProductActionsProps> =({ productName }: ProductActionsProps)=> {

  const [saved, setSaved] = useState(false);

    const isDisabled = true;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center py-5 border-y border-gray-200">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => alert(`Quote requested for ${productName}`)}
        className="w-full sm:flex-1 bg-primary cursor-not-allowed text-white font-semibold h-12 px-6 rounded hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
      >
        <ShoppingCart className="w-4 h-4" />
        Request Quote
      </button>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setSaved((s) => !s)}
        className={`w-full sm:flex-1 cursor-not-allowed border font-semibold h-12 px-6 rounded transition-colors flex items-center justify-center gap-2 text-sm active:scale-[0.98] ${
          saved
            ? "bg-primary-light border-primary text-primary"
            : "bg-transparent border-gray-200 text-foreground hover:border-primary hover:text-primary"
        }`}
      >
        <Bookmark
          className={`w-4 h-4 transition-all ${saved ? "fill-primary" : ""}`}
        />
        {saved ? "Saved" : "Save to Project"}
      </button>
    </div>
  );
};

export default ProductActions;
