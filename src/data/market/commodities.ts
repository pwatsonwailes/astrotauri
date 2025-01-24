import { Commodity } from '../../types/market';

export const commodities: Commodity[] = [
  // Raw Materials
  {
    id: 'gold',
    name: 'Gold',
    category: 'raw-materials',
    basePrice: 1000,
    volatility: 0.15,
    description: 'Precious metal used in electronics and luxury goods',
    unit: 'oz'
  },
  {
    id: 'silver',
    name: 'Silver',
    category: 'raw-materials',
    basePrice: 250,
    volatility: 0.12,
    description: 'Industrial metal with high conductivity',
    unit: 'oz'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    category: 'raw-materials',
    basePrice: 1500,
    volatility: 0.18,
    description: 'Rare metal used in catalytic converters and jewelry',
    unit: 'oz'
  },
  {
    id: 'titanium',
    name: 'Titanium',
    category: 'raw-materials',
    basePrice: 800,
    volatility: 0.10,
    description: 'Lightweight metal used in aerospace',
    unit: 'kg'
  },
  {
    id: 'rare-earth',
    name: 'Rare Earth Elements',
    category: 'raw-materials',
    basePrice: 2000,
    volatility: 0.20,
    description: 'Critical elements for modern electronics',
    unit: 'kg'
  },

  // Industrial Materials
  {
    id: 'graphene',
    name: 'Graphene',
    category: 'industrial',
    basePrice: 3000,
    volatility: 0.25,
    description: 'Advanced carbon material for electronics',
    unit: 'sheet'
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber',
    category: 'industrial',
    basePrice: 500,
    volatility: 0.08,
    description: 'Lightweight material for construction',
    unit: 'm²'
  },
  {
    id: 'quantum-chips',
    name: 'Quantum Chips',
    category: 'industrial',
    basePrice: 5000,
    volatility: 0.30,
    description: 'Advanced computing components',
    unit: 'unit'
  },
  {
    id: 'superconductors',
    name: 'Superconductors',
    category: 'industrial',
    basePrice: 2500,
    volatility: 0.20,
    description: 'Zero-resistance electrical conductors',
    unit: 'm'
  },

  // Consumer Goods
  {
    id: 'luxury-clothes',
    name: 'Luxury Clothes',
    category: 'consumer',
    basePrice: 800,
    volatility: 0.15,
    description: 'High-end fashion items',
    unit: 'piece'
  },
  {
    id: 'smart-devices',
    name: 'Smart Devices',
    category: 'consumer',
    basePrice: 600,
    volatility: 0.18,
    description: 'Personal electronic devices',
    unit: 'unit'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    category: 'consumer',
    basePrice: 1200,
    volatility: 0.20,
    description: 'Precious metal and gem accessories',
    unit: 'piece'
  },

  // Essential Resources
  {
    id: 'water',
    name: 'Purified Water',
    category: 'essentials',
    basePrice: 100,
    volatility: 0.05,
    description: 'Clean drinking water',
    unit: 'kL'
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    category: 'essentials',
    basePrice: 150,
    volatility: 0.08,
    description: 'Breathable air supply',
    unit: 'm³'
  },
  {
    id: 'food-packs',
    name: 'Food Packs',
    category: 'essentials',
    basePrice: 200,
    volatility: 0.10,
    description: 'Long-lasting nutrient packages',
    unit: 'pack'
  },
  {
    id: 'medical-supplies',
    name: 'Medical Supplies',
    category: 'essentials',
    basePrice: 400,
    volatility: 0.12,
    description: 'Basic medical and first aid supplies',
    unit: 'kit'
  },

  // Technology
  {
    id: 'ai-cores',
    name: 'AI Cores',
    category: 'technology',
    basePrice: 4000,
    volatility: 0.35,
    description: 'Artificial Intelligence processing units',
    unit: 'core'
  },
  {
    id: 'neural-implants',
    name: 'Neural Implants',
    category: 'technology',
    basePrice: 3500,
    volatility: 0.28,
    description: 'Brain-computer interface devices',
    unit: 'unit'
  },
  {
    id: 'quantum-batteries',
    name: 'Quantum Batteries',
    category: 'technology',
    basePrice: 2000,
    volatility: 0.22,
    description: 'High-capacity energy storage',
    unit: 'cell'
  },

  // Entertainment
  {
    id: 'vr-systems',
    name: 'VR Systems',
    category: 'entertainment',
    basePrice: 1000,
    volatility: 0.20,
    description: 'Virtual reality entertainment systems',
    unit: 'set'
  },
  {
    id: 'holo-games',
    name: 'Holographic Games',
    category: 'entertainment',
    basePrice: 300,
    volatility: 0.15,
    description: 'Interactive holographic entertainment',
    unit: 'title'
  },

  // Black Market
  {
    id: 'restricted-tech',
    name: 'Restricted Tech',
    category: 'black-market',
    basePrice: 8000,
    volatility: 0.40,
    description: 'Highly regulated technology',
    unit: 'unit'
  },
  {
    id: 'military-hardware',
    name: 'Military Hardware',
    category: 'black-market',
    basePrice: 10000,
    volatility: 0.45,
    description: 'Military-grade equipment',
    unit: 'unit'
  },

  // Services
  {
    id: 'data-contracts',
    name: 'Data Contracts',
    category: 'services',
    basePrice: 1500,
    volatility: 0.25,
    description: 'Information and data packages',
    unit: 'contract'
  },
  {
    id: 'security-licenses',
    name: 'Security Licenses',
    category: 'services',
    basePrice: 2000,
    volatility: 0.20,
    description: 'Legal permits for security operations',
    unit: 'license'
  },

  // Research Materials
  {
    id: 'biosamples',
    name: 'Biological Samples',
    category: 'research',
    basePrice: 3000,
    volatility: 0.30,
    description: 'Rare biological research materials',
    unit: 'sample'
  },
  {
    id: 'research-data',
    name: 'Research Data',
    category: 'research',
    basePrice: 2500,
    volatility: 0.28,
    description: 'Scientific research information',
    unit: 'dataset'
  },

  // Ship Supplies
  {
    id: 'ship-parts',
    name: 'Ship Parts',
    category: 'ship-supplies',
    basePrice: 1200,
    volatility: 0.15,
    description: 'Spacecraft replacement parts',
    unit: 'part'
  },
  {
    id: 'fuel-cells',
    name: 'Fuel Cells',
    category: 'ship-supplies',
    basePrice: 800,
    volatility: 0.18,
    description: 'Spacecraft fuel supplies',
    unit: 'cell'
  },
  {
    id: 'repair-drones',
    name: 'Repair Drones',
    category: 'ship-supplies',
    basePrice: 1500,
    volatility: 0.20,
    description: 'Automated repair units',
    unit: 'drone'
  }
];