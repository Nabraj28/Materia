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
      <ProductsContent
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        pagination={pagination}
      />
  );
}
