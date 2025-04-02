import { Node, Edge } from 'reactflow';

export type NexusNodeType = 'story' | 'clue' | 'conclusion' | 'interlude';

export interface NexusNode extends Node {
  type: NexusNodeType;
  data: {
    label: string;
    content: string;
    isLocked: boolean;
    isCompleted: boolean;
    allowedConnections?: string[]; // IDs of nodes this can connect to
  };
}

export interface NexusEdge extends Edge {
  data?: {
    type: 'deduction' | 'story';
  };
}

export interface Character {
  id: string;
  name: string;
  background: string;
  status: string;
  history: {
    timestamp: number;
    event: string;
  }[];
}

export interface GlossaryEntry {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  relatedEntries: string[];
}