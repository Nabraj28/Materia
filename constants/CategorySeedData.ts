import { Category } from "@/types/category";

export const CategorySeedData: Category[] = [
  {
    id: "677b06a4-9c96-4688-855a-21fc294fa6e8",
    slug: "adhesives-sealants",
    name: "Adhesives & Sealants",
    genericFilters: [
      {
        type: "multi_select",
        field: "scope",
        label: "Scope",
        options: [
          "Exterior Wall",
          "Interior Wall",
          "Floor",
          "Ceiling",
          "Flat Roof",
          "Pitched Roof",
        ],
      },
      {
        type: "select",
        field: "durability",
        label: "Durability",
        options: ["Low", "Medium", "High"],
      },
      {
        type: "boolean",
        field: "ceMarked",
        label: "CE Marked",
      },
      {
        type: "boolean",
        field: "frostResistant",
        label: "Frost Resistant",
      },
      {
        type: "boolean",
        field: "recyclable",
        label: "Recyclable",
      },
    ],
    filters: [
      {
        type: "range",
        unit: "°C",
        label: "Application Temperature",
        specKey: "Application temperature",
      },
      {
        type: "range",
        unit: "N/mm²",
        label: "Shear Strength",
        specKey: "Shear strength",
      },
      {
        type: "range",
        unit: "min",
        label: "Open Time",
        specKey: "Open time",
      },
      {
        type: "select",
        label: "Coverage Rate",
        specKey: "Coverage rate",
      },
      {
        type: "range",
        unit: "%",
        label: "Elongation at Break",
        specKey: "Elongation at break",
      },
      {
        type: "range",
        unit: "Shore A",
        label: "Shore Hardness",
        specKey: "Shore hardness",
      },
      {
        type: "select",
        label: "Movement Capability",
        specKey: "Movement capability",
      },
      {
        type: "select",
        label: "Water Resistance Rating",
        specKey: "Water resistance rating",
      },
    ],
  },
  {
    id: "dc0fb75c-cded-4b9f-88fd-408087ebfc39",
    slug: "insulation",
    name: "Insulation",
    genericFilters: [
      {
        type: "multi_select",
        field: "scope",
        label: "Scope",
        options: [
          "Exterior Wall",
          "Interior Wall",
          "Floor",
          "Ceiling",
          "Flat Roof",
          "Pitched Roof",
        ],
      },
      {
        type: "select",
        field: "durability",
        label: "Durability",
        options: ["Low", "Medium", "High"],
      },
      {
        type: "boolean",
        field: "ceMarked",
        label: "CE Marked",
      },
      {
        type: "boolean",
        field: "frostResistant",
        label: "Frost Resistant",
      },
      {
        type: "boolean",
        field: "vaporPermeable",
        label: "Vapor Permeable",
      },
      {
        type: "boolean",
        field: "recyclable",
        label: "Recyclable",
      },
    ],
    filters: [
      {
        type: "range",
        unit: "W/(m·K)",
        label: "Thermal Conductivity",
        specKey: "Thermal conductivity",
      },
      {
        type: "select",
        label: "Fire Behavior",
        specKey: "Fire behavior",
      },
      {
        type: "range",
        unit: "kPa",
        label: "Compressive Strength",
        specKey: "Compressive strength",
      },
      {
        type: "range",
        unit: "mm",
        label: "Thickness",
        specKey: "Thickness",
      },
      {
        type: "range",
        unit: "kg/m³",
        label: "Density",
        specKey: "Density",
      },
      {
        type: "range",
        unit: "αw",
        label: "Sound Absorption Coefficient",
        specKey: "Sound absorption coefficient",
      },
      {
        type: "select",
        label: "Water Absorption",
        specKey: "Water absorption",
      },
    ],
  },
];
