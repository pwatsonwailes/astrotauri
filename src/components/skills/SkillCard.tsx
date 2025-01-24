import React from 'react';
import { Brain, Eye, MessageSquare, Activity, BookOpen, Heart } from 'lucide-react';
import { SkillProgress } from '../../engine/skills/progression';
import { SkillProgressBar } from './SkillProgressBar';
import { SkillType } from '../../types/game';
import { useGameStore } from '../../stores/useGameStore';

interface SkillCardProps {
  skillType: SkillType;
  name: string;
  description: string;
  flavor: string;
}

const SkillIcon = ({ type }: { type: SkillType }) => {
  switch (type) {
    case 'negotiation':
      return <MessageSquare className="w-5 h-5 text-blue-400" />;
    case 'observation':
      return <Eye className="w-5 h-5 text-green-400" />;
    case 'improvisation':
      return <Activity className="w-5 h-5 text-amber-600" />;
    case 'knowledge':
      return <BookOpen className="w-5 h-5 text-purple-400" />;
    case 'fitness':
      return <Heart className="w-5 h-5 text-red-400" />;
    case 'stamina':
      return <Brain className="w-5 h-5 text-amber-600" />;
  }
};

export const SkillCard: React.FC<SkillCardProps> = ({ 
  skillType, 
  name, 
  description, 
  flavor 
}) => {
  const skills = useGameStore(state => state.skills);
  const progress = skills[skillType];

  if (!progress) return null;

  return (
    <div className="promontory rounded-lg p-4 space-y-4">
      <div className="flex items-start gap-3">
        <div className="py-1">
          <SkillIcon type={skillType} />
        </div>
        
        <div className="flex-1">
          <h3 className="mt-0 text-lg font-medium text-black">{name}</h3>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      </div>

      <SkillProgressBar progress={progress} />

      <div className="text-base text-gray-800 italic">
        "{flavor}"
      </div>
    </div>
  );
};