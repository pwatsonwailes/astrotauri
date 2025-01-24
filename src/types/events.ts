import { UnlockCondition } from './characters';

export type EventType = 'success' | 'warning' | 'danger' | 'info' | 'market' | 'faction' | 'reputation' | 'story-progress' | 'character-unlock';

// Add new event interfaces
export interface StoryProgressEvent extends GameEvent {
  type: 'story-progress';
  details: {
    chapterId: number;
    nodeId: string;
  };
}

export interface CharacterUnlockEvent extends GameEvent {
  type: 'character-unlock';
  details: {
    characterId: string;
    unlockCondition: UnlockCondition;
  };
}

// Update existing GameEvent interface
export interface GameEvent {
  id: string;
  message: string;
  type: EventType;
  timestamp: number;
  details?: {
    [key: string]: any;
  };
  silent?: boolean; // Add this to allow events that don't show in the UI
  persistent?: boolean; // Add this to mark events that should persist
}

export interface MarketEvent extends GameEvent {
  type: 'market';
  details: {
    resource: string;
    oldPrice: number;
    newPrice: number;
    change: number;
  };
}

export interface TransactionEvent extends GameEvent {
  type: 'transaction';
  details: {
    commodityId: string;
    amount: number;
    price: number;
    total: number;
    isBuy: boolean;
  };
}

export interface FactionEvent extends GameEvent {
  type: 'faction';
  details: {
    factionId: string;
    eventType: 'deal' | 'conflict' | 'opportunity' | 'warning';
    reputationChange?: number;
    creditsChange?: number;
    stressChange?: number;
  };
}

export interface ReputationEvent extends GameEvent {
  type: 'reputation';
  details: {
    factionId: string;
    oldReputation: number;
    newReputation: number;
    change: number;
    relatedChanges?: Array<{
      factionId: string;
      change: number;
    }>;
  };
}