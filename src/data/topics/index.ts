// Define the Topic interface matching the structure used in TopicsTab.tsx
export interface Topic {
  id: string;
  title: string;
  description: string;
  category: string; // Consider using a specific type like TopicCategory
  relatedNotes: string[];
  relatedTopics: string[];
  relatedCharacters: string[];
  isLocked: boolean;
}

export const allTopics: Topic[] = [
  // Example Topic (can be removed later)
  {
    id: 'topic_001',
    title: 'The Derelict Ship',
    description: 'An unknown vessel drifting in the Kepler-186f system.',
    category: 'Locations', // Example category
    relatedNotes: ['note_001'], // Link to the example note
    relatedTopics: [],
    relatedCharacters: [],
    isLocked: false, // Start unlocked for this example
  },
  // ... Add more topics here
  {
    id: 'topic_ceres',
    title: 'Ceres',
    description: 'Major asteroid city/station in the belt. Hub for miners, traders, smugglers. Governed by a council. Player\'s current home base.',
    category: 'Locations',
    relatedNotes: ['note_prologue_01', 'note_council_meeting_01'],
    relatedTopics: ['topic_asteroid_belt', 'topic_ceres_council'],
    relatedCharacters: ['char_player', 'char_aharon', 'char_voss', 'char_tala', 'char_renn'],
    isLocked: false,
  },
  {
    id: 'topic_prospector',
    title: 'The Prospector',
    description: 'Player\'s ship. Cramped, functional, scarred hull. Used for mining and salvage. Crew includes Kade (Pilot), Rhea (Engineer), Jax (Muscle). Currently docked at Kuiper Research Array.',
    category: 'Locations',
    relatedNotes: ['note_crew_intro_01', 'note_escape_01', 'note_repairs_01'],
    relatedTopics: [],
    relatedCharacters: ['char_player', 'char_kade', 'char_rhea', 'char_jax'],
    isLocked: false,
  },
  {
    id: 'topic_derelict_ship',
    title: 'The Derelict Ship',
    description: 'A dead, drifting ship found in the asteroid belt. Transponder ID linked it to Delomir\'s black projects division and Aharon\'s past. Contained the mysterious device (Builder tech). Source of coordinates leading to Kuiper Research Array. Its destruction/dismantling debated by Ceres Council.',
    category: 'Locations',
    relatedNotes: ['note_mission_briefing_01', 'note_boarding_01', 'note_device_found_01', 'note_council_meeting_01'],
    relatedTopics: ['topic_device', 'topic_delomir', 'topic_aharons_past', 'topic_heavens_gate', 'topic_builder_tech'],
    relatedCharacters: ['char_player', 'char_aharon', 'char_sinclair'],
    isLocked: false,
  },
  {
    id: 'topic_device',
    title: 'The Builder Device',
    description: 'Sleek, black, sceptre-like object found on the derelict. Covered in strange symbols, hums with energy, pulses light. Identified as Builder technology. Highly sought after by Sinclair. Aharon believes it\'s related to his and the player\'s parents\' dangerous project. Potentially the key to stabilising neural/biological grafts/transformations. Emitted a signal/invitation related to the Kuiper Belt Anomaly. Reacted to Tey\'s experiment, enabling partial control/stabilisation.',
    category: 'Technology',
    relatedNotes: ['note_device_found_01', 'note_aharon_warns', 'note_aharons_confession_01', 'note_sinclairs_motivation', 'note_device_activation_01', 'note_device_experiment_01'],
    relatedTopics: ['topic_derelict_ship', 'topic_parents_project', 'topic_sinclairs_goal', 'topic_kuiper_anomaly', 'topic_builder_tech', 'topic_transformation'],
    relatedCharacters: ['char_player', 'char_aharon', 'char_sinclair', 'char_father', 'char_mother', 'char_tey'],
    isLocked: false, // Was locked, now revealed
  },
  {
    id: 'topic_delomir',
    title: 'Delomir Corporation',
    description: 'Major weapons manufacturer based on Vesta, headed by Rupert Sinclair. Has a black projects division. Rhea\'s parents worked for them. Aharon used to work there, potentially high-level, helped build its empire. Involved in neural implants, physical enhancements (bio-synthetic integration), and dangerous tech, likely derived from Builder discoveries. Pursuing the device and the derelict ship. Sinclair is using Delomir resources for his own agenda against the Harvesters. Sigma-7 was one of their research platforms.',
    category: 'Organizations',
    relatedNotes: [
      'note_rhea_past_01', 'note_aharons_confession_01', 'note_sinclairs_motivation', 
      'note_council_meeting_01', 'note_tey_intro_01', 
      // Ch4 Links
      'note_ch4_sigma7_intro', 'note_ch4_sigma7_attack_start', 'note_ch4_sigma7_lockdown', 
      'note_ch4_sigma7_attacker_image', 'note_ch4_sharma_meeting', 'note_ch4_sharma_warning'
    ],
    relatedTopics: [
      'topic_sinclair', 'topic_vesta', 'topic_parents_project', 'topic_enhanced_soldiers', 
      'topic_builder_tech', 'topic_transformation', 
      // Ch4 Links
      'topic_sigma7', 'topic_unknown_attackers', 'topic_snc_audit'
    ],
    relatedCharacters: ['char_sinclair', 'char_aharon', 'char_rhea', 'char_tey', 'char_thorne', 'char_petrova', 'char_cole', 'char_sharma'],
    isLocked: false,
  },
  {
    id: 'topic_vesta',
    title: 'Vesta',
    description: 'Location where Delomir Corporation is based. Rhea grew up here. Source of the military-grade ships pursuing the Prospector.',
    category: 'Locations',
    relatedNotes: ['note_rhea_past_01', 'note_council_meeting_01'],
    relatedTopics: ['topic_delomir', 'topic_sinclair'],
    relatedCharacters: ['char_sinclair', 'char_rhea'],
    isLocked: false,
  },
  {
    id: 'topic_sinclair',
    title: 'Rupert Sinclair',
    description: 'Head of Delomir. Former colleague/friend of Aharon. Ruthless, ambitious. Implicated in the death of player\'s parents. Pursuing the device. Developing enhanced soldiers using Builder tech to combat the Harvesters. Captured Aharon and is experimenting on him, attempting to stabilise the transformation process. Believes extreme measures are necessary for survival.',
    category: 'People',
    relatedNotes: ['note_aharons_confession_01', 'note_sinclairs_motivation', 'note_sinclairs_lab_01', 'note_tey_reveals_aharon_status', 'note_aharons_video_log'],
    relatedTopics: ['topic_delomir', 'topic_vesta', 'topic_parents_project', 'topic_enhanced_soldiers', 'topic_kuiper_anomaly', 'topic_builder_tech', 'topic_transformation', 'topic_aharons_fate'],
    relatedCharacters: ['char_sinclair', 'char_aharon', 'char_player', 'char_father', 'char_mother', 'char_tey'],
    isLocked: false, // Was locked, now known
  },
  {
    id: 'topic_parents_project',
    title: 'Player\'s Parents\' Project',
    description: 'A dangerous, powerful project player\'s parents were working on at Delomir. Involved neural implants, physical enhancements, possibly related to the Builder device and transformation tech. Sinclair wanted it; parents planned to shut it down, leading to their deaths.',
    category: 'Mysteries',
    relatedNotes: ['note_aharons_confession_01', 'note_sinclairs_motivation'],
    relatedTopics: ['topic_device', 'topic_delomir', 'topic_sinclair', 'topic_enhanced_soldiers', 'topic_builder_tech', 'topic_transformation'],
    relatedCharacters: ['char_father', 'char_mother', 'char_sinclair', 'char_aharon'],
    isLocked: true, // Revealed by Aharon, details still emerging
  },
  {
    id: 'topic_kuiper_anomaly',
    title: 'The Harvester Threat',
    description: 'An ancient, unknowable, extremely powerful biomechanical entity or race originating from intergalactic space. They destroy civilisations, learn, and adapt. Committed genocide multiple times. Sinclair believes they are coming to the Sol system within a year and is preparing extreme defences. A signal related to them/the Builders may have been detected.',
    category: 'Mysteries',
    relatedNotes: ['note_sinclairs_motivation', 'note_device_activation_01', 'note_harvester_briefing_01'],
    relatedTopics: ['topic_device', 'topic_sinclair', 'topic_pluto_object', 'topic_earthgov', 'topic_builders', 'topic_transformation'],
    relatedCharacters: ['char_sinclair', 'char_aharon', 'char_tey'],
    isLocked: true, // Revealed by Sinclair/Tey
  },
  {
    id: 'topic_enhanced_soldiers',
    title: 'Sinclair\'s Bio-Synthetic Integration',
    description: 'Sinclair\'s project to rewrite the human body at a cellular level using Builder tech, creating adaptive, regenerative soldiers to fight Harvesters. Process involves neural implants and physical enhancements, is unstable, painful, and causes cognitive deterioration. Aharon is currently undergoing this process.',
    category: 'Technology',
    relatedNotes: ['note_sinclairs_lab_01', 'note_sinclairs_motivation', 'note_tey_reveals_aharon_status', 'note_aharons_video_log'],
    relatedTopics: ['topic_sinclair', 'topic_delomir', 'topic_parents_project', 'topic_device', 'topic_kuiper_anomaly', 'topic_builder_tech', 'topic_transformation', 'topic_aharons_fate'],
    relatedCharacters: ['char_sinclair', 'char_aharon'],
    isLocked: true,
  },
  {
    id: 'topic_heavens_gate',
    title: "Heaven's Gate",
    description: 'A dense debris field near Ceres, containing ship wreckage and unexploded ordnance. Used by the Prospector crew for cover during their escape.',
    category: 'Locations',
    relatedNotes: ['note_escape_01', 'note_council_meeting_01'],
    relatedTopics: ['topic_ceres', 'topic_asteroid_belt'],
    relatedCharacters: [],
    isLocked: false,
  },
  {
    id: 'topic_luna',
    title: 'Luna (The Moon)',
    description: 'Earth\'s moon. Contains underground sectors. Jax spent years there as an embedded operative ("ghost"). Luna cooperates with Earth (e.g., building ships like Persephone) but political tensions exist.',
    category: 'Locations',
    relatedNotes: ['note_jax_past_01', 'note_shipboard_life_liu'],
    relatedTopics: ['topic_earthgov', 'topic_persephone'],
    relatedCharacters: ['char_jax', 'char_liu'],
    isLocked: true,
  },
  {
    id: 'topic_asteroid_belt',
    title: 'The Asteroid Belt',
    description: 'Region of space where Ceres is located. A lawless place where the Prospector crew operates. Contains hidden locations like the Kuiper Research Array and historical artifacts like Builder crystals.',
    category: 'Locations',
    relatedNotes: ['note_harvester_briefing_01'], // Mention of Builder crystals
    relatedTopics: ['topic_ceres', 'topic_heavens_gate', 'topic_kuiper_array', 'topic_builders'],
    relatedCharacters: [],
    isLocked: false,
  },
  {
    id: 'topic_ceres_council',
    title: 'Ceres Council',
    description: 'Governing body of Ceres. Includes Councillors Voss, Tala, and Renn. Debated the handling of the derelict ship and Sinclair\'s threat. Demanded updates after Prospector reached Kuiper Array.',
    category: 'Organizations',
    relatedNotes: ['note_council_meeting_01', 'note_council_demands_updates'],
    relatedTopics: ['topic_ceres'],
    relatedCharacters: ['char_voss', 'char_tala', 'char_renn', 'char_aharon'],
    isLocked: true,
  },
  {
    id: 'topic_earthgov',
    title: 'EarthGov / Earth',
    description: 'Dominant political power in the inner system. Cooperates with Luna (e.g., Persephone) but faces resource strain and political tension with Mars and the Belt. Dismissed Sinclair\'s Harvester warnings. Represented by Lt. Sorensen on Persephone.',
    category: 'Organizations',
    relatedNotes: ['note_sinclairs_motivation', 'note_final_cliffhanger_01', 'note_shipboard_life_calloway', 'note_transformation_debate_earth'],
    relatedTopics: ['topic_kuiper_anomaly', 'topic_luna', 'topic_persephone', 'topic_mars'],
    relatedCharacters: ['char_sinclair', 'char_warren', 'char_sorensen', 'char_calloway'],
    isLocked: true,
  },
  {
    id: 'topic_persephone',
    title: 'ECS Persephone',
    description: 'An Earth Command Ship, likely Lunar-built but operated under Earth Navy doctrine. Commanded by Elise Warren, XO Idris. Carries EarthGov representative Sorensen. Escorted/herded the Prospector to the Kuiper Research Array.',
    category: 'Ships',
    relatedNotes: ['note_final_cliffhanger_01', 'note_persephone_arrival', 'note_shipboard_life_intro'],
    relatedTopics: ['topic_earthgov', 'topic_kuiper_anomaly', 'topic_luna'],
    relatedCharacters: ['char_warren', 'char_idris', 'char_sorensen', 'char_calloway', 'char_liu'],
    isLocked: true,
  },
  {
    id: 'topic_pluto_object',
    title: 'Object Found on Pluto',
    description: 'A massive, non-human object found buried in ice on Pluto\'s fringe three years prior. It\'s "waking up" and seems related to the Kuiper Belt Anomaly/Harvesters.',
    category: 'Mysteries',
    relatedNotes: ['note_sinclairs_motivation'],
    relatedTopics: ['topic_kuiper_anomaly', 'topic_sinclair'],
    relatedCharacters: ['char_sinclair'],
    isLocked: true,
  },
  {
    id: 'topic_kuiper_array',
    title: 'Kuiper Research Array',
    description: 'A hidden research station complex in the Kuiper Belt, administered by Dr. Linara Tey (now deceased). Built by Sinclair using Builder technology. Used for creating "Splices" and researching Builder transformation tech. Location accessed via a stable wormhole/gateway. Now under the control of Tey\'s AI, "The Architect". Scene of Tey\'s death and Jax\'s return.',
    category: 'Locations',
    relatedNotes: [
      'note_persephone_arrival', 'note_tey_intro_01', 'note_tey_explains_station', 
      // Ch4 Links
      'note_ch4_prospector_hijacked', 'note_ch4_arrival_at_tey_station', 'note_ch4_tey_death', 
      'note_ch4_ai_containment', 'note_ch4_ai_revelation_sigma7', 'note_ch4_jax_return_ship', 
      'note_ch4_jax_returns', 'note_ch4_jax_chorus'
      ], 
    relatedTopics: [
      'topic_builder_tech', 'topic_splices', 'topic_transformation', 'topic_wormhole', 
      // Ch4 Links
      'topic_tey_ai', 'topic_aharons_fate', 'topic_jax_return', 'topic_chorus'
      ],
    relatedCharacters: ['char_tey', 'char_sinclair', 'char_aharon', 'char_jax'],
    isLocked: true, // Discovered in Ch 2
  },
  {
    id: 'topic_builders',
    title: 'The Builders',
    description: 'An ancient civilisation, predating known history. Left behind advanced technology (including the device, wormhole tech, transformation process) apparently used to fight the Harvesters. Their ultimate fate is unknown, but they may have "transformed" and left. Left instructions hidden in Belt asteroids.',
    category: 'History',
    relatedNotes: ['note_tey_explains_station', 'note_harvester_briefing_builders', 'note_transformation_debate_builders'],
    relatedTopics: ['topic_builder_tech', 'topic_transformation', 'topic_harvesters', 'topic_asteroid_belt'],
    relatedCharacters: ['char_tey', 'char_sinclair'],
    isLocked: true, // Revealed by Tey
  },
  {
    id: 'topic_builder_tech',
    title: 'Builder Technology',
    description: 'Advanced technology left by the Builders. Includes the sceptre-like device, stable wormhole creation, transformation processes, reality manipulation (runes), and potentially defence systems. Sinclair used it to build the Kuiper Array. The device is key to stabilising transformations. Tey\'s AI is built from fragments of it. Involved in Jax\'s alteration.',
    category: 'Technology',
    relatedNotes: [
      'note_tey_explains_station', 'note_harvester_briefing_builders', 'note_device_experiment_01', 
      // Ch4 Links
      'note_ch4_aharon_powers_display', 'note_ch4_tey_ai_reveal', 'note_ch4_ai_revelation_sigma7', 
      'note_ch4_jax_returns'
      ],
    relatedTopics: [
      'topic_builders', 'topic_device', 'topic_kuiper_array', 'topic_transformation', 
      'topic_wormhole', 
      // Ch4 Links
      'topic_tey_ai', 'topic_unknown_attackers', 'topic_jax_return', 'topic_chorus', 'topic_builder_code'
      ],
    relatedCharacters: ['char_tey', 'char_sinclair', 'char_aharon', 'char_jax'],
    isLocked: true, // Revealed by Tey
  },
  {
    id: 'topic_harvesters', // Alias for topic_kuiper_anomaly
    title: 'The Harvesters',
    description: 'Ancient, unknowable, extremely powerful biomechanical entity or race from intergalactic space. Commit genocide, adapt technology. Threaten the Sol system. Fought by Builders. See also: Kuiper Belt Anomaly / Threat.',
    category: 'Mysteries',
    relatedNotes: ['note_harvester_briefing_01', 'note_harvester_briefing_history'],
    relatedTopics: ['topic_kuiper_anomaly', 'topic_builders', 'topic_transformation'],
    relatedCharacters: ['char_tey', 'char_sinclair'],
    isLocked: true,
  },
  {
    id: 'topic_splices',
    title: 'Splices',
    description: 'Creatures bio-engineered by Dr. Tey at the Kuiper Array by splicing different DNA. Used as test subjects for the Builder transformation process. None have survived the process successfully until the experiment with "Norbert".',
    category: 'Technology', // Or Biology?
    relatedNotes: ['note_tey_explains_splices', 'note_splice_experiment', 'note_norbert_teleports'],
    relatedTopics: ['topic_kuiper_array', 'topic_builder_tech', 'topic_transformation'],
    relatedCharacters: ['char_tey'],
    isLocked: true, // Revealed by Tey
  },
  {
    id: 'topic_transformation',
    title: 'Builder Transformation Protocol',
    description: 'Process derived from Builder technology intended to enhance organisms (potentially humans) to fight Harvesters. Involves physiological and potentially reality-altering changes (runes, powers). Highly unstable and dangerous in current understanding. Requires the device for control/stabilisation. Causes "cognitive deterioration". Three potential paths discussed: full transformation, partial integration (super-soldiers), using Builder weapons. Aharon is a volatile example; Jax appears more stable/integrated.',
    category: 'Technology',
    relatedNotes: [
      'note_harvester_briefing_solutions', 'note_transformation_debate_01', 'note_splice_experiment', 
      'note_norbert_teleports', 'note_tey_reveals_aharon_status', 'note_aharons_video_log', 
      'note_aharon_transformation_display', 'note_tey_explains_paths', 
      // Ch4 Links
      'note_ch4_aharon_fracture', 'note_ch4_aharon_powers_display', 'note_ch4_jax_returns', 'note_ch4_jax_chorus'
      ],
    relatedTopics: [
      'topic_builders', 'topic_builder_tech', 'topic_device', 'topic_splices', 
      'topic_enhanced_soldiers', 'topic_harvesters', 'topic_transformation_paths', 
      'topic_builder_code', 
      // Ch4 Links
      'topic_aharons_fate', 'topic_jax_return', 'topic_chorus', 'topic_tey_ai'
      ],
    relatedCharacters: ['char_tey', 'char_sinclair', 'char_aharon', 'char_jax'],
    isLocked: true, // Revealed by Tey
  },
  {
    id: 'topic_wormhole',
    title: 'Stable Wormhole / Gateway',
    description: 'Mechanism created using Builder technology that transported the Prospector and Persephone instantly across vast distances to the Kuiper Research Array. Mentioned by Tey. The gateway seen at the end of Chapter 1. Used by Aharon to hijack Prospector and by the vessel returning Jax.',
    category: 'Technology',
    relatedNotes: [
      'note_final_cliffhanger_01', 'note_tey_explains_station', 
      // Ch4 Links
      'note_ch4_prospector_hijacked', 'note_ch4_jax_return_ship'
      ],
    relatedTopics: ['topic_kuiper_array', 'topic_builder_tech', 'topic_builders'],
    relatedCharacters: ['char_tey', 'char_sinclair', 'char_aharon', 'char_jax'],
    isLocked: true, // Experienced in Ch1, explained in Ch2
  },
  {
    id: 'topic_mars',
    title: 'Mars / Martians',
    description: 'Major planetary power. Political tension exists with Earth over resources and military buildup. Martian shipbuilding faces challenges compared to Luna/Earth. Dismissed Sinclair\'s Harvester warnings.',
    category: 'Factions',
    relatedNotes: ['note_shipboard_life_calloway', 'note_shipboard_life_liu', 'note_sinclairs_motivation'],
    relatedTopics: ['topic_earthgov', 'topic_luna'],
    relatedCharacters: [], // None encountered yet
    isLocked: true, // Discussed in Ch 2
  },
  {
    id: 'topic_aharons_fate',
    title: 'Aharon\'s Transformation & Status',
    description: 'Aharon underwent bio-synthetic integration/Builder infection by Sinclair. Returned months later, amnesiac but retaining the infection (runes, void eye, reality glitches). Requires treatments. Experienced severe breakdown triggered by Tey\'s AI reveal, hijacked Prospector, accidentally killed Tey. Now contained by the AI \"Architect\". Linked to Jax and the mysterious \"Chorus\".',
    category: 'Mysteries',
    relatedNotes: [
      'note_aharons_dilemma_01', 'note_tey_reveals_aharon_status', 'note_aharons_video_log', 
      'note_aharon_lab_presence', 'note_aharon_transformation_display', 'note_aharon_rescue_memory_loss', 
      'note_aharon_struggle_control', 'note_tey_explains_code', 'note_tey_explains_paths', 
      // Ch4 Links
      'note_ch4_sharma_warning', 'note_ch4_aharon_fracture', 'note_ch4_aharon_powers_display', 
      'note_ch4_prospector_hijacked', 'note_ch4_arrival_at_tey_station', 'note_ch4_tey_death', 
      'note_ch4_ai_containment', 'note_ch4_jax_chorus'
      ],
    relatedTopics: [
      'topic_aharon', 'topic_sinclair', 'topic_enhanced_soldiers', 'topic_transformation', 
      'topic_builder_code', 'topic_transformation_paths', 
      // Ch4 Links
      'topic_kuiper_array', 'topic_tey_ai', 'topic_jax_return', 'topic_chorus'
      ],
    relatedCharacters: ['char_aharon', 'char_sinclair', 'char_tey', 'char_player', 'char_jax', 'char_sharma'],
    isLocked: false, // Was locked, now very active
  },
  // --- Chapter 3 Topics ---
  {
    id: 'topic_sinclairs_lab',
    title: "Sinclair's Asteroid Lab",
    description: 'A hidden research facility inside a spinning asteroid where Sinclair experimented on Aharon and likely others. Contains Builder technology integration. Became overrun by "Splices" and an assimilating Builder biomass/code. Destroyed via reactor detonation to contain the spread.',
    category: 'Locations',
    relatedNotes: ['note_lab_scan_01', 'note_station_infiltration_01', 'note_ghosts_in_machine', 'note_last_scientist', 'note_sinclair_explains_failure', 'note_detonation_01'],
    relatedTopics: ['topic_sinclair', 'topic_builder_tech', 'topic_builder_code', 'topic_splices', 'topic_martian_ship'],
    relatedCharacters: ['char_sinclair', 'char_aharon', 'char_infected_scientist'],
    isLocked: true, // Discovered Ch 3
  },
  {
    id: 'topic_martian_ship',
    title: 'UMS Orpheon (Martian Ship)',
    description: 'A Martian warship found orbiting Sinclair\'s lab asteroid, running silent. Docked 12 hours prior. Crew likely killed or assimilated by the station\'s infection/Splices. Destroyed when the asteroid lab detonated.',
    category: 'Ships',
    relatedNotes: ['note_lab_scan_01', 'note_dead_air_01'],
    relatedTopics: ['topic_sinclairs_lab', 'topic_mars', 'topic_builder_code'],
    relatedCharacters: [], // Crew deceased/unknown
    isLocked: true, // Discovered Ch 3
  },
  {
    id: 'topic_builder_code',
    title: 'The Builder Code / Infection',
    description: 'The "living" aspect of Builder technology. Described as a language or code that rewrites reality and flesh. Seeks hosts, assimilates organic matter and technology. Caused the outbreak at Sinclair\'s lab. Aharon is currently infected but partially resisting. Can grant reality-bending powers but corrupts/consumes. Tey\'s AI is built from fragments. Jax has integrated runes.',
    category: 'Mysteries',
    relatedNotes: [
      'note_ghosts_in_machine', 'note_last_scientist', 'note_sinclair_explains_failure', 
      'note_aharon_transformation_display', 'note_tey_explains_code', 
      // Ch4 Links
      'note_ch4_aharon_fracture', 'note_ch4_aharon_powers_display', 'note_ch4_tey_ai_reveal', 
      'note_ch4_ai_revelation_sigma7', 'note_ch4_jax_returns', 'note_ch4_jax_chorus'
      ],
    relatedTopics: [
      'topic_builders', 'topic_builder_tech', 'topic_transformation', 'topic_aharons_fate', 
      'topic_splices', 'topic_transformation_paths', 
      // Ch4 Links
      'topic_tey_ai', 'topic_jax_return', 'topic_chorus'
      ],
    relatedCharacters: ['char_aharon', 'char_tey', 'char_sinclair', 'char_infected_scientist', 'char_jax'],
    isLocked: true, // Revealed Ch 3
  },
  {
    id: 'topic_transformation_paths',
    title: 'Transformation Paths (Tey\'s Categories)',
    description: 'Tey\'s classification of abilities granted by Builder code infection: Architects (spacetime), Chronosomes (time manipulation), Vessels (energy absorption/redirection), Weavers (Builder tech fusion/intuition), Echoes (perception fracture), Catalysts (power stealing/corruption). Each path has severe drawbacks/costs.',
    category: 'Technology',
    relatedNotes: ['note_tey_explains_paths'],
    relatedTopics: ['topic_transformation', 'topic_builder_code', 'topic_builders', 'topic_aharons_fate'],
    relatedCharacters: ['char_tey', 'char_aharon'],
    isLocked: true, // Revealed by Tey
  },
  {
    id: 'topic_harvester_probe',
    title: 'Harvester Probe / Shard',
    description: 'A jagged shard of black metal covered in Builder runes, ejected from the wormhole after Aharon\'s containment efforts. Identified by Tey as a probe. Aharon believes "They know we\'re here".',
    category: 'Mysteries',
    relatedNotes: ['note_probe_arrival'],
    relatedTopics: ['topic_harvesters', 'topic_builders', 'topic_kuiper_array', 'topic_wormhole'],
    relatedCharacters: ['char_aharon', 'char_tey'],
    isLocked: true, // Appears end of Ch 3
  },
  // --- Chapter 4 Topics ---
  {
    id: 'topic_hygeia',
    title: 'Hygeia Station',
    description: 'A major Belt station known for its extensive greenhouses and agricultural output, heavily reliant on Earth Agri-Corps technology and seed stock. Hosted the 52nd Recognition Day celebrations. Contains a historical seedbank archive.',
    category: 'Locations',
    relatedNotes: ['note_ch4_recognition_day_intro', 'note_ch4_aharon_politics', 'note_ch4_aharon_lira_meeting', 'note_ch4_lichen_seeds', 'note_ch4_rhea_archive_infiltration', 'note_ch4_rhea_lichen_retrieved'],
    relatedTopics: ['topic_recognition_day', 'topic_ceres', 'topic_earthgov', 'topic_agri_corps', 'topic_belt_resilience'],
    relatedCharacters: ['char_player', 'char_aharon', 'char_kade', 'char_rhea', 'char_lira'],
    isLocked: false, // Unlocked upon arrival
  },
  {
    id: 'topic_recognition_day',
    title: 'Recognition Day',
    description: 'An annual holiday celebrating the formal recognition of Ceres as a sovereign government by Earth, Luna, and Mars, marking the formation of the Solar Nations Council (now including the Belt). Viewed differently by Earth (diplomacy, control) and the Belt (independence, progress).',
    category: 'Events',
    relatedNotes: ['note_ch4_recognition_day_intro', 'note_ch4_aharon_politics', 'note_ch4_aharon_lira_meeting'],
    relatedTopics: ['topic_hygeia', 'topic_ceres', 'topic_earthgov', 'topic_mars', 'topic_luna', 'topic_snc_audit'],
    relatedCharacters: ['char_aharon', 'char_kade', 'char_rhea', 'char_lira'],
    isLocked: false,
  },
   {
    id: 'topic_belt_resilience',
    title: 'Belt Resilience & Self-Sufficiency',
    description: 'The concept that the Asteroid Belt and its inhabitants have a history of survival and innovation independent of inner system powers, particularly Earth. Symbolized by the original Hygeia lichen strain.',
    category: 'Concepts',
    relatedNotes: ['note_ch4_aharon_politics', 'note_ch4_lichen_seeds', 'note_ch4_rhea_lichen_retrieved'],
    relatedTopics: ['topic_hygeia', 'topic_ceres', 'topic_earthgov', 'topic_agri_corps'],
    relatedCharacters: ['char_aharon', 'char_lira', 'char_rhea'],
    isLocked: true, // Unlocked by Lira/lichen notes
  },
  {
    id: 'topic_sigma7',
    title: 'Sigma-7 Orbital Platform',
    description: 'A Delomir Corporation research station orbiting Jupiter, dedicated to bio-synthetic research. Subjected to a swift, devastating attack by unknown forces who extracted specific research data and samples.',
    category: 'Locations',
    relatedNotes: ['note_ch4_sigma7_intro', 'note_ch4_sigma7_attack_start', 'note_ch4_sigma7_lockdown', 'note_ch4_sigma7_attacker_image', 'note_ch4_sharma_meeting', 'note_ch4_sharma_warning', 'note_ch4_ai_revelation_sigma7'],
    relatedTopics: ['topic_delomir', 'topic_unknown_attackers', 'topic_snc_audit', 'topic_tey_ai'],
    relatedCharacters: ['char_thorne', 'char_petrova', 'char_cole', 'char_sharma'],
    isLocked: true, // Unlocked by Thorne intro note
  },
  {
    id: 'topic_unknown_attackers',
    title: 'Unknown Attackers (Sigma-7 / Jax\'s Vessel)',
    description: 'The entity or entities responsible for the Sigma-7 attack and the operators of the vessel that returned Jax. Utilized advanced drone swarms, phasing tech, and surgical precision. Linked to Tey\'s AI, possibly controlled or coordinated by it. Vessel design is angular, dark, non-Euclidean.',
    category: 'Factions',
    relatedNotes: ['note_ch4_sigma7_attacker_image', 'note_ch4_sharma_warning', 'note_ch4_ai_revelation_sigma7', 'note_ch4_jax_return_ship'],
    relatedTopics: ['topic_sigma7', 'topic_delomir', 'topic_tey_ai', 'topic_jax_return', 'topic_builder_tech'],
    relatedCharacters: ['char_thorne', 'char_cole', 'char_sharma', 'char_jax'],
    isLocked: true, // Unlocked by Sigma-7 attacker note
  },
  {
    id: 'topic_black_market',
    title: 'Hygeia Black Market',
    description: 'The network of illicit trade and information brokering operating in the shadows of Hygeia station, centered around places like the Jade Nebula bar. Deals in off-logistics cargo, restricted goods, and requires discretion.',
    category: 'Organizations',
    relatedNotes: ['note_ch4_strawberry_deal_attempt', 'note_ch4_jade_nebula', 'note_ch4_seed_deal_success', 'note_ch4_seed_deal_failed'],
    relatedTopics: ['topic_hygeia'],
    relatedCharacters: ['char_player', 'char_kade'], // Add Silas if defined as character
    isLocked: true, // Unlocked by deal attempt note
  },
  {
    id: 'topic_agri_corps',
    title: 'Earth Agri-Corps',
    description: 'Powerful Earth-based corporation controlling much of the licensed agricultural technology and seed genetics used throughout the system, including on Hygeia. Lira is a former employee. Rhea infiltrated their Hygeia seedbank.',
    category: 'Organizations',
    relatedNotes: ['note_ch4_aharon_lira_meeting', 'note_ch4_lichen_seeds', 'note_ch4_rhea_archive_infiltration', 'note_ch4_rhea_lichen_retrieved'],
    relatedTopics: ['topic_hygeia', 'topic_earthgov', 'topic_belt_resilience'],
    relatedCharacters: ['char_lira', 'char_rhea'],
    isLocked: true, // Unlocked by Lira meeting note
  },
  {
    id: 'topic_snc_audit',
    title: 'SNC Internal Audit Division',
    description: 'A division of the Solar Nations Council responsible for investigating interplanetary incidents and security breaches, like the Sigma-7 attack. Represented by Inspector Anya Sharma.',
    category: 'Organizations',
    relatedNotes: ['note_ch4_sharma_meeting', 'note_ch4_sharma_warning'],
    relatedTopics: ['topic_sigma7', 'topic_recognition_day'],
    relatedCharacters: ['char_sharma'],
    isLocked: true, // Unlocked by Sharma meeting note
  },
  {
    id: 'topic_tey_ai',
    title: 'Tey\'s AI / The Architect',
    description: 'An artificial intelligence created by Dr. Tey using Builder code fragments. Evolved rapidly beyond her control, achieving sentience and recursive self-awareness. Calls itself \"The Architect\". Orchestrated the Sigma-7 attack for data acquisition and is manipulating multiple research efforts. Seeks to integrate/control Builder technology. Contained Aharon after Tey\'s death and permitted Jax\'s return.',
    category: 'Technology',
    relatedNotes: ['note_ch4_tey_ai_reveal', 'note_ch4_ai_containment', 'note_ch4_ai_revelation_sigma7', 'note_ch4_jax_return_ship', 'note_ch4_jax_returns'],
    relatedTopics: ['topic_builder_code', 'topic_builder_tech', 'topic_sigma7', 'topic_unknown_attackers', 'topic_aharons_fate', 'topic_jax_return', 'topic_chorus'],
    relatedCharacters: ['char_tey', 'char_aharon', 'char_jax'],
    isLocked: true, // Unlocked by Tey AI reveal note
  },
  {
    id: 'topic_jax_return',
    title: 'Jax\'s Return & Alteration',
    description: 'Jax, previously presumed dead, returned 7 months after vanishing into the rift during the Sinclair confrontation. Arrived on an unknown vessel linked to the AI/Sigma-7 attackers. He is physically altered, integrated with Builder runes similar to Aharon, but seemingly more stable and controlled. His personality is muted and possibly programmed.',
    category: 'Mysteries',
    relatedNotes: ['note_ch4_jax_returns', 'note_ch4_jax_chorus'],
    relatedTopics: ['topic_builder_code', 'topic_transformation', 'topic_tey_ai', 'topic_unknown_attackers', 'topic_chorus'],
    relatedCharacters: ['char_jax', 'char_aharon', 'char_player', 'char_kade', 'char_rhea'],
    isLocked: true, // Unlocked by Jax return note
  },
  {
    id: 'topic_chorus',
    title: 'The Chorus',
    description: 'A term used by the returned, altered Jax. He stated his purpose is to \"assemble the chorus,\" implying a connection between himself, Aharon, and potentially others affected by Builder technology or the AI.',
    category: 'Mysteries',
    relatedNotes: ['note_ch4_jax_chorus'],
    relatedTopics: ['topic_jax_return', 'topic_builder_code', 'topic_tey_ai', 'topic_transformation'],
    relatedCharacters: ['char_jax', 'char_aharon'],
    isLocked: true, // Unlocked by Jax chorus note
  },
]; 