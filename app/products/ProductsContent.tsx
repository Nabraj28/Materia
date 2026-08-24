import Image from "next/image";
import { PaginationData } from "@/types/product";
import { Category, Product } from "@prisma/client";
import ProductListSection from "@/components/ProductList";
import ProductSearchBar from "@/components/ProductSearchBar";
import ProductFilterSection from "@/components/ProductFilter";
import {SpecFilterItem} from "@/lib/product";

export interface ProductsContentProps {
  products: Product[];
  categories: Category[];
  activeCategory?: Category | null;
  pagination?: PaginationData;
}

export default function ProductsContent({
  products,
  categories,
  pagination,
}: ProductsContentProps) {
  return (
    <div className="grow flex flex-col">
      <section className="w-full min-h-35 sm:min-h-45 py-6 sm:py-8 relative flex items-center justify-center overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_GvHbP6FmfO97qNYkf-h9IRXtP1KMtwW-nomlyg1-3_Mxwi4QU0vur6y5S-cRiGN9nKeQbT7LL0VZRFZrkxIbNH8OcQXjvoHbzAdeSkuLfvNLmXQ0WZ5Oe_aET-e2WXODOHbHOu4F53kLjOJXzGmp2icNFJKgr-sAwZ7X8PHPQjkOp9rNSmZXwB6BSSWuEXlMTCuABDfY1PfDIH1gHlNJ0EPd7DUIIRXYNOMmGR2uLOn026fqvtty4Q"
          alt="Architectural materials banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />
        <div className="relative z-10 w-full max-w-4xl mx-auto padding-x">
          <ProductSearchBar />
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="grow container-main padding-y flex flex-col md:grid md:grid-cols-12 gap-6 items-start">
        {/* Mobile Filter Accordion & Desktop Sidebar Filter Panel */}
        <ProductFilterSection
          categories={categories}
        />

        {/* Product Cards Container & Load More */}
        <ProductListSection
          initialProducts={products}
          pagination={pagination}
        />
      </main>
    </div>
  );
}
