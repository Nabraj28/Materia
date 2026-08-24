import { prisma } from "@/lib/prisma";
import type { Prisma } from '@prisma/client'
import type { GenericFilterItem, GenericFilterOptionItem } from "@/types/category";

export interface ProductSearchParams {
    category?: string | string[]
    search?: string
    scope?: string | string[]
    durability?: string
    ceMarked?: string
    frostResistant?: string
    recyclable?: string
    page?: string | number
    pageSize?: string | number
    [specKey: string]: string | string[] | number | undefined
}

function toArray(value?: string | string[]): string[] {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
}

export async function getProducts(params: ProductSearchParams) {
    const page = Math.max(1, Number(params.page) || 1)
    const pageSize = Math.max(1, Number(params.pageSize) || 6)
    const skip = (page - 1) * pageSize

    const where: Prisma.ProductWhereInput = {}

    if (params.category) {
        const catList = Array.isArray(params.category) ? params.category : [params.category]
        where.category = { slug: { in: catList } }
    }

    const searchTerm = (
        typeof params.search === 'string'
            ? params.search
            : typeof params.q === 'string'
            ? params.q
            : ''
    ).trim()

    if (searchTerm) {
        where.OR = [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { brand: { contains: searchTerm, mode: 'insensitive' } },
        ]
    }

    const scopeValues = toArray(params.scope)
    if (scopeValues.length > 0) {
        where.scope = { hasSome: scopeValues }
    }

    const propertiesWhere: Prisma.PropertiesWhereInput = {}
    if (params.durability) propertiesWhere.durability = params.durability
    if (params.ceMarked !== undefined) propertiesWhere.ceMarked = params.ceMarked === 'true'
    if (params.frostResistant !== undefined) propertiesWhere.frostResistant = params.frostResistant === 'true'
    if (params.recyclable !== undefined) propertiesWhere.recyclable = params.recyclable === 'true'
    if (Object.keys(propertiesWhere).length > 0) {
        where.properties = propertiesWhere
    }

    const [total, products] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
            where,
            include: {
                category: true,
                manufacturer: true,
                properties: true,
                specifications: true,
                certifications: true,
            },
            skip,
            take: pageSize,
            orderBy: { name: 'asc' },
        }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / pageSize))

    return {
        products,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            pageSize,
        },
    }
}

export async function getProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            manufacturer: true,
            properties: true,
            specifications: true,
            variants: true,
            certifications: true,
        },
    })
}

export async function getCategories() {
    try {
        return await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                genericFilters: {
                    include: { options: true },
                },
                filters: true,
            },
        })
    } catch {
        return prisma.category.findMany({ orderBy: { name: 'asc' } })
    }
}

export async function getCategoryBySlug(slug: string) {
    try {
        return await prisma.category.findUnique({
            where: { slug },
            include: {
                genericFilters: {
                    include: { options: true },
                },
                filters: true,
            },
        })
    } catch {
        return prisma.category.findUnique({
            where: { slug },
        })
    }
}

export async function getGenericFilters(categorySlug?: string): Promise<GenericFilterItem[]> {
    try {
        if (categorySlug) {
            const cat = await prisma.category.findUnique({
                where: { slug: categorySlug },
                include: {
                    genericFilters: {
                        include: { options: true },
                    },
                },
            });
            if (cat && 'genericFilters' in cat && Array.isArray(cat.genericFilters) && cat.genericFilters.length > 0) {
                return cat.genericFilters as GenericFilterItem[];
            }
        }

        const categories = await prisma.category.findMany({
            include: {
                genericFilters: {
                    include: { options: true },
                },
            },
        });

        const allGenericFilters: GenericFilterItem[] = [];
        for (const cat of categories) {
            if ('genericFilters' in cat && Array.isArray(cat.genericFilters)) {
                allGenericFilters.push(...(cat.genericFilters as GenericFilterItem[]));
            }
        }

        if (allGenericFilters.length > 0) {
            const filterMap = new Map<string, GenericFilterItem>();
            for (const f of allGenericFilters) {
                if (!filterMap.has(f.field)) {
                    filterMap.set(f.field, { ...f, options: Array.isArray(f.options) ? [...f.options] : [] });
                } else {
                    const existing = filterMap.get(f.field)!;
                    const existingOptions = (existing.options || []) as (GenericFilterOptionItem | string)[];
                    const existingValues = new Set(
                        existingOptions.map((o) => typeof o === 'string' ? o : o.value)
                    );
                    for (const opt of (f.options || []) as (GenericFilterOptionItem | string)[]) {
                        const val = typeof opt === 'string' ? opt : opt.value;
                        if (!existingValues.has(val)) {
                            existingOptions.push(opt);
                            existingValues.add(val);
                        }
                    }
                }
            }
            return Array.from(filterMap.values());
        }
    } catch {
        // Fallback gracefully if database table public.GenericFilter has not been pushed
    }

    // Default fallback if database has not populated genericFilter rows yet
    return [
        {
            id: "default-scope",
            label: "Scope",
            field: "scope",
            type: "MULTI_SELECT" as const,
            options: [
                { id: "1", value: "Exterior Wall" },
                { id: "2", value: "Interior Wall" },
                { id: "3", value: "Floor" },
                { id: "4", value: "Ceiling" },
                { id: "5", value: "Flat Roof" },
                { id: "6", value: "Pitched Roof" },
            ],
        },
        {
            id: "default-durability",
            label: "Durability",
            field: "durability",
            type: "SELECT" as const,
            options: [
                { id: "1", value: "Low" },
                { id: "2", value: "Medium" },
                { id: "3", value: "High" },
            ],
        },
        {
            id: "default-cemarked",
            label: "CE Marked",
            field: "ceMarked",
            type: "BOOLEAN" as const,
            options: [],
        },
        {
            id: "default-frost",
            label: "Frost Resistant",
            field: "frostResistant",
            type: "BOOLEAN" as const,
            options: [],
        },
        {
            id: "default-recyclable",
            label: "Recyclable",
            field: "recyclable",
            type: "BOOLEAN" as const,
            options: [],
        },
    ];
}