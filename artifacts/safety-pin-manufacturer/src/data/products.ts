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
  use: string[];
  imageTone: string;
  availability: string;
};

export const products: Product[] = [
  {
    id: 'standard',
    code: 'SP-STD',
    name: 'Standard Safety Pin',
    family: 'Core range',
    short: 'The dependable everyday specification.',
    description: 'A balanced safety pin profile for general textile, packaging, and assembly applications. Built around a consistent spring and a positive clasp.',
    finish: 'Bright nickel / finish available on request',
    wire: 'Carbon steel / stainless steel available on request',
    sizes: ['20 mm', '27 mm', '32 mm', '38 mm', '50 mm'],
    use: ['Textile assembly', 'Retail packaging', 'Garment tagging'],
    imageTone: 'from-[#d9d4c5] to-[#b7b8b1]',
    availability: 'Editable placeholder',
  },
  {
    id: 'heavy-duty',
    code: 'SP-HD',
    name: 'Heavy-Duty Safety Pin',
    family: 'Reinforced range',
    short: 'More wire. More hold. Same discipline.',
    description: 'A reinforced body and stronger clasp geometry for applications where a secure hold matters more than a light touch.',
    finish: 'Zinc / finish available on request',
    wire: 'Hardened carbon steel / specification available on request',
    sizes: ['38 mm', '50 mm', '65 mm', '75 mm'],
    use: ['Bale identification', 'Industrial bundling', 'Outdoor textiles'],
    imageTone: 'from-[#c6c6bc] to-[#8b9793]',
    availability: 'Editable placeholder',
  },
  {
    id: 'fine-wire',
    code: 'SP-FW',
    name: 'Fine-Wire Safety Pin',
    family: 'Delicate range',
    short: 'A lighter touch for precise work.',
    description: 'Fine wire and a compact profile help protect delicate materials while maintaining the essential safety-pin action.',
    finish: 'Bright / finish available on request',
    wire: 'Fine carbon steel / specification available on request',
    sizes: ['13 mm', '20 mm', '27 mm', '32 mm'],
    use: ['Fine textiles', 'Sample handling', 'Craft and display'],
    imageTone: 'from-[#e4ded0] to-[#c9c1ac]',
    availability: 'Editable placeholder',
  },
  {
    id: 'colored',
    code: 'SP-CL',
    name: 'Colored Safety Pin',
    family: 'Identification range',
    short: 'A functional component with a visual signal.',
    description: 'Color-coated safety pins for sorting, coding, and brand-specific requirements. Color systems and coating details are available on request.',
    finish: 'Color coated / color card available on request',
    wire: 'Carbon steel / specification available on request',
    sizes: ['27 mm', '32 mm', '38 mm', '50 mm'],
    use: ['Product identification', 'Retail presentation', 'Event materials'],
    imageTone: 'from-[#dfc4ad] to-[#b9a18d]',
    availability: 'Editable placeholder',
  },
  {
    id: 'custom',
    code: 'SP-CUS',
    name: 'Custom Specification',
    family: 'Made to requirement',
    short: 'When the standard range is not enough.',
    description: 'Bring us your material, size, finish, pack, and application requirement. We will map the manufacturable route with you.',
    finish: 'Available on request',
    wire: 'Available on request',
    sizes: ['To requirement'],
    use: ['OEM programs', 'Private label', 'Special assemblies'],
    imageTone: 'from-[#aebcb7] to-[#7b8e8a]',
    availability: 'Available on request',
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);