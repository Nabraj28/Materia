import { prisma } from "@/lib/prisma";
import type { Prisma } from '@prisma/client'

export interface ProductSearchParams {
    category?: string | string[]
    search?: string
    q?: string
    scope?: string | string[]
    durability?: string
    fireClass?: string
    waterResistance?: string
    ceMarked?: string
    frostResistant?: string
    vaporPermeable?: string
    recyclable?: string
    page?: string | number
    pageSize?: string | number
    [key: string]: string | string[] | number | undefined
}

export interface SpecFilterItem {
    id?: string
    label: string
    specKey: string
    type: string
    unit?: string | null
    options?: string[]
    min?: number
    max?: number
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
    if (params.fireClass) propertiesWhere.fireClass = params.fireClass
    if (params.waterResistance) propertiesWhere.waterResistance = params.waterResistance
    if (params.ceMarked !== undefined) propertiesWhere.ceMarked = params.ceMarked === 'true'
    if (params.frostResistant !== undefined) propertiesWhere.frostResistant = params.frostResistant === 'true'
    if (params.vaporPermeable !== undefined) propertiesWhere.vaporPermeable = params.vaporPermeable === 'true'
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
    return prisma.category.findMany({
        orderBy: { name: 'asc' },
    })
}

export async function getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
    })
}

