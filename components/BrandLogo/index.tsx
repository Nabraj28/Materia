interface BrandLogoProps {
  size?: "md" | "lg";
  className?: string;
}

export default function Index({ size = "md", className = "" }: BrandLogoProps) {
  const textSize = size === "lg" ? "text-2xl" : "text-xl sm:text-2xl";

  return (
    <span
      className={`font-mono font-bold tracking-tight select-none text-primary ${textSize} ${className}`}
    >
      Materia
    </span>
  );
}
