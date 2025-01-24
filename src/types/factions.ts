export interface Faction {
    id: string;
    name: string;
    description: string;
    reputation: number;
    traits: FactionTrait[];
    relationships: Record<string, number>; // Other faction IDs and their relationship values
  }
  
  export interface FactionTrait {
    id: string;
    name: string;
    description: string;
    effect: FactionEffect;
  }
  
  export interface FactionEffect {
    type: 'market' | 'reputation' | 'resource' | 'combat';
    modifier: number;
  }
  
  export type ReputationLevel = 'hostile' | 'unfriendly' | 'neutral' | 'friendly' | 'allied';
  
  export interface ReputationThreshold {
    level: ReputationLevel;
    min: number;
    max: number;
  }