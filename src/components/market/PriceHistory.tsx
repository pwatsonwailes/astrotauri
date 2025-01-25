import React from 'react';
import { PriceHistoryEntry } from '../../types/market';

interface PriceHistoryProps {
  history: PriceHistoryEntry[];
  basePrice: number;
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({ history, basePrice }) => {
  const lastTwentyPrices = history.slice(-20);
  
  return (
    <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden">
      <table className="w-full text-base border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-gray-800">Date</th>
            <th className="py-2 px-4 text-right text-gray-800">Price</th>
            <th className="py-2 px-4 text-right text-gray-800">Change</th>
          </tr>
        </thead>
        <tbody>
          {lastTwentyPrices.slice().reverse().map((entry, index, arr) => {
            const nextEntry = arr[index + 1];
            const change = nextEntry 
              ? ((entry.price - nextEntry.price) / nextEntry.price) * 100 
              : 0;
            
            return (
              <tr key={entry.turn} className="border-t border-gray-300">
                <td className="py-2 px-4 text-gray-700">Date {entry.turn}</td>
                <td className="py-2 px-4 text-right text-gray-700">
                  {entry.price.toLocaleString()} cr
                </td>
                <td className={`py-2 px-4 text-right ${
                  index === arr.length - 1 ? 'text-gray-400' :
                  change > 0 ? 'text-sky-400' : 
                  change < 0 ? 'text-red-400' : 
                  'text-gray-400'
                }`}>
                  {index === arr.length - 1 ? (
                    '—'
                  ) : (
                    `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};