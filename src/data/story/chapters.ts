import { StoryChapter } from '../../types/story';

export const storyChapters: StoryChapter[] = [
	{
		id: 'the-beginning',
		title: "The Beginning",
		nodes: [
			{
				type: "gallery",
				duration: 136000,
				media: {
					images: [
						{
							src: "shipZ1",
							caption: "You wake to find yourself afloat in space. You drift in and out of consciousness. Your mind feels far away. Your thoughts scatter like the solar wind, as insubstantial as the void around you.",
							displayDuration: 25000,
							transitionDuration: 5000
						},
						{
							src: "shipZ2",
							caption: "Your ship hovers nearby, broken far beyond repair, a hole smashed clear through where the airlock was. The other side of the vessel is gone. Everything hurts. You wonder how long you’ve been here. You can’t remember.",
							displayDuration: 25000,
							transitionDuration: 5000
						},
						{
							src: "shipZ3",
							caption: "You try and think what happened. Nothing comes to mind. It probably doesn’t matter much. The gentle, urgent beeping, fading as your brain starts to falter is an oxygen alarm. It won’t be long now.",
							displayDuration: 25000,
							transitionDuration: 5000
						},
						{
							src: "shipZ4",
							caption: "You wonder if it’ll hurt, as your thoughts fall apart. Your eyes close, and you start to drift away. It’ll be a peaceful end at least...",
							displayDuration: 25000,
							transitionDuration: 5000
						},
						{
							src: "black",
							caption: "",
							displayDuration: 16000,
							transitionDuration: 1000
						}
					],
					music: {
						track: "gentle",
						volume: 75
					}
				}
			},
			{
				type: "paragraph",
				text: "It all begins with darkness, not the comforting kind, but the abyssal void that presses from all directions. Slowly, light leaks in, sharp and sterile, piercing the haze.\n\nA soft whir fills the silence, rhythmic and mechanical, pulling the consciousness forward. Something stirs within the body, a sharp inhalation, then pain. It’s everywhere, coursing like static electricity, raw and unfamiliar.\n\nThe first thought that comes isn’t a word but a sensation: *emptiness*.",
				media: {
					image: {
						src: "ceres",
						title: {
							text: "Ceres",
							color: "#fff"
						}
					},
					music: {
					track: "gentle",
						volume: 25
					}
				}
			},
			{
				type: "paragraph",
				text: "“Easy now,” a calm voice interrupts, warm but clinical. “You’ve been through quite the ordeal.”\n\nThe blur sharpens, revealing the speaker: a woman in a white medical coat, her dark hair tied back in a braid, stray strands curling at her temples. Her name tag reads *Dr. Maya Santos*, but it’s her eyes that capture attention, steady, unflinching. They’re the kind of eyes that have seen the Belt’s worst and kept going.\n\n“You’re safe. On the good ship The Wandering Prospector,” she says, her voice carefully modulated. “In the medical bay, such as it is. Do you know your name?”"
			},
			{
				type: "button",
				text: "Choose Your Name...",
				mode: "characterCreation"
			}
		]
	},
	{
		id: 'arrival-on-ceres',
		title: "Arrival on Ceres",
		nodes: [
			{
				type: "paragraph",
				text: "Two days later, you arrive at Ceres. You spend the a few credits buying yourself a room for a couple of months. Nothing fancy. Just a bed, a tiny bathroom barely worthy of the name and a table and chair. It isn’t much, but for now it’s home. You settle into the bed for a minute, thinking over the last couple of days.\n\nYour memories, the shards that exist at least, offer no answers. Flashes of blue light, a sensation of weightlessness, a sudden rush of air being sucked away… and then nothing. You try to hold onto the fragments, to piece them together into something coherent, but they slip away like sand through your fingers."
			},
			{
				type: "paragraph",
				text: "Your gaze wanders to the door. The thought of leaving this room, of stepping out into a world you don’t remember, fills you with equal parts dread and curiosity. Somewhere beyond that door exists the wreckage of your life. Or at least, the clues to it.\n\nYou clench your fists, nails digging into your palms, grounding yourself in the sensation. Whoever you were, whatever had happened, you are alive. And if what Sadie said was true, then you aren’t the only one with a stake in this.\n\nThe faint hum of machinery fills the room again, steady and unchanging. For now, you have nothing but questions. But out there in the dark beyond the ship, somewhere in the tangled maze of Ceres, among its people and its secrets, are answers.\n\nYou get steadily to your feet. Time to find them."
			},
			{
				type: "paragraph",
				text: "You turn out the light and step out of the room, blinking against the brighter, artificial lights of the station’s corridor. The hum of machinery fills the air, mingling with the distant murmur of voices. The quiet of the bed already feels far away. You send a message on your tablet, arranging to meet a familiar face."
			},
			{
				type: "paragraph",
				text: "A few minutes later, you spot a familiar suited figure. Sadie is leaning casually against a railing, scanning the passing crowd. Her sharp eyes catch you immediately. She straightens, pushing off the rail and walking toward you with a faint smirk.\n\n“Couldn’t stay cooped up, huh?” she says, crossing her arms."
			},
			{
				type: "choice",
				id: "outAndAbout",
				text: "You smile. It’s nice hearing a voice you recognize.",
				options: [
					{ text: "I needed to get out." },
					{ text: "It’s too quiet in my room" }
				]
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "outAndAbout", optionId: 1 }],
				text: "“Good. Ceres doesn’t make much sense until you’ve walked it.”\n\nYou nod, your voice uncertain but steady. “I need to see it; the station I mean. Maybe something out there will jog my memory.”"
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "outAndAbout", optionId: 2 }],
				text: "“I know what you mean. It’s good to see you anyway. Want to take a walk?”\n\nYou nod, your voice uncertain but steady. “Sure, can’t hurt. Maybe something out there will jog my memory.”"
			},
			{
				type: "paragraph",
				text: "Sadie studies you for a moment. Her smirk softens into something more thoughtful. She gestures down the corridor. “Fair enough. But don’t get your hopes up. Ceres doesn’t exactly scream *homey*. Still, it’ll help to get a feel for the place. Come on.”\n\nYou walk alongside her, weaving through the crowd of station workers and traders. The air grows warmer as you approach a wide set of double doors. A faint emblem of Ceres Station spins lazily on their surface."
			},
			{
				type: "paragraph",
				text: "The doors slide open, and you step into *The Drum*. It is massive, a cylindrical space where terraced residential units curve upward into the distance. Artificial sunlight filters down, casting everything in a golden glow. Streets below bustle with activity. People walk, talk, argue, and laugh. A symphony of life.\n\n“This is The Drum,” Sadie says. Her tone carries a hint of pride. “Gravity here’s as close to Earth as you’ll get in the Belt. Spinning fast enough to give the richer folks a taste of home.”\n\nYou crane your neck to take in the view, the scale of the space leaving you momentarily speechless. “It’s bigger than I expected,” you manage to say.\n\nSadie chuckles, her eyes following yours. “Yeah, it’s impressive. But don’t let it fool you. Not everyone gets to enjoy this. Most of the folks who keep this place running are stuck in the zero-g levels closer to the Pit. You’ll see soon enough.”"
			},
			{
				type: "paragraph",
				text: "She leads you forward, pointing out landmarks as you walk. Cafes buzz with off-duty engineers; parks with synthetic grass host children’s laughter; towering administrative buildings loom overhead. The divide becomes clear the farther you go. The polished veneer of The Drum gives way to something grittier, something not less welcoming, but certainly less sleek.\n\nYou glance at Sadie, a frown forming. “It seems… uneven,” you say, the words careful.\n\nSadie’s smirk turns sharp, tinged with cynicism. “That’s Ceres for you. It’s a nice illusion up here, but don’t think for a second it doesn’t come at someone else’s expense.”"
			},
			{
				type: "paragraph",
				text: "She moves ahead, the warm glow of The Drum fading as the hum of machinery grows louder. Sadie glances back at you, her expression unreadable.\n\n“Ready to see the real heart of the station?” she asks. You nod and follow her, not entirely sure what to expect.\n\nYou follow Sadie into a series of narrower corridors to a transport pod, which takes you a few stops inwards, leaving behind the bustling energy of The Drum. You step out and the change is immediate. The walls here are more industrial, marked with scuffs and faded warnings in blocky text. The air smells faintly of metal and oil, and the hum of machinery grows louder with every step.\n\nAhead, the corridor opens into a cavernous space teeming with movement. This is *Miner’s Mile*, Sadie explains, a sprawling marketplace where off-duty workers and traders congregate."
			},
			{
				type: "paragraph",
				text: "The sights and sounds are overwhelming after the quiet of the ship and your room. Hawkers call out from crowded stalls, their voices competing to advertise everything from hot food to bootleg data chips to less savoury things. The mingling smells of fried meat and industrial grease create an odd, pungent blend. Workers in dusty jumpsuits haggle over tools, while others sip drinks from battered metal flasks.\n\nSadie pauses at the edge of the market, letting you take it all in. “This is where the real money flows,” she says, her voice cutting through the noise. “Not the credits that keep the station running, but the kind that buys loyalty, or trouble. You ever need a favor, or information, this is where you start asking. Someone here has what you want, whatever it might be.”"
			},
			{
				type: "paragraph",
				text: "You glance at a group of miners gathered around a vendor selling parts scavenged from old mining rigs. Their faces are tired, lined with years of hard labor, but their laughter is loud and unguarded.\n\n“Seems lively,” you say.\n\nSadie smirks. “It is. But don’t let the noise fool you. Everyone here’s got an angle, and most of ‘em are looking for a way to get ahead. Stay sharp.”"
			},
			{
				type: "paragraph",
				text: "As you walk deeper into the market, you notice the subtle shifts in the crowd. A cluster of well-dressed traders stands out among the grimy jumpsuits, their voices low and their movements deliberate. Nearby, a gang of younger workers lounges against a wall, their eyes scanning the passersby with casual suspicion.\n\n“See those kids?” Sadie nods toward the gang. “They’re not here to shop. They’re muscle for hire, waiting for someone to pay them to cause problems, or stop them. Ceres has its own rules, and they don’t always match what’s written on the station charter.”\n\nYou nod, filing away the information. The market feels like a living organism, each stall and person a small, vital piece of the whole. It’s chaotic but fascinating, and you find yourself lingering, trying to absorb the atmosphere."
			},
			{
				type: "paragraph",
				text: "Sadie notices and nudges you lightly. “Don’t get too comfortable. We’ve still got more to see.”\n\nReluctantly, you follow her toward another set of corridors, and another transport pod. You get out another couple of stops inwards. The air is cooler here, and the spin gravity noticably weaker. It's harder to walk, easier to move, and the hum of machinery becomes a steady roar. The walls are reinforced here, thick panels of metal designed to withstand the stresses of deep-space mining.\n\n“This,” Sadie says, gesturing ahead and moving around with an ease you find hard to match, “is the Pit. Central mining operations. If The Drum is the head of Ceres, this is its heart, and its guts.”"
			},
			{
				type: "paragraph",
				text: "You step into a massive control center filled with holographic displays and towering consoles. Workers in sleek uniforms monitor the operation, their hands flying over controls as they direct the station’s mining drones and excavation teams. The floor vibrates faintly under your feet, a reminder of the relentless drilling happening far below.\n\n“Looks… efficient,” you say, unsure of what else to call it.\n\nSadie snorts. “Efficient for who? The miners? Or the folks collecting the profits?” She leans against a railing, looking out over the bustling control center. “Ceres runs on mining, and the Pit keeps it all going. But it’s not just rocks coming up from the asteroid. It’s people’s lives, their bodies.”\n\nShe points to a glowing panel, showing the dark void of space outside and the line of ships waiting to dock and unload their cargo. “Out there, if you screw up once, and you’re done. That’s the price of efficiency.”\n\nYou stare out at the distant mining rigs, the scale of it all sinking in. The weight her words sits heavy in your chest."
			},
			{
				type: "paragraph",
				text: "“Come on,” Sadie says after a moment. “One more stop.”\n\nShe leads you back to the transport, and it takes you several stops this time. The station, the roar of the Pit fades as the air becomes warmer again as the gravity increases. The metallic smell gives way to something fresher, greener. You get out a few minutes later into a garden.\n\n“This is *Little Hygiea*,” Sadie says as you step into a wide, brightly lit space. Rows of hydroponics stretch out in every direction, their vibrant greens and yellows of growing life, a stark contrast to the metal corridors outside. Workers move between the plants, checking nutrient levels and adjusting lighting. The air is humid, carrying the faint scent of earth and growing things.\n\n“It’s beautiful,” you say, the words slipping out unbidden.\n\nSadie glances at you. Her face softens. “Yeah. It is. Fresh food’s a luxury out here, but Little Hygiea keeps the station fed. And it’s a reminder. No matter how tough things get, life finds a way to keep going.”"
			},
			{
				type: "paragraph",
				text: "You walk among the rows, the sight and smell of the plants stirring something deep inside you, a flicker of memory, or maybe just hope. For the first time since you woke up, you feel a little less lost.\n\nSadie watches you quietly, giving you space to take it all in. After a moment, she speaks. “So? Feel anything familiar yet?”"
			},
			{
				type: "choice",
				id: "noMemory",
				text: "You shake your head, though part of you wishes you could say yes. You take a moment to think how you feel about that.",
				options: [
					{ text: "Sad" },
					{ text: "Angry" },
					{ text: "Worried" }
				]
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "noMemory", optionId: 1 }],
				text: "“No, nothing,” you reply, a note of melancholy in your voice. “I really thought this might jog my memory a bit. I mean, I can operate a tablet. I can look out there and recognise ship profiles. But I had to make up a name for myself and, well, it’s all a bit much.”"
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "noMemory", optionId: 2 }],
				text: "“No, nothing,” you reply, a note of anger seeping in your voice. “I wish I knew what had happened. That there was more I could be doing to get my life back. But I don’t even know what that life is or was, or if I’d want it if I knew it. It’s just so frustrating.”"
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "noMemory", optionId: 3 }],
				text: "“No, nothing,” you reply, a note of concern creeping into your tone. “It’s like I didn’t exist. I started looking for missing persons bulletins you know? I thought maybe I could find someone looking for me. But there’s nothing. No-one matching my description seems to have been reported missing. I mean, how much of an asshole was I that no-one seems to be missing me?”"
			},
			{
				type: "paragraph",
				text: "Sadie tilts her head. “Hey, I get it kid. Life has dealt you a pretty terrible hand for the moment. But give it time. For now, let’s get you back. You’ve seen enough for one day.”\n\nYou follow her out, the vibrant green of Little Hygiea fading behind you as you return to the station’s colder corridors."
			},
			{
				type: "paragraph",
				text: "Sadie leads you back, as you start to make your way home again. Back in your quarters, the quiet feels jarring after the noise and life of the tour. You sit on the edge of the cot, running a hand through your hair, still processing everything you’ve seen. The Drum, Miner’s Mile, the Pit, Little Hygiea, they’re all so different, yet each feels like a piece of the same puzzle. A puzzle you think maybe you were somehow part of, though the shape of your place in it remains maddeningly unclear.\n\nSadie leans against the doorway, arms crossed. She’s been quieter since you returned, her sharp edges dulled slightly. Finally, she breaks the silence.\n\n“You’ve got options,” she says, her tone matter-of-fact. “This place? It’s tough, but it’s not impossible. People survive here. Some even thrive.”"
			},
			{
				type: "paragraph",
				text: "You glance up at her, unsure where this is going. “And you’re telling me this because…?”\n\nShe tilts her head, her eyes narrowing slightly. “Because it’s time you started figuring out your next move. Sitting in this room isn’t going to bring your memories back, and it’s not going to help you get anywhere.”\n\nYou frown. “Where am I supposed to go?”\n\nSadie pushes off the wall, heading for the door. “That’s up to you. But make a choice,” she says over her shoulder. “Ceres isn’t perfect, but it’s got opportunities if you’re smart enough to find them. And if you need advice or someone to talk to…” She pauses, glancing back at you. “Well, you know where to find me. I’ll be here.”\n\nShe leaves without another word, the door sliding shut behind her."
			}
		]
	},
	{
		id: '6e21tj',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '2hq0nz',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'psa20w',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '97m2jn',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'ksu4jk',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'ryuep2',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'guqi4a',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'bad3y3',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'oxw8ac',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '6oyti5',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '7l58ip',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '3d4udt',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'sbzb14',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'm4c7ki',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'yduomu',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '6gvmt9',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '5qresv',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '1ugmml',
		title: "The Beginning",
		nodes: []
	},
	{
		id: 'p59ez8',
		title: "The Beginning",
		nodes: []
	},
	{
		id: '8jlniz',
		title: "The Beginning",
		nodes: []
	}
]