import React, { useState } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { Commodity, MarketPrice } from '../../types/market';
import { useTranslation } from '../../hooks/useTranslation';

interface TradingPanelProps {
  commodity: Commodity | null;
  price: MarketPrice | undefined;
  credits: number;
  onTrade: (commodityId: string, amount: number, isBuy: boolean) => void;
}

export const TradingPanel: React.FC<TradingPanelProps> = ({
  commodity,
  price,
  credits,
  onTrade
}) => {
  const [amount, setAmount] = useState(1);
  const { t } = useTranslation();

  if (!commodity || !price) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        Select a commodity to trade
      </div>
    );
  }

  const total = amount * price.currentPrice;
  const canBuy = credits >= total;

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{commodity.name}</h3>
        <p className="text-gray-400">{commodity.description}</p>
      </div>

      <div className="flex justify-between text-white">
        <div>{t.market.price}:</div>
        <div>{price.currentPrice.toLocaleString()} cr/{commodity.unit}</div>
      </div>

      <div className="space-y-2">
        <label className="block text-base text-gray-400">{t.market.amount}</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
          className="w-11/12 bg-gray-700 rounded px-3 py-2 text-white"
        />
      </div>

      <div className="flex justify-between text-white">
        <div>{t.market.total}:</div>
        <div>{total.toLocaleString()} cr</div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => onTrade(commodity.id, amount, false)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
        >
          <CreditCard className="w-4 h-4" />
          {t.market.sell}
        </button>

        <button
          onClick={() => onTrade(commodity.id, amount, true)}
          disabled={!canBuy}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-lg
            ${canBuy
              ? 'bg-green-600 hover:text-white'
              : 'bg-gray-700 cursor-not-allowed'
            }
          `}
        >
          <ShoppingCart className="w-4 h-4" />
          {t.market.buy}
        </button>
      </div>
    </div>
  );
};