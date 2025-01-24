import { Card } from '../../types/cards';

export const skillCards: Card[] = [
  {
    id: 'skill-negotiation',
    name: 'Negotiation',
    type: 'skill',
    skillType: 'negotiation',
    rarity: 'basic',
    description: 'Solve tasks requiring persuasion, influence, or diplomacy.',
    flavor: 'Words can move mountains, if you know which ones to use.',
    cost: { energy: 1 }
  },
  {
    id: 'skill-observation',
    name: 'Observation',
    type: 'skill',
    skillType: 'observation',
    rarity: 'basic',
    description: 'Gather information, spot details, or assess situations.',
    flavor: 'The devil is in the details, and so are the opportunities.',
    cost: { energy: 1 }
  },
  {
    id: 'skill-improvisation',
    name: 'Improvisation',
    type: 'skill',
    skillType: 'improvisation',
    rarity: 'basic',
    description: 'A versatile fallback for any challenge, but with risks.',
    flavor: 'Sometimes the best plan is no plan at all.',
    cost: { energy: 1 }
  },
  {
    id: 'skill-fitness',
    name: 'Fitness',
    type: 'skill',
    skillType: 'fitness',
    rarity: 'basic',
    description: 'Handle physical tasks requiring endurance, strength, or agility.',
    flavor: 'Your body is your most valuable tool.',
    cost: { energy: 1 }
  },
  {
    id: 'skill-knowledge',
    name: 'Knowledge',
    type: 'skill',
    skillType: 'knowledge',
    rarity: 'basic',
    description: 'Solve intellectual or technical problems.',
    flavor: 'Knowledge isn\'t just power—it\'s survival.',
    cost: { energy: 1 }
  },
  {
    id: 'skill-stamina',
    name: 'Stamina',
    type: 'skill',
    skillType: 'stamina',
    rarity: 'basic',
    description: 'Push through fatigue or endure hardship.',
    flavor: 'The strongest steel is forged in the hottest fire.',
    cost: { energy: 1 }
  }
];