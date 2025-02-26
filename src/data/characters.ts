import { Character, Background, Alignment } from '../types/game';

const getBaseStats = (background: Background) => {
  switch (background) {
    case 'engineer':
      return {
        technicalExpertise: 8,
        diplomacy: 4,
        riskTolerance: 5,
        leadership: 5,
        strategicIntelligence: 6
      };
    case 'trader':
      return {
        technicalExpertise: 4,
        diplomacy: 8,
        riskTolerance: 4,
        leadership: 6,
        strategicIntelligence: 6
      };
    case 'pilot':
      return {
        technicalExpertise: 6,
        diplomacy: 5,
        riskTolerance: 7,
        leadership: 4,
        strategicIntelligence: 6
      };
    case 'protection':
      return {
        technicalExpertise: 5,
        diplomacy: 4,
        riskTolerance: 7,
        leadership: 7,
        strategicIntelligence: 5
      };
    case 'smuggler':
      return {
        technicalExpertise: 5,
        diplomacy: 6,
        riskTolerance: 8,
        leadership: 4,
        strategicIntelligence: 7
      };
    default:
      return {
        technicalExpertise: 5,
        diplomacy: 5,
        riskTolerance: 5,
        leadership: 5,
        strategicIntelligence: 5
      };
  }
};

export const alignmentModifiers = {
  stoic: {
    resilience: 1.2,
    diplomacy: 1.0,
    risk: 1.0
  },
  noble: {
    resilience: 1.0,
    diplomacy: 1.3,
    risk: 0.9
  },
  ruthless: {
    resilience: 1.0,
    diplomacy: 0.8,
    risk: 1.3
  }
};

export const backgrounds: Record<Background, { name: string; description: string }> = {
  engineer: {
    name: 'Engineer',
    description: 'Skilled at maintaining and improving ship systems'
  },
  trader: {
    name: 'Trader',
    description: 'Expert at negotiation and finding the best deals'
  },
  pilot: {
    name: 'Pilot',
    description: 'Experienced in navigation and ship handling'
  },
  protection: {
    name: 'Protection',
    description: 'Specialized in security and combat operations'
  },
  smuggler: {
    name: 'Smuggler',
    description: 'Adept at finding opportunities others miss'
  }
};

export const alignments: Record<Alignment, { name: string; description: string }> = {
  stoic: {
    name: 'Stoic',
    description: 'Endures all things patiently, maintaining calm even when faced with adversity'
  },
  noble: {
    name: 'Noble',
    description: 'Cares about honor and integrity, and strives to do what is right even at great personal cost'
  },
  ruthless: {
    name: 'Ruthless',
    description: 'Believes that the ends justify the means, willing to make hard choices to secure victory'
  }
};

export const characters: Character[] = [
  {
    id: 'ruthless',
    name: 'Ruthless',
    description: 'The ends justify the means',
    avatar: 'https://images.unsplash.com/photo-1590606915023-fe67c2965e2b?w=400&h=400&fit=crop',
    background: 'smuggler',
    alignment: 'ruthless',
    stats: getBaseStats('smuggler')
  },
  {
    id: 'noble',
    name: 'Noble',
    description: 'Honour and integrity',
    avatar: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop',
    background: 'trader',
    alignment: 'noble',
    stats: getBaseStats('trader')
  },
  {
    id: 'stoic',
    name: 'Stoic',
    description: 'Endures patiently',
    avatar: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=400&h=400&fit=crop',
    background: 'engineer',
    alignment: 'stoic',
    stats: getBaseStats('engineer')
  }
];

export { getBaseStats }