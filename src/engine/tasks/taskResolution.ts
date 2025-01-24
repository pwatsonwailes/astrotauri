import { Task } from '../../types/tasks';
import { GameState } from '../../types/game';
import { calculateExperienceGain, addExperience } from '../skills/progression';

interface TaskResult {
  success: boolean;
  effects: {
    type: string;
    value: number;
  }[];
  message: string;
  experienceGained?: number;
  skillType?: string;
}

export const resolveTask = (
  task: Task, 
  skillType: string,
  gameState: GameState
): TaskResult => {
  const skillProgress = gameState.skills[skillType];
  
  // Check if skill meets difficulty requirement
  const meetsRequirement = skillProgress.level >= task.difficulty;
  
  // Handle improvisation differently
  if (skillType === 'improvisation') {
    const complicationRoll = Math.random();
    if (complicationRoll < 0.4 && task.complication) {
      return {
        success: true,
        effects: task.complication.effects,
        message: `Task completed with complications: ${task.complication.description}`,
        experienceGained: 0
      };
    }
  }

  // If skill doesn't meet requirement
  if (!meetsRequirement) {
    return {
      success: false,
      effects: [{ type: 'stress', value: 1 }],
      message: 'Skill level too low for task',
      experienceGained: 0
    };
  }

  // Calculate experience gain
  const experienceGained = calculateExperienceGain(
    skillProgress.level,
    task.difficulty
  );

  // Find applicable bonus
  const bonus = task.bonuses.find(b => b.skillType === skillType);
  
  return {
    success: true,
    effects: bonus?.effects || [],
    message: bonus 
      ? `Task completed successfully with ${skillType} bonus!`
      : 'Task completed successfully',
    experienceGained,
    skillType
  };
};