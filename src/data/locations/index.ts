import { Location } from '../../types/locations';

export const LOCATIONS: { [key: string]: Location } = {
  'prospector': {
    id: 'prospector',
    type: 'ship',
    name: 'The Wandering Prospector',
    description: 'A mid-sized mining vessel currently transporting you to Ceres. The ship is well-maintained but shows signs of heavy use.',
    subLocations: [
      {
        id: 'medical-bay',
        name: 'Medical Bay',
        type: 'area',
        description: 'A small but well-equipped medical facility where you first woke up.',
        npcs: [
          {
            id: 'dr-santos',
            name: 'Dr. Maya Santos',
            title: 'Ship\'s Doctor',
            description: 'A calm and professional physician with steady hands and a reassuring presence.',
            relationship: 0
          }
        ],
        goals: [
          {
            id: 'medical-checkup',
            title: 'Complete Medical Checkup',
            description: 'Let Dr. Santos run some final tests before arrival.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 1 }],
            rewards: { reputation: 10 },
            source: 'location',
            repeatable: false,
            timeLimit: Infinity,
            status: 'available',
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 2,
              completionTimer: 0
            }
          }
        ]
      },
      {
        id: 'crew-quarters',
        name: 'Crew Quarters',
        type: 'area',
        description: 'The living area for the ship\'s crew, featuring shared spaces and individual cabins.',
        npcs: [
          {
            id: 'captain-chen',
            name: 'Captain Lin Chen',
            title: 'Ship Captain',
            description: 'A veteran spacer with decades of experience in the Belt.',
            relationship: 0
          }
        ],
        goals: [
          {
            id: 'meet-crew',
            title: 'Meet the Crew',
            description: 'Introduce yourself to the ship\'s crew members.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 2 }],
            rewards: { credits: 100 },
            source: 'location',
            repeatable: false,
            timeLimit: Infinity,
            status: 'available',
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 3,
              completionTimer: 0
            }
          }
        ]
      }
    ],
    npcs: [],
    goals: [],
    availableDestinations: ['ceres']
  },
   'ceres': {
    id: 'ceres',
    name: 'Ceres Station',
    type: 'station',
    description: 'The largest settlement in the asteroid belt.',
    subLocations: [
      {
        id: 'ceres-drum',
        name: 'The Drum',
        type: 'area',
        description: 'The wealthy central district of Ceres Station, featuring luxury apartments and high-end businesses.',
        subLocations: [
          {
            id: 'corporate-plaza',
            name: 'Corporate Plaza',
            type: 'area',
            description: 'A gleaming collection of corporate offices and trading floors.',
            npcs: [
              {
                id: 'broker-hayes',
                name: 'Victoria Hayes',
                title: 'Corporate Broker',
                description: 'A sharp-dressed broker who specializes in connecting clients with opportunities.',
                relationship: 0
              }
            ],
            goals: [
              {
                id: 'corporate-connections',
                title: 'Corporate Networking',
                description: 'Build connections with the corporate elite through Victoria Hayes.',
                type: 'parentGoal',
                requirements: [{ type: 'energy', amount: 3 }],
                rewards: { credits: 200, reputation: 10 },
                source: 'location',
                repeatable: false,
                status: 'available',
                progress: {
                  energyInvested: 0,
                  creditsInvested: 0,
                  turnsRemaining: 4,
                  completionTimer: 0
                },
                unlocksNPC: {
                  id: 'executive-chang',
                  name: 'James Chang',
                  title: 'Corporate Executive',
                  description: 'A high-ranking executive with connections throughout the station.',
                  relationship: 0
                }
              }
            ]
          },
          {
            id: 'luxury-apartments',
            name: 'Skyview Apartments',
            type: 'area',
            description: 'High-end residential complex with stunning views of the station.',
            npcs: [],
            goals: [],
            isLocked: true,
            unlockRequirement: {
              type: 'reputation',
              value: 50
            }
          }
        ],
        npcs: [],
        goals: [
          {
            id: 'explore-drum',
            title: 'Explore The Drum',
            description: 'Familiarize yourself with Ceres\' wealthy district and its opportunities.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 2 }],
            rewards: { credits: 100 },
            source: 'location',
            repeatable: false,
            timeLimit: Infinity,
            status: 'available',
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 3,
              completionTimer: 0
            }
          }
        ]
      },
      {
        id: 'miners-mile',
        name: 'Miner\'s Mile',
        type: 'area',
        description: 'The bustling heart of Ceres\' working class, filled with markets, bars, and affordable housing.',
        subLocations: [
          {
            id: 'black-market',
            name: 'Shadow Market',
            description: 'An unofficial marketplace where less-than-legal goods change hands.',
            npcs: [
              {
                id: 'fence-rodriguez',
                name: 'Marco Rodriguez',
                title: 'Information Broker',
                description: 'A well-connected individual who knows everyone\'s secrets.',
                relationship: 0
              }
            ],
            goals: [
              {
                id: 'shadow-network',
                title: 'Build Trust in the Shadows',
                description: 'Prove yourself reliable to Marco\'s network.',
                type: 'parentGoal',
                requirements: [{ type: 'energy', amount: 3 }],
                rewards: { credits: 150, reputation: 15 },
                source: 'location',
                repeatable: false,
                status: 'available',
                progress: {
                  energyInvested: 0,
                  creditsInvested: 0,
                  turnsRemaining: 4,
                  completionTimer: 0
                },
                unlocksNPC: {
                  id: 'smuggler-jin',
                  name: 'Jin "Lucky" Lee',
                  title: 'Independent Trader',
                  description: 'A smuggler with a reputation for getting impossible things.',
                  relationship: 0
                }
              }
            ]
          },
          {
            id: 'workers-housing',
            name: 'The Stacks',
            description: 'Dense residential blocks housing most of the station\'s workforce.',
            npcs: [],
            goals: []
          }
        ],
        npcs: [],
        goals: [
          {
            id: 'explore-mile',
            title: 'Explore Miner\'s Mile',
            description: 'Get to know the working-class heart of Ceres.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 2 }],
            rewards: { credits: 75 },
            status: 'available',
            source: 'location',
            timeLimit: Infinity,
            repeatable: false,
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 3,
              completionTimer: 0
            }
          }
        ]
      },
      {
        id: 'the-pit',
        name: 'The Pit',
        type: 'area',
        description: 'Ceres\' industrial heart, where raw materials from the Belt are processed and refined.',
        subLocations: [
          {
            id: 'refineries',
            name: 'Refinery Complex',
            type: 'area',
            description: 'Massive facilities processing ore from asteroid mining operations.',
            npcs: [
              {
                id: 'foreman-zhang',
                name: 'Wei Zhang',
                title: 'Refinery Foreman',
                description: 'A no-nonsense supervisor who keeps the refineries running smoothly.',
                relationship: 0
              }
            ],
            goals: [
              {
                id: 'refinery-work',
                title: 'Learn the Refinery',
                description: 'Help Foreman Zhang with some basic tasks to learn the operation.',
                type: 'parentGoal',
                requirements: [{ type: 'energy', amount: 4 }],
                rewards: { credits: 250, reputation: 10 },
                source: 'location',
                repeatable: false,
                timeLimit: Infinity,
                status: 'available',
                progress: {
                  energyInvested: 0,
                  creditsInvested: 0,
                  turnsRemaining: 5,
                  completionTimer: 0
                },
                unlocksNPC: {
                  id: 'engineer-kowalski',
                  name: 'Eva Kowalski',
                  title: 'Senior Engineer',
                  description: 'A veteran engineer who knows every bolt and pipe in the refineries.',
                  relationship: 0
                }
              }
            ]
          },
          {
            id: 'docking-bays',
            name: 'Mining Docks',
            type: 'area',
            description: 'Where mining ships dock to offload their hauls.',
            npcs: [],
            goals: []
          }
        ],
        npcs: [],
        goals: [
          {
            id: 'explore-pit',
            title: 'Explore The Pit',
            description: 'Survey Ceres\' industrial sector and its opportunities.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 2 }],
            rewards: { credits: 100 },
            source: 'location',
            repeatable: false,
            timeLimit: Infinity,
            status: 'available',
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 3,
              completionTimer: 0
            }
          }
        ]
      },
      {
        id: 'little-hygeia',
        name: 'Little Hygeia',
        type: 'area',
        description: 'Ceres\' agricultural sector, a maze of hydroponics gardens providing fresh food for the station.',
        subLocations: [
          {
            id: 'gardens',
            name: 'Main Gardens',
            type: 'area',
            description: 'Vast hydroponics bays growing a variety of crops.',
            npcs: [
              {
                id: 'botanist-patel',
                name: 'Dr. Amrita Patel',
                title: 'Chief Botanist',
                description: 'A brilliant scientist working to improve Ceres\' food production.',
                relationship: 0
              }
            ],
            goals: [
              {
                id: 'garden-research',
                title: 'Assist Research Project',
                description: 'Help Dr. Patel with her latest agricultural research.',
                type: 'parentGoal',
                requirements: [{ type: 'energy', amount: 3 }],
                rewards: { credits: 150, reputation: 10 },
                status: 'available',
                source: 'location',
                timeLimit: Infinity,
                repeatable: false,
                progress: {
                  energyInvested: 0,
                  creditsInvested: 0,
                  turnsRemaining: 4,
                  completionTimer: 0
                },
                unlocksNPC: {
                  id: 'researcher-chen',
                  name: 'Dr. Sarah Chen',
                  title: 'Research Lead',
                  description: 'A pioneering researcher in space agriculture.',
                  relationship: 0
                }
              }
            ]
          },
          {
            id: 'research-labs',
            name: 'Agri-Labs',
            type: 'area',
            description: 'Research facilities developing new farming techniques.',
            npcs: [],
            goals: []
          }
        ],
        npcs: [],
        goals: [
          {
            id: 'explore-hygeia',
            title: 'Explore Little Hygeia',
            description: 'Discover Ceres\' agricultural heart and its inhabitants.',
            type: 'parentGoal',
            requirements: [{ type: 'energy', amount: 2 }],
            rewards: { credits: 75 },
            status: 'available',
            source: 'location',
            timeLimit: Infinity,
            repeatable: false,
            progress: {
              energyInvested: 0,
              creditsInvested: 0,
              turnsRemaining: 3,
              completionTimer: 0
            }
          }
        ]
      }
    ],
    npcs: [],
    goals: [],
    availableDestinations: ['vesta'],
    travelRequirements: {
      'vesta': {
        credits: 1000,
        turns: 10
      }
    }
  },    
  'fast-picket': {
    id: 'fast-picket',
    name: 'Fast Picket Run',
    type: 'ship',
    description: 'A fast transport vessel specializing in inter-asteroid routes.',
    subLocations: [
      {
        id: 'passenger-quarters',
        name: 'Passenger Quarters',
        description: 'Cramped but serviceable quarters for passengers.',
        npcs: [],
        goals: []
      }
    ],
    npcs: [],
    goals: []
  },
  'vesta': {
    id: 'vesta',
    name: 'Vesta Station',
    type: 'station',
    description: 'A major mining and industrial hub.',
    subLocations: [/* ... */],
    npcs: [],
    goals: [],
    availableDestinations: ['ceres'],
    travelRequirements: {
      'ceres': {
        credits: 1000,
        turns: 10
      }
    }
  }
};