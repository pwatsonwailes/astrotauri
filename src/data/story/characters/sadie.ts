const sadieNarrative = [
  {
    id: 'sadie-investigation',
    characterId: 'sadie',
    requirements: [
      { type: 'story', chapterId: 0, nodeId: 'meet_sadie' }
    ],
    nodes: [
      {
        type: 'paragraph',
        text: "You find Sadie in her office. It’s a cramped space that somehow manages to feel both meticulously organized and chaotic. Datapads and holographic displays cover every surface, each showing different pieces of what you assume are ongoing investigations. She looks up as you enter, her sharp eyes showing a glimmer of recognition.",
        media: {
          character: {
            cast: 'primary',
            name: 'Sadie',
            src: 'sadie'
          }
        }
      },
      {
        type: 'paragraph',
        text: "“I was wondering when you’d show up,” she says, gesturing to a chair across from her desk. “Been doing some digging into the *Argentum* incident. Found some... interesting discrepancies.”"
      },
      {
        type: 'choice',
        id: 'sadieDiscrepancies',
        text: "She taps her datapad, bringing up a holographic display of what looks like shipping manifests.",
        options: [
          { text: "What kind of discrepancies?" },
          { text: "Should you be sharing this with me?" },
          { text: "Why are you still investigating?" }
        ]
      },
      {
        type: 'paragraph',
        text: "“The *Argentum* was registered as a standard mining vessel, right?” She swipes through several documents. “But their equipment manifest lists some very non-standard gear. Deep scanning arrays, quantum sensors... the kind of stuff you’d use for prospecting *way* out in the Belt. Not your typical mining run.”",
        requirements: [{ type: 'choice', choiceId: 'sadieDiscrepancies', optionId: 1 }]
      },
      {
        type: 'paragraph',
        text: "Sadie’s lips curl into a wry smile. “Technically? No. But you survived whatever happened out there. That makes you involved, whether you remember it or not. And I've learned that sharing a little information often brings more valuable information back.”",
        requirements: [{ type: 'choice', choiceId: 'sadieDiscrepancies', optionId: 2 }]
      },
      {
        type: 'paragraph',
        text: "“Because something doesn’t add up,” she says, leaning forward. “A well-equipped ship doesn’t just disappear. And survivors don’t just appear with convenient memory loss. No offense.” She taps her datapad again. “The *Argentum* was carrying some very interesting equipment.”",
        requirements: [{ type: 'choice', choiceId: 'sadieDiscrepancies', optionId: 3 }]
      },
      {
        type: 'paragraph',
        text: "She pauses, studying your reaction. “Here’s what I'm thinking. Help me investigate this—quietly—and maybe we both get some answers. I've got a lead on someone who might know more about the *Argentum’s* last port of call. Interested?”"
      },
      {
        type: 'choice',
        id: 'sadie_help',
        text: "You consider her offer. Getting involved might be risky, but it could also lead to answers about your past.",
        options: [
          { text: "I want to know what happened to me." },
          { text: "What’s in it for you?" },
          { text: "How dangerous is this?" }
        ]
      },
      {
        type: 'paragraph',
        text: "“Good. Direct. I like that,” Sadie nods approvingly. “First step is making contact with my source. They work in the docking authority—access to all kinds of interesting records. Meet me in Miner’s Mile tomorrow. We’ll start there.”",
        requirements: [{ type: 'choice', choiceId: 'sadie_help', optionId: 1 }]
      },
      {
        type: 'paragraph',
        text: "Sadie’s expression turns serious. “Truth. And justice, if we can get it. Someone went to a lot of trouble to make the *Argentum* disappear. In my experience, people who do that kind of thing tend to do it more than once. I'd like to make sure it doesn’t happen again.”",
        requirements: [{ type: 'choice', choiceId: 'sadie_help', optionId: 2 }]
      },
      {
        type: 'paragraph',
        text: "“Honestly? Could be very dangerous,” she admits. “But you survived whatever happened out there. And I'm good at what I do. Together, we might have a chance at uncovering the truth—and staying alive while we do it.”",
        requirements: [{ type: 'choice', choiceId: 'sadie_help', optionId: 3 }]
      },
      {
        type: 'paragraph',
        text: "She stands, gathering her coat. “For now, keep this between us. And watch your back. If I'm right about this, we’re not the only ones interested in the *Argentum’s* fate.” She hands you a small data chip. “Encrypted comm channel. We’ll use this to stay in touch.”\n\nAs you leave her office, you can’t shake the feeling that you’ve just stepped into something much bigger than a simple accident investigation."
      },
      {
        type: 'task',
        task: {
          id: 'investigate-argentum',
          title: 'Begin Investigation',
          description: 'Help Sadie investigate the Argentum incident',
          difficulty: 2,
          applicableSkills: ['observation', 'improvisation'],
          bonuses: [
            {
              skillType: 'observation',
              effects: [
                { type: 'credits', value: 200 },
                { type: 'stress', value: -1 }
              ]
            },
            {
              skillType: 'improvisation',
              effects: [
                { type: 'credits', value: 150 },
                { type: 'stress', value: 1 }
              ]
            }
          ],
          complication: {
            description: "You notice someone watching you leave Sadie’s office",
            effects: [
              { type: 'stress', value: 2 }
            ]
          }
        }
      }
    ]
  }
];

export default sadieNarrative;