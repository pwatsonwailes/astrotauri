import { useCallback } from 'react';

// Sound effects from Pixabay (free for commercial use)
const SOUND_EFFECTS = {
  navigation: new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=click-124467.mp3'),
  continue: new Audio('https://cdn.pixabay.com/download/audio/2022/03/19/audio_c8c8b2b807.mp3?filename=click-124472.mp3'),
  choice: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8b2b808.mp3?filename=click-124476.mp3'),
  complete: new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8c8b2b809.mp3?filename=success-1-6297.mp3'),
  newGame: new Audio('https://cdn.pixabay.com/download/audio/2021/08/09/audio_88347d37c9.mp3?filename=success-fanfare-trumpets-6185.mp3'),
  select: new Audio('https://cdn.pixabay.com/download/audio/2022/03/22/audio_c8c8a73469.mp3?filename=click-124469.mp3')
};

// Preload all audio
Object.values(SOUND_EFFECTS).forEach(audio => {
  audio.load();
  audio.volume = 1; // Set volume to 50%
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