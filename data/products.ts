export interface ProductItem {
  id: string;
  name: string;
  category: "Plasterboards" | "Flooring Systems" | "Insulation" | "Acoustics";
  application: "Interior Walls" | "Ceilings" | "Roofs";
  thickness: number; // in mm
  imageUrl: string;
  specs: { label: string; value: string }[];
  tags: string[];
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "prod-1",
    name: "Diamond GKFI 12.5",
    category: "Plasterboards",
    application: "Interior Walls",
    thickness: 12.5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0oah7UwEididuoJV0zcZ-njqGETN5uqoAWFHeVA0DCGIfSWF7GEsgvN05CVBGuuGZkMu9Y5ZVE9_OjbjAHPdqvn4ow0mkCpZGGZ5U8o1lcoIwF_-CC4BwlE-dkqkRokLK69kDl6Qz_hz3y9T0HK5bf7wCPzoXkfkROCg0YoseSirZxP92k6Ua7Kgag_y8yE31lpv6WbAwqJsoE0bRHlOe9F7YOLJ-88cCevux30UYXRN-x4icqlJOMQ",
    specs: [
      { label: "Thickness", value: "12.5 mm" },
      { label: "Weight", value: "12.8 kg/m²" },
      { label: "Fire Rating", value: "A2-s1, d0" },
    ],
    tags: ["Fire Rated", "Moisture"],
  },
  {
    id: "prod-2",
    name: "GIFAfloor PRESTO 32",
    category: "Flooring Systems",
    application: "Interior Walls",
    thickness: 32,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVEKxsGSI_AZkjEnYvIElXMLxeO9R93XfsO9SIIkrpg8EIwahfLQCDNrZq2Po8DR67F7Xh4yLkMq7nz5awpoxrX9PWJqnZfcOq1lbEkjDP3-oUrlTPnzFqntvcGfyAwvJt77jUQZo6Q9N5qVGy5YQK7AtDrM3pxGWqcigpPViMOQAjNQqz9ragDgIpAvjJatmRAKT6ejyNOSg36wSzTNHpsoYwCamBOZY8gAXe7ZU_BHHRpNIwGBE2kA",
    specs: [
      { label: "Thickness", value: "32 mm" },
      { label: "Load Capacity", value: "5.0 kN" },
      { label: "Format", value: "1200 x 600" },
    ],
    tags: ["Heavy Duty"],
  },
  {
    id: "prod-3",
    name: "UNIFIT TI 132 U",
    category: "Insulation",
    application: "Roofs",
    thickness: 160,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0YRLPhAnsdDOFAJcIuX0BOIs-YhWnXS_Pd9UuTMdk4bhy-R63XEXWzIvZLDnAN65Rioz544dhRyIgqhZ6VZkemzh22cDCz6071HglO5sq0s8A4tfXkZA6QnNrlqH1XG-lwW_90ShVG_uEKR7W9ImMDFbfl9Ppz5z4E_JvaAgwZ73Usb8MeWfiPmMOSWssX5125_ZP_BRcAsBHGCT8AKHbLNw7bxhqAQQ9pFwb2Mk-nyxUCVAGlMR7g",
    specs: [
      { label: "Thermal Cond.", value: "0.032 W/mK" },
      { label: "Thickness", value: "160 mm" },
      { label: "Width", value: "1200 mm" },
    ],
    tags: ["Eco", "Thermal"],
  },
  {
    id: "prod-4",
    name: "Cleaneo Acoustic 8/18R",
    category: "Acoustics",
    application: "Ceilings",
    thickness: 12.5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPRHebE4qzHKw02VGDpw87HltZao48j5NuiRTRHrlnhqep4IAd86gE633erpHFspaygtOnF-9mOURx1pb55S5EU-vVl9Wugira_zczocvNsic0SICTNtc2gL7nvLBU2sfOSkz4eMo0N52Ahbs-aaLj7oUP1RCFTIZcOiFw4KicGPLMKwmaCPRIRGgSeXIQLi1PbpZOpcENU-0J7u17iBDJqdnBt9CrhcOQbaXbyX9mA0G0gmej9B3rEA",
    specs: [
      { label: "Perforation", value: "8/18 Round" },
      { label: "Open Area", value: "15.5%" },
      { label: "Dimensions", value: "1188 x 1998" },
    ],
    tags: ["Acoustic", "Air Purify"],
  },
  {
    id: "prod-5",
    name: "Silentboard 12.5 High Acoustic",
    category: "Plasterboards",
    application: "Interior Walls",
    thickness: 12.5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0oah7UwEididuoJV0zcZ-njqGETN5uqoAWFHeVA0DCGIfSWF7GEsgvN05CVBGuuGZkMu9Y5ZVE9_OjbjAHPdqvn4ow0mkCpZGGZ5U8o1lcoIwF_-CC4BwlE-dkqkRokLK69kDl6Qz_hz3y9T0HK5bf7wCPzoXkfkROCg0YoseSirZxP92k6Ua7Kgag_y8yE31lpv6WbAwqJsoE0bRHlOe9F7YOLJ-88cCevux30UYXRN-x4icqlJOMQ",
    specs: [
      { label: "Thickness", value: "12.5 mm" },
      { label: "Sound Red.", value: "Rw 71 dB" },
      { label: "Fire Rating", value: "DF Type A" },
    ],
    tags: ["Acoustic", "Fire Rated"],
  },
  {
    id: "prod-6",
    name: "GIFAfloor FHB 25",
    category: "Flooring Systems",
    application: "Interior Walls",
    thickness: 25,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVEKxsGSI_AZkjEnYvIElXMLxeO9R93XfsO9SIIkrpg8EIwahfLQCDNrZq2Po8DR67F7Xh4yLkMq7nz5awpoxrX9PWJqnZfcOq1lbEkjDP3-oUrlTPnzFqntvcGfyAwvJt77jUQZo6Q9N5qVGy5YQK7AtDrM3pxGWqcigpPViMOQAjNQqz9ragDgIpAvjJatmRAKT6ejyNOSg36wSzTNHpsoYwCamBOZY8gAXe7ZU_BHHRpNIwGBE2kA",
    specs: [
      { label: "Thickness", value: "25 mm" },
      { label: "Point Load", value: "4.0 kN" },
      { label: "Format", value: "600 x 600" },
    ],
    tags: ["Heavy Duty", "Raised Floor"],
  },
  {
    id: "prod-7",
    name: "NatuRoll 037 Cavity Wool",
    category: "Insulation",
    application: "Interior Walls",
    thickness: 100,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0YRLPhAnsdDOFAJcIuX0BOIs-YhWnXS_Pd9UuTMdk4bhy-R63XEXWzIvZLDnAN65Rioz544dhRyIgqhZ6VZkemzh22cDCz6071HglO5sq0s8A4tfXkZA6QnNrlqH1XG-lwW_90ShVG_uEKR7W9ImMDFbfl9Ppz5z4E_JvaAgwZ73Usb8MeWfiPmMOSWssX5125_ZP_BRcAsBHGCT8AKHbLNw7bxhqAQQ9pFwb2Mk-nyxUCVAGlMR7g",
    specs: [
      { label: "Thermal Cond.", value: "0.037 W/mK" },
      { label: "Thickness", value: "100 mm" },
      { label: "Density", value: "18 kg/m³" },
    ],
    tags: ["Eco", "Thermal"],
  },
  {
    id: "prod-8",
    name: "Cleaneo Linear 12/20/66R",
    category: "Acoustics",
    application: "Ceilings",
    thickness: 12.5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPRHebE4qzHKw02VGDpw87HltZao48j5NuiRTRHrlnhqep4IAd86gE633erpHFspaygtOnF-9mOURx1pb55S5EU-vVl9Wugira_zczocvNsic0SICTNtc2gL7nvLBU2sfOSkz4eMo0N52Ahbs-aaLj7oUP1RCFTIZcOiFw4KicGPLMKwmaCPRIRGgSeXIQLi1PbpZOpcENU-0J7u17iBDJqdnBt9CrhcOQbaXbyX9mA0G0gmej9B3rEA",
    specs: [
      { label: "Perforation", value: "Linear Slot" },
      { label: "Open Area", value: "13.2%" },
      { label: "Dimensions", value: "1200 x 2400" },
    ],
    tags: ["Acoustic", "Continuous Look"],
  },
];
