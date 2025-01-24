import React from 'react';
import { Search } from 'lucide-react';
import { CommodityCategory } from '../../types/market';

const CATEGORIES: { id: CommodityCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'raw-materials', label: 'Raw Materials' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'consumer', label: 'Consumer Goods' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'services', label: 'Services' },
  { id: 'research', label: 'Research' },
  { id: 'ship-supplies', label: 'Ship Supplies' }
];

interface MarketFiltersProps {
  selectedCategory: CommodityCategory | 'all';
  onCategoryChange: (category: CommodityCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MarketFilters: React.FC<MarketFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search commodities..."
          className="w-11/12 pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-3 py-1 rounded-full text-base
              ${selectedCategory === category.id
                ? 'bg-amber-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};