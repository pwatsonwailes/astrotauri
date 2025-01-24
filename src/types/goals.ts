export type GoalStatus = 'available' | 'active' | 'completed' | 'failed' | 'hidden' | 'archived';
export type GoalType = 'parentGoal' | 'subGoal';
export type GoalSource = 'story' | 'location' | 'character' | 'faction';

export interface GoalProgress {
  creditsInvested: number;
  energyInvested: number;
  turnsRemaining: number;
  completionTimer: number;
}

export interface GoalRequirement {
  type: 'credits' | 'energy';
  amount: number;
}

export interface Goal {
  id: string;
  factionId?: string;
  title: string;
  description: string;
  type: GoalType;
  source: GoalSource;
  repeatable?: boolean;
  requirements: GoalRequirement[];
  rewards?: {
    credits?: number;
    condition: number;
    reputation?: number;
    cards?: string[];
  };
  timeLimit: number;
  turnsToComplete?: number;
  status: GoalStatus;
  progress: GoalProgress;
}