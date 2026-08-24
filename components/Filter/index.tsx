'use client'

import React, { useTransition } from 'react'
import type { Category } from '@/types/category'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export interface FilterPanelProps {
  categories?: Category[]
  mobileFilterOpen?: boolean
  categoryCounts?: Record<string, number>
  className?: string
}


const SCOPE_OPTIONS = [
  'Exterior Wall',
  'Interior Wall',
  'Floor',
  'Ceiling',
  'Flat Roof',
  'Pitched Roof',
]

const DURABILITY_OPTIONS = ['Low', 'Medium', 'High']

const BOOLEAN_PROPERTIES: { field: string; label: string }[] = [
  { field: 'ceMarked', label: 'CE Marked' },
  { field: 'frostResistant', label: 'Frost Resistant' },
  { field: 'vaporPermeable', label: 'Vapor Permeable' },
  { field: 'recyclable', label: 'Recyclable' },
]

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

  const selectedCategory = searchParams.get('category')
  const selectedScope = searchParams.getAll('scope')
  const selectedDurability = searchParams.get('durability')

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    selectedScope.length > 0 ||
    Boolean(selectedDurability) ||
    BOOLEAN_PROPERTIES.some((p) => searchParams.get(p.field) === 'true')

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

  function toggleScope(val: string) {
    updateParams((params) => {
      const current = params.getAll('scope')
      params.delete('scope')

      const next = current.includes(val)
        ? current.filter((s) => s !== val)
        : [...current, val]

      next.forEach((s) => params.append('scope', s))
    })
  }

  function toggleDurability(val: string) {
    updateParams((params) => {
      if (params.get('durability') === val) {
        params.delete('durability')
      } else {
        params.set('durability', val)
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
      params.delete('scope')
      params.delete('durability')
      BOOLEAN_PROPERTIES.forEach((p) => params.delete(p.field))
    })
  }

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

        {/* 1. Category Filter */}
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

        {/* 2. Scope Filter (Multi-select) */}
        <div className="space-y-2.5 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Scope
          </h3>
          <div className="space-y-2 pt-0.5">
            {SCOPE_OPTIONS.map((scope) => {
              const isChecked = selectedScope.includes(scope)
              return (
                <label key={scope} className="flex items-center gap-2 cursor-pointer group text-sm">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleScope(scope)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                  />
                  <span
                    className={
                      isChecked
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600 group-hover:text-gray-900'
                    }
                  >
                    {scope}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* 3. Durability Filter (Select buttons) */}
        <div className="space-y-2.5 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Durability
          </h3>
          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            {DURABILITY_OPTIONS.map((dur) => {
              const active = selectedDurability === dur
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={() => toggleDurability(dur)}
                  className={
                    active
                      ? 'bg-primary text-white px-2 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors'
                  }
                >
                  {dur}
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Properties (Booleans) */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold text-gray-900">
            Properties
          </h3>
          <div className="space-y-2 pt-0.5">
            {BOOLEAN_PROPERTIES.map((prop) => {
              const isChecked = searchParams.get(prop.field) === 'true'
              return (
                <label key={prop.field} className="flex items-center gap-2 cursor-pointer group text-sm">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBoolean(prop.field)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                  />
                  <span
                    className={
                      isChecked
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600 group-hover:text-gray-900'
                    }
                  >
                    {prop.label}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterPanel