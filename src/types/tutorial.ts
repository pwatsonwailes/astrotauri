export type TutorialStep = {
  id: string;
  title: string;
  description: string;
  highlight?: string; // CSS selector for highlighting UI elements
  action?: {
    type: 'view-locations' | 'view-goals' | 'view-market' | 'end-turn';
  };
  position?: 'top' | 'bottom' | 'left' | 'right';
};

export interface TutorialState {
  isActive: boolean;
  currentStepIndex: number;
  completedSteps: Set<string>;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Ceres',
    description: 'Let\'s get you oriented to life on the station. I\'ll show you the basics of how to get around and make a living here.',
    position: 'top'
  },
  {
    id: 'locations',
    title: 'Locations',
    description: 'The Locations tab shows you different areas you can visit. Each location has its own opportunities and characters to meet.',
    action: {
      type: 'view-locations'
    },
    highlight: '[data-view="locations"]',
    position: 'right'
  },
  {
    id: 'goals',
    title: 'Activities',
    description: 'The Activities tab shows available goals and tasks. Complete these to earn credits and build relationships.',
    action: {
      type: 'view-goals'
    },
    highlight: '[data-view="goals"]',
    position: 'right'
  },
  {
    id: 'market',
    title: 'Market',
    description: 'The Market tab lets you trade commodities. Buy low and sell high to make a profit.',
    action: {
      type: 'view-market'
    },
    highlight: '[data-view="market"]',
    position: 'right'
  },
  {
    id: 'energy',
    title: 'Energy Points',
    description: 'You have a limited amount of energy each turn. Use it wisely to complete activities and goals.',
    highlight: '.energy-counter',
    position: 'bottom'
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Keep an eye on your credits, condition, and stress levels. If your condition drops to zero, it\'s game over.',
    highlight: '.resource-bar',
    position: 'top'
  },
  {
    id: 'end-turn',
    title: 'Ending Your Turn',
    description: 'Click "End Turn" when you\'re done with your actions. Your energy will be replenished at the start of your next turn.',
    action: {
      type: 'end-turn'
    },
    highlight: '.end-turn-button',
    position: 'bottom'
  },
  {
    id: 'housing',
    title: 'First Steps',
    description: 'Your first priority should be finding housing. Look for housing-related goals in the Activities tab.',
    highlight: '[data-view="goals"]',
    position: 'right'
  }
];