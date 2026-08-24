import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import { getCategories, getCategoryBySlug, getGenericFilters, getProducts } from "@/lib/product";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const [{ products, pagination }, categories, activeCategory, genericFilters] = await Promise.all([
    getProducts(params),
    getCategories(),
    typeof params.category === "string" ? getCategoryBySlug(params.category) : null,
    getGenericFilters(typeof params.category === "string" ? params.category : undefined),
  ]);

  return (
    <Suspense fallback={<div className="flex-1 pt-32 text-center text-gray-500">Loading catalog...</div>}>
      <ProductsContent
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        genericFilters={genericFilters}
        pagination={pagination}
      />
    </Suspense>
  );
}
