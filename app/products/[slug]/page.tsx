"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Index from "@/components/Footer";
import {
  ChevronRight,
  ShoppingCart,
  Bookmark,
  Maximize2,
  FileText,
  File,
  Box,
  Download,
  Play,
  Leaf,
} from "lucide-react";

/* ─── Static demo data (replace with real fetch/lookup by slug in production) ─── */
const PRODUCT = {
  name: "C-45 High-Strength Mix",
  category: "Structural Concrete",
  tags: ["Structural", "High-Strength", "LEED V4"],
  description:
    "A highly dense, pre-mixed concrete formulated for load-bearing structural columns and high-stress architectural elements. Exhibits superior compressive strength and reduced curing time.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBBN3-Ed9dbVLOFYVZWcuDfdHXoT-Ckylq5TUiyj7jKFdaAu1pCP_RIjmZAs9WzmFyVvU3eFSymhAL5eZbGdhk2_8HHaAOqVyYmy8Ij4_B043ubZ1xZvZfbT7Qfb62gqqRCKE9jftThnQcbi7vq4v5nxQ6dSXIkEAm_qtYPSNvayR_-C85Pl1aEgIsA36J_aHhxM8QGuI_5zJ_JJirvyPhXE-qTKQA_SIZsS506ORIsVih1g02Ky7AWA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAolS_zmOy9gGvxEvBcoswJY4J-GfL7iOH3zjwTKMB8wZixqKZhvJqSDPU80vHxl_m7mD4abrQ30NQeUDn-43i7c5sJKGJXCIXNpa1a8dRUsj3lco_9qYlqGFTzvxixJFERtkV-0As5GTvfp89rP7Ohivf-oLuKGJzypPkRJHa7bdmAYBdGU0gi4hRThLPTQ4ulRLHYYpf7Wcdx0H4WRjLdDNi4R0AdVDrju3So_Mq1gmhiXiYkuxh_DQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDSn_f4rPF9RIKLonQJ2hojtDdoydLEsjWiHzTNMm9KFkPzGXgrT6wp2aAPGK3gZLTVCmyoBLj8mVcofG8-DavahJkYfsK45BduX0_7SaSOXShjllPAXNIeyfONifVa-B3Wi5HnT3HXHehLd4TGwVCS7MemWDCLEiB8AnXgt2751liJEqQSvRSlA5m0mUhyP4yMvI9crcTCsVq-GgDTAfiuoGuJbMkKnG69sXZvFcAJ7iLGi--zQOKtpA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB--PrEas5C3dLHYBqaqJDOUwWcMSs8eyRD-KVBSHo5XbYtglaBkk1vOxCIsbOgxGm4FwTm8wagV6GqwgFYqoaMoGWiof9kjPN1U242PrB0sO_Whish5GBljnQaIaAMoI3fLyKW6da8ILRXqjd4wok1-ONkb79hiJxfONvapC4tqUv_VJ1FykN44wXmdFeZvpkK9coklJGlyioXnGoSF07mLTjMFVWI_z3f0dvq2FS8ZDKhfSexYpofJA",
  ],
  specs: [
    { label: "Compressive Strength (28 Days)", value: "45 MPa / 6,500 psi" },
    { label: "Density", value: "2,400 kg/m\u00b3" },
    { label: "Water-to-Cement Ratio", value: "0.40 \u2013 0.45" },
    { label: "Slump", value: "100 \u2013 150 mm" },
    { label: "Setting Time (Initial)", value: "90 Minutes" },
  ],
  documents: [
    { icon: "pdf", title: "Safety Data Sheet (SDS)", meta: "PDF \u2022 1.2 MB", href: "#" },
    { icon: "doc", title: "Technical Data Sheet", meta: "PDF \u2022 850 KB", href: "#" },
    { icon: "bim", title: "BIM Object (Revit)", meta: "RFA \u2022 3.4 MB", href: "#" },
  ],
};

/* ─── Document icon helper ─── */
function DocIcon({ type }: { type: string }) {
  const cls =
    "w-5 h-5 text-gray-500 group-hover:text-[#9c4000] transition-colors shrink-0";
  if (type === "pdf") return <FileText className={cls} />;
  if (type === "bim") return <Box className={cls} />;
  return <File className={cls} />;
}

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  const product = PRODUCT;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d]">
      <Navbar />

      <main className="flex-1 pt-20 pb-12 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* ── Breadcrumbs ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 mb-6 text-xs font-mono uppercase tracking-wider text-gray-500 flex-wrap"
        >
          <Link href="/products" className="hover:text-[#9c4000] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/products" className="hover:text-[#9c4000] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-[#191c1d] font-medium">{product.name}</span>
        </nav>

        {/* ── Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Visuals */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Main Image */}
            <div className="aspect-square w-full bg-gray-100 border border-gray-200 rounded overflow-hidden relative group">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              {/* Fullscreen FAB */}
              <button
                aria-label="View fullscreen"
                className="absolute bottom-3 right-3 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 shadow-sm hover:border-[#9c4000] hover:text-[#9c4000] transition-all opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 3).map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square bg-gray-100 border overflow-hidden rounded transition-all ${
                    activeImage === idx
                      ? "border-[#9c4000] ring-1 ring-[#9c4000]"
                      : "border-gray-200 hover:border-[#9c4000] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="120px"
                      className={`object-cover transition-all ${
                        activeImage !== idx ? "grayscale" : ""
                      }`}
                    />
                  </div>
                </button>
              ))}

              {/* Video placeholder */}
              <button className="aspect-square bg-gray-50 border border-gray-200 hover:border-[#9c4000] rounded flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-all">
                <Play className="w-5 h-5 text-gray-500" />
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  Video
                </span>
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Tags & Title */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 text-gray-600 font-mono text-[11px] uppercase tracking-wide rounded"
                  >
                    {tag === "LEED V4" && <Leaf className="w-3 h-3" />}
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191c1d] leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex gap-3 items-center py-5 border-y border-gray-200">
              <button className="flex-1 bg-[#9c4000] text-white font-semibold h-12 px-6 rounded hover:bg-[#803400] transition-colors flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                Request Quote
              </button>
              <button
                onClick={() => setSaved((s) => !s)}
                className={`flex-1 border font-semibold h-12 px-6 rounded transition-colors flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer ${
                  saved
                    ? "bg-[#ffdbcb] border-[#9c4000] text-[#9c4000]"
                    : "bg-transparent border-gray-200 text-[#191c1d] hover:border-[#9c4000] hover:text-[#9c4000]"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 transition-all ${saved ? "fill-[#9c4000]" : ""}`}
                />
                {saved ? "Saved" : "Save to Project"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Below-the-fold Sections ── */}
        <div className="space-y-10 mt-12">
          {/* Technical Specifications */}
          <section>
            <h2 className="text-2xl font-bold text-[#191c1d] mb-4 border-b-2 border-[#191c1d] inline-block pb-1">
              Technical Specifications
            </h2>
            <div className="border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-left font-mono text-[13px]">
                <tbody>
                  {product.specs.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#f3f4f5]"
                      }`}
                    >
                      <th className="py-3 px-4 font-medium text-gray-500 w-1/2 text-left">
                        {row.label}
                      </th>
                      <td className="py-3 px-4 text-[#191c1d] font-bold">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Documentation */}
          <section>
            <h2 className="text-2xl font-bold text-[#191c1d] mb-4 border-b-2 border-[#191c1d] inline-block pb-1">
              Documentation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {product.documents.map((doc) => (
                <a
                  key={doc.title}
                  href={doc.href}
                  className="group flex items-center gap-3 p-3 border border-gray-200 rounded bg-white hover:border-[#9c4000] hover:text-[#9c4000] transition-all"
                >
                  <DocIcon type={doc.icon} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#191c1d] group-hover:text-[#9c4000] transition-colors truncate">
                      {doc.title}
                    </div>
                    <div className="font-mono text-[11px] text-gray-400">{doc.meta}</div>
                  </div>
                  <Download className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#9c4000] opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Index />
    </div>
  );
}
