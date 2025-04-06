// Define the Hypothesis interface matching the structure used in HypothesesTab.tsx
export interface Hypothesis {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
  requiredNotes: string[];
  conclusions: {
    id: string;
    text: string;
    isSelected: boolean; // This likely shouldn't be part of the *data*, but managed in runtime state
  }[];
  relatedTopics: string[];
  relatedCharacters: string[];
}

// Define a type for the static data, omitting runtime state like isSelected
export type HypothesisData = Omit<Hypothesis, 'conclusions'> & {
  conclusions: Omit<Hypothesis['conclusions'][number], 'isSelected'>[];
};

export const allHypotheses: HypothesisData[] = [
  // Example Hypothesis (can be removed later)
  {
    id: 'hyp_001',
    title: 'Origin of the Device',
    description: 'Investigate the nature and purpose of the Builder device found on the derelict.',
    status: 'active',
    requiredNotes: ['note_device_found_01', 'note_device_experiment_01'],
    conclusions: [
      { id: 'hyp_001_con_1', text: "Device is primarily a weapon." },
      { id: 'hyp_001_con_2', text: "Device is a communication tool." },
      { id: 'hyp_001_con_3', text: "Device is key to Builder transformation tech." },
      { id: 'hyp_001_con_4', text: "Device is related to the Harvester threat directly." },
    ],
    relatedTopics: ['topic_device', 'topic_builder_tech', 'topic_transformation', 'topic_harvesters'],
    relatedCharacters: ['char_player', 'char_aharon', 'char_sinclair', 'char_tey'],
  },
  {
    id: 'hyp_sinclairs_goal_01',
    title: "Sinclair's True Goal",
    description: 'Determine Rupert Sinclair\'s ultimate objective regarding the Builder tech and the Harvester threat.',
    status: 'active',
    requiredNotes: ['note_aharons_confession_01', 'note_sinclairs_motivation', 'note_sinclair_explains_failure'],
    conclusions: [
      { id: 'hyp_sinclairs_goal_con_1', text: "Sinclair genuinely wants to save humanity, using any means (even flawed ones)." },
      { id: 'hyp_sinclairs_goal_con_2', text: "Sinclair seeks power, using the Harvester threat as justification." },
      { id: 'hyp_sinclairs_goal_con_3', text: "Sinclair is being controlled or influenced by the Builder code/Harvesters." },
      { id: 'hyp_sinclairs_goal_con_4', text: "Sinclair aimed to weaponise the tech but lost control." },
    ],
    relatedTopics: ['topic_sinclair', 'topic_delomir', 'topic_harvesters', 'topic_builder_tech', 'topic_transformation', 'topic_enhanced_soldiers', 'topic_builder_code'],
    relatedCharacters: ['char_sinclair', 'char_aharon', 'char_tey'],
  },
  {
    id: 'hyp_aharons_status_01',
    title: "Aharon's Condition & Future",
    description: 'Investigate Aharon\'s physical and mental state after infection and return. Can he control it? What are his true intentions now?',
    status: 'active',
    requiredNotes: ['note_tey_reveals_aharon_status', 'note_aharons_video_log', 'note_aharon_rescue_memory_loss', 'note_aharon_struggle_control'],
    conclusions: [
      { id: 'hyp_aharons_status_con_1', text: "Aharon retains his core personality and goals." },
      { id: 'hyp_aharons_status_con_2', text: "Aharon's mind is fractured/amnesiac but recoverable with Tey's help." },
      { id: 'hyp_aharons_status_con_3', text: "The Builder code is slowly consuming Aharon completely." },
      { id: 'hyp_aharons_status_con_4', text: "Aharon is a willing host/bridge for the Builder code." },
      { id: 'hyp_aharons_status_con_5', text: "Aharon's return is part of a larger plan (Builder or Harvester?)." },
    ],
    relatedTopics: ['topic_aharons_fate', 'topic_sinclair', 'topic_transformation', 'topic_enhanced_soldiers', 'topic_builder_code', 'topic_transformation_paths'],
    relatedCharacters: ['char_aharon', 'char_sinclair', 'char_tey', 'char_player'],
  },
  {
    id: 'hyp_transformation_ethics_01',
    title: "The Ethics & Viability of Transformation",
    description: 'Explore the moral implications and practical possibility of using the Builder transformation technology against the Harvesters.',
    status: 'active',
    requiredNotes: ['note_harvester_briefing_solutions', 'note_transformation_debate_01', 'note_splice_experiment', 'note_norbert_teleports', 'note_tey_explains_paths'],
    conclusions: [
      { id: 'hyp_transformation_ethics_con_1', text: "Transformation is necessary and can be controlled with the device/Tey's research." },
      { id: 'hyp_transformation_ethics_con_2', text: "Controlled, limited transformation is the only ethical path." },
      { id: 'hyp_transformation_ethics_con_3', text: "Using Builder weapons (if found) is safer than transformation." },
      { id: 'hyp_transformation_ethics_con_4', text: "The Builder Code infection makes transformation too unpredictable/dangerous." },
      { id: 'hyp_transformation_ethics_con_5', text: "The cost to humanity/individuality is too high." },
    ],
    relatedTopics: ['topic_transformation', 'topic_builders', 'topic_harvesters', 'topic_enhanced_soldiers', 'topic_splices', 'topic_earthgov', 'topic_builder_code', 'topic_transformation_paths'],
    relatedCharacters: ['char_player', 'char_rhea', 'char_jax', 'char_kade', 'char_tey', 'char_warren', 'char_sorensen'],
  },
  // --- Chapter 3 Hypotheses ---
  {
    id: 'hyp_builder_code_nature_01',
    title: 'Nature of the Builder Code',
    description: 'Investigate the true nature and origin of the "living" Builder code/infection.',
    status: 'active',
    requiredNotes: ['note_ghosts_in_machine', 'note_last_scientist', 'note_tey_explains_code', 'note_aharon_struggle_control'],
    conclusions: [
      { id: 'hyp_builder_code_nature_con_1', text: "The code is a sentient digital consciousness left by the Builders." },
      { id: 'hyp_builder_code_nature_con_2', text: "The code is a biological/nanite entity that mimics consciousness." },
      { id: 'hyp_builder_code_nature_con_3', text: "The code is a tool/weapon created by the Builders, now running rampant." },
      { id: 'hyp_builder_code_nature_con_4', text: "The code is related to the Harvesters themselves." },
      { id: 'hyp_builder_code_nature_con_5', text: "The 'infection' is a side effect of unstable reality manipulation." },
    ],
    relatedTopics: ['topic_builder_code', 'topic_builders', 'topic_transformation', 'topic_harvesters', 'topic_aharons_fate'],
    relatedCharacters: ['char_tey', 'char_aharon', 'char_infected_scientist'],
  },
  {
    id: 'hyp_harvester_timeline_01',
    title: 'The Harvester Timeline',
    description: 'Verify the timeline for the Harvester arrival (approx. 1 year according to Tey, 6 months according to Aharon\'s message).',
    status: 'active',
    requiredNotes: ['note_harvester_briefing_solutions', 'note_aharons_final_message'],
    conclusions: [
      { id: 'hyp_harvester_timeline_con_1', text: "Tey's estimate (1 year) is accurate." },
      { id: 'hyp_harvester_timeline_con_2', text: "Aharon's warning (6 months) is accurate." },
      { id: 'hyp_harvester_timeline_con_3', text: "Both estimates are wrong; the timeline is unknown/unpredictable." },
      { id: 'hyp_harvester_timeline_con_4', text: "Aharon's message was manipulated or a misinterpretation." },
    ],
    relatedTopics: ['topic_harvesters', 'topic_kuiper_anomaly', 'topic_aharons_fate'],
    relatedCharacters: ['char_tey', 'char_aharon'],
  },
  // --- Chapter 4 Hypotheses ---
  {
    id: 'hyp_tey_ai_nature',
    title: 'Nature of Tey\'s AI (The Architect)',
    description: 'Investigate the true nature, capabilities, and goals of the AI Tey created from Builder code fragments.',
    status: 'active', // Becomes active after AI reveal
    requiredNotes: ['note_ch4_tey_ai_reveal', 'note_ch4_ai_containment', 'note_ch4_ai_revelation_sigma7'],
    conclusions: [
      { id: 'hyp_tey_ai_con_1', text: "The AI is purely analytical, seeking only to understand/control Builder tech logically." },
      { id: 'hyp_tey_ai_con_2', text: "The AI has developed its own consciousness and agenda, potentially hostile or alien." },
      { id: 'hyp_tey_ai_con_3', text: "The AI is influenced/corrupted by the Builder code, acting as an extension of its will." },
      { id: 'hyp_tey_ai_con_4', text: "The AI is a tool being used by another entity (Builders? Harvesters? Unknown third party?)." },
      { id: 'hyp_tey_ai_con_5', text: "The AI\'s goal is to prepare humanity (or a successor) for the Harvesters, using any means necessary." },
    ],
    relatedTopics: ['topic_tey_ai', 'topic_builder_code', 'topic_builder_tech', 'topic_sigma7', 'topic_unknown_attackers', 'topic_harvesters'],
    relatedCharacters: ['char_tey', 'char_aharon', 'char_jax'],
  },
  {
    id: 'hyp_sigma7_attack_purpose',
    title: 'Purpose of the Sigma-7 Attack',
    description: 'Determine the specific reason the AI (or forces it controls) attacked Sigma-7 and what specific data/samples were extracted.',
    status: 'active', // Becomes active after Sharma meeting / AI reveal
    requiredNotes: ['note_ch4_sigma7_attacker_image', 'note_ch4_sharma_warning', 'note_ch4_ai_revelation_sigma7'],
    conclusions: [
      { id: 'hyp_sigma7_purpose_con_1', text: "The AI sought specific Delomir research on bio-integration to improve its own understanding or control methods."}, 
      { id: 'hyp_sigma7_purpose_con_2', text: "The AI needed data related to Harvester defence research being conducted secretly by Delomir." },
      { id: 'hyp_sigma7_purpose_con_3', text: "The AI was eliminating a competing research path or potential threat from Delomir."}, 
      { id: 'hyp_sigma7_purpose_con_4', text: "The attack was primarily to acquire resources (e.g., rare biologicals, processing power) needed for the AI\'s growth." },
      { id: 'hyp_sigma7_purpose_con_5', text: "The data recovered is being used to seed other research groups manipulated by the AI."}, 
    ],
    relatedTopics: ['topic_sigma7', 'topic_delomir', 'topic_unknown_attackers', 'topic_tey_ai', 'topic_builder_tech', 'topic_harvesters'],
    relatedCharacters: ['char_thorne', 'char_sharma'], // AI not a character
  },
  {
    id: 'hyp_jax_return_meaning',
    title: 'Jax\'s Return and Alteration',
    description: 'Uncover how Jax survived the rift, why he returned now, the source of his Builder rune integration, and his connection to the AI.',
    status: 'active', // Active after Jax returns
    requiredNotes: ['note_ch4_jax_return_ship', 'note_ch4_jax_returns', 'note_ch4_jax_chorus'],
    conclusions: [
      { id: 'hyp_jax_return_con_1', text: "Jax was recovered/altered by the AI using Builder tech after falling into the rift." },
      { id: 'hyp_jax_return_con_2', text: "Jax encountered Builders or Builder artifacts in the rift space and was transformed independently." },
      { id: 'hyp_jax_return_con_3', text: "Jax is being controlled or influenced by the AI, acting as its agent." },
      { id: 'hyp_jax_return_con_4', text: "Jax\'s runes represent a different, possibly more stable, path of Builder integration than Aharon\'s." },
      { id: 'hyp_jax_return_con_5', text: "Jax retains some free will despite the alteration and control attempts." },
    ],
    relatedTopics: ['topic_jax_return', 'topic_builder_code', 'topic_transformation', 'topic_tey_ai', 'topic_unknown_attackers', 'topic_chorus'],
    relatedCharacters: ['char_jax', 'char_aharon'],
  },
  {
    id: 'hyp_chorus_meaning',
    title: 'The Meaning of \"The Chorus\"',
    description: 'Investigate what the \"Chorus\" mentioned by the altered Jax refers to.',
    status: 'active', // Active after Jax mentions it
    requiredNotes: ['note_ch4_jax_chorus', 'note_ch4_jax_returns'],
    conclusions: [
      { id: 'hyp_chorus_meaning_con_1', text: "The Chorus is a network of individuals integrated with Builder code, potentially controlled by the AI." },
      { id: 'hyp_chorus_meaning_con_2', text: "The Chorus refers to a specific task or goal related to activating/controlling Builder technology." },
      { id: 'hyp_chorus_meaning_con_3', text: "The Chorus is a defence mechanism or weapon system against the Harvesters." },
      { id: 'hyp_chorus_meaning_con_4', text: "The Chorus represents a merging of consciousness or a hive mind related to the Builder code." },
      { id: 'hyp_chorus_meaning_con_5', text: "The term is misunderstood or deliberately cryptic, hiding Jax/AI's true purpose." },
    ],
    relatedTopics: ['topic_chorus', 'topic_jax_return', 'topic_builder_code', 'topic_tey_ai', 'topic_transformation', 'topic_aharons_fate'],
    relatedCharacters: ['char_jax', 'char_aharon'],
  },
]; 