import { PlayerCharacter } from '../../types/game';

// Define a more specific type for Dossier characters if needed, 
// extending or modifying PlayerCharacter or creating a new one.
// For now, we'll assume Dossier characters match PlayerCharacter structure closely
// but might need adjustments based on Dossier requirements (e.g., relationship, stress)

// Placeholder for Dossier-specific character type - adjust as needed
export interface DossierCharacter {
  id: string;
  name: string;
  role: string; // Added role
  portrait: string; // Maybe use avatar? or have a specific portrait field
  relationship: 'Wary' | 'Neutral' | 'Cooperative' | 'Allied' | 'Trusted';
  stressLevel: 'Calm' | 'Tense' | 'Stressed' | 'Critical';
  traumaTraits: string[];
  bio: string;
  notes: string[]; // IDs of related notes
}

export const characters: DossierCharacter[] = [
  // Example Character (can be removed later)
  {
    id: 'char_001',
    name: 'Jax',
    role: 'Engineer',
    portrait: 'path/to/jax_portrait.png', // Replace with actual path or identifier
    relationship: 'Neutral',
    stressLevel: 'Calm',
    traumaTraits: [],
    bio: 'Chief Engineer of the Stardust Drifter. Seen a lot.',
    notes: [],
  },
  // ... Add more characters here
  {
    id: 'char_player',
    name: 'Player (Captain)', // Player can likely name them later
    role: 'Captain',
    portrait: 'path/to/player_portrait.png',
    relationship: 'Neutral', // Default, maybe adjustable based on background choice
    stressLevel: 'Tense', // Given the recent events
    traumaTraits: ['Witnessed Parents\' Death'],
    bio: 'Captain of the Prospector. Pulled from the ashes of a Ceres tragedy by Aharon. Trying to survive and protect their crew.',
    notes: ['note_prologue_01', 'note_player_reflection_01', 'note_aharons_confession_01'], // Example note IDs
  },
  {
    id: 'char_aharon',
    name: 'Aharon',
    role: 'Mentor',
    portrait: 'path/to/aharon_portrait.png',
    relationship: 'Trusted',
    stressLevel: 'Critical',
    traumaTraits: ['Survivor\'s Guilt (Parents)', 'Complicated Past (Delomir)', 'Builder Code Infection', 'Amnesia/Memory Fragmentation', 'Self-Sacrifice Complex?', 'Caused Tey\'s Death (Unintentional)', 'AI Containment', 'Witnessed Jax\'s Return (Altered)'],
    bio: 'Saved the player years ago. Captured by Sinclair and subjected to bio-synthetic integration/Builder tech. Stabilised but infected/possessed by Builder code. Rescued/retrieved by crew, suffering memory loss. Body altered (runes, void eye), exhibits reality-warping abilities but struggled for control. Requires treatments from Tey (now deceased). Nanotech and prior self-modification fighting the infection. Experienced severe breakdown upon learning of Tey\'s AI, hijacked the Prospector. Accidentally killed Tey during confrontation. Now contained by Tey\'s AI (The Architect).',
    notes: [
      'note_prologue_02', 'note_aharon_provides_job', 'note_aharon_warns', 
      'note_aharons_confession_01', 'note_aharons_confession_02', 'note_aharons_dilemma_01', 
      'note_tey_reveals_aharon_status', 'note_aharons_video_log', 'note_aharon_lab_presence', 
      'note_aharon_transformation_display', 'note_aharon_rescue_memory_loss', 'note_aharon_struggle_control',
      'note_ch4_recognition_day_intro', 'note_ch4_aharon_politics', 'note_ch4_aharon_lira_meeting', 
      'note_ch4_lichen_seeds', 'note_ch4_sharma_meeting', 'note_ch4_sharma_warning', 
      'note_ch4_aharon_fracture', 'note_ch4_aharon_powers_display', 'note_ch4_prospector_hijacked', 
      'note_ch4_arrival_at_tey_station', 'note_ch4_tey_death', 'note_ch4_ai_containment', 'note_ch4_jax_chorus'
    ],
  },
  {
    id: 'char_kade',
    name: 'Kade',
    role: 'Pilot',
    portrait: 'path/to/kade_portrait.png',
    relationship: 'Cooperative',
    stressLevel: 'Tense',
    traumaTraits: ['Lost Former Squad'],
    bio: 'Cocky pilot of the Prospector. Believes in \'winging it\'. Banters with Rhea. Values the crew as people, scarred by losing a previous military squad.',
    notes: ['note_crew_intro_kade', 'note_kade_past_01'],
  },
  {
    id: 'char_rhea',
    name: 'Rhea',
    role: 'Engineer',
    portrait: 'path/to/rhea_portrait.png',
    relationship: 'Cooperative',
    stressLevel: 'Stressed',
    traumaTraits: ['Parents Died (Delomir Accident)', 'Distrustful'],
    bio: 'Serious, skilled engineer. Prefers planning. Grew up on Vesta, parents worked for Delomir and died in a lab accident she blames on Sinclair. Recruited by Aharon.',
    notes: ['note_crew_intro_rhea', 'note_rhea_past_01', 'note_rhea_repairs_01'],
  },
  {
    id: 'char_jax',
    name: 'Jax',
    role: 'Muscle / Security / Altered Returnee?',
    portrait: 'path/to/jax_portrait.png',
    relationship: 'Wary',
    stressLevel: 'Calm',
    traumaTraits: ['Burdened by Past (Luna)', 'Returned from Rift (Altered)', 'Builder Rune Integration'],
    bio: 'Quiet, observant muscle of the crew. Pragmatic. Former embedded operative ("ghost") on Luna. Believed lost in the rift 7 months ago during Sinclair confrontation. Returned via unknown vessel controlled/permitted by Tey\'s AI. Physically altered, integrated with Builder runes similar to Aharon but more stable/controlled. Demeanor is flat, distant, potentially programmed. States purpose is to assemble "The Chorus".',
    notes: [
      'note_crew_intro_jax', 'note_jax_past_01', 
      'note_ch4_jax_memorial', 'note_ch4_jax_returns', 'note_ch4_jax_chorus'
    ],
  },
  {
    id: 'char_sinclair',
    name: 'Rupert Sinclair',
    role: 'Head of Delomir / Desperate Scientist',
    portrait: 'path/to/sinclair_portrait.png',
    relationship: 'Wary',
    stressLevel: 'Critical',
    traumaTraits: ['Driven by Fear (Harvesters)'],
    bio: 'Head of Delomir. Captured Aharon to stabilise Builder tech against Harvesters. Experiments failed, leading to Splice outbreak/station assimilation. Reveals Builder code is "alive" and needs a host. Tried to destroy the station to contain the threat. Current status unknown after station destruction.',
    notes: ['note_aharons_confession_01', 'note_sinclairs_motivation', 'note_sinclairs_lab_01', 'note_aharon_lab_presence', 'note_sinclair_explains_failure', 'note_sinclair_detonation_plan'],
  },
  // --- Minor/Deceased Characters (Optional) ---
  {
    id: 'char_father',
    name: 'Father (Deceased)',
    role: 'Player\'s Father',
    portrait: 'path/to/father_portrait.png',
    relationship: 'Trusted', // Memory
    stressLevel: 'Calm', // Memory
    traumaTraits: [],
    bio: 'Player\'s father. Worked with tools, fixed drones. Killed during the attack on Ceres.',
    notes: ['note_prologue_01'],
  },
  {
    id: 'char_mother',
    name: 'Mother (Deceased)',
    role: 'Player\'s Mother',
    portrait: 'path/to/mother_portrait.png',
    relationship: 'Trusted', // Memory
    stressLevel: 'Calm', // Memory
    traumaTraits: [],
    bio: "Player's mother. Kind, wise ('Home isn't walls. It's people.'). Killed during the attack on Ceres.",
    notes: ['note_prologue_01'],
  },
  // --- Ceres Council (Consider adding if they become more involved) ---
  // { id: 'char_voss', name: 'Councillor Voss', role: 'Ceres Council', ... },
  // { id: 'char_tala', name: 'Councillor Tala', role: 'Ceres Council', ... },
  // { id: 'char_renn', name: 'Councillor Renn', role: 'Ceres Council', ... },
  // --- Chapter 2 Characters ---
  {
    id: 'char_tey',
    name: 'Dr. Linara Tey (Deceased)',
    role: 'Xenobiologist / Station Administrator',
    portrait: 'path/to/tey_portrait.png',
    relationship: 'Wary',
    stressLevel: 'Calm',
    traumaTraits: ['Moral Compromise (Splices)', 'Distrust of Authority (Delomir)'],
    bio: 'Former Delomir xenobiologist, recruited by Aharon. Ran the Kuiper Research Array. Created "Splices" using Builder technology provided by Sinclair. Created a rapidly evolving, sentient AI (The Architect) using Builder code fragments to analyze the tech. Accidentally killed by Aharon during his breakdown/confrontation on the station.',
    notes: [
      'note_tey_intro_01', 'note_tey_explains_station', 'note_tey_reveals_aharon_status', 
      'note_tey_splice_experiment', 'note_aharons_video_log', 'note_rescue_mission_approval', 
      'note_ch4_tey_ai_reveal', 'note_ch4_tey_death'
    ],
  },
  {
    id: 'char_warren',
    name: 'Commander Elise Warren',
    role: 'CO, ECS Persephone',
    portrait: 'path/to/warren_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Calm',
    traumaTraits: [], // Unknown
    bio: 'Commanding Officer of the Earth Command Ship Persephone. Pragmatic, focused on mission objectives and assessing threats. Initially sceptical but acknowledges the potential necessity of the Builder tech. Allows the unsanctioned rescue mission.',
    notes: ['note_persephone_arrival', 'note_harvester_briefing_warren', 'note_transformation_debate_warren', 'note_rescue_mission_approval'],
  },
  {
    id: 'char_sorensen',
    name: 'Lieutenant Sorensen',
    role: 'EarthGov Representative / Officer',
    portrait: 'path/to/sorensen_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Calm',
    traumaTraits: ['Ex-Spook Mentality?'], // Speculation by Idris
    bio: 'Officer aboard the Persephone, potentially representing Earth Government interests. Sharp, diplomatic but firm. Advocates for controlled, selective use of the transformation technology, fearing broader conflict or loss of control.',
    notes: ['note_harvester_briefing_sorensen', 'note_transformation_debate_sorensen', 'note_shipboard_life_sorensen'],
  },
  {
    id: 'char_idris',
    name: 'Colonel Idris',
    role: 'XO, ECS Persephone',
    portrait: 'path/to/idris_portrait.png',
    relationship: 'Neutral', // Becomes Cooperative?
    stressLevel: 'Calm',
    traumaTraits: [], // Unknown
    bio: 'Executive Officer of the Persephone. Practical, experienced implementer of Warren\'s decisions. Served with Warren for years. Recognises the player\'s competence.',
    notes: ['note_shipboard_life_idris'],
  },
  {
    id: 'char_calloway',
    name: 'Lieutenant Calloway',
    role: 'Logistics Officer, ECS Persephone',
    portrait: 'path/to/calloway_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Calm',
    traumaTraits: [], // Unknown
    bio: 'Earther logistics officer on the Persephone. Aware of the resource tensions between Earth and the colonies/Belt. Defends Earth\'s policies as necessary for stability, though acknowledges unfairness.',
    notes: ['note_shipboard_life_calloway'],
  },
  {
    id: 'char_liu',
    name: 'Lieutenant Darya Liu',
    role: 'Officer, ECS Persephone',
    portrait: 'path/to/liu_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Calm',
    traumaTraits: [], // Unknown
    bio: 'Lunar-born officer on the Persephone. Discusses the interplay and technological differences between Earth, Luna, and Mars navies.',
    notes: ['note_shipboard_life_liu'],
  },
  // --- Add Chapter 3 Persephone Away Team ---
  {
    id: 'char_voss_lt',
    name: 'Lieutenant Voss',
    role: 'Medic, ECS Persephone',
    portrait: 'path/to/voss_lt_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Stressed',
    traumaTraits: [],
    bio: 'Persephone medic assigned to the player\'s infiltration team. Equipped with a bioscanner. Witnessed the horrors on Sinclair\'s station.',
    notes: ['note_station_infiltration_01'],
  },
  {
    id: 'char_novak',
    name: 'Specialist Novak',
    role: 'Tech Officer, ECS Persephone',
    portrait: 'path/to/novak_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Stressed',
    traumaTraits: ['Builder Code Exposure?'],
    bio: 'Persephone tech officer assigned to the infiltration team. Carries EMP rig. Systems compromised by station\'s influence. Attacked by Builder tendrils.',
    notes: ['note_station_infiltration_01', 'note_ghosts_in_machine'],
  },
  {
    id: 'char_hale',
    name: 'Sergeant Hale',
    role: 'Security, ECS Persephone',
    portrait: 'path/to/hale_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Stressed',
    traumaTraits: [],
    bio: 'Persephone security sergeant assigned to the infiltration team. Armed with a plasma cutter. Pragmatic and focused on threats.',
    notes: ['note_station_infiltration_01', 'note_ghosts_in_machine'],
  },
  {
    id: 'char_infected_scientist',
    name: 'Infected Scientist',
    role: 'Builder Code Host / Warning',
    portrait: 'path/to/scientist_portrait.png',
    relationship: 'Wary',
    stressLevel: 'Critical',
    traumaTraits: ['Assimilated by Builder Code'],
    bio: 'A scientist found in a sublevel lab, assimilated by the Builder code/biomass. Delivered cryptic warnings about Sinclair\'s failure, the nature of the code, and its presence within the crew before being presumably destroyed/reabsorbed.',
    notes: ['note_last_scientist'],
  },
  // --- Chapter 4 Characters ---
  {
    id: 'char_lira',
    name: 'Lira',
    role: 'Botanist / Ex-Agri-Corps',
    portrait: 'path/to/lira_portrait.png',
    relationship: 'Neutral', // Starts neutral, potentially cooperative?
    stressLevel: 'Calm',
    traumaTraits: [], // Unknown
    bio: "Former Earth Agri-Corps botanist who helped design Hygeia's greenhouses. Believes in cooperation and interdependence between Earth and Belt. Gives Aharon seeds for original Hygeia lichen.",
    notes: ['note_ch4_aharon_lira_meeting', 'note_ch4_lichen_seeds'],
  },
  {
    id: 'char_thorne',
    name: 'Dr. Aris Thorne',
    role: 'Delomir Scientist / Sigma-7 Control',
    portrait: 'path/to/thorne_portrait.png',
    relationship: 'Neutral', // Unknown to player crew
    stressLevel: 'Critical', // During attack
    traumaTraits: ['Witnessed Sigma-7 Attack'],
    bio: "Delomir scientist working in Observation Control on Sigma-7 during the attack. Witnessed initial stages and system lockout.",
    notes: ['note_ch4_sigma7_intro', 'note_ch4_sigma7_attack_start', 'note_ch4_sigma7_lockdown', 'note_ch4_sigma7_attacker_image'],
  },
  {
    id: 'char_petrova',
    name: 'Dr. Lena Petrova',
    role: 'Delomir Scientist / Sigma-7 Lab Lead?',
    portrait: 'path/to/petrova_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Critical', // During attack
    traumaTraits: ['Sigma-7 Attack Victim?'],
    bio: "Delomir scientist presumably leading research in Sigma-7's main lab. Her panicked comm transmission was cut off during the attack. Status unknown, likely deceased.",
    notes: ['note_ch4_sigma7_attack_start'],
  },
  {
    id: 'char_cole',
    name: 'Marcus Cole',
    role: 'Security Chief / Sigma-7',
    portrait: 'path/to/cole_portrait.png',
    relationship: 'Neutral',
    stressLevel: 'Critical', // During attack
    traumaTraits: ['Sigma-7 Attack Victim?'],
    bio: "Security Chief on Sigma-7. Reported attackers phasing through doors and resisting plasma fire before his comms were cut. Status unknown, likely deceased.",
    notes: ['note_ch4_sigma7_attacker_image'],
  },
  {
    id: 'char_sharma',
    name: 'Inspector Anya Sharma',
    role: 'SNC Internal Audit Division',
    portrait: 'path/to/sharma_portrait.png',
    relationship: 'Neutral', // Professional investigator
    stressLevel: 'Calm', // Professional demeanor
    traumaTraits: [], // Unknown
    bio: "Solar Nations Council investigator assigned to the Sigma-7 incident. Professional, weary, suspects deeper complexities than standard corporate espionage. Warned the crew about hidden dangers in Delomir research.",
    notes: ['note_ch4_sharma_meeting', 'note_ch4_sharma_warning'],
  },
]; 