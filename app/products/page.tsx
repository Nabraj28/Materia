import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsContent from "./ProductsContent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {

  const products = await prisma.product.findMany({ include: { category: true } });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <Suspense fallback={<div className="flex-1 pt-32 text-center text-gray-500">Loading catalog...</div>}>
        <ProductsContent dbProducts={products} />
      </Suspense>
      <Footer />
    </div>
  );
}
