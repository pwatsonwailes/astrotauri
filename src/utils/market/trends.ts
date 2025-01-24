import { PriceHistoryEntry } from '../../types/market';

export const calculateTrend = (history: PriceHistoryEntry[]): number => {
  // Get the last 10 entries or all if less than 10
  const recentHistory = history.slice(-10);
  if (recentHistory.length < 2) return 0;

  const oldestPrice = recentHistory[0].price;
  const newestPrice = recentHistory[recentHistory.length - 1].price;

  // Calculate percentage change
  // A positive number means price went up
  // A negative number means price went down
  return (oldestPrice - newestPrice) / oldestPrice * -1;
};