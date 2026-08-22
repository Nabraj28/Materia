/** Shared response types for the Products API. */

export interface ApiCategory {
  id: string;
  slug: string;
  name: string;
  genericFilters?: unknown;
  filters?: unknown;
}

export interface ApiManufacturer {
  id: string;
  name: string;
  location: string;
  website: string;
}

export interface ApiProperties {
  id: string;
  ceMarked: boolean;
  fireClass?: string | null;
  waterResistance?: string | null;
  frostResistant?: boolean | null;
  vaporPermeable?: boolean | null;
  recyclable?: boolean | null;
  durability?: string | null;
}

export interface ApiSpecificationGroup {
  id: string;
  groupName: string;
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface ApiVariantGroup {
  id: string;
  groupName: string;
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface ApiCertification {
  id: string;
  name: string;
  issuedBy?: string | null;
  documentURL?: string | null;
  badge?: string | null;
}

/** Full product shape returned by /api/products/[slug] */
export interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  scope: string[];
  description: string;
  images: string[];
  applications: string[];
  category: ApiCategory;
  manufacturer?: ApiManufacturer | null;
  properties?: ApiProperties | null;
  specifications: ApiSpecificationGroup[];
  variants: ApiVariantGroup[];
  certifications: ApiCertification[];
}

/** Slimmed-down product shape used in listing cards */
export interface ApiProductSummary {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  scope: string[];
  description: string;
  images: string[];
  applications: string[];
  category: Pick<ApiCategory, 'id' | 'slug' | 'name'>;
}

/** Query params accepted by GET /api/products */
export interface ProductFilters {
  /** Full-text search across name, description, brand */
  q?: string;
  /** Category slug(s), comma-separated or array */
  category?: string | string[];
  /** Scope/area values, e.g. "Exterior Wall" */
  scope?: string | string[];
  /** Brand name(s) */
  brand?: string | string[];
  /** Page number (1-based) */
  page?: number;
  /** Items per page */
  pageSize?: number;
}

/** Paginated response from GET /api/products */
export interface ApiProductsResponse {
  data: ApiProductSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Response from GET /api/products/filters — available filter options */
export interface ApiFilterOptions {
  categories: ApiCategory[];
  scopes: string[];
  brands: string[];
}
