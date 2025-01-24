import { Commodity } from './market';

export type CommodityCategory = 
  | 'raw-materials'
  | 'industrial'
  | 'consumer'
  | 'essentials'
  | 'technology'
  | 'entertainment'
  | 'black-market'
  | 'services'
  | 'research'
  | 'ship-supplies';

export interface PriceHistoryEntry {
  price: number;
  turn: number;
  timestamp: number;
}

export interface Commodity {
  id: string;
  name: string;
  category: CommodityCategory;
  basePrice: number;
  volatility: number;
  description: string;
  unit: string;
}

export interface MarketPrice {
  commodityId: string;
  currentPrice: number;
  trend: number;
  lastUpdate: number;
  history: PriceHistoryEntry[];
}

export interface MarketState {
  prices: MarketPrice[];
  globalModifier: number;
}