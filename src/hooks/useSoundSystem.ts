import { useCallback } from 'react';

import audio from '../data/audio';

// Sound effects from Pixabay (free for commercial use)
const SOUND_EFFECTS = {
  navigation: new Audio(audio.zingSfx),
  continue: new Audio(audio.continueSfx),
  choice: new Audio(audio.continueSfx),
  complete: new Audio(audio.completeStorySfx),
  newGame: new Audio(audio.notificationSfx),
  select: new Audio(audio.continueSfx)
};

// Preload all audio
Object.values(SOUND_EFFECTS).forEach(audio => {
  audio.load();
  audio.volume = 1;
});

export const useSoundSystem = () => {
  const playSound = useCallback((type: keyof typeof SOUND_EFFECTS) => {
    const audio = SOUND_EFFECTS[type];
    if (audio) {
      // Reset the audio to start if it's already playing
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors - some browsers require user interaction first
      });
    }
  }, []);

  return { playSound };
};