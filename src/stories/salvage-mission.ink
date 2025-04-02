VAR character_class = ""
VAR scene_image = "shipZ1"
LIST present_characters = You, Kade, Rhea, Jax
VAR speaking_character = "none"

-> BeforeMission

=== BeforeMission ===

The Prospector's mess hall is quiet except for the soft hum of the ship's engines. Your crew is gathered around the table, each lost in their own thoughts about the upcoming mission.

Kade breaks the silence first, his usual cocky grin nowhere to be seen. "So, what exactly are we looking for out there?"

* [Share what Aharon told you]
    "Aharon says there's something valuable on that derelict. Something worth the risk."
    -> crew_reactions

* [Keep the details vague]
    "Just another salvage job. In and out, quick and clean."
    -> crew_reactions

* [Be honest about the uncertainty]
    "I don't know exactly. But Aharon's never steered us wrong before."
    -> crew_reactions

=== crew_reactions ===
~ speaking_character = "Rhea"
Rhea looks up from her datapad, frowning. "The ship's power signature is... odd. Like nothing I've seen before."

~ speaking_character = "Jax"
"Could be a trap," Jax adds, his voice low. "Pirates have been known to use derelicts as bait."

* [Focus on the mission]
    ~ speaking_character = "You"
    "We stick to the plan. Get in, find what we're looking for, get out. Simple."
    -> mission_prep

* [Address their concerns]
    ~ speaking_character = "You"
    "Your concerns are noted. We'll be extra careful. Double-check everything."
    -> mission_prep

* [Remind them of the stakes]
    ~ speaking_character = "You"
    "Look, we need this job. The credits alone will keep us flying for months."
    -> mission_prep

=== mission_prep ===
~ speaking_character = "none"
The crew nods, falling into their familiar pre-mission routines. Rhea runs diagnostics on her equipment, Jax checks his weapons, and Kade plots the approach vector.

This is what you do. This is who you are. A crew of survivors, making their way in the unforgiving void of space.

But something feels different about this job. Something in Aharon's voice when he gave you the coordinates.

* [Time to move]
    ~ speaking_character = "You"
    "Alright, people. Let's get to work."
    -> END

* [One last check]
    ~ speaking_character = "You"
    "Final equipment check. I don't want any surprises out there."
    -> END

* [Trust your instincts]
    ~ speaking_character = "You"
    "Stay sharp. Something tells me this isn't going to be a routine salvage."
    -> END