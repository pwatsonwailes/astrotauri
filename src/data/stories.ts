import { Story } from '../types/story';

import Prologue from '../stories/main/c1/Prologue.ink?raw'
import Prospector from '../stories/main/c1/Prospector.ink?raw'
//import CatalystEvent from '../stories/main/c1/CatalystEvent.ink?raw'
//import Escape from '../stories/main/c1/Escape.ink?raw'
//import Repairs from '../stories/main/c1/Repairs.ink?raw'
//import RheaAndJaxRepairs from '../stories/main/c1/RheaAndJaxRepairs.ink?raw'
//import KadeCommsRepair from '../stories/main/c1/KadeCommsRepair.ink?raw'
//import PlayerThrusterRepair from '../stories/main/c1/PlayerThrusterRepair.ink?raw'
//import ReturntoBridge from '../stories/main/c1/ReturntoBridge.ink?raw'
//import ReturningtoCeres from '../stories/main/c1/ReturningtoCeres.ink?raw'
//import RustedNail from '../stories/main/c1/RustedNail.ink?raw'
//import TheChopShop from '../stories/main/c1/TheChopShop.ink?raw'
//import ImpartingWisdom from '../stories/main/c1/ImpartingWisdom.ink?raw'
//import RheaPrivateMoment from '../stories/main/c1/RheaPrivateMoment.ink?raw'
//import KadePrivateMoment from '../stories/main/c1/KadePrivateMoment.ink?raw'
//import JaxPrivateMoment from '../stories/main/c1/JaxPrivateMoment.ink?raw'
//import YourPrivateMoment from '../stories/main/c1/YourPrivateMoment.ink?raw'
//import TheThreat from '../stories/main/c1/TheThreat.ink?raw'
//import AharonsDilemma from '../stories/main/c1/AharonsDilemma.ink?raw'
//import Surrender from '../stories/main/c1/Surrender.ink?raw'
//import Showdown from '../stories/main/c1/Showdown.ink?raw'
//import SinclairsLab from '../stories/main/c1/SinclairsLab.ink?raw'
//import TheJump from '../stories/main/c1/TheJump.ink?raw'


import rheaStory from '../stories/rhea.ink?raw';
import jaxStory from '../stories/jax.ink?raw';
import kadeStory from '../stories/kade.ink?raw';
import rheaStory2 from '../stories/rhea2.ink?raw';
import jaxStory2 from '../stories/jax2.ink?raw';
import kadeStory2 from '../stories/kade2.ink?raw';

export const stories: Story[] = [
  // Main story progression
  {
    id: 'prologue',
    crewId: 'captain',
    title: 'Prologue',
    content: Prologue,
    requirements: {
      type: 'initial'
    }
  },
  {
    id: 'prospector',
    crewId: 'captain',
    title: 'Prospector',
    content: Prospector,
    requirements: {
      type: 'quest',
      questId: 'M001',
      status: 'completed'
    }
  },
  // Crew stories
  {
    id: 'rhea_1',
    crewId: 'rhea',
    title: 'Engineering Concerns',
    content: rheaStory,
    requirements: {
      type: 'initial'
    }
  },
  {
    id: 'rhea_2',
    crewId: 'rhea',
    title: 'New Possibilities',
    content: rheaStory2,
    requirements: {
      type: 'manufacturing',
      itemType: 'upgrade',
      count: 1
    }
  },
  {
    id: 'jax_1',
    crewId: 'jax',
    title: 'Security Briefing',
    content: jaxStory,
    requirements: {
      type: 'initial'
    }
  },
  {
    id: 'jax_2',
    crewId: 'jax',
    title: 'Tactical Update',
    content: jaxStory2,
    requirements: {
      type: 'conversation',
      storyId: 'jax_1',
      turnsAfter: 3
    }
  },
  {
    id: 'kade_1',
    crewId: 'kade',
    title: 'Navigation Plans',
    content: kadeStory,
    requirements: {
      type: 'initial'
    }
  },
  {
    id: 'kade_2',
    crewId: 'kade',
    title: 'Strange Readings',
    content: kadeStory2,
    requirements: {
      type: 'quest',
      questId: 'M001',
      status: 'completed'
    }
  }
];