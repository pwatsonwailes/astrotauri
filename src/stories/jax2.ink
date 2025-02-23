VAR character_class = ""
VAR scene_image = "https\:\/\/images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
LIST present_characters = jax
VAR speaking_character = "jax"

Jax is reviewing security footage when you arrive. "Those pirates we discussed? They've changed their patterns."

* [Ask about the changes]
    "More organized. More deliberate." He highlights several patrol routes. "They're not just raiding anymore. They're searching for something."
    
    * * [Inquire about their target]
        "Not sure yet. But whatever it is, it's got them spooked. And that makes them dangerous."
        -> END
    
    * * [Discuss implications]
        "Means we need to be extra careful. One wrong move could put us in their crosshairs."
        -> END

* [Suggest proactive measures]
    "Already on it," he nods. "I've updated our evasion protocols and marked new safe zones."
    
    * * [Review the protocols]
        He walks you through the changes. "It'll mean longer routes, but better safe than sorry."
        -> END
    
    * * [Ask about countermeasures]
        "Got some ideas. Non-lethal, mostly. Rather avoid a firefight if we can."
        -> END

* [Leave]
    -> END