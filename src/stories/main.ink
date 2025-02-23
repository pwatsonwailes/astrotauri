VAR character_class = ""
VAR scene_image = "https\:\/\/images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&h=800&fit=crop"
LIST present_characters = captain
VAR speaking_character = "captain"

// Initial story setup
The vast expanse of space stretches before you as you stand on the bridge of The Prospector. Captain Sarah Chen approaches, her expression serious but welcoming.

"Welcome aboard," she says, extending her hand. "We've got a situation brewing in the Cygnus sector. Strange energy readings, possible alien artifacts. Right up our alley."

* [Ask about the mission details]
    "The readings suggest advanced technology," she explains, bringing up a holographic display. "But the sector's not exactly friendly. Pirates, magnetic storms, the usual fun."
    -> mission_choice

* [Inquire about the crew]
    "You'll be working with our core team," she says. "Rhea's our tech expert, Jax handles security, and Kade... well, Kade keeps the ship running, somehow."
    -> mission_choice

=== mission_choice ===
~ scene_image = "https\:\/\/images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=800&fit=crop"

The captain pulls up a star chart, highlighting several potential routes.

"We've got three options," she continues. "Your call on this one."

* [Take the direct route]
    "Direct approach. Risky, but could pay off if we're quick."
    -> end_intro

* [Suggest a stealth approach]
    "Sneaking through the debris field. Smart, might avoid unwanted attention."
    -> end_intro

* [Propose gathering intel first]
    "Cautious. I like it. We'll see what our contacts know."
    -> end_intro

=== end_intro ===
~ scene_image = "https\:\/\/images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=800&fit=crop"

"Alright, it's settled then," the captain nods. "Take some time to prepare. Check in with the crew, maybe see what Rhea's cooked up in Engineering. When you're ready, we'll make our move."

The journey ahead is uncertain, but The Prospector's crew stands ready. Your adventure begins here.

-> END