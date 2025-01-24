import { MarketState, MarketPrice, Commodity, PriceHistoryEntry } from '../../types/market';
import { calculateNewPrice } from './priceCalculation';

const generateHistoricalPrices = (
  commodity: Commodity,
  numTurns: number = 20
): PriceHistoryEntry[] => {
  const history: PriceHistoryEntry[] = [];
  let currentPrice = commodity.basePrice;
  const now = Date.now();
  
  // Generate prices for past turns
  for (let turn = -numTurns; turn <= 0; turn++) {
    currentPrice = calculateNewPrice(commodity, currentPrice, turn);
    history.push({
      price: currentPrice,
      turn,
      timestamp: now + (turn * 60000) // Simulate past timestamps
    });
  }
  
  return history;
};

export const initializeMarketState = (commodities: Commodity[]): MarketState => {
  const prices = commodities.map(commodity => {
    const history = generateHistoricalPrices(commodity);
    const currentPrice = history[history.length - 1].price;
    const previousPrice = history[history.length - 2].price;
    const trend = (currentPrice - previousPrice) / previousPrice;

    return {
      commodityId: commodity.id,
      currentPrice,
      trend,
      lastUpdate: Date.now(),
      history
    };
  });

  return {
    prices,
    globalModifier: 1.0
  };
};

export const updateMarketState = (
  state: MarketState | null,
  commodities: Commodity[],
  turn: number
): MarketState => {
  if (!state?.prices) return initializeMarketState(commodities);

  const newPrices = state.prices.map(price => {
    const commodity = commodities.find(c => c.id === price.commodityId);
    if (!commodity) return price;

    const newPrice = calculateNewPrice(commodity, price.currentPrice, turn);
    const trend = (newPrice - price.currentPrice) / price.currentPrice;
    const timestamp = Date.now();

    // Add new price to history
    const newHistory: PriceHistoryEntry[] = [
      ...price.history,
      { price: newPrice, turn, timestamp }
    ].slice(-50); // Keep last 50 entries

    return {
      ...price,
      currentPrice: newPrice,
      trend,
      lastUpdate: timestamp,
      history: newHistory
    };
  });

  return {
    ...state,
    prices: newPrices
  };
};