import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Commodity, MarketPrice } from '../../types/market';
import { PriceHistory } from './PriceHistory';

interface MarketTrendsProps {
  commodity: Commodity;
  price: MarketPrice | undefined;
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({
  commodity,
  price
}) => {
  if (!price) return null;

  const volatilityLevel = 
    commodity.volatility <= 0.1 ? 'Low' :
    commodity.volatility <= 0.2 ? 'Medium' :
    'High';

  const volatilityColor =
    commodity.volatility <= 0.1 ? 'text-sky-400' :
    commodity.volatility <= 0.2 ? 'text-amber-600' :
    'text-red-400';

  return (
    <div className="promontory rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-medium text-black">Market Analysis</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-gray-400">Trend</div>
          <div className={`flex items-center gap-1
            ${price.trend > 0 ? 'text-sky-400' : 'text-red-400'}
          `}>
            {price.trend > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(price.trend * 100).toFixed(1)}%
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-400">Volatility</div>
          <div className={`flex items-center gap-1 ${volatilityColor}`}>
            <AlertTriangle className="w-4 h-4" />
            {volatilityLevel}
          </div>
        </div>
      </div>

      <PriceHistory 
        history={price.history || []} 
        basePrice={commodity.basePrice}
      />
    </div>
  );
};