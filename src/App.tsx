import { AnimatePresence, motion } from 'motion/react';
import { useGameStore } from './store/gameStore';
import { IntroScreen } from './components/IntroScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { StoryScreen } from './components/StoryScreen';
import { TutorialScreen } from './components/TutorialScreen';
import { EscapeMenu } from './components/EscapeMenu';
import { useEffect, useState } from 'react';
import mainStory from './stories/main.ink?raw';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentStory = useGameStore((state) => state.currentStory);
  const [isEscapeMenuOpen, setIsEscapeMenuOpen] = useState(false);

  // Handle ESC key to open the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentScreen !== 'intro' && currentScreen !== 'character-select') {
        setIsEscapeMenuOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  return (
    <div className="min-h-screen creamyBg overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <motion.div
            key="intro"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="fixed inset-0"
          >
            <IntroScreen />
          </motion.div>
        )}
        
        {currentScreen === 'character-select' && (
          <motion.div
            key="character-select"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="fixed inset-0"
          >
            <CharacterSelect />
          </motion.div>
        )}
        
        {currentScreen === 'story' && (
          <motion.div
            key="story"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="fixed inset-0"
          >
            <StoryScreen storyContent={currentStory || mainStory} />
          </motion.div>
        )}
        
        {currentScreen === 'tutorial' && (
          <motion.div
            key="tutorial"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="fixed inset-0"
          >
            <TutorialScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Escape Menu */}
      <EscapeMenu 
        isOpen={isEscapeMenuOpen} 
        onClose={() => setIsEscapeMenuOpen(false)} 
      />
    </div>
  );
}

export default App;