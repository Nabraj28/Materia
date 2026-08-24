import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/product";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const categorySlug =
      typeof params.category === "string" ? params.category : undefined;

  const [{ products, pagination }, categories, activeCategory] =
      await Promise.all([
        getProducts(params),
        getCategories(),
        categorySlug ? getCategoryBySlug(categorySlug) : null,
      ]);

  return (
    <Suspense fallback={<div className="flex-1 pt-32 text-center text-gray-500">Loading catalog...</div>}>
      <ProductsContent
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        pagination={pagination}
      />
    </Suspense>
  );
}
