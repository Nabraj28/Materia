import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface Product {
    id: string
    slug: string
    name: string
    brand: string
    scope:string[]
    manufacturer: Manufacturer
    category: string
    description: string
    images: string[]
    specifications: SpecificationGroup[]
    variants: VariantGroup[]
    applications: string[]
    properties: Properties
    certifications: Certification[]
}

interface Manufacturer {
    name: string
    location: string
    website: string
}
interface  SpecificationGroup{
    groupName: string
    columns: string[]
    rows: Record<string, string>[]
}
interface VariantGroup {
    groupName: string
    columns: string[]
    rows: Record<string, string>[]
}
interface Properties {
    ceMarked: boolean
    fireClass?: string
    waterResistance?: string
    frostResistant?: boolean
    vaporPermeable?: boolean
    recyclable?: boolean
    durability?: string
}
interface Certification {
    name: string
    issuedBy?: string
    documentURL?: string
    badge?: string
}

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}


