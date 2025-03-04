import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package } from 'lucide-react';

export const Inventory: React.FC = () => {
  const inventory = useGameStore((state) => state.inventory);

  return (
    <div className="h-full">
      <div className="py-4">
        <h2 className="text-xl font-bold text-slate-800">Inventory</h2>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Item</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Type</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800">{item.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{item.type}</td>
                <td className="px-4 py-3 text-sm text-slate-800 text-right">{item.quantity}</td>
              </tr>
            ))}
            {inventory.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No items in cargo hold</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};