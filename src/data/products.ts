export type PackOption = {
  id: string;
  name: string;
  count: number;
  price: number; // in USD base
  unitPrice: number;
  popular?: boolean;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  family: string;
  short: string;
  description: string;
  finish: string;
  wire: string;
  wireGauge: string;
  sizes: string[];
  dimensions: {
    lengthMm: number;
    wireDiaMm: number;
    claspWidthMm: number;
    springDiaMm: number;
    tensileStrengthN: string;
    corrosionHours: string;
  };
  packs: PackOption[];
  use: string[];
  features: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  imageTone: string;
  imageUrl?: string;
  leadTime: string;
  compliance: string[];
  origin: string;
};

export const products: Product[] = [
  {
    id: 'standard-silver-nickel',
    code: 'KK-SP-STD-01',
    name: 'Kanyakumari Precision Steel Safety Pins (Mirror Nickel Plated)',
    family: 'Standard Industrial & Apparel',
    short: 'Cold-drawn high-carbon spring steel wire with 8µm mirror electro-nickel plating. Ideal for Tirupur knitwear & garment tagging.',
    description: 'Our flagship safety pin precision-engineered at our Kanyakumari, Tamil Nadu plant. Produced on high-speed automatic multi-slide forming lines using high-tensile spring steel wire. Features a deep safety hood clasp and sharp needle point that penetrates fabrics cleanly without tearing yarns.',
    finish: 'Mirror Silver Nickel Plating (8µm Electro-Plated, EN 1811 Nickel-Safe)',
    wire: 'Cold-Drawn High-Carbon Spring Steel Wire (IS 4454 / C70)',
    wireGauge: 'SWG 21 - 20 (0.80mm - 0.90mm)',
    sizes: ['19 mm (#000)', '22 mm (#00)', '28 mm (#0)', '34 mm (#1)', '38 mm (#2)', '45 mm (#3)', '54 mm (#4)'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.85,
      claspWidthMm: 5.2,
      springDiaMm: 4.5,
      tensileStrengthN: '190 N',
      corrosionHours: '72h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p100', name: 'Retail Packet (100 pcs)', count: 100, price: 1.15, unitPrice: 0.0115 },
      { id: 'p1000', name: 'Workshop Box (1,000 pcs)', count: 1000, price: 9.20, unitPrice: 0.0092, popular: true },
      { id: 'p10000', name: 'Factory Master Carton (10,000 pcs)', count: 10000, price: 75.00, unitPrice: 0.0075 },
      { id: 'p50000', name: 'Export Pallet (50,000 pcs)', count: 50000, price: 345.00, unitPrice: 0.0069 },
    ],
    use: ['Tirupur garment manufacturing & tagging', 'Retail card packaging', 'Commercial dry cleaning', 'Textile export processing'],
    features: ['Precision-ground sharp needle point', 'High-retention safety clasp hood', '1,500+ spring flex cycle memory', 'Zero-burr electroplated finish'],
    stock: 500000,
    rating: 4.9,
    reviewsCount: 342,
    imageTone: 'from-[#e2e8f0] to-[#cbd5e1]',
    imageUrl: '/images/indian-safety-pins-hero.jpg',
    leadTime: 'Immediate Dispatch — 24/48h from Kanyakumari / Tuticorin Port',
    compliance: ['Make in India 🇮🇳', 'Tamil Nadu Industrial Quality Standard', 'ISO 9001:2015', 'RoHS & REACH Compliant'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'bunched-ring-pack',
    code: 'KK-SP-BNCH-02',
    name: 'Bunched Master Ring Pack Safety Pins (12/24 Pins on Master Ring)',
    family: 'Garment Line & Laundry Bunch',
    short: 'Traditional South Indian bunched ring format strung on a master safety pin. Quick dispensing for factory tagging lines.',
    description: 'Specialty packaging developed for high-speed garment export houses across Tirupur, Karur, and international apparel factories. 12, 24, or 36 identical safety pins are hung neatly on a heavy-gauge master safety pin, allowing operators to peel off pins rapidly without tangles.',
    finish: 'Bright Silver Nickel & Golden Brass Plating',
    wire: 'Tempered Spring Steel & Brass Wire',
    wireGauge: 'SWG 20 (0.90mm)',
    sizes: ['28 mm (#0)', '34 mm (#1)', '38 mm (#2)', '45 mm (#3)'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.85,
      claspWidthMm: 5.2,
      springDiaMm: 4.5,
      tensileStrengthN: '190 N',
      corrosionHours: '72h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p100b', name: 'Bundle of 100 Bunches (1,200 pcs)', count: 1200, price: 12.50, unitPrice: 0.0104 },
      { id: 'p500b', name: 'Carton of 500 Bunches (6,000 pcs)', count: 6000, price: 58.00, unitPrice: 0.0096, popular: true },
      { id: 'p2000b', name: 'Master Export Carton (24,000 pcs)', count: 24000, price: 210.00, unitPrice: 0.00875 },
    ],
    use: ['Fast-paced garment packing lines', 'Laundry bag tagging', 'Stationery retail chains', 'Hardware & sewing wholesale'],
    features: ['Zero tangling during transit', 'Convenient master ring pin holder', 'Quick single-pin dispense', 'Heavy-duty polybag inner packing'],
    stock: 350000,
    rating: 5.0,
    reviewsCount: 218,
    imageTone: 'from-[#f1f5f9] to-[#d8e2ec]',
    imageUrl: '/images/safety-pin-ring-bunches.jpg',
    leadTime: 'In Stock — Ships Worldwide from Kanyakumari',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'RoHS & REACH Certified'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'pure-brass-golden',
    code: 'KK-SP-BRS-03',
    name: 'Pure Brass 100% Rustproof Golden Safety Pins',
    family: 'Premium Saree & Maritime',
    short: 'Solid high-grade cartridge brass alloy (CuZn37). 100% rustproof in coastal moisture & humid laundry environments.',
    description: 'Manufactured in coastal Kanyakumari from 100% non-ferrous solid brass alloy wire. Completely unaffected by humidity, sea spray, sweat, laundry detergents, and boiling wash water. Widely chosen for silk sarees, bridal drapes, maritime uniforms, and luxury fashion.',
    finish: 'Mirror Polished Natural Golden Brass / Lacquered',
    wire: 'Solid Cartridge Brass (CuZn37 / IS 407)',
    wireGauge: 'SWG 21 (0.80mm)',
    sizes: ['19 mm (#000)', '22 mm (#00)', '28 mm (#0)', '34 mm (#1)', '38 mm (#2)', '45 mm (#3)'],
    dimensions: {
      lengthMm: 34,
      wireDiaMm: 0.80,
      claspWidthMm: 4.8,
      springDiaMm: 4.0,
      tensileStrengthN: '160 N',
      corrosionHours: '> 300h (100% Rust-Proof Non-Ferrous)',
    },
    packs: [
      { id: 'p100', name: 'Box of 100 pcs', count: 100, price: 2.80, unitPrice: 0.028 },
      { id: 'p1000', name: 'Pack of 1,000 pcs', count: 1000, price: 22.00, unitPrice: 0.022, popular: true },
      { id: 'p10000', name: 'Export Carton (10,000 pcs)', count: 10000, price: 185.00, unitPrice: 0.0185 },
    ],
    use: ['Traditional Kanchipuram sarees & bridal wear', 'Laundry wash cycles', 'High-humidity marine uniforms', 'Luxury textile tags'],
    features: ['100% Non-magnetic & rust-proof', 'Gentle on fine silks & georgette', 'Smooth polished needle glide', 'Rich golden luster'],
    stock: 220000,
    rating: 4.9,
    reviewsCount: 184,
    imageTone: 'from-[#fef3c7] to-[#fde68a]',
    imageUrl: '/images/specialty-safety-pins-variety.jpg',
    leadTime: 'In Stock — Ex-Factory Dispatch 24h',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'Oeko-Tex Standard 100 Class 1', 'Nickel-Free Lead-Safe'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'pear-bulb-hangtag',
    code: 'KK-SP-BLB-04',
    name: 'Pear / Gourd / Bulb Safety Pins (For Garment Hangtags)',
    family: 'Retail & Fashion Packaging',
    short: 'Teardrop bulb base lets swing tags hang naturally without creasing labels. Matte Black, Silver, Gold, Bronze.',
    description: 'The global standard for apparel swing tags and price tickets. The teardrop bulbous base ensures string cords and branded hangtags swing freely without catching in the spring coil.',
    finish: 'Matte Electro-Black, Polished Silver Nickel, Antique Brass & Rose Gold',
    wire: 'Tempered Carbon Spring Steel Wire',
    wireGauge: 'SWG 22 (0.70mm)',
    sizes: ['21 mm (Standard Bulb)', '26 mm (Large Bulb)'],
    dimensions: {
      lengthMm: 21,
      wireDiaMm: 0.70,
      claspWidthMm: 4.2,
      springDiaMm: 5.5,
      tensileStrengthN: '120 N',
      corrosionHours: '48h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p1000', name: 'Retail Pack (1,000 pcs)', count: 1000, price: 8.50, unitPrice: 0.0085 },
      { id: 'p5000', name: 'Workshop Box (5,000 pcs)', count: 5000, price: 38.00, unitPrice: 0.0076, popular: true },
      { id: 'p20000', name: 'Master Export Carton (20,000 pcs)', count: 20000, price: 135.00, unitPrice: 0.00675 },
    ],
    use: ['Clothing brand swing tags', 'Price ticket attachment', 'Designer gift packaging', 'Jewelry & craft labeling'],
    features: ['Teardrop profile prevents tag creasing', 'Smooth matte or gloss finish', 'Featherweight 0.26g per piece', 'Zero snag needle point'],
    stock: 450000,
    rating: 4.9,
    reviewsCount: 290,
    imageTone: 'from-[#e2e8f0] to-[#cbd5e1]',
    imageUrl: '/images/specialty-safety-pins-variety.jpg',
    leadTime: 'Ready Stock — Large Export Volume',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'REACH & RoHS Compliant', 'Lead & Cadmium Safe'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'coilless-anti-snag',
    code: 'KK-SP-CLS-05',
    name: 'Coil-less Anti-Snag Safety Pins (French Style)',
    family: 'Haute Couture & Silk Weaves',
    short: 'Straight bottom wire without helical coil prevents thread-snagging on fine silk sarees and open knitwear.',
    description: 'Designed specifically to eliminate loose thread catching on silk sarees, pashminas, and delicate woolens. The absence of a traditional coil allows fabric to glide cleanly along the entire wire shaft.',
    finish: 'Ultra-Smooth Mirror Silver & Golden Plating',
    wire: 'Tempered Precision Spring Steel',
    wireGauge: 'SWG 22 (0.72mm)',
    sizes: ['22 mm (#0)', '28 mm (#1)', '34 mm (#2)'],
    dimensions: {
      lengthMm: 28,
      wireDiaMm: 0.72,
      claspWidthMm: 4.4,
      springDiaMm: 2.0,
      tensileStrengthN: '145 N',
      corrosionHours: '72h ASTM B117',
    },
    packs: [
      { id: 'p500', name: 'Studio Pack (500 pcs)', count: 500, price: 7.50, unitPrice: 0.015 },
      { id: 'p2000', name: 'Tailor Box (2,000 pcs)', count: 2000, price: 26.00, unitPrice: 0.013, popular: true },
      { id: 'p10000', name: 'Factory Carton (10,000 pcs)', count: 10000, price: 110.00, unitPrice: 0.011 },
    ],
    use: ['Fine knitwear & sweaters', 'Silk sarees & shawls', 'Haute couture fittings', 'Clean dry cleaning tag security'],
    features: ['Zero-snag seamless bottom wire', 'Micro-honed puncture tip', 'Sleek low-profile clasp hood', 'No yarn pulling or laddering'],
    stock: 180000,
    rating: 4.9,
    reviewsCount: 145,
    imageTone: 'from-[#f1f5f9] to-[#d8e2ec]',
    imageUrl: '/images/indian-safety-pins-hero.jpg',
    leadTime: 'In Stock — Ex-Factory Kanyakumari',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'Oeko-Tex Standard 100'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'heavy-duty-industrial',
    code: 'KK-SP-HD-06',
    name: 'Heavy-Duty Industrial & Commercial Laundry Pins (Extra Gauge)',
    family: 'Heavy Industry & Laundry',
    short: 'Extra-stout 1.40mm - 1.80mm wire built for commercial laundry nets, heavy canvas, and bulk bales.',
    description: 'Engineered for high holding force. Built from thick high-gauge cold-rolled carbon steel wire that withstands commercial laundry tumblers, high-temperature steam presses, heavy canvas tarpaulins, and agricultural bailing.',
    finish: 'Heavy Hot-Dip Zinc / Double Silver Electroplate',
    wire: 'Extra-Heavy Hardened Carbon Spring Steel',
    wireGauge: 'SWG 16 - 17 (1.40mm - 1.60mm)',
    sizes: ['55 mm (#4)', '65 mm (#5)', '75 mm (#6)', '102 mm (Giant 4-Inch)'],
    dimensions: {
      lengthMm: 75,
      wireDiaMm: 1.50,
      claspWidthMm: 8.8,
      springDiaMm: 8.0,
      tensileStrengthN: '450 N',
      corrosionHours: '120h ASTM B117 Heavy Salt Spray',
    },
    packs: [
      { id: 'p50', name: 'Pack of 50 pcs', count: 50, price: 5.20, unitPrice: 0.104 },
      { id: 'p500', name: 'Industrial Box (500 pcs)', count: 500, price: 38.00, unitPrice: 0.076, popular: true },
      { id: 'p5000', name: 'Master Commercial Carton (5,000 pcs)', count: 5000, price: 310.00, unitPrice: 0.062 },
    ],
    use: ['Commercial laundry wash nets', 'Traditional kilt & heavy blanket fastening', 'Industrial canvas & sack tagging', 'Tent & awning rigging'],
    features: ['1.5mm thick rigid wire spine', 'Dual-coil high tension spring', 'Interlocking deep safety head', 'Detergent & steam resistant'],
    stock: 95000,
    rating: 5.0,
    reviewsCount: 162,
    imageTone: 'from-[#cbd5e1] to-[#94a3b8]',
    imageUrl: '/images/indian-safety-pins-hero.jpg',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'Heavy Duty Standard BS 3280'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'stainless-316-surgical',
    code: 'KK-SP-SS316-07',
    name: 'Marine & Surgical Grade 316 Stainless Steel Safety Pins',
    family: 'Medical & Coastal Marine',
    short: 'Solid AISI 316 austenitic stainless steel wire. Tested for coastal sea spray and autoclave steam sterilization.',
    description: 'Forged from AISI 316 stainless steel wire. Designed in coastal Tamil Nadu for high-salinity marine environments, autoclave hospital sterilizers, food processing lines, and chemical facilities with zero rust or degradation.',
    finish: 'Electropolished Natural Silver Stainless Finish',
    wire: 'Solid AISI 316 / 304 Austenitic Stainless Steel',
    wireGauge: 'SWG 20 (0.90mm)',
    sizes: ['28 mm (#0)', '38 mm (#2)', '50 mm (#3)'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.90,
      claspWidthMm: 5.4,
      springDiaMm: 4.8,
      tensileStrengthN: '240 N',
      corrosionHours: '> 500h Marine Salt Spray',
    },
    packs: [
      { id: 'p100', name: 'Cleanroom Pack (100 pcs)', count: 100, price: 9.80, unitPrice: 0.098 },
      { id: 'p1000', name: 'Clinical Box (1,000 pcs)', count: 1000, price: 78.00, unitPrice: 0.078, popular: true },
      { id: 'p5000', name: 'Medical Master Carton (5,000 pcs)', count: 5000, price: 345.00, unitPrice: 0.069 },
    ],
    use: ['Hospital & dental surgical packs', 'Diving & marine rigging', 'Food processing tagging', 'Cleanroom & chemical labs'],
    features: ['100% Rust-proof AISI 316 wire', 'Autoclave sterilizable up to 134°C', 'Zero magnetic interference', 'Medical grade electro-polished'],
    stock: 62000,
    rating: 5.0,
    reviewsCount: 94,
    imageTone: 'from-[#d5e0ea] to-[#9cb0c3]',
    imageUrl: '/images/indian-safety-pins-hero.jpg',
    leadTime: 'In Stock — Global Air/Sea Freight via Tuticorin / Cochin',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'FDA Food Contact Safe', 'ASTM F899 Medical Grade'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
  {
    id: 'assorted-tailor-box',
    code: 'KK-SP-ASST-08',
    name: 'Master Tailor & Exporter Assorted Pin Box (5 Sizes Combo)',
    family: 'Retail & Multi-Pack',
    short: 'Comprehensive combo pack containing sizes #00, #0, #1, #2, and #3 in a partitioned storage case.',
    description: 'An all-in-one assortment curated for fashion houses, tailoring ateliers, dry cleaning counters, and retail haberdashery shops across Tamil Nadu and international markets. Contains 5 essential sizes organized in separate compartments.',
    finish: 'Mirror Silver Nickel & Golden Brass Combo',
    wire: 'Cold-Drawn Spring Steel',
    wireGauge: 'SWG 22 to SWG 20 (0.75mm - 0.90mm)',
    sizes: ['Combo: 19mm, 28mm, 34mm, 38mm, 45mm'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.85,
      claspWidthMm: 5.2,
      springDiaMm: 4.5,
      tensileStrengthN: '180 N',
      corrosionHours: '72h ASTM B117',
    },
    packs: [
      { id: 'p250', name: 'Assorted Case (250 pcs - 5 Sizes)', count: 250, price: 4.80, unitPrice: 0.0192 },
      { id: 'p1000', name: 'Workshop Set (1,000 pcs - 5 Sizes)', count: 1000, price: 14.50, unitPrice: 0.0145, popular: true },
      { id: 'p10000', name: 'Master Retail Carton (10,000 pcs)', count: 10000, price: 118.00, unitPrice: 0.0118 },
    ],
    use: ['Tailoring boutiques & fashion studios', 'Dry cleaning reception counters', 'School & office stationery supplies', 'Household utility sets'],
    features: ['5 most popular sizes included', 'Clear compartmentalized storage box', 'High-shine rust-resistant plating', 'Ideal for sample & trial orders'],
    stock: 110000,
    rating: 5.0,
    reviewsCount: 310,
    imageTone: 'from-[#f1f5f9] to-[#cbd5e1]',
    imageUrl: '/images/indian-safety-pins-hero.jpg',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['Make in India 🇮🇳', 'ISO 9001:2015', 'REACH & RoHS Compliant'],
    origin: 'Manufactured in Kanyakumari District, Tamil Nadu, India',
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const INDIAN_SIZE_CHART = [
  { sizeNo: 'Size 000 (#000)', lengthMm: 19, lengthInch: '0.75"', wireGauge: 'SWG 22 (0.70 mm)', pcsPerKg: 'Approx. 5,200', bestFor: 'Delicate silks, thin shirts, fine tags' },
  { sizeNo: 'Size 00 (#00)', lengthMm: 22, lengthInch: '0.87"', wireGauge: 'SWG 21 (0.80 mm)', pcsPerKg: 'Approx. 4,100', bestFor: 'Lingerie, scarves, small price tickets' },
  { sizeNo: 'Size 0 (#0)', lengthMm: 28, lengthInch: '1.10"', wireGauge: 'SWG 21 (0.80 mm)', pcsPerKg: 'Approx. 3,100', bestFor: 'Garment hangtags, shirts, crafts' },
  { sizeNo: 'Size 1 (#1)', lengthMm: 34, lengthInch: '1.34"', wireGauge: 'SWG 20 (0.85 mm)', pcsPerKg: 'Approx. 2,200', bestFor: 'Everyday apparel, sarees, general retail' },
  { sizeNo: 'Size 2 (#2)', lengthMm: 38, lengthInch: '1.50"', wireGauge: 'SWG 20 (0.85 mm)', pcsPerKg: 'Approx. 1,800', bestFor: 'Standard universal pin, dry cleaning' },
  { sizeNo: 'Size 3 (#3)', lengthMm: 45, lengthInch: '1.77"', wireGauge: 'SWG 19 (1.00 mm)', pcsPerKg: 'Approx. 1,250', bestFor: 'Thick denim, jackets, curtains, upholstery' },
  { sizeNo: 'Size 4 (#4)', lengthMm: 54, lengthInch: '2.12"', wireGauge: 'SWG 18 (1.20 mm)', pcsPerKg: 'Approx. 780', bestFor: 'Heavy blankets, laundry wash bags' },
  { sizeNo: 'Size 5 (#5)', lengthMm: 65, lengthInch: '2.56"', wireGauge: 'SWG 17 (1.40 mm)', pcsPerKg: 'Approx. 490', bestFor: 'Industrial laundry, kilts, canvas sacks' },
  { sizeNo: 'Size 6 (#6 / Giant)', lengthMm: 75, lengthInch: '3.00"', wireGauge: 'SWG 16 (1.60 mm)', pcsPerKg: 'Approx. 280', bestFor: 'Agricultural bailing, industrial canvas' },
];

export const PACKAGING_OPTIONS = [
  {
    title: 'Bunched Ring Packs on Master Pin',
    subtitle: '12 / 24 / 36 Pins per Ring Bunch',
    desc: 'Traditional South Indian format strung through a sturdy master safety pin. Eliminates tangles and accelerates Tirupur garment export assembly lines.',
    image: '/images/safety-pin-ring-bunches.jpg',
    moq: '1,000 Bunches (12,000 Pcs)',
  },
  {
    title: 'Factory Bulk Export Master Cartons',
    subtitle: '10,000 to 50,000 Pcs per Corrugated Box',
    desc: 'Heavy 7-ply export grade master cartons lined with anti-moisture polybags for sea freight via Tuticorin / Cochin Port.',
    image: '/images/indian-safety-pins-hero.jpg',
    moq: '50,000 Pcs',
  },
  {
    title: 'Retail Blister Cards & Hanging Packs',
    subtitle: 'Custom Printed OEM Backer Cards',
    desc: 'Custom barcode, brand logo, and artwork on hanging blister cards ready for retail supermarket shelves.',
    image: '/images/specialty-safety-pins-variety.jpg',
    moq: '5,000 Cards',
  },
  {
    title: 'Plastic Boxes & Display Tins',
    subtitle: '100 / 500 / 1,000 Pcs Storage Cases',
    desc: 'Clear acrylic boxes or reusable printed tin cases for tailoring shops, haberdashery, and office stationery.',
    image: '/images/indian-safety-pins-hero.jpg',
    moq: '500 Boxes',
  },
];