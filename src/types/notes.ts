import { StoryId } from './story';

export type NoteCategory = 
  | 'main_story'    // Main story progression
  | 'character'     // Character-specific notes
  | 'lore'          // World building and background
  | 'mission'       // Mission-specific notes
  | 'decision'      // Important player choices
  | 'investigation' // Investigation threads
  | 'journal';      // Personal reflections

export type NoteStatus = 
  | 'locked'      // Not yet available
  | 'available'   // Can be viewed
  | 'active'      // Currently relevant
  | 'completed'   // Resolved/finished
  | 'archived';   // No longer relevant but kept for history

export interface NoteRequirement {
  type: 'story' | 'note' | 'choice';
  id: string;
  condition?: 'completed' | 'active' | 'available';
}

export interface NoteAction {
  type: 'unlock_note' | 'trigger_story' | 'update_status';
  target: string;
  data?: any;
}

export interface Note {
  id: string;
  category: NoteCategory;
  title: string;
  content: string;
  status: NoteStatus;
  timestamp: number;
  requirements: NoteRequirement[];
  actions: NoteAction[];
  relatedNotes?: string[];
  relatedCharacters?: string[];
  relatedLocations?: string[];
  metadata?: {
    icon?: string;
    importance?: 'low' | 'medium' | 'high' | 'critical';
    expiresAfter?: StoryId; // Note becomes archived after this story
    sequence?: number; // For ordering within a category
  };
}

export interface NoteCollection {
  id: string;
  title: string;
  description: string;
  category: NoteCategory;
  notes: Note[];
  isSequential?: boolean; // Whether notes should be revealed in order
  autoArchive?: boolean; // Whether completed notes should auto-archive
}