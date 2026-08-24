import { FilterSkeleton, ProductListSkeleton } from "@/components/LoadingSkeletons";

export default function ProductsLoading() {
  return (
    <div className="grow flex flex-col">
      {/* Banner Skeleton */}
      <section className="w-full min-h-35 sm:min-h-45 py-6 sm:py-8 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto padding-x">
          <div className="h-14 rounded-lg bg-white/80 border border-gray-300" />
        </div>
      </section>

      {/* Main Content Skeleton Layout */}
      <main className="grow container-main padding-y flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
        <div className="hidden lg:block lg:col-span-3 w-full">
          <FilterSkeleton />
        </div>
        <ProductListSkeleton />
      </main>
    </div>
  );
}
