import { GameState } from '../../types/game';
import { GameEvent } from '../../types/events';
import { generateNewGoals } from '../../data/goals';
import { createMaintenanceGoal, shouldShowMaintenanceGoal } from '../../data/goals/categories/maintenance';
import { useEventStore } from '../../stores/useEventStore';

const MIN_GOALS = 3;

// Check if all requirements are met
export const requirementsMet = (goal) => goal.requirements.every(req => {
  switch (req.type) {
    case 'energy':
      return goal.progress.energyInvested >= req.amount;
    case 'credits':
      return goal.progress.creditsInvested >= req.amount;
    default:
      return false;
  }
});

export const processCompletedGoals = (
  state: GameState,
  progressExpiry: boolean = false
): [GameState, GameEvent[]] => {
  const addEvent = useEventStore.getState().addEvent;
  let newState = { ...state };
  
  // Process goals that are timing out or expiring
  newState.goals = newState.goals.map(goal => {
    // Only process expiry if progressExpiry is true
    if (progressExpiry && goal.status === 'available' && goal.timeLimit > 0) {
      const newTurnsRemaining = goal.progress.turnsRemaining - 1;
      if (newTurnsRemaining <= 0) {
        addEvent({
          type: 'warning',
          message: `Goal expired: ${goal.title}`,
          timestamp: Date.now()
        });
        return { ...goal, status: 'archived' };
      }
      return {
        ...goal,
        progress: {
          ...goal.progress,
          turnsRemaining: newTurnsRemaining
        }
      };
    }
    return goal;
  });

  // Process active goals
  newState.goals = newState.goals.map(goal => {
    if (goal.status !== 'active') return goal;

    // Handle completion timer
    if (goal.progress.completionTimer > 0) {
      // Only decrement timer if progressExpiry is true
      const newTimer = progressExpiry ? goal.progress.completionTimer - 1 : goal.progress.completionTimer;
      
      if (newTimer <= 0 && requirementsMet(goal)) {
        // Apply rewards
        if (goal.rewards) {
          if (goal.rewards.credits) {
            newState.credits += goal.rewards.credits;
          }
          if (goal.rewards.condition) {
            newState.condition = Math.min(100, newState.condition + goal.rewards.condition);
          }
          if (goal.rewards.reputation && goal.factionId) {
            newState.factions = newState.factions.map(faction =>
              faction.id === goal.factionId
                ? { ...faction, reputation: faction.reputation + goal.rewards.reputation! }
                : faction
            );
          }
        }

        // For other goals, emit regular completion event
        addEvent({
          type: 'success',
          message: `Goal completed: ${goal.title}`,
          timestamp: Date.now(),
          details: {
            goalId: goal.id,
            rewards: goal.rewards,
            factionId: goal.factionId
          },
          persistent: goal.source === 'location'
        });

        // For location goals, mark as completed
        if (goal.source === 'location') {
          return { ...goal, status: 'completed' };
        }

        // For non-location goals, check if repeatable
        if (goal.repeatable) {
          return {
            ...goal,
            status: 'available',
            progress: {
              creditsInvested: 0,
              energyInvested: 0,
              turnsRemaining: goal.timeLimit,
              completionTimer: 0
            }
          };
        }

        // Non-repeatable goals get archived
        return { ...goal, status: 'archived' };
      }

      return {
        ...goal,
        progress: {
          ...goal.progress,
          completionTimer: newTimer
        }
      };
    }

    // Start timer if requirements met and turns required
    if (requirementsMet && goal.turnsToComplete && goal.progress.completionTimer === 0) {
      return {
        ...goal,
        progress: {
          ...goal.progress,
          completionTimer: goal.turnsToComplete
        }
      };
    }

    // Complete immediately if requirements met and no turns required
    if (requirementsMet && !goal.turnsToComplete) {
      if (goal.rewards) {
        if (goal.rewards.credits) {
          newState.credits += goal.rewards.credits;
        }
        if (goal.rewards.condition) {
          newState.condition = Math.min(100, newState.condition + goal.rewards.condition);
        }
        if (goal.rewards.reputation && goal.factionId) {
          newState.factions = newState.factions.map(faction =>
            faction.id === goal.factionId
              ? { ...faction, reputation: faction.reputation + goal.rewards.reputation! }
              : faction
          );
        }
      }

      // Emit completion event
      addEvent({
        type: 'success',
        message: `Goal completed: ${goal.title}`,
        timestamp: Date.now(),
        details: {
          goalId: goal.id,
          rewards: goal.rewards,
          factionId: goal.factionId
        }
      });

      // Handle housing goal
      if (goal.id.startsWith('initial-housing')) {
        return { ...goal, status: 'completed' };
      }

      // Keep location goals in completed state
      if (goal.source === 'location') {
        return { ...goal, status: 'completed' };
      }

      // Archive non-repeatable goals
      if (!goal.repeatable) {
        return { ...goal, status: 'archived' };
      }

      return { ...goal, status: 'completed' };
    }

    return goal;
  });

  // Filter goals: keep completed housing goal until end of turn
  newState.goals = newState.goals.filter(goal => {
    // Keep completed housing goal
    if (goal.id.startsWith('initial-housing') && goal.status === 'completed') {
      return true;
    }
    
    // Keep completed location goals
    if (goal.source === 'location' && goal.status === 'completed') {
      return true;
    }
    
    // Remove archived goals
    if (goal.status === 'archived') {
      return false;
    }
    
    // Keep all other goals
    return true;
  });

  // If it's end of turn, archive completed housing goal
  if (progressExpiry) {
    newState.goals = newState.goals.map(goal => {
      if (goal.id.startsWith('initial-housing') && goal.status === 'completed') {
        return { ...goal, status: 'archived' };
      }
      return goal;
    });
  }

  // Count available non-location goals
  const availableNonLocationGoals = newState.goals.filter(goal => 
    goal.status === 'available' && goal.source !== 'location'
  );

  // Generate new goals if needed
  if (availableNonLocationGoals.length < MIN_GOALS) {
    const newGoalsNeeded = MIN_GOALS - availableNonLocationGoals.length;
    const randomFaction = newState.factions[Math.floor(Math.random() * newState.factions.length)];
    const newGoals = generateNewGoals(randomFaction.id, newGoalsNeeded);
    newState.goals = [...newState.goals, ...newGoals];
  }

  // Handle maintenance goal
  const hasMaintenanceGoal = newState.goals.some(goal => goal.id === 'maintenance');
  const needsMaintenanceGoal = shouldShowMaintenanceGoal(newState.condition);
  
  if (needsMaintenanceGoal && !hasMaintenanceGoal) {
    newState.goals.push(createMaintenanceGoal());
  }

  return [newState, []]; // Return empty events array since we're using addEvent directly
};