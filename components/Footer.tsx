import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 w-full mt-auto shadow-[0_-1px_0_0_#e5e7eb]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 px-4 md:px-12 max-w-7xl mx-auto">
          <div className="mb-1">
            <BrandLogo size="md" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} Materia. Professional Grade Materials Discovery.
          </p>
      </div>
    </footer>
  );
}



