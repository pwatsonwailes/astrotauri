import { MarketState } from '../../types/market';
import { GameEvent } from '../../types/events';

const SIGNIFICANT_PRICE_CHANGE = 0.05; // 5% change threshold

export const generateMarketEvents = (
  oldState: MarketState,
  newState: MarketState
): GameEvent[] => {
  const events: GameEvent[] = [];

  newState.prices.forEach(newPrice => {
    const oldPrice = oldState.prices.find(p => p.commodityId === newPrice.commodityId);
    if (!oldPrice) return;

    const priceChange = (newPrice.currentPrice - oldPrice.currentPrice) / oldPrice.currentPrice;

    if (Math.abs(priceChange) >= SIGNIFICANT_PRICE_CHANGE) {
      events.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'market',
        message: `${newPrice.commodityId} price ${priceChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(Math.round(priceChange * 100))}%`,
        timestamp: Date.now(),
        details: {
          commodityId: newPrice.commodityId,
          oldPrice: oldPrice.currentPrice,
          newPrice: newPrice.currentPrice,
          change: priceChange
        }
      });
    }
  });

  return events;
};