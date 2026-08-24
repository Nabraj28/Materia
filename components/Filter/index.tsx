'use client'

import React, { useTransition, useMemo } from 'react'
import type { Category, GenericFilterItem } from '@/types/category'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export interface FilterPanelProps {
  categories?: Category[]
  mobileFilterOpen?: boolean
  categoryCounts?: Record<string, number>
  className?: string
}

function parseGenericFilters(
    value: unknown
): GenericFilterItem[] {
  if (!Array.isArray(value)) return []

  return value.filter((item): item is GenericFilterItem => {
    return (
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'field' in item &&
        'type' in item
    )
  })
}

const FilterPanel: React.FunctionComponent<FilterPanelProps> = ({
                                                                  categories = [],
                                                                  mobileFilterOpen,
                                                                  categoryCounts = {},
                                                                  className = '',
                                                                }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const selectedCategory = searchParams.get('category');

  const genericFilters: GenericFilterItem[] = useMemo(() => {
    const filters = categories.flatMap((cat) =>
        parseGenericFilters(cat.genericFilters)
    )

    const map = new Map<string, GenericFilterItem>()

    filters.forEach((f) => {
      if (!map.has(f.field)) {
        map.set(f.field, f)
      }
    })

    return Array.from(map.values())
  }, [categories])

  const hasActiveCategoryFilters = Boolean(selectedCategory)

  const hasActiveGenericFilters = genericFilters.some((f) => {
    const type = f.type.toUpperCase()
    if (type === 'BOOLEAN') return searchParams.get(f.field) === 'true'
    if (type === 'MULTI_SELECT') return searchParams.getAll(f.field).length > 0
    return Boolean(searchParams.get(f.field))
  })

  const hasActiveFilters =
      hasActiveCategoryFilters || hasActiveGenericFilters

  function updateParams(modifier: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString())
    modifier(params)
    params.delete('page')

    const queryString = params.toString()

    startTransition(() => {
      router.replace(
          queryString ? `${pathname}?${queryString}` : pathname,
          { scroll: false }
      )
    })
  }

  function toggleCategory(catSlug: string) {
    updateParams((params) => {
      const current = params.get('category')

      if (current === catSlug) {
        params.delete('category')
      } else {
        params.set('category', catSlug)
      }
    })
  }

  function toggleMultiSelect(field: string, val: string) {
    updateParams((params) => {
      const current = params.getAll(field)
      params.delete(field)

      const next = current.includes(val)
          ? current.filter((s) => s !== val)
          : [...current, val]

      next.forEach((s) => params.append(field, s))
    })
  }

  function toggleSelect(field: string, val: string) {
    updateParams((params) => {
      if (params.get(field) === val) {
        params.delete(field)
      } else {
        params.set(field, val)
      }
    })
  }

  function toggleBoolean(field: string) {
    updateParams((params) => {
      if (params.get(field) === 'true') {
        params.delete(field)
      } else {
        params.set(field, 'true')
      }
    })
  }

  function clearFilters() {
    updateParams((params) => {
      params.delete('category')
      genericFilters.forEach((f) => params.delete(f.field))
    })
  }

  const nonBooleanFilters = genericFilters.filter(
      (f) => f.type.toUpperCase() !== 'BOOLEAN'
  )

  const booleanFilters = genericFilters.filter(
      (f) => f.type.toUpperCase() === 'BOOLEAN'
  )

  return (
      <aside
          className={`${
              mobileFilterOpen !== undefined
                  ? mobileFilterOpen
                      ? 'block'
                      : 'hidden'
                  : 'block'
          } md:block space-y-6 ${className}`}
      >
        <div className="bg-white p-4 sm:p-5 border border-gray-200 rounded space-y-5 shadow-xs">

          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Filters
            </h2>

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="font-mono text-xs text-primary hover:underline cursor-pointer font-medium"
                >
                  Reset All
                </button>
            )}
          </div>

          {/* Categories (SINGLE SELECT) */}
          <div className="space-y-2.5 border-b border-gray-100 pb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Category
            </h3>

            {categories.length > 0 ? (
                <div className="space-y-2 pt-0.5">
                  {categories.map((cat) => {
                    const slug = cat.slug || cat.name.toLowerCase()

                    const isChecked = selectedCategory === slug

                    const count =
                        categoryCounts[cat.name] ??
                        categoryCounts[cat.slug] ??
                        categoryCounts[slug]

                    return (
                        <label
                            key={cat.id || slug}
                            className="flex items-center justify-between gap-2 cursor-pointer group text-sm"
                        >
                          <div className="flex items-center gap-2">
                            {/* Checkbox UI but single-select behavior */}
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCategory(slug)}
                                className="h-4 w-4 accent-primary cursor-pointer"
                            />

                            <span
                                className={
                                  isChecked
                                      ? 'text-gray-900 font-medium'
                                      : 'text-gray-600 group-hover:text-gray-900'
                                }
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

          {/* NON-BOOLEAN FILTERS */}
          {nonBooleanFilters.map((filter) => {
            const type = filter.type.toUpperCase()
            const options = (filter.options || []).map((o) =>
                typeof o === 'string' ? o : o.value
            )

            if (type === 'MULTI_SELECT') {
              const selected = searchParams.getAll(filter.field)

              return (
                  <div key={filter.field} className="space-y-2.5 border-b pb-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {filter.label}
                    </h3>

                    {options.map((opt) => {
                      const isChecked = selected.includes(opt)

                      return (
                          <label key={opt} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                    toggleMultiSelect(filter.field, opt)
                                }
                            />
                            <span
                                className={
                                  isChecked
                                      ? 'text-gray-900 font-medium'
                                      : 'text-gray-600 group-hover:text-gray-900'
                                }
                            >
                              {opt}
                            </span>
                          </label>
                      )
                    })}
                  </div>
              )
            }

            if (type === 'SELECT') {
              const selected = searchParams.get(filter.field)

              return (
                  <div key={filter.field} className="space-y-2.5 border-b pb-4">
                    <h3 className="text-sm font-semibold">{filter.label}</h3>

                    <div className="grid grid-cols-3 gap-1.5">
                      {options.map((opt) => {
                        const active = selected === opt

                        return (
                            <button
                                key={opt}
                                onClick={() => toggleSelect(filter.field, opt)}
                                className={
                                  active
                                      ? 'bg-primary text-white px-2 py-1 rounded text-sm'
                                      : 'bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm'
                                }
                            >
                              {opt}
                            </button>
                        )
                      })}
                    </div>
                  </div>
              )
            }

            return null
          })}

          {/* BOOLEAN FILTERS */}
          {booleanFilters.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Properties
                </h3>

                {booleanFilters.map((filter) => {
                  const isChecked =
                      searchParams.get(filter.field) === 'true'

                  return (
                      <label
                          key={filter.field}
                          className="flex items-center gap-2 text-sm"
                      >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleBoolean(filter.field)}
                        />
                        <span>{filter.label}</span>
                      </label>
                  )
                })}
              </div>
          )}
        </div>
      </aside>
  )
}

export default FilterPanel