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
						track: "marooned",
						volume: 75
					}
				}
			},
			{
				id: "wake_up",
				type: "paragraph",
				text: "It all begins with darkness, not the comforting kind, but the abyssal void that presses from all directions. Slowly, light leaks in, sharp and sterile, piercing the haze.\n\nA soft whir fills the silence, rhythmic and mechanical, pulling the consciousness forward. Something stirs within the body, a sharp inhalation, then pain. It’s everywhere, coursing like static electricity, raw and unfamiliar.\n\nThe first thought that comes isn’t a word but a sensation: *emptiness*.",
				media: {
					image: {
						src: "prospector",
						title: {
							text: "The Wandering Prospector",
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
				type: "choice",
				id: "talkSleepStand",
				text: "You blink a few times and try jogging your memory again. Nothing comes. Your head is pounding. You look around at the room. It’s quiet in here. There’s a gentle hum in the background.",
				options: [
					{ text: "Try to stand" },
					{ text: "Reply to the doctor" },
					{ text: "Close your eyes a moment" }
				]
			},
			{
				type: "paragraph",
				text: "You try and stand up, but everything hurts. You don’t keep trying, but instead go back to letting yourself float a little, the meagre gravity of drive acceleration pulling you back down. You gently shake your head to try and clear the fog, as you process the question for a moment.",
				requirements: [{ type: "choice", choiceId: "talkSleepStand", optionId: 1 }]
			},

			{
				type: "paragraph",
				text: "You try to speak, but your tongue is leaden in your mouth. What comes out is a muffled garble of half-words. Whatever happened, it’s not good. You shake your head as you process the question for a moment.",
				requirements: [{ type: "choice", choiceId: "talkSleepStand", optionId: 2 }]
			},
			{
				type: "paragraph",
				text: "You close your and try to think a moment, but your head swims as you do. It’s worse than having your eyes open. Whatever happened, it hurts. You shake your head, as you process the question for a moment.",
				requirements: [{ type: "choice", choiceId: "talkSleepStand", optionId: 3 }]
			},
			{
				type: "paragraph",
				text: "Nothing comes to mind, and suddenly the question lands like a blow. A blank void fills the space where an answer should be. Searching, probing, only to find nothing.\n\n“No,” your reply finally comes, hoarse and fragile.\n\nDr. Santos nods, unflustered, as if she expected this. “That’s okay. Memory loss is common after exposure like yours.“ She steps back, motioning to the sleek, matte grey walls of the medical bay. “You’re safe now. That’s what matters.”\n\n*Safe*. The word feels foreign. The ache in every limb suggests otherwise. The body, *your body*, feels borrowed, secondhand."
			},
			{
				type: "paragraph",
				text: "She adjusts a monitor beside the bed, the screen glowing faintly with vital signs. “We found you floating in space near the wreck of the *Argentum*. Looks like it was a mining vessel. There was an accident, or so it seems.”\n\n“An… accident?” the words slip out, hollow.\n\nDr. Santos pauses, her lips tightening ever so slightly. “You were lucky. We picked up your distress signal. Barely alive in a compromised EVA suit. The kind of thing you don’t walk away from.” She gestures to a tablet on the counter, flicking through images.\n\nThe screen shows a grainy video feed: a small rescue craft approaching a figure drifting in the void, tethered to a mangled piece of hull plating. The figure, *you*, floats limp in the void, suit scorched and shredded in places."
			},
			{
				type: "paragraph",
				text: "Something stirs beneath the emptiness, a flash of something visceral. Screaming. Metal shrieking under pressure. Explosive decompression. And then, a strange, pulsing blue light.\n\nYour pulse spikes, the monitor betraying your reaction. Dr. Santos notices, setting the tablet down with a deliberate motion."
			},
			{
				type: "paragraph",
				text: "“Do you remember anything?” she asks, leaning in, her tone softer now. “Anything at all about what happened?”\n\nThe image of the blue light lingers, searing and unyielding, but slips away the moment you try to hold onto it. “No,” you admit, frustration leaking into your voice."
			},
			{
				type: "paragraph",
				text: "Dr. Santos sighs, not unkindly. “Memory might return in pieces, or it might not. Head trauma, hypoxia… your body’s been through hell.” She straightens, her tone shifting to brisk professionalism. “We’ll run more scans tomorrow. For now, rest.”\n\nShe moves toward the door, hesitating for just a moment. “You’re alive. That’s a start. Maybe the rest will come when you’re ready for it. The crew are taking me to Ceres; I'm taking up a posting there. At least there will be one friendly face there when we arrive. Look me up if you ever need anything. But for now, you need rest. Get some sleep.”"
			},
			{
				type: "paragraph",
				text: "The door slides shut behind her, leaving the soft hum of the medical bay and the faint, distant rumble of machinery in its wake.\n\nYou close your eyes, but instead of darkness, you see that light again, vivid, electric blue, pulsing like a heartbeat. It feels like a warning. You wonder what it might be warning you of, as your eyes shut."
			},
			{
				type: "paragraph",
				id: "meet_sadie",
				text: "A few hours later, you wake to the sound of the medical bay door hissing open. Your eyes blink in the light. You’ve no idea how long you’ve been asleep. It doesn’t feel like it was restful. The atmosphere shifts.\n\nWhere Dr. Santos had been steady and clinical, the woman who had stepped through carries an entirely different weight.\n\nShe isn’t what you’d call imposing. She’s average height, lean, with flaming red hair; but there is a tension to her movements, a deliberate precision that draws the eye. Her clothes, consisting of a pinstripe suit and black heels, do little to soften her. If anything, they make her seem sharper, like a blade left bare.",
				media: {
					character: {
						cast: "primary",
						position: "main",
						name: "Sadie",
						src: "sadie",
						action: "add"
					}
				}
			},
			{
				type: "paragraph",
				text: "Her eyes, a sharp hazel, study you with the kind of scrutiny that peels back layers. You feel… scrutinized. It’s not cruel, there’s no look of malice, but it’s certainly clinical in its own way. Her face is a roadmap of old wounds, thin, pale scars crossing her skin, faint but unmistakable. One runs diagonally across her left cheek, another curls just above her collarbone, visible where her jacket hangs open."
			},
			{
				type: "paragraph",
				text: "“Sadie Thompson,” she says, leaning forward slightly. Her handshake, when she offers it, is firm and no-nonsense. “I work cases that fall through the cracks. Sometimes on contract, sometimes just because they piss me off enough.”\n\nYou take her hand out of reflex. Her grip isn’t crushing, but has the manner of not being the kind that lets go first.\n\n“Dr. Santos tells me you don’t remember much.” Her tone is matter-of-fact, but not entirely unkind. “That makes this next part tricky.”\n\n“Who are you?” you ask, surprised by the hoarseness in your own voice."
			},
			{
				type: "paragraph",
				text: "Her lips tug into a faint smile, even as it doesn’t quite reach her eyes. “Used to be Vesta Security. Worked a lot of nasty business out in the Belt. These days, I freelance.” She leans back slightly, gesturing toward you. “Your case came across my desk because it’s… unusual. And I like unusual. So I took a fast trip out from Ceres to meet the ship bringing you back before you arrive.”\n\n“Unusual how?”\n\nShe doesn’t answer right away. She reaches instead into the inside pocket of her jacket and pulls out a small holo-device, setting it on the bedside table. A flick of her fingers brings up a 3D projection of a mining vessel, its hull breached, interior blackened and twisted. *Argentum,* read the faint text beside the model."
			},
			{
				type: "paragraph",
				text: "“This is where you were found,” she says, pointing to a section near the rear of the vessel. “Wreckage spread across a hundred cubic klicks of vacuum. No survivors. Except you.” Her eyes flicked back to you, measuring your reaction.\n\nThe words are a punch to the gut, but you meet her gaze. “And you want to know why I survived.”\n\nHer faint smile returns, this time tinged with something wry. “You catch on fast. The thing is, I’ve seen a lot of accidents. Explosions. Decompressions. People don’t just float away from something like this in one piece. Not unless they’re *very* lucky. Or something else is going on.”\n\nSomething twists in your chest, fear, confusion, guilt. All of them, maybe.\n\n“I don’t remember,” you whisper, the admission cutting sharper than expected."
			},
			{
				type: "paragraph",
				text: "Sadie’s expression doesn't change, but she nods once, like she’d expected the answer. “You’re not lying,” she confirms after a moment. It isn't a question or a compliment, instead having the tone of someone so used to hearing lies she's grown to be able to spot truth reliably. She taps the holo-device, cycling to a different projection, this one a map of Ceres Station and its surroundings.\n\n“Here’s the deal,” she states, her voice steady. “I’m going to find out what happened to the *Argentum*. Whether you remember or not. And if there’s something, anything, that comes back to you, I need to know.”\n\nShe stands then, sliding the device back into her pocket. Her gaze lingers for a moment, and when she speaks again, her tone has softened, if only slightly. “Whatever put you out there… you didn’t get out of it alone. Someone, or something, kept you alive. Question is, why?”"
			},
			{
				type: "choice",
				id: "whyAlive",
				text: "Sadie’s words hang in the air with the devastation of a distant explosion. Her gaze holds yours, sharp and expectant. The silence stretches, inviting you to respond.",
				options: [
					{ text: "Are you saying someone did this to me?" },
					{ text: "What do you mean by 'something'?" },
					{ text: "Why do you care so much?" }
				]
			},
			{
				type: "paragraph",
				text: "Her expression shifts slightly, a flicker of approval in her eyes. “Maybe. People don’t just end up in vacuum with no memory and no explanation. Not unless someone *wants* it that way.”\n\nShe leans against the edge of the bed, arms crossed. “You were found in an EVA suit with barely enough oxygen left to keep a rock alive, near the remains of a ship that’s nothing but slag. That’s not random. Someone made choices, bad ones. And you might’ve been one of them.”\n\nThe room seems colder suddenly, the hum of machinery fading to the edge of your awareness.\n\nSadie straightens, her tone shifting to something almost... personal. “If someone put you out there, they’re not done. People like that don’t leave loose ends.”",
				requirements: [{ type: "choice", choiceId: "whyAlive", optionId: 1 }]
			},
			{
				type: "paragraph",
				text: "Sadie tilts her head, her lips pressing into a thin line. “Could be a lot of things. Advanced tech. Experimental hardware. Hell, maybe you stumbled into something no one was supposed to find. That ship you were on, the *Argentum*, it was a mining vessel, right? Who knows what you dug up.”\n\nShe taps her temple with a scarred finger. “I’ve seen what happens when people mess with things they don’t understand. Experimental tech, rogue AI, even weird old things out in the Belt. Sometimes it leaves scars; sometimes it leaves questions no one wants to answer.”\n\nHer voice drops, to barely above a murmur. “And sometimes, it leaves survivors.”\n\nThe weight of her words settles over you. The fragments of memory; flashes of blue light, screams, flare in your mind again, unbidden and incomplete.",
				requirements: [{ type: "choice", choiceId: "whyAlive", optionId: 2 }]
			},
			{
				type: "paragraph",
				text: "For the first time you've seen, Sadie hesitates. Her jaw tightens, and she glances at the door as if considering her escape. But then she sighs, shoulders softening slightly.\n\n“Because I’ve been in that position,” she replies, her voice quieter now. “Waking up with no answers, just questions that no one seems to want to ask. The Belt doesn’t look out for its own. You fall through the cracks, and people move on like you were never there.”\n\nHer eyes meet yours again, steady but carrying something heavier now. “I care because someone has to. And because if I don’t figure this out, someone else will. And trust me, you don’t want those people asking the questions instead of me.”\n\nThe tension in the room eases slightly, but her tone remains firm. “I’m not doing this out of kindness. Whatever happened out there? It’s going to get worse. And if you’re the key to it, we need to figure it out fast.”",
				requirements: [{ type: "choice", choiceId: "whyAlive", optionId: 3 }]
			},
			{
				type: "paragraph",
				text: "Sadie glances at her wrist-comm, then back at you. “Think about it. You’ve got more gaps and holds in your story than the ship you came from. When, hell *if* you can fill them in, let me know.”\n\nWith that, she stands and heads for the door, pausing only briefly to add, “Rest up. You’ll need it.”\n\nThe door hisses shut behind her, leaving you with only the soft hum of the medical bay and the faint buzz of your thoughts. For a moment, it feels like you're floating again, weightless and untethered, the vast unknown stretching out before you."
			},
			{
				type: "paragraph",
				text: "The silence in the room presses in as the door slides shut behind Sadie, leaving you alone with your thoughts and the rhythmic hum of medical equipment. The air feels sterile, clinical, but there is something about the faint vibration underfoot, a distant, mechanical pulse, that reminds you this place is alive. Not in the organic sense, but in the way a machine breathes when it’s worked for decades, tirelessly grinding out its purpose.\n\nYou lean back into the stiff cushioning of the medical cot, wincing as muscles you didn’t remember having protest against the motion. Dr. Santos has left you with answers that feel more like questions, her soft reassurances doing little to mask the sharp edge of concern in her voice.\n\nSadie, though… Sadie had been something else entirely.",
				media: {
					character: {
						cast: "primary",
						name: "Sadie",
						src: "sadie",
						action: "remove"
					}
				}
			},
			{
				type: "paragraph",
				text: "Her face lingers in your mind, those sharp eyes, her no-nonsense demeanor, the way she seemed to size you up like a puzzle she wasn’t sure she wanted to solve. There was something raw in her voice, something personal beneath the professional interrogation.\n\nIt wasn’t kindness, not exactly, but there was an edge of shared understanding in the way she spoke. You don’t trust her, not yet, but you can’t shake the feeling that she understood you in a way even you don’t right now."
			},
			{
				type: "paragraph",
				text: "You sigh, running a hand through your hair, or what you assume is your hair. The short, uneven strands feel foreign under your fingers, like they belong to someone else entirely. A glance down at your hands only deepens the disconnect. Calloused palms, faint scars tracing knuckles and fingertips… whoever you were, this body had seen its fair share of work."
			},
			{
				type: "paragraph",
				text: "The room itself offers little comfort. A rectangle of pale, cold walls, lined with equipment whose functions you could only guess at.\n\nThe faint glow of a console in the corner catches your attention, a collection of biometric readouts scrolling endlessly, your vitals laid bare in streams of green and blue. They are monitoring you, whoever *they* are, and the thought tightens your chest."
			},
			{
				type: "choice",
				id: "employer",
				text: "You spot the few personal effects they found on you on a tray next to the bed. You take a moment to flick through them. Amongst them is a wallet. You open it and look inside. A few cards for accessing credits. A photo you recognize, but can’t place. A corporate registration. It says you work for:",
				options: [
					{ text: 'Metagene Industries - cybernetics' },
					{ text: 'Delomir Inc - neural interfaces' },
					{ text: 'Quantum Dynamics - AI research' },
					{ text: 'StellarCorp Mining - astromining' }
				]
			},
			{
				type: "paragraph",
				text: "You look down at the medical gown draped over you, its fabric too thin to provide any real sense of protection. Protection. The word sticks in your mind like a splinter. From what? From who? Sadie’s words echo again: *“Someone, or something, kept you alive. Question is, why?”*\n\nYour memories, the shards that exist at least, offer no answers. Flashes of blue light, a sensation of weightlessness, a sudden rush of air being sucked away… and then nothing. You try to hold onto the fragments, to piece them together into something coherent, but they slip away like sand through your fingers.\n\nYour gaze wanders to the door. The thought of leaving this room, of stepping out into a world you don’t remember, fills you with equal parts dread and curiosity. Somewhere beyond this ship exists the wreckage of your life. Or at least, the clues to it."
			},
			{
				type: "paragraph",
				text: "You clench your fists, nails digging into your palms, grounding yourself in the sensation. Whoever you were, whatever had happened, you are alive. And if what Sadie said was true, then you aren’t the only one with a stake in this.\n\nThe faint hum of machinery fills the room again, steady and unchanging. For now, you have nothing but questions. But out there in the dark beyond the ship, somewhere in the tangled maze of Ceres, among its people and its secrets, are answers."
			},
			{
				type: "gallery",
				id: "rustAndRoyalty",
				duration: 237000,
				media: {
					images: [
						{
							src: "ceresZ5",
							caption: "As you gaze out of the window, the vast bulk of Ceres slowly appears. It’s not much more than a featureless dot from this distance. The lights from the surface glitter in the dark.",
							displayDuration: 55600,
							transitionDuration: 1000
						},
						{
							src: "ceresZ4",
							caption: "As it gets closer, you wonder about the people inside. Millions live inside that rock. Live and die and try and make their way through their lives.",
							displayDuration: 55600,
							transitionDuration: 1000
						},
						{
							src: "ceresZ3",
							caption: "asf",
							displayDuration: 55600,
							transitionDuration: 1000
						},
						{
							src: "ceresZ2",
							caption: "asf",
							displayDuration: 55600,
							transitionDuration: 1000
						},
						{
							src: "ceres",
							caption: "asf",
							displayDuration: 55600,
							transitionDuration: 1000
						},
						{
							src: "black",
							caption: "asdf",
							displayDuration: 3000,
							transitionDuration: 1000
						}
					],
					music: {
						track: "rustAndRoyalty",
						volume: 100
					}
				}
			},
			{
				type: "paragraph",
				text: "The door slides open with a muted hiss, and Sadie Thompson steps in, her expression as unreadable as ever. She carries the same air of confidence, her stride purposeful, heels clicking faintly against the sterile floor. But there is something else this time too, a spark of amusement lurking behind her sharp eyes, like she’d just heard the punchline to a joke you are not yet privy to.\n\n“Well,” she begins, folding her arms as she leaned casually against the doorframe, “it seems you’ve got yourself a guardian angel. Or maybe a stroke of luck.”",
				media: {
					music: {
						track: "calming",
						volume: 25
					},
					image: {
						src: "ceres"
					},
					character: {
						cast: "primary",
						position: "avatar",
						name: "Sadie",
						src: "sadie",
						action: "add"
					}
				}
			},
			{
				type: "paragraph",
				text: "You straighten on the cot, immediately wary. The last conversation had been unsettling enough; you aren’t sure if you are ready for another round of cryptic revelations.\n\nSadie tilts her head, watching you carefully. “A message came through not long after I left. It’s from an insurance agent claiming to represent your employer. They contacted the ship and asked it be passed on to you.”\n\nYou gave Sadie a questioning look, gesturing for her to go on."
			},
			{
				type: "paragraph",
				text: "“They’ve confirmed they owned the ship you were on, and decided they owe you compensation for the incident. You know, on account of you being the *sole survivor* of their ship’s catastrophic, uh… ‘misfortune.’” Her lips curl into a faint smirk. “Payout’s being wired to a temporary account on Ceres. And let me tell you, sweetheart, they’re paying well.”\n\nYou blink, trying to process her words. “How much?” Your voice still sounds foreign to your ears.\n\nSadie shrugs, her smirk widening. “Enough to do more than just get back on your feet. They’re paying you in credits. Real ones, not faction scrip. You’ve got enough that you could invest a little. It’s in the hundreds, and it’s yours.”"
			},
			{
				type: "paragraph",
				text: "The weight of the statement sinks in, a strange mixture of relief and apprehension settling in your chest. A lifeline, thrown by faceless bureaucrats, from a ship you can’t even remember working on. It doesn’t feel real. Most people get paid in corporate currency, only able to buy what the company will let you. Actual tradable credits? Real currency? You've never had one credit, let alone *hundreds*.\n\n“But,” Sadie continues, pushing off the doorframe and stepping closer, her heels planting with deliberate weight, “it’s not exactly a no-strings-attached situation. Their legal team, wants you to stay quiet about the whole thing. No lawsuits, no questions about why a mining vessel exploded in the middle of nowhere. You take the credits, and as far as they’re concerned, this whole mess never happened.”"
			},
			{
				type: "choice",
				id: "offerOfFunds",
				text: "You take in her words a moment, considering how to respond.",
				options: [
					{ text: "So, this is a bribe?" },
					{ text: "What would you do?" },
					{ text: "What happens if I refuse?" }
				]
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "offerOfFunds", optionId: 1 }],
				text: "You frown, the unease deepening. It feels like a bribe, and yet… the possibilities flash through your mind. With real money, you could carve out a place for yourself on Ceres, or beyond. “It’s hush money. That’s what you’re saying, isn’t it.”\n\nSadie studies you, her smirk softening into something closer to sympathy. “Yeah, you’re not wrong there. But, look at it this way. What you do with it? That’s your call. But if you’re smart, this is a chance to start fresh. Get yourself some resources, build a network. Hell, hire someone to dig into this if you want answers. Just don’t sit here and let it go to waste.”"
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "offerOfFunds", optionId: 2 }],
				text: "You frown, the unease deepening. The possibilities flash through your mind. With real money, you could carve out a new life.\n\nSadie studies you, her smirk softening into something closer to sympathy.\n\n“I. Hmm. Some other time I’ll tell you my story. Suffice to say for now, I don’t have to imagine. I know what I’d do; I’d do what I did. Spent a little on a room. Make some half decent investments. Find yourself some work so you don’t have to spend it all. Grow yourself some resources, build a network of friends. Just don’t sit here and let it go to waste.”"
			},
			{
				type: "paragraph",
				requirements: [{ type: "choice", choiceId: "offerOfFunds", optionId: 3 }],
				text: "You frown, the unease deepening. The possibilities flash through your mind, but real credits being offered? Never to talk about this? You aren’t sure those are conditions you could agree to. “What happens if I refuse?”\n\nSadie studies you, her smirk softening into something closer to sympathy. “Look, I don’t know who these people are, but you almost died once for whatever this is you’ve ended up involved with. I get the feeling if you refuse, it’ll go badly for you. Plenty of accidents happen out here, and you’ve already been involved in one. Take the money. If you don’t want to keep it, then spend it helping people. But at least keep some to start afresh. Get yourself some resources, build a network. Hell, hire someone to dig into this if you want answers. Just don’t sit here and let it go to waste.”"
			},
			{
				type: "paragraph",
				text: "Her tone turns serious, the playfulness evaporating. Ceres doesn’t hand out second chances. You’ve got one now. Use it wisely.”\n\nYou meet her gaze, the weight of her words settling in. Sadie doesn’t seem the sentimental type, but there is something in her tone, something that tells you she’s seen too many people squander opportunities.\n\nThe silence stretches between you, the faint hum of the medical equipment the only sound in the room. Finally, Sadie straightens, pulling a small data chip from her pocket and tossing it onto the cot beside you.\n\n“Account details,” she states simply. “You’ll find the funds waiting. If you need advice, or someone to keep you from getting scammed out of your newfound fortune, you can find me on Ceres. I need to take my skiff back now we know there isn’t an immediate threat.”"
			},
			{
				type: "paragraph",
				text: "She turns to leave, pausing just as the door hisses open. “Get some sleep. And hey,” she adds without looking back, “you’re not the first person to wake up on Ceres with no past and too many questions. Just… don’t make the mistake of thinking you have all the time in the world to figure it out.”\n\nWith that, she leaves you alone once more. A couple of minutes later, you hear the sound of her skiff detatching from the ship and heading back. You pick up the data chip. Now you have something tangible to hold onto. A future, blurry as it might be, waiting to be shaped by your next move.",
				media: {
					character: {
						cast: "primary",
						name: "Sadie",
						src: "sadie",
						action: "remove"
					}
				}
			},
			{
				type: "paragraph",
				text: "Some hours later, after resting, you pick up a tablet someone has left you next to the bed. You register the data chip, access the funds, and have a think when it asks for a name. You suppose you’d better choose one for yourself, since you can’t remember who you are. You think for a minute and enter one, and then start to put your funds to use."
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