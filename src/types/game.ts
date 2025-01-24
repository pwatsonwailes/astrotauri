import { Faction } from './factions';
import { Goal } from './goals';
import { PlayerInventory } from './inventory';
import { SkillProgress } from '../engine/skills/progression';
import { ViewType } from '../components/navigation/ViewSelector.tsx';

export interface GameState {
  currentView: ViewType;
  credits: number;
  condition: number;
  factions: Faction[];
  stress: number;
  energyPoints: number;
  turn: number;
  reputation: number;
  goals: Goal[];
  inventory: PlayerInventory;
  skills: Skills;
  currentLocation: {
    type: 'station' | 'ship';
    id: string;
    turnsRemaining?: number; // For transport journeys
    destination?: string; // For transport journeys
  };
}

export interface Skills {
  negotiation: SkillProgress;
  observation: SkillProgress;
  improvisation: SkillProgress;
  fitness: SkillProgress;
  knowledge: SkillProgress;
  stamina: SkillProgress;
}

// Re-export existing types
export * from './cards';
export * from './factions';
export * from './events';
export * from './goals';