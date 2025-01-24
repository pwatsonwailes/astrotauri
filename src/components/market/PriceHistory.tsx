import React from 'react';
import { PriceHistoryEntry } from '../../types/market';

interface PriceHistoryProps {
  history: PriceHistoryEntry[];
  basePrice: number;
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({ history, basePrice }) => {
  const lastTwentyPrices = history.slice(-20);
  
  return (
    <div className="mt-4">
      <h4 className="text-base font-medium text-gray-400 mb-2">Price History</h4>
      
      {/* Price table */}
      <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 text-left text-gray-400">Turn</th>
              <th className="py-2 px-4 text-right text-gray-400">Price</th>
              <th className="py-2 px-4 text-right text-gray-400">Change</th>
            </tr>
          </thead>
          <tbody>
            {lastTwentyPrices.slice().reverse().map((entry, index, arr) => {
              const nextEntry = arr[index + 1];
              const change = nextEntry 
                ? ((entry.price - nextEntry.price) / nextEntry.price) * 100 
                : 0;
              
              return (
                <tr key={entry.turn} className="border-t border-gray-800">
                  <td className="py-2 px-4 text-gray-300">Turn {entry.turn}</td>
                  <td className="py-2 px-4 text-right text-gray-300">
                    {entry.price.toLocaleString()} cr
                  </td>
                  <td className={`py-2 px-4 text-right ${
                    index === arr.length - 1 ? 'text-gray-400' :
                    change > 0 ? 'text-green-400' : 
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
    </div>
  );
};