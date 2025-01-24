// Experience required for each level, using an exponential curve
const LEVEL_REQUIREMENTS = [
  0,      // Level 1
  100,    // Level 2
  300,    // Level 3
  700,    // Level 4
  1500,   // Level 5
  3000,   // Level 6
  6000    // Level 7
];

export interface SkillProgress {
  level: number;
  experience: number;
  experienceRequired: number;
}

export const calculateExperienceGain = (skillLevel: number, taskDifficulty: number): number => {
  // Base XP is task difficulty * 20
  const baseXP = taskDifficulty * 20;
  
  // Bonus XP for using skill at or below its level
  const levelDelta = skillLevel - taskDifficulty;
  const levelMultiplier = levelDelta <= 0 ? 1 : 0.5;
  
  return Math.floor(baseXP * levelMultiplier);
};

export const addExperience = (
  currentProgress: SkillProgress, 
  experienceGain: number
): SkillProgress => {
  if (currentProgress.level === 7) return currentProgress;

  const newExperience = currentProgress.experience + experienceGain;
  
  // Check if we've reached next level
  const nextLevelRequirement = LEVEL_REQUIREMENTS[currentProgress.level];
  if (nextLevelRequirement && newExperience >= nextLevelRequirement) {
    // Level up
    return {
      level: currentProgress.level + 1,
      experience: newExperience - nextLevelRequirement,
      experienceRequired: LEVEL_REQUIREMENTS[currentProgress.level + 1] || Infinity
    };
  }

  // Just update experience
  return {
    ...currentProgress,
    experience: newExperience
  };
};

export const getExperienceProgress = (progress: SkillProgress): number => {
  const { experience, experienceRequired } = progress;
  return Math.min((experience / experienceRequired) * 100, 100);
};