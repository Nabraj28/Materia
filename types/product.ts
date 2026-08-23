
export interface Manufacturer {
  name: string;
  location: string;
  website: string;
  contact_number?: string;
}

export interface Specification {
  groupName: string;
  columns: string[];
  rows: Record<string, string>[];
}

export interface Variant {
  groupName: string;
  columns: string[];
  rows: Record<string, string>[];
}

export interface Properties {
  ceMarked: boolean;
  fireClass?: string;
  waterResistance?: string;
  frostResistant?: boolean;
  vaporPermeable?: boolean;
  recyclable?: boolean;
  durability?: string;
}

export interface Certification {
  name: string;
  issuedBy?: string;
  documentURL?: string;
  badge?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  scope: string[];
  manufacturer: Manufacturer;
  category: string;
  description: string;
  images: string[];
  specifications?: Specification[];
  variants?: Variant[];
  applications: string[];
  properties?: Properties;
  certifications?: Certification[];
}

export interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

