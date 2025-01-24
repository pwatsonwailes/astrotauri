export interface CharacterArchetype {
  id: string;
  name: string;
  title: string;
  description: string;
  skills: {
    negotiation: number;
    observation: number;
    improvisation: number;
    fitness: number;
    knowledge: number;
    stamina: number;
  };
}

export const CHARACTER_ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'diplomat',
    name: 'The Diplomat',
    title: 'Corporate Negotiator',
    description: 'A skilled negotiator with extensive experience in corporate dealings. Formerly a corporate liaison specializing in inter-faction negotiations.',
    skills: {
      negotiation: 3,
      observation: 2,
      improvisation: 2,
      fitness: 1,
      knowledge: 2,
      stamina: 1
    }
  },
  {
    id: 'scout',
    name: 'The Scout',
    title: 'Deep Space Explorer',
    description: 'An experienced explorer with keen observation skills. Veteran of numerous deep space expeditions and asteroid mining runs.',
    skills: {
      negotiation: 1,
      observation: 3,
      improvisation: 2,
      fitness: 2,
      knowledge: 1,
      stamina: 2
    }
  },
  {
    id: 'engineer',
    name: 'The Engineer',
    title: 'Technical Specialist',
    description: 'A brilliant problem-solver with deep technical knowledge. Formerly a quantum drive specialist with expertise in experimental tech.',
    skills: {
      negotiation: 1,
      observation: 2,
      improvisation: 2,
      fitness: 1,
      knowledge: 3,
      stamina: 2
    }
  },
  {
    id: 'soldier',
    name: 'The Soldier',
    title: 'Security Specialist',
    description: 'A disciplined fighter with exceptional physical conditioning. Ex-military security specialist with combat experience.',
    skills: {
      negotiation: 1,
      observation: 2,
      improvisation: 1,
      fitness: 3,
      knowledge: 1,
      stamina: 3
    }
  },
  {
    id: 'smuggler',
    name: 'The Smuggler',
    title: 'Independent Trader',
    description: 'A quick-thinking trader who excels at improvisation. The entrepreneur operating in the grey areas of interplanetry law.',
    skills: {
      negotiation: 2,
      observation: 2,
      improvisation: 3,
      fitness: 1,
      knowledge: 1,
      stamina: 2
    }
  },
  {
    id: 'scientist',
    name: 'The Scientist',
    title: 'Research Specialist',
    description: 'A brilliant researcher with extensive academic knowledge. Formerly a quantum physics researcher specializing in experimental tech.',
    skills: {
      negotiation: 1,
      observation: 2,
      improvisation: 1,
      fitness: 1,
      knowledge: 3,
      stamina: 1
    }
  }
];