import { PrismaClient } from '@prisma/client';
import { SeedProduct } from '@/types/product';


export async function seedProducts(
  prisma: PrismaClient,
  category: { id: string },
  productsData: SeedProduct[],
): Promise<void> {
  for (const productData of productsData) {
    const mfgData = productData.manufacturer;
    let manufacturer = await prisma.manufacturer.findFirst({ where: { name: mfgData.name } });
    if (!manufacturer) {
      manufacturer = await prisma.manufacturer.create({
        data: {
          name: mfgData.name,
          location: mfgData.location,
          website: mfgData.website,
        },
      });
    }

    console.log(`Upserting product ${productData.name}...`);

    const existing = await prisma.product.findUnique({ where: { slug: productData.slug } });
    if (existing) {
      await prisma.product.delete({ where: { slug: productData.slug } });
    }

    let createdProperties;
    if (productData.properties) {
      createdProperties = await prisma.properties.create({
        data: {
          ceMarked: productData.properties.ceMarked || false,
          fireClass: productData.properties.fireClass,
          waterResistance: productData.properties.waterResistance,
          frostResistant: productData.properties.frostResistant,
          vaporPermeable: productData.properties.vaporPermeable,
          recyclable: productData.properties.recyclable,
          durability: productData.properties.durability,
        },
      });
    }

    await prisma.product.create({
      data: {
        id: productData.id,
        slug: productData.slug,
        name: productData.name,
        brand: productData.brand,
        scope: productData.scope,
        description: productData.description,
        images: productData.images,
        applications: productData.applications,

        categoryId: category.id,
        manufacturerId: manufacturer.id,
        propertiesId: createdProperties?.id,

        specifications: {
          create: productData.specifications?.map(s => ({
            groupName: s.groupName,
            columns: s.columns,
            rows: s.rows,
          })) || [],
        },

        variants: {
          create: productData.variants?.map(v => ({
            groupName: v.groupName,
            columns: v.columns,
            rows: v.rows,
          })) || [],
        },

        certifications: {
          create: productData.certifications?.map(c => ({
            name: c.name,
            issuedBy: c.issuedBy,
            documentURL: c.documentURL,
            badge: c.badge,
          })) || [],
        },
      },
    });
  }

  console.log('Seeding complete!');
}
