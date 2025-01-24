import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { MarketState } from '../types/market';
import { commodities } from '../data/market/commodities';
import { initializeMarketState, updateMarketState } from '../engine/market/marketState';

interface MarketStore extends MarketState {
  initialize: () => void;
  updatePrices: (turn: number) => void;
  updateGlobalModifier: (modifier: number) => void;
}

export const useMarketStore = create<MarketStore>()(
  devtools(
    persist(
      (set) => ({
        ...initializeMarketState(commodities),

        initialize: () => {
          set(initializeMarketState(commodities));
        },

        updatePrices: (turn) => {
          set(state => updateMarketState(state, commodities, turn));
        },

        updateGlobalModifier: (modifier) => {
          set(state => ({ ...state, globalModifier: modifier }));
        }
      }),
      {
        name: 'market-storage'
      }
    )
  )
);