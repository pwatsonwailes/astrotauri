import { AnimatePresence, motion } from 'motion/react';
import { useGameStore } from './store/gameStore';
import { IntroScreen } from './components/IntroScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { StoryScreen } from './components/StoryScreen';
import { ShipHub } from './components/ShipHub';
import { TutorialScreen } from './components/TutorialScreen';
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
        
        {currentScreen === 'ship-hub' && (
          <motion.div
            key="ship-hub"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="fixed inset-0"
          >
            <ShipHub />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;