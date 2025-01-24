import { Faction, ReputationLevel } from '../../types/factions';
import { reputationThresholds } from '../../data/factions/thresholds';

export class ReputationManager {
  static getReputationLevel(reputation: number): ReputationLevel {
    const threshold = reputationThresholds.find(
      t => reputation >= t.min && reputation <= t.max
    );
    return threshold?.level || 'neutral';
  }

  static updateReputation(faction: Faction, change: number): Faction {
    const newReputation = Math.max(-100, Math.min(100, faction.reputation + change));
    return { ...faction, reputation: newReputation };
  }

  static calculateRelationshipImpact(
    factions: Faction[],
    targetFactionId: string,
    reputationChange: number
  ): Map<string, number> {
    const impacts = new Map<string, number>();
    const targetFaction = factions.find(f => f.id === targetFactionId);

    if (!targetFaction) return impacts;

    Object.entries(targetFaction.relationships).forEach(([factionId, relationship]) => {
      const impact = reputationChange * relationship * 0.5;
      impacts.set(factionId, impact);
    });

    return impacts;
  }

  static getReputationModifier(faction: Faction): number {
    const level = this.getReputationLevel(faction.reputation);
    switch (level) {
      case 'allied': return 0.2;
      case 'friendly': return 0.1;
      case 'neutral': return 0;
      case 'unfriendly': return -0.1;
      case 'hostile': return -0.2;
      default: return 0;
    }
  }
}