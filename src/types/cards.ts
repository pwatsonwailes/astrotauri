export type CardType = 'skill' | 'special' | 'event';
export type EffectType = 'credits' | 'condition' | 'reputation' | 'stress' | 'draw' | 'energy';
export type CardRarity = 'basic' | 'special';
export type SkillType = 'negotiation' | 'observation' | 'improvisation' | 'fitness' | 'knowledge' | 'stamina';

export interface CardEffect {
  type: EffectType;
  value: number;
  chance?: number;
  duration?: number;
  factionId?: string;
}

export interface CardCost {
  energy: number;
  credits?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  skillType?: SkillType;
  rarity: CardRarity;
  description: string;
  flavor: string;
  cost: CardCost;
  effects: CardEffect[];
  level?: number;
}