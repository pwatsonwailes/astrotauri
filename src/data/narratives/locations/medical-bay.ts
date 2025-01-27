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
            src: 'interior3',
            animate: {
              type: 'mote',
              config: {
                baseHue: 200,
                baseSaturation: 80,
                baseLightness: 60,
                spawnRate: 2
              },
              persist: true
            }
          }
        }
      },
      // Add more exploration nodes...
    ]
  }
};