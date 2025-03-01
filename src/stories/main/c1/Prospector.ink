VAR character_class = ""
VAR scene_image = "shipZ1"
LIST present_characters = You, Kade, Rhea, Jax
VAR speaking_character = "none"

-> BeforeMission

=== BeforeMission ===

19 years later, the echoes of that night remain, buried but never gone. Aharon's hand pulling you from the darkness is the first memory that doesn't hurt, and the last time you believed you could be saved.

You find yourself sitting in the mess hall of the Prospector, a cramped but functional space filled with mismatched furniture and the hum of the ship's engines. The crew is gathered, preparing for the upcoming job. You try not to think of it as grave robbing.

The air smells faintly of oxygen recycled too many times and burnt coffee. You sit at the table, surrounded by your crew - a ragtag group of misfits brought together by necessity and a shared desire to survive in the asteroid belt. And Aharon. Always Aharon.

The mood is tense but familiar. This is what you've come to know as home: the hum of the engines, the banter of your crew, and the ever-present weight of the job ahead.

Kade, the pilot, leans back in his chair, boots propped up on the table. There's a cocky grin plastered across his face, as usual. "So, Captain, what's the plan for this little joyride? Sneak in, grab the shiny thing, and hope we don't get blown to bits?"

Rhea, your engineer, shoots him a glare from across the table. She's hunched over a datapad, her fingers flying across the screen as she reviews the schematics of the derelict ship. "If you'd bothered to read the briefing, you'd know the plan. But I guess that's too much to ask from someone who thinks 'winging it' is a valid strategy."

~ speaking_character = "Kade"
"Hey, winging it's gotten us this far, hasn't it?"

~ speaking_character = "Rhea"
"Barely."

~ speaking_character = "none"
Jax, the muscle, sits quietly in the corner, sharpening a knife. He's a man of few words. "Less talk, more prep. We don't know what's waiting for us out there."

You glance around the table, taking in the faces of your crew. They're an odd bunch, but they're yours. And in the asteroid belt, that counts for nearly everything.

~ speaking_character = "You"
"Alright, listen up. This isn't just another job. According to Aharon, that derelict ship is carrying something big. He wouldn't say what, just that it matters, and matters means credits. However, we don't know who else might be after it, or what's waiting for us. So, we stick to the plan. Do the job, watch each other's backs, get out alive. Understood?"

~ speaking_character = "none"
The crew nods, their expressions serious. Even Kade sobers up, his grin fading as he meets your gaze.

~ speaking_character = "Kade"
"Understood, Captain. We'll get it done."

~ speaking_character = "Rhea"
"Assuming Kade doesn't crash us into some debris in Heaven's Gate on the way there."

~ speaking_character = "Kade"
"Hey, that was one time!"

~ speaking_character = "none"
The crew laughs. It's a rare moment of levity before the storm. You can't help but smile.

As the laughter dies down, you notice Aharon's absence. He's not part of the crew, not really, but something of him is always here, in your mind. He's the one who gave you a chance when no one else would. You make a mental note to check in with him before you leave.

The comms unit crackles, interrupting the moment.

~ speaking_character = "Aharon"
"Prospector, this is Aharon. You're cleared to dock. I've checked the scope from Ceres and there's nothing near you. Looks like no-one else has spotted the wreck yet. Good luck out there. And… be careful."

~ speaking_character = "none"
His voice is calm, but there's an edge to it - a warning. You exchange a glance with the crew. They've heard it too.

~ speaking_character = "You"
"Copy that, Aharon. We'll be in touch."

~ speaking_character = "none"
The comms unit falls silent, and the mood in the mess hall shifts. The job is real now, and the stakes are clear. You stand, the crew following your lead.

~ speaking_character = "You"
"Let's move. We've got a ship to board."

~ speaking_character = "none"
The crew grabs their gear and heads for the airlock, their banter replaced by focused silence. You take a moment to look around the mess hall before following them. It's the closest thing you've had to a home in years. Since you spread your wings and left Aharon's flat.

The Prospector hums beneath your feet as you make your way to the airlock. The derelict looms ahead, a shadow in the void. Whatever happens next, you're in it together.

-> AfterMission

=== AfterMission ===

The mission to the derelict ship is complete, and Aharon has requested an urgent meeting aboard The Prospector. He arrives with an intensity in his eyes that you haven't seen in years.

"Good work on the derelict," he says, his voice low despite the privacy of your ship's meeting room. "The data you recovered confirms what I've suspected for some time."

~ speaking_character = "You"
* [What did you find?]
    "What exactly did we find out there, Aharon? The tech was unlike anything I've seen before."

* [Why all the secrecy?]
    "You've been cryptic since you sent us on this mission. What's going on?"

* [Is this about my parents?]
    "Does this have something to do with what happened to my parents on Ceres?"

- ~ speaking_character = "Aharon"
He takes a deep breath, glancing at your crew before focusing back on you.

"The ship you explored wasn't just any derelict. It was a research vessel, one of several that disappeared about twenty years ago. They were investigating something in the outer belt - something that shouldn't exist."

~ speaking_character = "Rhea"
"What kind of something?" Rhea interjects, her curiosity piqued.

~ speaking_character = "Aharon"
"The kind that gets entire research teams killed and their findings buried," Aharon replies grimly. "The kind that might be connected to what happened on Ceres all those years ago."

~ speaking_character = "You"
* [Tell me everything.]
    "No more half-truths, Aharon. I need to know what we're dealing with."

* [How dangerous is this?]
    "Are we in danger? Is this why you've kept me at arm's length all these years?"

* [What's our next move?]
    "If this is as big as you're suggesting, what do we do now?"

- ~ speaking_character = "Aharon"
"There's a faction within the Belt authorities - powerful people with access to advanced technology. They've been searching for something for decades. Something they call 'The Catalyst.'"

He pulls out a data chip and places it on the table.

"This contains coordinates to another derelict - one that might hold more answers. But be warned: if they discover you're investigating this, they'll come after you just like they did your parents."

~ speaking_character = "Jax"
Jax leans forward, his expression hardening. "So we're walking into a trap?"

~ speaking_character = "Aharon"
"Not if you're careful," Aharon says. "I've kept you safe this long by keeping you in the dark. But now you need to know what you're up against."

~ speaking_character = "You"
* [Take the chip.]
    You reach for the data chip, your decision made. "My parents died for this. I need to know why."

* [Ask for time to consider.]
    "This is a lot to process, Aharon. I need time to think about what this means for my crew."

* [Demand more information first.]
    "I'm not committing to anything until I know more. What exactly happened to my parents?"

- ~ speaking_character = "Aharon"
"Whatever you decide," Aharon says, standing to leave, "remember that these people don't leave loose ends. They're patient, resourceful, and utterly ruthless."

He pauses at the door, looking back at you with an expression that might be regret.

"I should have told you sooner. But I wanted to protect you from this life for as long as possible."

~ speaking_character = "none"
As Aharon leaves, a heavy silence falls over the crew. The data chip sits on the table, a small object that suddenly carries the weight of your past and possibly your future.

Whatever comes next, one thing is clear: the simple life of a salvager is behind you now.

-> END