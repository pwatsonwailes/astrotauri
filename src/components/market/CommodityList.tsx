import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { Commodity, MarketPrice } from '../../types/market';
import { calculateTrend } from '../../utils/market/trends';

interface CommodityListProps {
  commodities: Commodity[];
  prices: MarketPrice[];
  onSelect: (commodity: Commodity) => void;
  selectedCommodityId?: string;
}

type SortField = 'name' | 'price' | 'change';
type SortDirection = 'asc' | 'desc';

export const CommodityList: React.FC<CommodityListProps> = ({
  commodities,
  prices,
  onSelect,
  selectedCommodityId
}) => {
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCommodities = React.useMemo(() => {
    return [...commodities].sort((a, b) => {
      const priceA = prices.find(p => p.commodityId === a.id);
      const priceB = prices.find(p => p.commodityId === b.id);
      
      if (!priceA || !priceB) return 0;

      const trendA = calculateTrend(priceA.history);
      const trendB = calculateTrend(priceB.history);

      const multiplier = sortDirection === 'asc' ? 1 : -1;

      switch (sortField) {
        case 'name':
          return multiplier * a.name.localeCompare(b.name);
        case 'price':
          return multiplier * (priceA.currentPrice - priceB.currentPrice);
        case 'change':
          return multiplier * (trendA - trendB);
        default:
          return 0;
      }
    });
  }, [commodities, prices, sortField, sortDirection]);

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center p-4 gap-1 text-white hover:text-amber-600 transition-colors"
    >
      {label}
      <ArrowUpDown className={`w-4 h-4 ${sortField === field ? 'text-amber-600' : 'text-white'}`} />
    </button>
  );

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 gap-4 p-4 font-medium text-gray-300">
        <SortButton field="name" label="Commodity" />
        <SortButton field="price" label="Price" />
        <SortButton field="change" label="Trend" />
      </div>

      <div className="divide-y divide-gray-700">
        {sortedCommodities.map(commodity => {
          const price = prices.find(p => p.commodityId === commodity.id);
          if (!price) return null;

          const trend = calculateTrend(price.history);

          return (
            <button
              key={commodity.id}
              onClick={() => onSelect(commodity)}
              className={`
                w-full grid grid-cols-3 gap-4 p-4 text-left transition-colors
                ${selectedCommodityId === commodity.id
                  ? 'bg-amber-600'
                  : 'hover:bg-gray-700'
                }
              `}
            >
              <div className='p-4'>
                <div className="font-medium text-white">{commodity.name}</div>
                <div className="text-base text-gray-400">{commodity.unit}</div>
              </div>

              <div className="text-white p-4">
                {price.currentPrice.toLocaleString()} cr
              </div>

              <div className={`flex items-center gap-1 p-4
                ${trend > 0 ? 'text-green-400' : 'text-red-400'}
              `}>
                {trend > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(trend * 100).toFixed(1)}%
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};