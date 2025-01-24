import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useMarketStore } from '../../stores/useMarketStore';
import { useEventStore } from '../../stores/useEventStore';
import { CommodityList } from '../market/CommodityList';
import { MarketFilters } from '../market/MarketFilters';
import { TradingPanel } from '../market/TradingPanel';
import { MarketTrends } from '../market/MarketTrends';
import { InventoryList } from '../market/InventoryList';
import { commodities } from '../../data/market/commodities';
import { createTransactionEvent, createInsufficientFundsEvent } from '../../utils/market/events';

export const MarketView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory | 'all'>('all');
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'market' | 'inventory'>('market');

  // Game state
  const { credits, inventory } = useGameStore();
  const updateInventory = useGameStore(state => state.updateInventory);
  const updateResources = useGameStore(state => state.updateResources);

  // Market state
  const { prices } = useMarketStore();

  // Events
  const addEvent = useEventStore(state => state.addEvent);

  const filteredCommodities = commodities.filter(commodity => 
    (selectedCategory === 'all' || commodity.category === selectedCategory) &&
    commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrade = (commodityId: string, amount: number, isBuy: boolean) => {
    const commodity = commodities.find(c => c.id === commodityId);
    const price = prices.find(p => p.commodityId === commodityId);
    
    if (!commodity || !price) return;

    const total = price.currentPrice * amount;

    if (isBuy && credits < total) {
      addEvent(createInsufficientFundsEvent(total, credits));
      return;
    }

    // Update credits
    updateResources({
      credits: isBuy ? -total : total
    });

    // Update inventory
    updateInventory({
      commodityId,
      amount,
      price: price.currentPrice,
      isBuy
    });

    addEvent(createTransactionEvent(commodity, amount, price.currentPrice, isBuy));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 distancedTop">
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
            items={inventory?.items || []}
            commodities={commodities}
            currentPrices={prices}
            onSelect={setSelectedCommodity}
            selectedCommodityId={selectedCommodity?.id}
            onSell={(commodityId, amount) => handleTrade(commodityId, amount, false)}
          />
        )}
      </div>

      <div className="space-y-6">
        <TradingPanel
          commodity={selectedCommodity}
          price={prices.find(p => p.commodityId === selectedCommodity?.id)}
          credits={credits}
          onTrade={handleTrade}
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