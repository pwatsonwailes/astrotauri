import { Card, SkillType } from './cards';

export type TaskDifficulty = 1 | 2 | 3 | 4 | 5;

export interface TaskBonus {
  skillType: SkillType;
  effects: {
    type: 'credits' | 'condition' | 'stress' | 'energy';
    value: number;
  }[];
}

export interface TaskComplication {
  description: string;
  effects: {
    type: 'credits' | 'condition' | 'stress' | 'energy';
    value: number;
  }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  applicableSkills: SkillType[];
  bonuses: TaskBonus[];
  complication?: TaskComplication;
}