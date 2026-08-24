export interface GenericFilterOptionItem {
  id?: string;
  value: string;
}

export interface GenericFilterItem {
  id?: string;
  label: string;
  field: string;
  type: string;
  options?: (GenericFilterOptionItem | string)[];
}

export interface Category {
  id?: string;
  slug: string;
  name: string;
  genericFilters?: GenericFilterItem[];
  filters?: Filter[];
}

export interface Filter {
  label: string;
  specKey: string;
  type: string;
  unit?: string;
}
