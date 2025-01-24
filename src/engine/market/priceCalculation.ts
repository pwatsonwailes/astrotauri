import { Commodity } from '../../types/market';

// Constants for price calculation
const BASE_VOLATILITY = 0.15; // Base 2% volatility per turn
const MEAN_REVERSION_STRENGTH = 0.15; // How strongly prices tend toward mean
const MAX_DEVIATION = 0.5; // Maximum 50% deviation from base price
const VOLATILITY_SCALING = 2; // How much volatility increases near mean

export const calculateNewPrice = (
  commodity: Commodity,
  currentPrice: number,
  turn: number
): number => {
  // Calculate current deviation from base price as a percentage
  const deviation = (currentPrice - commodity.basePrice) / commodity.basePrice;
  
  // Scale volatility based on proximity to mean
  // Volatility increases as price gets closer to base price
  const distanceFromMean = Math.abs(deviation) / MAX_DEVIATION;
  const scaledVolatility = commodity.volatility * (
    1 + (VOLATILITY_SCALING * (1 - distanceFromMean))
  );
  
  // Calculate mean reversion force
  // Stronger pull back to mean when far from base price
  const meanReversionForce = -deviation * MEAN_REVERSION_STRENGTH * (
    1 + Math.pow(Math.abs(deviation) / MAX_DEVIATION, 2)
  );
  
  // Random walk component with scaled volatility
  const randomWalk = (Math.random() * 2 - 1) * scaledVolatility * BASE_VOLATILITY;
  
  // Combine forces
  const totalPriceChange = (meanReversionForce + randomWalk) * commodity.basePrice;
  
  // Calculate new price with limits
  const newPrice = Math.max(
    commodity.basePrice * (1 - MAX_DEVIATION),
    Math.min(
      commodity.basePrice * (1 + MAX_DEVIATION),
      currentPrice + totalPriceChange
    )
  );
  
  // Round to nearest whole number
  return Math.round(newPrice);
};