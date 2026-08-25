import {
  ShieldCheck,
  Leaf,
  Building2,
} from "lucide-react";
import React from "react";
import { notFound } from "next/navigation";
import DataTable from "@/components/DataTable";
import { getProductBySlug } from "@/lib/product";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const propertyConfig = [
  { key: "fireClass", label: "Fire Class" },
  { key: "waterResistance", label: "Water Resistance" },
  { key: "durability", label: "Durability" },
  { key: "ceMarked", label: "CE Marked", isBoolean: true },
  { key: "frostResistant", label: "Frost Resistant", isBoolean: true },
  { key: "recyclable", label: "Recyclable", isBoolean: true },
];

const ProductDetailPage: React.FunctionComponent<PageProps> = async({ params })=> {

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    manufacturer,
    properties,
    specifications,
    variants,
    certifications,
    scope
  } = product;

  return (
    <main className="flex-1 container-main padding-y">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <ProductGallery
              images={product.images || []}
              name={product.name}
          />
          {/* Right: Product Details */}
          <div className="space-y-6">
            <div>
              {scope.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {scope.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 text-gray-600 font-mono text-[11px] uppercase tracking-wide rounded"
                    >
                      {tag.toLowerCase().includes("leed") || tag.toLowerCase().includes("recyc") ? (
                        <Leaf className="w-3 h-3 text-green-600" aria-hidden="true" />
                      ) : null}
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(product.brand || manufacturer?.name) && (
                <span className="font-mono text-xs uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                  {product.brand || manufacturer?.name}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Properties Overview */}
            {properties && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 border border-gray-200 rounded font-mono text-sm">
                  {propertyConfig.map(({ key, label, isBoolean }) => {
                    const value = properties[key as keyof typeof properties];

                    if (value === null || value === undefined || value === "") return null;

                    return (
                        <div key={key}>
                          <span className="text-gray-500 block text-[13px]">
                            {label}
                          </span>
                          <span className="font-semibold text-gray-900">
                              {isBoolean ? (value ? "Yes" : "No") : value}
                          </span>
                        </div>
                    );
                  })}
                </div>
            )}

            {/* Action Bar */}
            <ProductActions productName={product.name} />
          </div>
        </div>

        <div className="space-y-10 mt-12">
          {specifications?.map((group) => (
              <DataTable key={group.id} group={group} />
          ))}

          {variants?.map((group) => (
              <DataTable key={group.id} group={group} />
          ))}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground border-b-2 border-foreground inline-block pb-1">
                Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-3.5 p-3.5 border border-gray-200 rounded-lg bg-white shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {cert.name}
                      </div>
                      {cert.issuedBy && (
                        <div className="text-xs text-gray-500 font-mono mt-0.5 truncate">
                          Issued by: <span className="text-gray-700 font-medium">{cert.issuedBy}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
  );
}

export default ProductDetailPage;
