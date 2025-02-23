VAR character_class = ""
VAR scene_image = "https\:\/\/images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&h=800&fit=crop"
LIST present_characters = kade
VAR speaking_character = "kade"

Kade is unusually serious when you find him, surrounded by complex navigational data. "That data we recovered? It's... interesting."

* [Ask for details]
    "The coordinates don't make sense," he says, manipulating a 3D star map. "They point to... nothing. Empty space. But the energy readings..."
    
    * * [Suggest an investigation]
        His eyes light up. "Exactly what I was thinking. Something's out there, hiding."
        -> END
    
    * * [Express skepticism]
        "I know how it sounds," he admits. "But I've triple-checked. These readings are real."
        -> END

* [Discuss safety concerns]
    "Already mapped out safe approach vectors," he assures you. "If something's there, we can check it out without exposing ourselves."
    
    * * [Review the approach]
        He shows you a carefully plotted course. "Keeps us in sensor shadow most of the way."
        -> END
    
    * * [Ask about backup plans]
        "Got three different escape routes planned. Whatever's out there, we won't get trapped."
        -> END

* [Leave]
    -> END