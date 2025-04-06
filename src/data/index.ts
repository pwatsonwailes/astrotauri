import { allNotes } from './notes';
import { characters } from './characters';
import { allTopics } from './topics';
import { allHypotheses } from './hypotheses';
import type { DossierCharacter } from './characters';

// Aggregate all static game data
export const gameData = {
  notes: allNotes,
  characters: characters,
  topics: allTopics,
  hypotheses: allHypotheses,
};

// Re-export types
export type { Note } from '../types/notes';
export type { DossierCharacter };
export type { Topic } from './topics';
export type { HypothesisData } from './hypotheses'; 