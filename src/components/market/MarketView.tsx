import React, { useState } from 'react';
import { CommodityList } from './CommodityList';
import { MarketFilters } from './MarketFilters';
import { TradingPanel } from './TradingPanel';
import { MarketTrends } from './MarketTrends';
import { InventoryList } from './InventoryList';
import { Commodity, MarketPrice, CommodityCategory } from '../../types/market';
import { InventoryItem } from '../../types/inventory';

interface MarketViewProps {
  commodities: Commodity[];
  prices: MarketPrice[];
  inventory: InventoryItem[];
  credits: number;
  onTrade: (commodityId: string, amount: number, isBuy: boolean) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  commodities,
  prices,
  inventory = [], // Provide default empty array
  credits,
  onTrade
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory | 'all'>('all');
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'market' | 'inventory'>('market');

  const filteredCommodities = commodities.filter(commodity => 
    (selectedCategory === 'all' || commodity.category === selectedCategory) &&
    commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex gap-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 -mb-px ${
              activeTab === 'market'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 -mb-px ${
              activeTab === 'inventory'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Inventory
          </button>
        </div>

        {activeTab === 'market' ? (
          <>
            <MarketFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <CommodityList
              commodities={filteredCommodities}
              prices={prices}
              onSelect={setSelectedCommodity}
              selectedCommodityId={selectedCommodity?.id}
            />
          </>
        ) : (
          <InventoryList
            items={inventory}
            commodities={commodities}
            currentPrices={prices}
            onSelect={setSelectedCommodity}
            selectedCommodityId={selectedCommodity?.id}
            onSell={(commodityId, amount) => onTrade(commodityId, amount, false)}
          />
        )}
      </div>

      <div className="space-y-6">
        <TradingPanel
          commodity={selectedCommodity}
          price={prices.find(p => p.commodityId === selectedCommodity?.id)}
          credits={credits}
          onTrade={onTrade}
        />
        
        {selectedCommodity && (
          <MarketTrends
            commodity={selectedCommodity}
            price={prices.find(p => p.commodityId === selectedCommodity.id)}
          />
        )}
      </div>
    </div>
  );
};