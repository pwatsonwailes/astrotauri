import { ResourceBar } from './ResourceBar';
import { EventLog } from './EventLog';
import { FactionsView } from './views/FactionsView';
import { MarketView } from './views/MarketView';
import { StoryView } from './story/StoryView';
import { CharacterCreation } from './character/CharacterCreation';
import { ViewSelector } from './navigation/ViewSelector';
import { TutorialOverlay } from './tutorial/TutorialOverlay';
import { TutorialHighlight } from './tutorial/TutorialHighlight';
import { GoalsView } from './goals/GoalsView';
import { SkillsView } from './skills/SkillsView';
import { EndTurnButton } from './common/EndTurnButton';
import { LocationsView } from './views/LocationsView';
import { motion, AnimatePresence } from "motion/react"

import { useGameStore } from '../stores/useGameStore';
import { useEventStore } from '../stores/useEventStore';
import { useTutorial } from '../hooks/useTutorial';
import { calculateMaxEnergy } from '../utils/energy';

export function MainGameUI() {
  const {
    currentView,
    credits,
    condition,
    stress,
    energyPoints,
    reputation,
    updateView,
    endTurn
  } = useGameStore();

  const { displayEvents } = useEventStore();
  const { tutorialState, getCurrentStep, completeStep, skipTutorial } = useTutorial();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'characterCreation':
        return <CharacterCreation setCurrentView={updateView} />;
      case 'story':
        return <StoryView handleViewChange={updateView} />;
      case 'goals':
        return <GoalsView />;
      case 'market':
        return <MarketView />;
      case 'locations':
        return <LocationsView />;
      case 'factions':
        return <FactionsView />;
      case 'skills':
        return <SkillsView />;
      default:
        return null;
    }
  };

  return (
    <div className="adjustedHeight creamyBg">
      <div className="mx-4">
        {currentView !== 'characterCreation' && currentView !== 'story' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between navbar"
          >
            <ResourceBar
              credits={credits}
              condition={condition}
              stress={stress}
              energyPoints={energyPoints}
              maxEnergy={calculateMaxEnergy(condition)}
              reputation={reputation}
            />

            <EndTurnButton onEndTurn={endTurn} />

            <ViewSelector
              currentView={currentView}
              onViewChange={updateView}
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {displayEvents.length > 0 && (
        <EventLog displayEvents={displayEvents} />
      )}
      
      {currentView !== 'characterCreation' && currentView !== 'story' && tutorialState.isActive && getCurrentStep() && (
        <>
          <TutorialOverlay
            step={getCurrentStep()!}
            onComplete={completeStep}
            onSkip={skipTutorial}
          />
          {getCurrentStep()?.highlight && (
            <TutorialHighlight selector={getCurrentStep()!.highlight!} />
          )}
        </>
      )}
    </div>
  );
}