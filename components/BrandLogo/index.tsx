import React from "react";

interface BrandLogoProps {
  size?: "md" | "lg";
  className?: string;
}

const BrandLogo: React.FunctionComponent<BrandLogoProps> =({ size = "md", className = "" })=> {
  const textSize = size === "lg" ? "text-2xl" : "text-xl sm:text-2xl";

  return (
    <span
      className={`font-mono font-bold tracking-tight select-none text-primary ${textSize} ${className}`}
    >
      Materia
    </span>
  );
};

export default BrandLogo;
