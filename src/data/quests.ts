import { Quest } from '../types/quest';

export const AVAILABLE_QUESTS: Omit<Quest, 'currentTurn' | 'progress' | 'cumulativeScore' | 'status'>[] = [
  {
    id: 'M001',
    name: 'Data Beacon Retrieval',
    description: 'A remote research outpost has fallen silent after transmitting a distress beacon. Dispatch a specialized team to retrieve critical scientific data.',
    duration: 3,
    riskLevel: 'medium',
    investmentCost: {
      credits: 100
    },
    requirements: {
      tech: 20,
      materials: 30
    },
    rewards: {
      resources: {
        credits: 500,
        tech: 40
      },
      narrative: 'The beacon holds valuable scientific data.'
    },
    turnDialogues: {
      1: {
        neutral: "The team sets course for the outpost; sensors are active and scanning the void.",
        positive: "The initial approach is smooth—systems report optimal performance.",
        negative: "Early interference rattles the team, and a few instruments report minor glitches."
      },
      2: {
        neutral: "Midway through the mission, the crew monitors the beacon's signal with steady focus.",
        positive: "A refined signal emerges. The team recalibrates for efficient data extraction.",
        negative: "Signal distortions increase. The crew grows uneasy as technical errors start piling up."
      },
      3: {
        neutral: "Approaching the beacon, final systems checks are underway.",
        positive: "The team secures the beacon and downloads the encrypted data without a hitch.",
        negative: "A surge of cosmic interference disrupts operations—the data may be lost."
      }
    },
    turnInteractions: {
      2: {
        turn: 2,
        prompt: "Our instruments indicate increased interference. Would you like to take action to improve our chances?",
        options: [
          {
            id: "credits",
            description: "Spend 50 credits to recalibrate sensors.",
            bonus: 2,
            cost: 50,
            type: "resource"
          },
          {
            id: "time",
            description: "Invest an extra turn to fine-tune equipment.",
            bonus: 1,
            extraTurn: 1,
            type: "time"
          },
          {
            id: "intelligence",
            description: "Use previously gathered intelligence to optimize the operation.",
            bonus: 3,
            requiredItem: "intel_module",
            type: "item"
          }
        ]
      }
    },
    narrativeOutcomes: {
      success: "Data beacon secured! The recovered information hints at ancient technology and unlocks new research avenues.",
      failure: "Interference from unknown sources compromised the retrieval. The beacon's data is lost—raising troubling questions."
    }
  }
];