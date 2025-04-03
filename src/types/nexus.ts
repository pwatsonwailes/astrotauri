export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  isLocked: boolean;
  type: 'choice' | 'narrative' | 'event';
  nextNoteId?: string;
  relatedCharacters?: string[];
  relatedTopics?: string[];
  relatedNotes?: string[];
}

export interface Conclusion {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  belief: number; // 0-100 slider value
  requiredNotes: string[]; // Note IDs required to form this conclusion
  relatedCharacters?: string[];
  relatedTopics?: string[];
}

export interface Character {
  id: string;
  name: string;
  background: string;
  status: string;
  isLocked: boolean;
  history: {
    timestamp: number;
    event: string;
  }[];
  relatedCharacters?: string[];
  relatedTopics?: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  relatedTopics: string[];
  relatedCharacters: string[];
  relatedNotes: string[];
}

export interface GlossaryEntry {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  relatedEntries: string[];
}