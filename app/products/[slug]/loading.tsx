export default function ProductDetailLoading() {
  return (
    <main className="flex-1 container-main padding-y animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 border border-gray-200 rounded-lg w-full" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 border border-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-28" />
            <div className="h-9 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            ))}
          </div>

          <div className="h-12 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </main>
  );
}
