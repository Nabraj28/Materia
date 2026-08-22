import {SeedProduct} from "@/types/product";

export const InsulationSeedData: SeedProduct[] = [
    {
        "id": "thermocore-glasswool-roll-light-035",
        "slug": "thermocore-glasswool-roll-light-035",
        "name": "ThermoCore GlassWool Roll Light 035",
        "brand": "ThermoCore",
        "scope": [
            "Pitched Roof",
            "Interior Wall",
            "Ceiling"
        ],
        "manufacturer": {
            "name": "ThermoCore Building Systems",
            "location": "Essen, Germany",
            "website": "https://www.thermocore-example.com",
            "contact_number": "+49 201 555 0142"
        },
        "category": "Insulation",
        "description": "Lightweight glass mineral wool roll for attic and loft insulation, offering high thermal performance with easy hand-cutting for tight spaces between joists.",
        "images": [
            "https://images.unsplash.com/photo-1622821677134-2b52a9de5b6c?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.035",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Width",
                        "Value": "1200",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "100",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Length",
                        "Value": "5500",
                        "Unit": "mm",
                        "Standard": "EN 822"
                    },
                    {
                        "Designation": "Compressibility",
                        "Value": "Low",
                        "Unit": "-",
                        "Standard": "EN 12431"
                    }
                ]
            }
        ],
        "variants": [
            {
                "groupName": "Available Sizes",
                "columns": [
                    "Thickness (mm)",
                    "Length (mm)",
                    "SKU"
                ],
                "rows": [
                    {
                        "Thickness (mm)": "50",
                        "Length (mm)": "5500",
                        "SKU": "TC-GWL-050"
                    },
                    {
                        "Thickness (mm)": "100",
                        "Length (mm)": "5500",
                        "SKU": "TC-GWL-100"
                    },
                    {
                        "Thickness (mm)": "150",
                        "Length (mm)": "5500",
                        "SKU": "TC-GWL-150"
                    }
                ]
            }
        ],
        "applications": [
            "Loft insulation",
            "Pitched roof between rafters",
            "Timber frame walls"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "frostResistant": false,
            "vaporPermeable": true,
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/glasswool-roll-light-epd.pdf",
                "badge": "/badges/epd.svg"
            },
            {
                "name": "EcoLabel Plus",
                "issuedBy": "GreenBuild Council",
                "documentURL": "/certs/glasswool-roll-light-ecolabel-plus.pdf",
                "badge": "/badges/ecolabel-plus.svg"
            }
        ]
    },
    {
        "id": "thermocore-glasswool-roll-standard-037",
        "slug": "thermocore-glasswool-roll-standard-037",
        "name": "ThermoCore GlassWool Roll Standard 037",
        "brand": "ThermoCore",
        "scope": [
            "Interior Wall",
            "Exterior Wall",
            "Flat Roof"
        ],
        "manufacturer": {
            "name": "ThermoCore Building Systems",
            "location": "Essen, Germany",
            "website": "https://www.thermocore-example.com",
            "contact_number": "+49 201 555 0142"
        },
        "category": "Insulation",
        "description": "Standard-density glass wool roll balancing thermal resistance and cost for wall cavities and roof applications across residential and light commercial projects.",
        "images": [
            "https://images.unsplash.com/photo-1622821677134-2b52a9de5b6c?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.037",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A2-s1,d0",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Width",
                        "Value": "1200",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "120",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Length",
                        "Value": "5000",
                        "Unit": "mm",
                        "Standard": "EN 822"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Wall cavity insulation",
            "Flat roof build-ups",
            "Partition walls"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A2-s1,d0",
            "vaporPermeable": true,
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/glasswool-roll-standard-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "nordfiber-glasswool-slab-034",
        "slug": "nordfiber-glasswool-slab-034",
        "name": "NordFiber GlassWool Slab 034",
        "brand": "NordFiber",
        "scope": [
            "Exterior Wall"
        ],
        "manufacturer": {
            "name": "NordFiber Insulation A/S",
            "location": "Aarhus, Denmark",
            "website": "https://www.nordfiber-example.com",
            "contact_number": "+45 70 555 0198"
        },
        "category": "Insulation",
        "description": "Semi-rigid glass wool slab designed for facade cavity walls and ventilated rainscreen systems, offering dimensional stability under wind load.",
        "images": [
            "https://images.unsplash.com/photo-1590274853856-f22d5eeafcbf?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.034",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 10",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "80",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Water absorption",
                        "Value": "≤ 1.0",
                        "Unit": "kg/m²",
                        "Standard": "EN 1609"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Ventilated facade cavities",
            "Curtain wall backup insulation"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "waterResistance": "Low absorption",
            "vaporPermeable": true,
            "recyclable": true,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "EPD Denmark",
                "documentURL": "/certs/nordfiber-glasswool-slab-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "isotherm-stonewool-facade-slab",
        "slug": "isotherm-stonewool-facade-slab",
        "name": "IsoTherm StoneWool Facade Slab",
        "brand": "IsoTherm",
        "scope": [
            "Exterior Wall"
        ],
        "manufacturer": {
            "name": "IsoTherm Materials GmbH",
            "location": "Linz, Austria",
            "website": "https://www.isotherm-example.com",
            "contact_number": "+43 732 555 0177"
        },
        "category": "Insulation",
        "description": "High-density stone wool slab engineered for ETICS and ventilated facade systems, combining non-combustible fire protection with strong dimensional stability.",
        "images": [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.036",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 30",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Tensile strength perpendicular",
                        "Value": "≥ 7.5",
                        "Unit": "kPa",
                        "Standard": "EN 1607"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "100",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "ETICS render facades",
            "Ventilated rainscreen facades"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "waterResistance": "Hydrophobic treated",
            "frostResistant": true,
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/isotherm-facade-slab-epd.pdf",
                "badge": "/badges/epd.svg"
            },
            {
                "name": "ISO 14001",
                "issuedBy": "TUV Austria",
                "badge": "/badges/iso-14001.svg"
            }
        ]
    },
    {
        "id": "isotherm-stonewool-roof-slab",
        "slug": "isotherm-stonewool-roof-slab",
        "name": "IsoTherm StoneWool Roof Slab",
        "brand": "IsoTherm",
        "scope": [
            "Flat Roof"
        ],
        "manufacturer": {
            "name": "IsoTherm Materials GmbH",
            "location": "Linz, Austria",
            "website": "https://www.isotherm-example.com",
            "contact_number": "+43 732 555 0177"
        },
        "category": "Insulation",
        "description": "Rigid stone wool board for flat roof build-ups, resistant to foot traffic during installation and stable under long-term compressive load.",
        "images": [
            "https://images.unsplash.com/photo-1590274853856-f22d5eeafcbf?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.038",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 60",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "140",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Flat roof insulation under membrane",
            "Inverted roof build-ups"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "waterResistance": "Low absorption",
            "recyclable": true,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/isotherm-roof-slab-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "isotherm-stonewool-pipe-section",
        "slug": "isotherm-stonewool-pipe-section",
        "name": "IsoTherm StoneWool Pipe Section",
        "brand": "IsoTherm",
        "scope": [
            "Interior Wall",
            "Ceiling"
        ],
        "manufacturer": {
            "name": "IsoTherm Materials GmbH",
            "location": "Linz, Austria",
            "website": "https://www.isotherm-example.com",
            "contact_number": "+43 732 555 0177"
        },
        "category": "Insulation",
        "description": "Preformed stone wool pipe insulation sections for HVAC and plumbing runs, limiting heat loss and providing passive fire protection around service penetrations.",
        "images": [
            "https://images.unsplash.com/photo-1622821677134-2b52a9de5b6c?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.037",
                        "Unit": "W/(m·K)",
                        "Standard": "EN ISO 8497"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Max service temperature",
                        "Value": "250",
                        "Unit": "°C",
                        "Standard": "EN 14707"
                    },
                    {
                        "Designation": "Internal diameter",
                        "Value": "60",
                        "Unit": "mm",
                        "Standard": "EN 14707"
                    }
                ]
            }
        ],
        "variants": [
            {
                "groupName": "Available Diameters",
                "columns": [
                    "Internal Diameter (mm)",
                    "Wall Thickness (mm)",
                    "SKU"
                ],
                "rows": [
                    {
                        "Internal Diameter (mm)": "22",
                        "Wall Thickness (mm)": "20",
                        "SKU": "IT-PIPE-022"
                    },
                    {
                        "Internal Diameter (mm)": "42",
                        "Wall Thickness (mm)": "30",
                        "SKU": "IT-PIPE-042"
                    },
                    {
                        "Internal Diameter (mm)": "60",
                        "Wall Thickness (mm)": "40",
                        "SKU": "IT-PIPE-060"
                    }
                ]
            }
        ],
        "applications": [
            "Heating pipe insulation",
            "Chilled water pipework",
            "Fire stopping around ducts"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "recyclable": true,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/isotherm-pipe-section-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "petrafoam-pir-roofboard-023",
        "slug": "petrafoam-pir-roofboard-023",
        "name": "PetraFoam PIR RoofBoard 023",
        "brand": "PetraFoam",
        "scope": [
            "Flat Roof",
            "Pitched Roof"
        ],
        "manufacturer": {
            "name": "PetraFoam Technologies",
            "location": "Katowice, Poland",
            "website": "https://www.petrafoam-example.com",
            "contact_number": "+48 32 555 0163"
        },
        "category": "Insulation",
        "description": "High-performance PIR rigid foam board with glass-tissue facing, delivering low thermal conductivity for slim flat and pitched roof build-ups.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.023",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 13165"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "C-s2,d0",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 120",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "120",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    },
                    {
                        "Designation": "Dimensional stability",
                        "Value": "≤ 1",
                        "Unit": "%",
                        "Standard": "EN 1604"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Flat roof insulation",
            "Pitched roof rafter insulation",
            "Warm roof build-ups"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "C-s2,d0",
            "waterResistance": "Closed-cell, low absorption",
            "vaporPermeable": false,
            "recyclable": false,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "PU Europe",
                "documentURL": "/certs/petrafoam-pir-roofboard-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "petrafoam-pir-wallboard-024",
        "slug": "petrafoam-pir-wallboard-024",
        "name": "PetraFoam PIR WallBoard 024",
        "brand": "PetraFoam",
        "scope": [
            "Exterior Wall",
            "Interior Wall"
        ],
        "manufacturer": {
            "name": "PetraFoam Technologies",
            "location": "Katowice, Poland",
            "website": "https://www.petrafoam-example.com",
            "contact_number": "+48 32 555 0163"
        },
        "category": "Insulation",
        "description": "PIR insulation board for masonry cavity walls and internal wall lining, offering strong thermal performance without excessive wall thickness.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.024",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 13165"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "C-s2,d0",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 100",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "90",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Masonry cavity wall insulation",
            "Internal dry-lining insulation"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "C-s2,d0",
            "vaporPermeable": false,
            "recyclable": false,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "PU Europe",
                "documentURL": "/certs/petrafoam-pir-wallboard-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "petrafoam-pur-floorboard-025",
        "slug": "petrafoam-pur-floorboard-025",
        "name": "PetraFoam PUR FloorBoard 025",
        "brand": "PetraFoam",
        "scope": [
            "Floor"
        ],
        "manufacturer": {
            "name": "PetraFoam Technologies",
            "location": "Katowice, Poland",
            "website": "https://www.petrafoam-example.com",
            "contact_number": "+48 32 555 0163"
        },
        "category": "Insulation",
        "description": "High-compressive-strength PUR board designed for ground floor slabs and underfloor heating build-ups, resisting long-term load without settling.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.025",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 13165"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "E",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 150",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "60",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Ground floor slab insulation",
            "Underfloor heating substrate"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "E",
            "waterResistance": "Closed-cell",
            "recyclable": false,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "PU Europe",
                "documentURL": "/certs/petrafoam-pur-floorboard-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "nordfiber-eps-facade-board-EPS80",
        "slug": "nordfiber-eps-facade-board-EPS80",
        "name": "NordFiber EPS Facade Board EPS80",
        "brand": "NordFiber",
        "scope": [
            "Exterior Wall"
        ],
        "manufacturer": {
            "name": "NordFiber Insulation A/S",
            "location": "Aarhus, Denmark",
            "website": "https://www.nordfiber-example.com",
            "contact_number": "+45 70 555 0198"
        },
        "category": "Insulation",
        "description": "Expanded polystyrene board for ETICS render facade systems, offering reliable thermal performance at low weight for straightforward on-site handling.",
        "images": [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.031",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "E",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 80",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "100",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "ETICS render facades",
            "Cavity wall board insulation"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "E",
            "waterResistance": "Low absorption",
            "recyclable": true,
            "durability": "Low"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "EPS Europe Association",
                "documentURL": "/certs/nordfiber-eps-facade-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "nordfiber-eps-foundation-board-EPS200",
        "slug": "nordfiber-eps-foundation-board-EPS200",
        "name": "NordFiber EPS Foundation Board EPS200",
        "brand": "NordFiber",
        "scope": [
            "Floor"
        ],
        "manufacturer": {
            "name": "NordFiber Insulation A/S",
            "location": "Aarhus, Denmark",
            "website": "https://www.nordfiber-example.com",
            "contact_number": "+45 70 555 0198"
        },
        "category": "Insulation",
        "description": "High-density EPS board for foundation perimeter and under-slab insulation, rated for continuous ground contact and sustained compressive load.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.034",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 200",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Water absorption",
                        "Value": "≤ 3",
                        "Unit": "vol %",
                        "Standard": "EN 12087"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "120",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Foundation perimeter insulation",
            "Under-slab insulation"
        ],
        "properties": {
            "ceMarked": true,
            "waterResistance": "Low long-term absorption",
            "frostResistant": true,
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "EPS Europe Association",
                "documentURL": "/certs/nordfiber-eps-foundation-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "petrafoam-xps-perimeter-board-300",
        "slug": "petrafoam-xps-perimeter-board-300",
        "name": "PetraFoam XPS Perimeter Board 300",
        "brand": "PetraFoam",
        "scope": [
            "Floor",
            "Exterior Wall",
            "Flat Roof"
        ],
        "manufacturer": {
            "name": "PetraFoam Technologies",
            "location": "Katowice, Poland",
            "website": "https://www.petrafoam-example.com",
            "contact_number": "+48 32 555 0163"
        },
        "category": "Insulation",
        "description": "Extruded polystyrene board with closed-cell structure for below-grade and perimeter applications, engineered for near-zero long-term water absorption.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.033",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 300",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Water absorption",
                        "Value": "≤ 0.7",
                        "Unit": "vol %",
                        "Standard": "EN 12087"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "80",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Below-grade perimeter insulation",
            "Inverted roof insulation",
            "Foundation walls"
        ],
        "properties": {
            "ceMarked": true,
            "waterResistance": "Near-zero long-term absorption",
            "frostResistant": true,
            "recyclable": false,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "PlasticsEurope",
                "documentURL": "/certs/petrafoam-xps-perimeter-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "isotherm-woodfiber-facade-board",
        "slug": "isotherm-woodfiber-facade-board",
        "name": "IsoTherm WoodFiber Facade Board",
        "brand": "IsoTherm",
        "scope": [
            "Exterior Wall"
        ],
        "manufacturer": {
            "name": "IsoTherm Materials GmbH",
            "location": "Linz, Austria",
            "website": "https://www.isotherm-example.com",
            "contact_number": "+43 732 555 0177"
        },
        "category": "Insulation",
        "description": "Renewable wood fiber board for ventilated facades, combining thermal mass with high vapor permeability for breathable timber-frame construction.",
        "images": [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.042",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "E",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Density",
                        "Value": "160",
                        "Unit": "kg/m³",
                        "Standard": "EN 1602"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "60",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Ventilated timber-frame facades",
            "External wood-fiber sarking boards"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "E",
            "vaporPermeable": true,
            "recyclable": true,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "FSC Certified Wood",
                "issuedBy": "FSC",
                "documentURL": "/certs/isotherm-woodfiber-facade-fsc-certified-wood.pdf",
                "badge": "/badges/fsc-certified-wood.svg"
            },
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/isotherm-woodfiber-facade-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "isotherm-woodfiber-flexible-batt",
        "slug": "isotherm-woodfiber-flexible-batt",
        "name": "IsoTherm WoodFiber Flexible Batt",
        "brand": "IsoTherm",
        "scope": [
            "Interior Wall",
            "Pitched Roof"
        ],
        "manufacturer": {
            "name": "IsoTherm Materials GmbH",
            "location": "Linz, Austria",
            "website": "https://www.isotherm-example.com",
            "contact_number": "+43 732 555 0177"
        },
        "category": "Insulation",
        "description": "Flexible wood fiber batt for timber stud walls and roof rafters, providing natural moisture buffering and strong acoustic damping between rooms.",
        "images": [
            "https://images.unsplash.com/photo-1622821677134-2b52a9de5b6c?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.038",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Density",
                        "Value": "50",
                        "Unit": "kg/m³",
                        "Standard": "EN 1602"
                    },
                    {
                        "Designation": "Sound absorption coefficient",
                        "Value": "0.9",
                        "Unit": "αw",
                        "Standard": "EN ISO 11654"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "140",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Timber stud wall infill",
            "Roof rafter insulation",
            "Acoustic partition infill"
        ],
        "properties": {
            "ceMarked": true,
            "vaporPermeable": true,
            "recyclable": true,
            "durability": "Medium"
        },
        "certifications": [
            {
                "name": "FSC Certified Wood",
                "issuedBy": "FSC",
                "documentURL": "/certs/isotherm-woodfiber-batt-fsc-certified-wood.pdf",
                "badge": "/badges/fsc-certified-wood.svg"
            }
        ]
    },
    {
        "id": "thermocore-foamglass-foundation-board",
        "slug": "thermocore-foamglass-foundation-board",
        "name": "ThermoCore FoamGlass Foundation Board",
        "brand": "ThermoCore",
        "scope": [
            "Floor",
            "Flat Roof"
        ],
        "manufacturer": {
            "name": "ThermoCore Building Systems",
            "location": "Essen, Germany",
            "website": "https://www.thermocore-example.com",
            "contact_number": "+49 201 555 0142"
        },
        "category": "Insulation",
        "description": "Rigid cellular glass board that is fully water- and vapor-impermeable, ideal for foundation and below-grade applications where moisture exposure is constant.",
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.045",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Compressive strength",
                        "Value": "≥ 400",
                        "Unit": "kPa",
                        "Standard": "EN 826"
                    },
                    {
                        "Designation": "Water absorption",
                        "Value": "0",
                        "Unit": "vol %",
                        "Standard": "EN 12087"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "100",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Foundation and below-grade insulation",
            "Green roof build-ups",
            "Car park deck insulation"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "waterResistance": "Fully impermeable",
            "frostResistant": true,
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/thermocore-foamglass-foundation-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    },
    {
        "id": "thermocore-stonewool-acoustic-partition-batt",
        "slug": "thermocore-stonewool-acoustic-partition-batt",
        "name": "ThermoCore StoneWool Acoustic Partition Batt",
        "brand": "ThermoCore",
        "scope": [
            "Interior Wall",
            "Ceiling",
            "Floor"
        ],
        "manufacturer": {
            "name": "ThermoCore Building Systems",
            "location": "Essen, Germany",
            "website": "https://www.thermocore-example.com",
            "contact_number": "+49 201 555 0142"
        },
        "category": "Insulation",
        "description": "Semi-rigid stone wool batt optimized for internal partitions and floor/ceiling assemblies, reducing airborne sound transmission between rooms and units.",
        "images": [
            "https://images.unsplash.com/photo-1590274853856-f22d5eeafcbf?w=800"
        ],
        "specifications": [
            {
                "groupName": "Thermal & Physical Properties",
                "columns": [
                    "Designation",
                    "Value",
                    "Unit",
                    "Standard"
                ],
                "rows": [
                    {
                        "Designation": "Thermal conductivity",
                        "Value": "0.036",
                        "Unit": "W/(m·K)",
                        "Standard": "EN 12667"
                    },
                    {
                        "Designation": "Fire behavior",
                        "Value": "A1",
                        "Unit": "Euroclass",
                        "Standard": "EN 13501-1"
                    },
                    {
                        "Designation": "Sound absorption coefficient",
                        "Value": "1.0",
                        "Unit": "αw",
                        "Standard": "EN ISO 11654"
                    },
                    {
                        "Designation": "Thickness",
                        "Value": "70",
                        "Unit": "mm",
                        "Standard": "EN 823"
                    }
                ]
            }
        ],
        "variants": [],
        "applications": [
            "Internal partition wall infill",
            "Floor/ceiling acoustic separation",
            "Service riser enclosures"
        ],
        "properties": {
            "ceMarked": true,
            "fireClass": "A1",
            "recyclable": true,
            "durability": "High"
        },
        "certifications": [
            {
                "name": "EPD",
                "issuedBy": "IBU",
                "documentURL": "/certs/thermocore-acoustic-partition-epd.pdf",
                "badge": "/badges/epd.svg"
            }
        ]
    }
];