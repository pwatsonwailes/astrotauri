import React from 'react';
import { getExperienceProgress, SkillProgress } from '../../engine/skills/progression';

interface SkillProgressBarProps {
  progress: SkillProgress;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({ progress }) => {
  const progressPercent = getExperienceProgress(progress);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Level {progress.level}</span>
        <span>{progress.experience} / {progress.experienceRequired} XP</span>
      </div>
      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};