import { Goal } from '../../../types/goals';

export const shouldShowMaintenanceGoal = (condition: number): boolean => {
  return condition <= 50;
};

export const createMaintenanceGoal = (): Goal => ({
  id: 'maintenance',
  title: 'System Maintenance',
  description: 'Your body is degrading. Rest to restore your condition.',
  type: 'parentGoal',
  requirements: [
    { type: 'energy', amount: 5 }
  ],
  rewards: {
    condition: 100
  },
  timeLimit: 0,
  status: 'available',
  progress: {
    creditsInvested: 0,
    energyInvested: 0,
    turnsRemaining: 1
  }
});