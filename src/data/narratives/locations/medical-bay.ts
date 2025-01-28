import { LocationNarrative } from '../../../types/narrative';

export const medicalBayNarratives: Record<string, LocationNarrative> = {
  'explore-medical-bay': {
    id: 'explore-medical-bay',
    locationId: 'medical-bay',
    requirements: [],
    nodes: [
      {
        type: 'paragraph',
        text: "The medical bay is a compact but well-equipped space. Medical displays line the walls, their soft blue glow reflecting off polished surfaces. The air carries the sharp scent of antiseptic.",
        media: {
          image: {
            src: 'interior3'
          }
        }
      },
      // Add more exploration nodes...
    ]
  }
};