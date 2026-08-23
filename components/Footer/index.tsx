import Index from "../BrandLogo";

const Footer = () => {

  return (
    <footer className="bg-white border-t border-gray-200 w-full mt-auto shadow-[0_-1px_0_0_#e5e7eb]">
      <div className="container-main flex flex-col sm:flex-row justify-between items-center gap-4 py-6 sm:py-8">
          <div className="mb-1">
            <Index size="md" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} Materia. Professional Grade Materials Discovery.
          </p>
      </div>
    </footer>
  );
}

export default Footer;



