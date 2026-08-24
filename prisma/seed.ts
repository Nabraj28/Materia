import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";
import { CategorySeedData } from "@/constants/CategorySeedData";
import { AdhesiveSeedData } from "@/constants/AdhesiveSeedData";
import { InsulationSeedData } from "@/constants/InsulationSeedData";

async function seedProducts(products: Product[]) {
  for (const p of products) {
    // Find or create manufacturer if present
    let manufacturerId: string | undefined = undefined;
    if (p.manufacturer) {
      const existingManufacturer = await prisma.manufacturer.findFirst({
        where: { name: p.manufacturer.name },
      });

      if (existingManufacturer) {
        manufacturerId = existingManufacturer.id;
      } else {
        const createdManufacturer = await prisma.manufacturer.create({
          data: {
            name: p.manufacturer.name,
            location: p.manufacturer.location,
            website: p.manufacturer.website,
          },
        });
        manufacturerId = createdManufacturer.id;
      }
    }

    // Find category by name or slug
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { equals: p.category, mode: "insensitive" } },
          { slug: { equals: p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"), mode: "insensitive" } },
        ],
      },
    });

    if (!category) {
      console.warn(`Category "${p.category}" not found for product "${p.name}". Skipping...`);
      continue;
    }

    // Create or update properties record
    let propertiesId: string | undefined = undefined;
    if (p.properties) {
      const existingProduct = await prisma.product.findUnique({
        where: { slug: p.slug },
        select: { propertiesId: true },
      });

      if (existingProduct?.propertiesId) {
        await prisma.properties.update({
          where: { id: existingProduct.propertiesId },
          data: {
            ceMarked: Boolean(p.properties.ceMarked),
            fireClass: p.properties.fireClass || null,
            waterResistance: p.properties.waterResistance || null,
            frostResistant: p.properties.frostResistant ?? null,
            vaporPermeable: p.properties.vaporPermeable ?? null,
            recyclable: p.properties.recyclable ?? null,
            durability: p.properties.durability || null,
          },
        });
        propertiesId = existingProduct.propertiesId;
      } else {
        const createdProp = await prisma.properties.create({
          data: {
            ceMarked: Boolean(p.properties.ceMarked),
            fireClass: p.properties.fireClass || null,
            waterResistance: p.properties.waterResistance || null,
            frostResistant: p.properties.frostResistant ?? null,
            vaporPermeable: p.properties.vaporPermeable ?? null,
            recyclable: p.properties.recyclable ?? null,
            durability: p.properties.durability || null,
          },
        });
        propertiesId = createdProp.id;
      }
    }

    // Upsert product
    const productRecord = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        brand: p.brand || null,
        scope: p.scope || [],
        description: p.description,
        images: p.images || [],
        applications: p.applications || [],
        categoryId: category.id,
        manufacturerId: manufacturerId || null,
        propertiesId: propertiesId || null,
      },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        brand: p.brand || null,
        scope: p.scope || [],
        description: p.description,
        images: p.images || [],
        applications: p.applications || [],
        categoryId: category.id,
        manufacturerId: manufacturerId || null,
        propertiesId: propertiesId || null,
      },
    });

    // Clean up & insert relations (specifications, variants, certifications)
    await prisma.specificationGroup.deleteMany({ where: { productId: productRecord.id } });
    if (p.specifications && p.specifications.length > 0) {
      await prisma.specificationGroup.createMany({
        data: p.specifications.map((s) => ({
          productId: productRecord.id,
          groupName: s.groupName,
          columns: s.columns,
          rows: s.rows,
        })),
      });
    }

    await prisma.variantGroup.deleteMany({ where: { productId: productRecord.id } });
    if (p.variants && p.variants.length > 0) {
      await prisma.variantGroup.createMany({
        data: p.variants.map((v) => ({
          productId: productRecord.id,
          groupName: v.groupName,
          columns: v.columns,
          rows: v.rows,
        })),
      });
    }

    await prisma.certification.deleteMany({ where: { productId: productRecord.id } });
    if (p.certifications && p.certifications.length > 0) {
      await prisma.certification.createMany({
        data: p.certifications.map((c) => ({
          productId: productRecord.id,
          name: c.name,
          issuedBy: c.issuedBy || null,
          documentURL: c.documentURL || null,
          badge: c.badge || null,
        })),
      });
    }
  }
}

async function main() {
  console.log("Seeding database...");

  // Seed Categories
  console.log("Seeding categories...");
  for (const cat of CategorySeedData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
      },
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
      },
    });
  }

  // Seed Adhesives Products
  console.log("Seeding adhesive products...");
  await seedProducts(AdhesiveSeedData);

  // Seed Insulation Products
  console.log("Seeding insulation products...");
  await seedProducts(InsulationSeedData);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
