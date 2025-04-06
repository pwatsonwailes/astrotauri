# Ink Story Integration Guide

This document explains how to interact with the game's systems (Dossier, character state, etc.) directly from within your `.ink` story files.

## Overview

The game uses Ink's **External Functions** feature to allow `.ink` files to call predefined JavaScript functions. These functions update the game state managed by `useGameStore`.

## Calling External Functions

To call a function from Ink, use the tilde `~` followed by the function name and its arguments in parentheses. Arguments are passed directly to the corresponding JavaScript function.

**Syntax:**

```ink
~ FUNCTION_NAME(argument1, argument2, ...)
```

**Important:**

*   Function names are **case-sensitive** and must match the bindings defined in `src/components/story/StoryEngine.tsx`.
*   Arguments passed must match the **expected type** (string, number, etc.) for the function. Invalid types will cause errors logged in the developer console.
*   Use **double quotes** (`"`) for string arguments in Ink, especially if they contain spaces or special characters.

## Available Functions

Here are the functions you can call from your `.ink` files:

---

### Dossier Updates

**Notes:**

*   `UNLOCK_NOTE(noteId: string)`
    *   Sets the status of the note with the given `noteId` to `'available'`. Use this when the player discovers a note.
    *   Example: `~ UNLOCK_NOTE("note_found_datapad")`

*   `UPDATE_NOTE_STATUS(noteId: string, status: string)`
    *   Updates the status of the note with `noteId` to the specified `status`.
    *   Valid statuses: `"locked"`, `"available"`, `"active"`, `"completed"`, `"archived"`
    *   Example: `~ UPDATE_NOTE_STATUS("note_investigation_phase1", "completed")`

**Topics:**

*   `UNLOCK_TOPIC(topicId: string)`
    *   Sets the topic with `topicId` to unlocked (`isLocked = false`).
    *   Example: `~ UNLOCK_TOPIC("topic_alien_artifact")`

*   `ADD_TOPIC_NOTE(topicId: string, noteId: string)`
    *   Adds a `noteId` to the `relatedNotes` array of the specified `topicId`. Use this to link newly discovered information to a broader topic.
    *   Example: `~ ADD_TOPIC_NOTE("topic_ship_damage", "note_hull_breach_report")`

**Characters:**

*   `ADD_CHAR_NOTE(characterId: string, noteId: string)`
    *   Adds a `noteId` to the `notes` array associated with the character identified by `characterId`.
    *   Example: `~ ADD_CHAR_NOTE("char_jax", "note_jax_log_entry")`

**Hypotheses:**

*   `UPDATE_HYPOTHESIS(hypothesisId: string, status: string)`
    *   Updates the status of the hypothesis with `hypothesisId`.
    *   Valid statuses: `"locked"`, `"active"`, `"completed"`
    *   Example: `~ UPDATE_HYPOTHESIS("hyp_reactor_origin", "active")`

---

### Character State Updates

*   `UPDATE_CHARACTER_RELATIONSHIP(characterId: string, relationship: string)`
    *   Sets the relationship level for the character with `characterId`.
    *   Valid relationship values: `"Wary"`, `"Neutral"`, `"Cooperative"`, `"Allied"`, `"Trusted"`
    *   Example: `~ UPDATE_CHARACTER_RELATIONSHIP("char_aria", "Cooperative")`

*   `UPDATE_CHARACTER_STRESS(characterId: string, stressLevel: string)`
    *   Sets the stress level for the character with `characterId`.
    *   Valid stress levels: `"Calm"`, `"Tense"`, `"Stressed"`, `"Critical"`
    *   Example: `~ UPDATE_CHARACTER_STRESS("char_jax", "Stressed")`

*   `ADD_TRAUMA(characterId: string, trait: string)`
    *   Adds a new trauma trait string to the character identified by `characterId`.
    *   Example: `~ ADD_TRAUMA("char_samira", "Survivor's Guilt")`

---

## Speaker Attribution and Scene Management

This section details specific conventions for controlling character dialogue attribution and scene presence directly from Ink scripts.

### Controlling Dialogue Speakers

To ensure dialogue in the game is correctly attributed to the speaking character (displaying their name and potentially highlighting them in the scene list), you **must** add a specific tag before each line of dialogue.

**Syntax:**

Use a line tag starting with `#speaker:` followed by the character\'s unique ID.

```ink
#speaker:char_aharon
Aharon: "Recognition Day," Aharon says suddenly...

#speaker:char_kade
Kade: "And which of those five d’you think still runs the show?"

#speaker:char_lira
Lira: "Beautiful, isn’t it?"
```

**Important:**

*   Place the tag on the line immediately preceding the dialogue text.
*   The `character_id` must match one of the `id` values defined in `src/data/characters/index.ts`. Using an incorrect ID will result in the speaker not being correctly identified.
*   This tag should be used for all lines you want attributed to a specific character.

### Managing Characters in a Scene

The game UI includes a panel showing which characters are currently present in the scene. You can control this list directly from your Ink script using `EXTERNAL` function calls.

**Available Functions:**

*   `EXTERNAL addCharacterToScene(characterId)`
    *   Adds the specified character to the scene list. If the character is already present, it has no effect.
    *   Use this when a character enters the scene or becomes relevant.
*   `EXTERNAL removeCharacterFromScene(characterId)`
    *   Removes the specified character from the scene list. If the character is not present, it has no effect.
    *   Use this when a character leaves the scene or becomes irrelevant to the immediate interaction.
*   `EXTERNAL clearSceneCharacters()`
    *   Removes *all* characters from the scene list.
    *   Use this at the beginning of a new scene or when the group composition changes completely.

**Syntax & Examples:**

```ink
// At the start of a new scene on Hygeia
EXTERNAL clearSceneCharacters()
EXTERNAL addCharacterToScene("char_player")
EXTERNAL addCharacterToScene("char_aharon")
EXTERNAL addCharacterToScene("char_kade")
EXTERNAL addCharacterToScene("char_rhea")

The crew steps onto the bustling concourse of Hygeia.

// Later, Kade leaves
Kade heads towards a noisy bar.
EXTERNAL removeCharacterFromScene("char_kade")

// Aharon meets Lira in the greenhouse (Player isn't explicitly mentioned as leaving)
EXTERNAL addCharacterToScene("char_lira")
#speaker:char_lira
Lira: "Beautiful, isn’t it?"

// At the end of the chapter or a major scene transition
EXTERNAL clearSceneCharacters()
-> END
```

**Important:**

*   Use the exact function names: `addCharacterToScene`, `removeCharacterFromScene`, `clearSceneCharacters`.
*   The `characterId` passed to `addCharacterToScene` and `removeCharacterFromScene` **must** be a valid character ID from `src/data/characters/index.ts`.
*   Think carefully about when characters logically enter and leave the player\'s immediate surroundings or the focus of the narrative scene.

### Controlling Scene Background Music (Optional)

You can suggest background music changes using tags.

**Syntax:**

```ink
#scene_bgm:music_id
```

*   Replace `music_id` with an identifier for the desired music track (e.g., `tense_exploration`, `hygeia_festival`, `combat_theme`).
*   The game engine will log this request. Actual playback depends on the sound system implementation.

*(Note: This documentation assumes the game engine is set up to handle these tags and functions as described. Refer to `StoryEngine.tsx` for implementation details.)*

---

## Best Practices

*   **Define IDs Clearly:** Use consistent and meaningful IDs for notes, topics, characters, etc., in your `src/data/` files. Refer to these IDs in your Ink function calls.
*   **Use Variables:** For frequently used IDs or values, define them as `VAR` or `CONST` at the top of your `.ink` file for easier management.
    ```ink
    VAR note_to_unlock = "note_derelict_log_1"
    ~ UNLOCK_NOTE(note_to_unlock)
    ```
*   **Test Thoroughly:** Play through story sections that use external functions and check the developer console for any errors logged by the `StoryEngine`. Verify that the game state (Dossier, character status) updates as expected.
*   **Keep Logic Separate:** Avoid putting complex game logic directly into Ink. Use external functions primarily to *trigger* state changes based on narrative events. The core logic for how that state change affects gameplay should reside in the game's TypeScript code (hooks, components, store). 