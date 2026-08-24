import {Prisma} from "@prisma/client";

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
  genericFilters: Prisma.JsonValue
  filters: Prisma.JsonValue
}

export interface Filter {
  label: string;
  specKey: string;
  type: string;
  unit?: string;
}
