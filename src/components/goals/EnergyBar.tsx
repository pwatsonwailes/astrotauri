import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface EnergyBarProps {
  invested: number;
  required: number;
  maxInvestment: number;
  onInvest: (amount: number) => void;
}

export const EnergyBar: React.FC<EnergyBarProps> = ({
  invested,
  required,
  maxInvestment,
  onInvest
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [rows, setRows] = useState<[]>([]);

  useEffect(() => {
    const segments = Array.from({ length: required }, (_, i) => {
      return {
        filled: i < invested,
        available: i < invested + maxInvestment,
        highlighted: i >= invested && hoverIndex !== null && i <= hoverIndex && i < invested + maxInvestment
      }
    });

    // Split segments into rows of 6
    const newRows = segments.reduce((acc, segment, index) => {
      const rowIndex = Math.floor(index / 6);
      if (!acc[rowIndex]) {
        acc[rowIndex] = [];
      }
      acc[rowIndex].push({ ...segment, index });
      return acc;
    }, [] as (typeof segments[0] & { index: number })[]);

    setRows(newRows)
  }, [ hoverIndex ])

  const handleSegmentClick = (index: number) => {
    const amount = index - invested + 1;
    if (amount > 0 && index < invested + maxInvestment) {
      onInvest(amount);
    }
  };

  return (
    <div className="space-y-2 flex w-full gap-2">
      <Zap className="w-4 h-4 text-blue-400" />

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-grow gap-1 align-center">
          {row.map((segment) => (
            <button
              key={segment.index}
              onClick={() => handleSegmentClick(segment.index)}
              onMouseEnter={() => setHoverIndex(segment.index)}
              onMouseLeave={() => setHoverIndex(null)}
              disabled={!segment.available || segment.filled}
              className={`
                energyButton h-2 flex-1 rounded-full transition-colors
                ${segment.filled || segment.highlighted
                  ? 'bg-amber-600' 
                  : segment.available 
                    ? 'bg-gray-700 hover:bg-sky-400' 
                    : 'bg-gray-700 cursor-not-allowed'
                }
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
};