import React from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

export const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  const maxLevel = 7;
  const bars = Array.from({ length: maxLevel }, (_, i) => i < level);

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="w-8 text-black">{icon}</div>
      <span className="basis-1/5 text-sm font-medium text-gray-500 capitalize">
        {name}
      </span>
      <div className="flex gap-1 w-full">
        {bars.map((filled, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              filled ? 'bg-sky-400' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};