import { prisma } from "@/lib/prisma";
import type { Prisma } from '@prisma/client'

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

const GENERIC_KEYS = new Set([
    'category',
    'search',
    'scope',
    'durability',
    'ceMarked',
    'frostResistant',
    'recyclable',
    'page',
    'pageSize',
])

function toArray(value?: string | string[]): string[] {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
}

function getSpecValue(
    specifications: { rows: Prisma.JsonValue }[],
    specKey: string
): string | undefined {
    for (const group of specifications) {
        const rows = group.rows as Record<string, string>[] | null
        if (!rows) continue
        const row = rows.find((r) => r['Designation'] === specKey)
        if (row) return row['Value']
    }
    return undefined
}

function matchesSpecFilter(specValue: string | undefined, selected: string, type: string): boolean {
    if (specValue === undefined) return false
    if (type.toUpperCase() === 'RANGE') {
        const specNum = parseFloat(specValue.replace(/[^0-9.]/g, ''))
        const selectedNum = parseFloat(selected)
        if (Number.isNaN(specNum) || Number.isNaN(selectedNum)) return false
        return specNum <= selectedNum
    }
    return specValue === selected
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

// Lightweight list for the category nav — no filter defs needed here.
export async function getCategories() {
    return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export async function getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
    })
}