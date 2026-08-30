export type PackOption = {
  id: string;
  name: string;
  count: number;
  price: number;
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
  leadTime: string;
  compliance: string[];
};

export const products: Product[] = [
  {
    id: 'standard-silver',
    code: 'SP-STD-01',
    name: 'Master Classic Silver Safety Pin',
    family: 'Core Industrial',
    short: 'Precision-formed high-tensile carbon steel with mirror nickel-chrome plating.',
    description: 'Our benchmark safety pin for commercial apparel tagging, retail packaging, and dependable textile fastening. Engineered with a hardened spring coil and a deep protective clasp hood that eliminates accidental pop-outs under mechanical stress.',
    finish: 'Mirror Silver Nickel (Electro-plated 8µm)',
    wire: 'Cold-Drawn High-Carbon Spring Steel (C70)',
    sizes: ['19 mm (#00)', '28 mm (#1)', '38 mm (#2)', '45 mm (#3)', '54 mm (#4)'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.85,
      claspWidthMm: 5.2,
      springDiaMm: 4.5,
      tensileStrengthN: '185 N',
      corrosionHours: '48h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p100', name: 'Retail Pack (100 pcs)', count: 100, price: 6.50, unitPrice: 0.065 },
      { id: 'p1000', name: 'Workshop Box (1,000 pcs)', count: 1000, price: 29.00, unitPrice: 0.029, popular: true },
      { id: 'p10000', name: 'Industrial Master Carton (10,000 pcs)', count: 10000, price: 195.00, unitPrice: 0.0195 },
    ],
    use: ['Garment tagging', 'Retail packaging', 'Textile manufacturing', 'General assembly'],
    features: ['High-retention clasp hood', 'Repeatable spring memory > 1,000 cycles', 'Electro-polished needle tip', 'Burr-free edge'],
    stock: 145000,
    rating: 4.9,
    reviewsCount: 164,
    imageTone: 'from-[#e2e8f0] to-[#cbd5e1]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['RoHS Compliant', 'REACH Certified', 'EN 1811 Nickel-Safe'],
  },
  {
    id: 'coilless-silver',
    code: 'SP-CLS-02',
    name: 'Coil-less Anti-Snag Silver Pin',
    family: 'Textile & Apparel',
    short: 'Smooth seamless straight bottom eliminates thread snagging on delicate knits.',
    description: 'Designed specifically for high-end fashion, knitwear, and couture houses. By removing the traditional helical wire coil, this pin glides through luxury cashmere, silk, and open-weave fabrics without catching or fraying single threads.',
    finish: 'Ultra-Smooth Bright Silver Nickel',
    wire: 'Tempered Precision Spring Steel',
    sizes: ['22 mm (#0)', '28 mm (#1)', '34 mm (#2)'],
    dimensions: {
      lengthMm: 28,
      wireDiaMm: 0.75,
      claspWidthMm: 4.6,
      springDiaMm: 2.2,
      tensileStrengthN: '140 N',
      corrosionHours: '72h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p100', name: 'Sample Pack (100 pcs)', count: 100, price: 8.00, unitPrice: 0.080 },
      { id: 'p1000', name: 'Atelier Box (1,000 pcs)', count: 1000, price: 38.00, unitPrice: 0.038, popular: true },
      { id: 'p10000', name: 'Production Carton (10,000 pcs)', count: 10000, price: 260.00, unitPrice: 0.026 },
    ],
    use: ['Knitwear tagging', 'Fine woolens', 'Designer apparel labels', 'Dry cleaning tags'],
    features: ['Zero-snag coil-less geometry', 'Laser-pointed penetration tip', 'Slimline clasp profile', 'Zero residue coating'],
    stock: 82000,
    rating: 5.0,
    reviewsCount: 92,
    imageTone: 'from-[#f1f5f9] to-[#d8e2ec]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['RoHS Compliant', 'REACH Certified', 'Oeko-Tex Standard 100 Class 1'],
  },
  {
    id: 'heavy-duty-silver',
    code: 'SP-HD-03',
    name: 'Heavy-Duty Reinforced Industrial Pin',
    family: 'Heavy Industry & Laundry',
    short: '1.4mm extra-gauge spring wire built for commercial laundry, kilts, and bulk bales.',
    description: 'When maximum holding force and mechanical rigidity are mandatory. Constructed with high-gauge hardened carbon steel that resists bending under 400N shear loads. Perfect for industrial dry cleaning laundries, heavy woolens, leather goods, and agricultural seed sacks.',
    finish: 'Double-Dipped Bright Zinc-Nickel Silver',
    wire: 'Heavy-Gauge Cold-Rolled Spring Steel',
    sizes: ['50 mm (#3)', '65 mm (#4)', '76 mm (#5)', '102 mm (#6)'],
    dimensions: {
      lengthMm: 76,
      wireDiaMm: 1.40,
      claspWidthMm: 8.5,
      springDiaMm: 7.8,
      tensileStrengthN: '420 N',
      corrosionHours: '96h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p50', name: 'Pack of 50 pcs', count: 50, price: 9.50, unitPrice: 0.190 },
      { id: 'p500', name: 'Bulk Box (500 pcs)', count: 500, price: 58.00, unitPrice: 0.116, popular: true },
      { id: 'p5000', name: 'Commercial Carton (5,000 pcs)', count: 5000, price: 420.00, unitPrice: 0.084 },
    ],
    use: ['Commercial laundry & dry cleaning', 'Heavy kilt & tartan fastening', 'Industrial canvas bundling', 'Bale identification'],
    features: ['1.4mm extra-stout wire spine', 'High-tension double coil', 'Interlocking reinforced clasp', 'Resistant to commercial detergent baths'],
    stock: 64000,
    rating: 4.9,
    reviewsCount: 118,
    imageTone: 'from-[#cbd5e1] to-[#94a3b8]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['RoHS Compliant', 'REACH Certified', 'Industrial Duty ISO 1461'],
  },
  {
    id: 'bulb-gourd-silver',
    code: 'SP-BLB-04',
    name: 'Pear & Bulb Silver Hangtag Pin',
    family: 'Retail & Packaging',
    short: 'Teardrop bulbous base holds swing tags freely without pinching or creasing paper.',
    description: 'The preferred choice for luxury retail brands and packaging designers. The distinctive bulb base allows garment swing tags and price tickets to hang naturally and swivel smoothly without binding on the wire.',
    finish: 'Polished Mirror Silver & Satin Chrome',
    wire: 'Tempered Spring Wire',
    sizes: ['21 mm (Standard Bulb)', '26 mm (Large Pear)'],
    dimensions: {
      lengthMm: 21,
      wireDiaMm: 0.70,
      claspWidthMm: 4.2,
      springDiaMm: 5.4,
      tensileStrengthN: '110 N',
      corrosionHours: '48h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p200', name: 'Retail Pack (200 pcs)', count: 200, price: 9.00, unitPrice: 0.045 },
      { id: 'p2000', name: 'Display Box (2,000 pcs)', count: 2000, price: 54.00, unitPrice: 0.027, popular: true },
      { id: 'p20000', name: 'Factory Carton (20,000 pcs)', count: 20000, price: 390.00, unitPrice: 0.0195 },
    ],
    use: ['Luxury clothing swing tags', 'Gift packaging & ribbons', 'Artisan jewellery display', 'Craft & stationery'],
    features: ['Gourd / pear loop holds cards freely', 'Sleek rounded safety clasp', 'Featherlight weight (0.28g/pc)', 'Smooth tactile handling'],
    stock: 210000,
    rating: 4.8,
    reviewsCount: 205,
    imageTone: 'from-[#e6edf4] to-[#c7d5e4]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['RoHS Compliant', 'REACH Certified', 'Nickel-Free Lead-Safe'],
  },
  {
    id: 'stainless-316-silver',
    code: 'SP-SS316-05',
    name: 'Marine-Grade 316 Stainless Steel Pin',
    family: 'Marine & Medical',
    short: '100% rustproof solid AISI 316 stainless steel for autoclave, saltwater, and sterile use.',
    description: 'Manufactured entirely from austenitic marine-grade AISI 316 stainless steel wire. Will not corrode, rust, or tarnish even under direct marine exposure, boiling wash cycles, autoclave sterilization, or harsh chemical disinfectants.',
    finish: 'Electropolished Natural Silver Stainless Steel',
    wire: 'AISI 316 Marine-Grade Stainless Steel',
    sizes: ['25 mm (#1)', '38 mm (#2)', '50 mm (#3)'],
    dimensions: {
      lengthMm: 38,
      wireDiaMm: 0.90,
      claspWidthMm: 5.4,
      springDiaMm: 4.8,
      tensileStrengthN: '230 N',
      corrosionHours: '> 500h ASTM B117 Marine Salt Spray',
    },
    packs: [
      { id: 'p50', name: 'Sterile Pack (50 pcs)', count: 50, price: 12.00, unitPrice: 0.240 },
      { id: 'p500', name: 'Clinical Box (500 pcs)', count: 500, price: 85.00, unitPrice: 0.170, popular: true },
      { id: 'p5000', name: 'Cleanroom Carton (5,000 pcs)', count: 5000, price: 680.00, unitPrice: 0.136 },
    ],
    use: ['Medical & dental sterile packs', 'Marine rigging & sailcloth', 'Outdoor gear & diving suits', 'Food processing tagging'],
    features: ['100% rustproof AISI 316', 'Autoclave sterilizable to 134°C', 'Zero magnetic interference', 'Hypoallergenic & medical grade'],
    stock: 45000,
    rating: 5.0,
    reviewsCount: 78,
    imageTone: 'from-[#d5e0ea] to-[#9cb0c3]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['FDA Food Contact Compliant', 'ISO 13485 Medical Grade', 'ASTM F899 Stainless Standards'],
  },
  {
    id: 'fine-silk-silver',
    code: 'SP-SLK-06',
    name: 'Ultra-Fine Silk & Couture Micro-Pin',
    family: 'Haute Couture',
    short: '0.55mm ultra-slender needle profile prevents pin-holes in silk chiffon and satins.',
    description: 'Engineered for bridal gowns, delicate silk scarves, and fine drapery where visible needle punctures cannot be tolerated. The micro-tapered tip parts fabric fibers rather than piercing through them, leaving zero visible holes upon removal.',
    finish: 'Satin Pearl Silver Plating',
    wire: 'Micro-Fine Piano Wire Steel',
    sizes: ['16 mm (#000)', '20 mm (#00)', '25 mm (#0)'],
    dimensions: {
      lengthMm: 20,
      wireDiaMm: 0.55,
      claspWidthMm: 3.6,
      springDiaMm: 2.8,
      tensileStrengthN: '95 N',
      corrosionHours: '48h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p100', name: 'Atelier Pack (100 pcs)', count: 100, price: 9.50, unitPrice: 0.095 },
      { id: 'p1000', name: 'Couture Box (1,000 pcs)', count: 1000, price: 46.00, unitPrice: 0.046, popular: true },
      { id: 'p10000', name: 'Fashion Carton (10,000 pcs)', count: 10000, price: 340.00, unitPrice: 0.034 },
    ],
    use: ['Bridal couture & veils', 'Silk chiffon & organza', 'High-end tailoring fittings', 'Museum textile preservation'],
    features: ['0.55mm micro-fine wire diameter', 'Non-piercing fiber-parting tip', 'Ultra-lightweight clasp', 'Velvet-smooth insertion feel'],
    stock: 58000,
    rating: 4.9,
    reviewsCount: 86,
    imageTone: 'from-[#edf2f7] to-[#d1dbe6]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['RoHS Compliant', 'REACH Certified', 'Oeko-Tex Standard 100'],
  },
  {
    id: 'locking-safety-silver',
    code: 'SP-LCK-07',
    name: 'Shielded Locking-Cap Safety Pin',
    family: 'Safety & Infant Care',
    short: 'Double-action sliding lock cap prevents accidental opening during movement.',
    description: 'Features a patented secondary sliding latch over the clasp that must be manually engaged to unlock the needle arm. Recommended for infant cloth nappies, patient hospital wristbands, active sportswear, and racing bibs.',
    finish: 'Silver Nickel Steel with Molded Safety Shield',
    wire: 'Spring Tempered Carbon Steel',
    sizes: ['40 mm', '55 mm'],
    dimensions: {
      lengthMm: 55,
      wireDiaMm: 1.05,
      claspWidthMm: 6.8,
      springDiaMm: 5.2,
      tensileStrengthN: '260 N',
      corrosionHours: '48h ASTM B117 Salt Spray',
    },
    packs: [
      { id: 'p50', name: 'Pack of 50 pcs', count: 50, price: 8.50, unitPrice: 0.170 },
      { id: 'p500', name: 'Safety Box (500 pcs)', count: 500, price: 52.00, unitPrice: 0.104, popular: true },
      { id: 'p5000', name: 'Institutional Carton (5,000 pcs)', count: 5000, price: 380.00, unitPrice: 0.076 },
    ],
    use: ['Marathon & athletics bibs', 'Infant textiles & cloth diapers', 'Hospital identification bands', 'Activewear temporary fastening'],
    features: ['Positive dual-action locking latch', 'Shielded point eliminates prick hazard', 'High pull-apart resistance', 'Smooth rounded corners'],
    stock: 39000,
    rating: 4.8,
    reviewsCount: 64,
    imageTone: 'from-[#e0e8f0] to-[#b8c9db]',
    leadTime: 'In Stock — Ships in 24h',
    compliance: ['EN 71-3 Toy & Baby Safety', 'RoHS Compliant', 'REACH Certified'],
  },
  {
    id: 'custom-silver-oem',
    code: 'SP-OEM-08',
    name: 'Custom OEM Safety Pin Engineering',
    family: 'Custom Program',
    short: 'Custom wire gauge, custom lengths (10mm to 150mm), and branded embossed clasp.',
    description: 'Work directly with our toolmakers and forming engineers. We manufacture custom safety pins to your CAD specifications: custom wire diameters (0.4mm to 2.5mm), custom head stamping/embossing with your brand monogram, special bends, and automated feeder packaging for production lines.',
    finish: 'Custom Plating (Bright Silver, Satin Matte, Antique Silver, Tin-Zinc)',
    wire: 'Carbon Steel / Stainless 304/316 / Phosphor Bronze',
    sizes: ['10 mm to 150 mm (Custom Tooling)'],
    dimensions: {
      lengthMm: 50,
      wireDiaMm: 1.00,
      claspWidthMm: 6.0,
      springDiaMm: 5.0,
      tensileStrengthN: 'Custom to Spec',
      corrosionHours: 'Up to 1000h Custom Plating',
    },
    packs: [
      { id: 'custom-pilot', name: 'Pilot Production Run (10,000 pcs)', count: 10000, price: 380.00, unitPrice: 0.038 },
      { id: 'custom-bulk', name: 'Full Industrial Batch (100,000 pcs)', count: 100000, price: 2100.00, unitPrice: 0.021, popular: true },
      { id: 'custom-million', name: 'Annual Contract Supply (1,000,000+ pcs)', count: 1000000, price: 14500.00, unitPrice: 0.0145 },
    ],
    use: ['OEM assembly line integration', 'Luxury brand bespoke hardware', 'Medical device components', 'Automated packaging programs'],
    features: ['Custom tooling & rapid prototype in 5 days', 'Custom clasp logo embossing', 'Automated tape & reel packaging available', 'Full PPAP & Mill Test Certificate'],
    stock: 999999,
    rating: 5.0,
    reviewsCount: 42,
    imageTone: 'from-[#d1dbe6] to-[#a8bccf]',
    leadTime: 'Prototype 5 Days • Production 2 Weeks',
    compliance: ['ISO 9001:2015', 'Full Material Traceability (MTR 3.1)', 'RoHS / REACH'],
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);