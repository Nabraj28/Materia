export interface SeedManufacturer {
  name: string;
  location: string;
  website: string;
  contact_number?: string;
}

export interface SeedSpecification {
  groupName: string;
  columns: string[];
  rows: Record<string, string>[];
}

export interface SeedVariant {
  groupName: string;
  columns: string[];
  rows: Record<string, string>[];
}

export interface SeedProperties {
  ceMarked: boolean;
  fireClass?: string;
  waterResistance?: string;
  frostResistant?: boolean;
  vaporPermeable?: boolean;
  recyclable?: boolean;
  durability?: string;
}

export interface SeedCertification {
  name: string;
  issuedBy?: string;
  documentURL?: string;
  badge?: string;
}

export interface SeedProduct {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  scope: string[];
  manufacturer: SeedManufacturer;
  category: string;
  description: string;
  images: string[];
  specifications?: SeedSpecification[];
  variants?: SeedVariant[];
  applications: string[];
  properties?: SeedProperties;
  certifications?: SeedCertification[];
}
