import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package, Info, Trash2 } from 'lucide-react';

export const Inventory: React.FC = () => {
  const inventory = useGameStore((state) => state.inventory);
  const removeInventoryItem = useGameStore((state) => state.removeInventoryItem);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const groupedItems = inventory.reduce((acc, item) => {
    const existing = acc.find(i => i.type === item.type);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ type: item.type, items: [item] });
    }
    return acc;
  }, [] as { type: string; items: typeof inventory }[]);

  return (
    <div className="space-y-4">
      {groupedItems.map(group => (
        <div key={group.type} className="space-y-2">
          <h3 className="text-base font-medium text-slate-700 capitalize">{group.type}s</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {group.items.map(item => (
              <div
                key={item.id}
                className={`bg-slate-50 rounded-lg p-3 cursor-pointer transition-colors border
                  ${selectedItem === item.id 
                    ? 'border-orange-300 ring-1 ring-orange-300' 
                    : 'border-slate-200 hover:border-orange-200'}`}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    <span className="font-medium text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    x{item.quantity}
                  </span>
                </div>
                
                {selectedItem === item.id && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeInventoryItem(item.id, 1);
                        }}
                        className="text-xs px-2 py-1 flex items-center space-x-1 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Discard</span>
                      </button>
                      <button
                        className="text-xs px-2 py-1 flex items-center space-x-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                      >
                        <Info className="w-3 h-3" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {inventory.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
          <p>Your inventory is empty</p>
          <p className="text-sm mt-2">Complete missions to acquire items</p>
        </div>
      )}
    </div>
  );
};