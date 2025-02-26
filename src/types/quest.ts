import { Resources } from './game';

export type RiskLevel = 'low' | 'medium' | 'high';
export type QuestStatus = 'active' | 'completed' | 'failed';
export type QuestType = 'technical' | 'diplomatic' | 'combat' | 'strategic' | 'general';

export type QuestDialogue = {
  neutral: string;
  positive: string;
  negative: string;
};

export type QuestInteractionOption = {
  id: string;
  text: string;
  bonus: number;
  type: 'resource' | 'time' | 'item' | 'aggressive' | 'diplomatic' | 'cautious';
  cost?: number;
  extraTurn?: number;
  requiredItem?: string;
};

export type QuestInteraction = {
  turn: number;
  prompt: string;
  options: QuestInteractionOption[];
};

export type QuestRewards = {
  resources: Partial<Resources>;
  narrative: string;
  items?: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    quantity: number;
  }>;
};

export type Quest = {
  id: string;
  name: string;
  description: string;
  duration: number;
  riskLevel: RiskLevel;
  type: QuestType;
  investmentCost: Partial<Resources>;
  requirements: Partial<Resources>;
  rewards: QuestRewards;
  turnDialogues: Record<number, QuestDialogue>;
  turnInteractions: Record<number, QuestInteraction>;
  narrativeOutcomes: {
    success: string;
    failure: string;
  };
  currentTurn: number;
  progress: number;
  cumulativeScore: number;
  status: QuestStatus;
};