"use server";

import { getProducts, ProductSearchParams } from "@/lib/product";

export async function loadMoreProducts(params: ProductSearchParams) {
  return getProducts(params);
}
