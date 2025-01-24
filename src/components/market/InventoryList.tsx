import React from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import { InventoryItem } from '../../types/inventory';
import { Commodity, MarketPrice } from '../../types/market';

interface InventoryListProps {
  items: InventoryItem[];
  commodities: Commodity[];
  currentPrices: MarketPrice[];
  onSelect: (commodity: Commodity) => void;
  selectedCommodityId?: string;
}

export const InventoryList: React.FC<InventoryListProps> = ({
  items,
  commodities,
  currentPrices,
  onSelect,
  selectedCommodityId
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        <Package className="w-8 h-8 mx-auto mb-2" />
        <p>No commodities in inventory</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 font-medium text-gray-300">
        <div>Commodity</div>
        <div>Amount</div>
        <div>Bought At</div>
        <div>Current</div>
      </div>

      <div className="divide-y divide-gray-700">
        {items.map(item => {
          const commodity = commodities.find(c => c.id === item.commodityId);
          const currentPrice = currentPrices.find(p => p.commodityId === item.commodityId);
          if (!commodity || !currentPrice) return null;

          const profitPerUnit = currentPrice.currentPrice - item.purchasePrice;
          const totalProfit = profitPerUnit * item.amount;

          return (
            <button
              key={item.commodityId}
              onClick={() => onSelect(commodity)}
              className={`
                w-full grid grid-cols-4 gap-4 p-4 text-left transition-colors rounded-lg mb-4
                ${selectedCommodityId === item.commodityId
                  ? 'bg-slate-800'
                  : 'bg-gray-800 hover:bg-gray-600'
                }
              `}
            >
              <div className="font-medium text-white">{commodity.name}</div>
              
              <div className="text-white">{item.amount}</div>
              
              <div className="text-gray-400">{item.purchasePrice} cr</div>
              
              <div className="flex items-center gap-2">
                {profitPerUnit > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={profitPerUnit > 0 ? 'text-green-400' : 'text-red-400'}>
                  {currentPrice.currentPrice} cr
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};