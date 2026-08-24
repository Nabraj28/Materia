"use client";

import Link from "next/link";
import Index from "../BrandLogo";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar =()=> {

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isProductsActive = pathname === "/products";

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-main flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Index size="lg" />
            </Link>

            <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
              <Link
                href="/products"
                className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                  isProductsActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Products
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="text-gray-700 p-2 hover:bg-gray-100 rounded flex items-center justify-center cursor-pointer transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/*Mobile Drawer*/}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <aside
          className={`absolute inset-0 w-full h-full bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Index size="lg" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-gray-700 p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-6 flex flex-col gap-3 flex-1 overflow-y-auto" aria-label="Mobile Navigation">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono font-semibold mb-1">
              Menu
            </span>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3.5 rounded text-lg font-semibold transition-colors flex items-center justify-between ${
                isProductsActive
                  ? "bg-primary-light/40 text-primary border-l-4 border-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              Products
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;


