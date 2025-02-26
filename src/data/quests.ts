import { Quest } from '../types/quest';

export const AVAILABLE_QUESTS: Omit<Quest, 'currentTurn' | 'progress' | 'cumulativeScore' | 'status'>[] = [
  {
    id: 'M001',
    name: 'Data Beacon Retrieval',
    description: 'A remote research outpost has fallen silent after transmitting a distress beacon. Dispatch a specialized team to retrieve critical scientific data.',
    duration: 3,
    riskLevel: 'medium',
    type: 'technical',
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
  },
  {
    id: 'M002',
    name: 'Diplomatic Envoy',
    description: 'A mining colony on Ceres is experiencing tensions with corporate representatives. Your diplomatic skills are needed to negotiate a peaceful resolution.',
    duration: 4,
    riskLevel: 'low',
    type: 'diplomatic',
    investmentCost: {
      credits: 200
    },
    requirements: {
      influence: 15,
      credits: 300
    },
    rewards: {
      resources: {
        credits: 600,
        influence: 25
      },
      narrative: 'A successful negotiation could open new trade routes.'
    },
    turnDialogues: {
      1: {
        neutral: "Your team arrives at the colony, greeted with cautious formality by both sides.",
        positive: "The initial reception is warm—both parties seem genuinely interested in resolution.",
        negative: "Tension is palpable as you arrive. Neither side seems willing to make the first concession."
      },
      2: {
        neutral: "Negotiations begin with each side presenting their grievances.",
        positive: "Progress is being made as both parties find common ground on key issues.",
        negative: "Discussions grow heated as accusations fly from both sides."
      },
      3: {
        neutral: "The final terms are being drafted as negotiations enter their critical phase.",
        positive: "A framework for cooperation emerges, with both sides making reasonable compromises.",
        negative: "Talks are breaking down as fundamental disagreements resurface."
      },
      4: {
        neutral: "The agreement awaits final signatures from all parties.",
        positive: "The treaty is signed with enthusiasm, promising a new era of cooperation.",
        negative: "Last-minute objections threaten to derail the entire process."
      }
    },
    turnInteractions: {
      2: {
        turn: 2,
        prompt: "The miners are demanding better safety protocols, but the corporation claims it would be too costly. How do you approach this impasse?",
        options: [
          {
            id: "diplomatic",
            description: "Suggest a phased implementation of safety measures with shared costs.",
            bonus: 2,
            type: "diplomatic"
          },
          {
            id: "aggressive",
            description: "Pressure the corporation by threatening to report safety violations to authorities.",
            bonus: 3,
            type: "aggressive"
          },
          {
            id: "cautious",
            description: "Commission an independent safety audit to establish objective facts.",
            bonus: 1,
            type: "cautious"
          }
        ]
      }
    },
    narrativeOutcomes: {
      success: "Agreement reached! Both miners and corporate representatives sign a historic accord that balances safety with profitability.",
      failure: "Negotiations collapse as neither side is willing to compromise. The situation remains volatile."
    }
  },
  {
    id: 'M003',
    name: 'Pirate Interception',
    description: 'A band of pirates has been raiding supply ships in the sector. Intercept and neutralize the threat to secure the shipping lanes.',
    duration: 3,
    riskLevel: 'high',
    type: 'combat',
    investmentCost: {
      credits: 300
    },
    requirements: {
      materials: 50,
      tech: 30
    },
    rewards: {
      resources: {
        credits: 800,
        materials: 100
      },
      narrative: 'Eliminating the pirate threat will secure vital trade routes.'
    },
    turnDialogues: {
      1: {
        neutral: "Your ship enters the sector where pirate activity has been reported.",
        positive: "Long-range sensors detect the pirate vessel before they notice you, giving you a tactical advantage.",
        negative: "As you enter the sector, warning alarms blare—the pirates have set up an ambush!"
      },
      2: {
        neutral: "Engagement with the pirate vessel begins as you move into weapons range.",
        positive: "Your first volley disables their weapons systems. They're on the defensive now.",
        negative: "The pirates' ship is more heavily armed than intelligence suggested. Your shields take heavy damage."
      },
      3: {
        neutral: "The final phase of the engagement begins as both ships maneuver for advantage.",
        positive: "The pirate vessel is crippled and attempting to surrender.",
        negative: "Your ship has sustained critical damage. Emergency systems are failing."
      }
    },
    turnInteractions: {
      1: {
        turn: 1,
        prompt: "You've detected the pirate vessel. How do you approach the engagement?",
        options: [
          {
            id: "aggressive",
            description: "Launch a surprise attack with all weapons to overwhelm their defenses.",
            bonus: 3,
            type: "aggressive"
          },
          {
            id: "cautious",
            description: "Approach cautiously, analyzing their defenses before engaging.",
            bonus: 1,
            type: "cautious"
          },
          {
            id: "diplomatic",
            description: "Attempt to contact them and offer amnesty in exchange for surrender.",
            bonus: 2,
            type: "diplomatic"
          }
        ]
      }
    },
    narrativeOutcomes: {
      success: "The pirate threat has been neutralized! The shipping lanes are secure once more, and your reputation for effectiveness grows.",
      failure: "The pirates escaped after inflicting heavy damage to your ship. They'll be more cautious—and better armed—next time."
    }
  }
];