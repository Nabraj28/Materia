"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const Hero:React.FunctionComponent =()=> {

  const router = useRouter();

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <section className="relative w-full h-dvh min-h-145 flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Building Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(25,28,29,0.1) 0%, rgba(25,28,29,0.6) 100%)" }} />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 md:px-8 mx-auto -mt-8 flex flex-col justify-center">
        {/* Headline Panel */}
        <div className="glass-panel p-6 sm:p-8 border-l-4 border-primary mb-4 sm:mb-6 shadow-md rounded">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-2 sm:mb-3 tracking-tight">
            Precision Discovery for Architectural Materials
          </h1>
          <p className="font-mono text-gray-500 tracking-widest text-xs sm:text-sm font-semibold">
            Source → Specify → Build
          </p>
        </div>

        {/* Search Bar */}
        <div>
          <SearchBar
            onSearch={handleSearch}
            placeholder="e.g. Adhesive, GlassWool Roll, Rockwool Panel..."
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;


