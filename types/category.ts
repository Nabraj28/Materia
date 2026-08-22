export interface SeedCategory {
  id?: string;
  slug: string;
  name: string;
  genericFilters?: GenericFilter[];
  filters?: Filter[];
}

export interface GenericFilter {
  label: string
  field: string
  type: string
  options?: string[]
}

export interface Filter {
  label: string
  specKey: string
  type: string
  unit?: string
}
