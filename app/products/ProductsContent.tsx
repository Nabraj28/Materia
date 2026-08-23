import { PaginationData } from "@/types/product";
import { Category, Product } from "@prisma/client";
import ProductListSection from "@/components/ProductList";
import ProductSearchBar from "@/components/ProductSearchBar";
import ProductFilterSection from "@/components/ProductFilter";

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
    <div className="grow flex flex-col pt-16">
      <section
        className="w-full h-44 sm:h-48 relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_GvHbP6FmfO97qNYkf-h9IRXtP1KMtwW-nomlyg1-3_Mxwi4QU0vur6y5S-cRiGN9nKeQbT7LL0VZRFZrkxIbNH8OcQXjvoHbzAdeSkuLfvNLmXQ0WZ5Oe_aET-e2WXODOHbHOu4F53kLjOJXzGmp2icNFJKgr-sAwZ7X8PHPQjkOp9rNSmZXwB6BSSWuEXlMTCuABDfY1PfDIH1gHlNJ0EPd7DUIIRXYNOMmGR2uLOn026fqvtty4Q')`,
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />
        <div className="relative z-10 w-full max-w-4xl px-4 md:px-12">
          <ProductSearchBar />
        </div>
      </section>

      {/* Main Content Layout (Server Component Layout) */}
      <main className="grow w-full max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Mobile Filter Button & Sidebar Filter Panel */}
        <ProductFilterSection categories={categories} />

        {/* Product Cards Container & Load More */}
        <ProductListSection
          initialProducts={products}
          pagination={pagination}
        />
      </main>
    </div>
  );
}
