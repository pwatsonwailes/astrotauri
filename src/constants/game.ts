export const GAME_CONSTANTS = {
  TURN_DURATION: 5000, // 5 seconds per turn
  
  SCORE_THRESHOLDS: {
    low: { success: 1, failure: -2 },
    medium: { success: 2, failure: -3 },
    high: { success: 3, failure: -4 }
  },

  INITIAL_RESOURCES: {
    credits: 1000,
    materials: 50,
    tech: 25,
    influence: 10
  }
} as const;