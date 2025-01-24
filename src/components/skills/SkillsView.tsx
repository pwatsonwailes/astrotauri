import React from 'react';
import { SkillCard } from './SkillCard';
import { skillCards } from '../../data/cards/skills';

export const SkillsView: React.FC = () => {
  return (
    <div className="distancedTop">
      <h2 className="text-xl font-semibold text-white">Skills</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {skillCards.map(card => (
          <SkillCard 
            key={card.id}
            skillType={card.skillType}
            name={card.name}
            description={card.description}
            flavor={card.flavor}
          />
        ))}
      </div>
    </div>
  );
};