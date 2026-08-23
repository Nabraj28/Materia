import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Index from "@/components/Footer";
import ProductsContent from "./ProductsContent";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/product";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {

  const params = await searchParams;

  const [{ products, pagination }, categories, activeCategory] = await Promise.all([
    getProducts(params),
    getCategories(),
    typeof params.category === "string" ? getCategoryBySlug(params.category) : null,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <Suspense fallback={<div className="flex-1 pt-32 text-center text-gray-500">Loading catalog...</div>}>
        <ProductsContent
          products={products}
          categories={categories}
          activeCategory={activeCategory}
          pagination={pagination}
        />
      </Suspense>
      <Index />
    </div>
  );
}
