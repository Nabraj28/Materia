'use client'

import React, { useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/types/category'

export interface FilterPanelProps {
  categories?: (Category | { id?: string; slug: string; name: string })[]
  mobileFilterOpen?: boolean
  categoryCounts?: Record<string, number>
  className?: string
}

export function FilterPanel({
  categories = [],
  mobileFilterOpen,
  categoryCounts = {},
  className = '',
}: FilterPanelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const selectedCategories = searchParams.getAll('category')

  function toggleCategory(catSlug: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.getAll('category')
    params.delete('category')
    params.delete('page')

    const next = current.includes(catSlug)
      ? current.filter((s) => s !== catSlug)
      : [...current, catSlug]

    next.forEach((s) => params.append('category', s))

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('page')
    startTransition(() => {
      const queryString = params.toString()
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    })
  }

  const hasSelectedCategories = selectedCategories.length > 0

  return (
    <aside
      className={`${
        mobileFilterOpen !== undefined ? (mobileFilterOpen ? 'block' : 'hidden') : 'block'
      } md:block space-y-6 ${className}`}
    >
      <div className="bg-white p-4 border border-gray-200 rounded space-y-4 shadow-xs">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Filters
          </h2>
          {hasSelectedCategories && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono text-xs text-primary hover:underline cursor-pointer font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category Filter Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">Category</h3>
          
          {categories.length > 0 ? (
            <div className="space-y-2 pt-1">
              {categories.map((cat) => {
                const slug = cat.slug || cat.name.toLowerCase()
                const isChecked = selectedCategories.includes(slug)
                const count =
                  categoryCounts[cat.name] ??
                  categoryCounts[cat.slug] ??
                  categoryCounts[slug]

                return (
                  <label
                    key={cat.id || slug}
                    className="flex items-center justify-between gap-2 cursor-pointer group select-none text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(slug)}
                        className="h-4 w-4 text-primary accent-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                      />
                      <span
                        className={`transition-colors ${
                          isChecked
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </div>
                    {count !== undefined && (
                      <span className="text-xs text-gray-400 font-mono">
                        ({count})
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 pt-1">
              No categories available
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}

export default FilterPanel
