import React from 'react';
import { Map, Navigation, MessageSquare, Shield, Cpu, Users, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { Quest } from '../types/quest';
import { AVAILABLE_QUESTS } from '../data/quests';

export const BridgeControl: React.FC = () => {
  const { resources, activeQuests, addQuest, setScreen, setCurrentStory, addCompletedConversation, selectedCharacter } = useGameStore();
  const { getCrewStories } = useStorySystem();

  // Get available captain stories
  const captainStories = getCrewStories('captain');

  // Filter out completed and failed missions
  const availableMissions = AVAILABLE_QUESTS.filter(mission => {
    const existingQuest = activeQuests.find(q => q.id === mission.id);
    return !existingQuest || (existingQuest.status !== 'active' && existingQuest.status !== 'completed' && existingQuest.status !== 'failed');
  });

  const canStartMission = (requirements: Partial<typeof resources>) => {
    return Object.entries(requirements).every(
      ([key, value]) => resources[key as keyof typeof resources] >= (value || 0)
    );
  };

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'diplomatic':
        return <Users className="w-5 h-5 text-green-400" />;
      case 'combat':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'strategic':
        return <Zap className="w-5 h-5 text-purple-400" />;
      default:
        return <Navigation className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatRecommendation = (mission: typeof AVAILABLE_QUESTS[0]) => {
    if (!selectedCharacter) return null;
    
    const { stats } = selectedCharacter;
    
    let recommendedStat = '';
    let statValue = 0;
    
    switch (mission.type) {
      case 'technical':
        recommendedStat = 'Technical Expertise';
        statValue = stats.technicalExpertise;
        break;
      case 'diplomatic':
        recommendedStat = 'Diplomacy';
        statValue = stats.diplomacy;
        break;
      case 'combat':
        recommendedStat = 'Risk Tolerance';
        statValue = stats.riskTolerance;
        break;
      case 'strategic':
        recommendedStat = 'Strategic Intelligence';
        statValue = stats.strategicIntelligence;
        break;
      default:
        recommendedStat = 'Leadership';
        statValue = stats.leadership;
    }
    
    const recommendation = statValue >= 7 ? 'Highly Suitable' : 
                          statValue >= 5 ? 'Suitable' : 
                          'Challenging';
                          
    return { stat: recommendedStat, value: statValue, recommendation };
  };

  const startMission = (mission: typeof AVAILABLE_QUESTS[0]) => {
    if (!canStartMission(mission.requirements)) return;

    const newQuest: Quest = {
      ...mission,
      currentTurn: 1,
      status: 'active',
      progress: 0,
      cumulativeScore: 0
    };

    addQuest(newQuest);
  };

  const startCaptainStory = (story: typeof captainStories[0]) => {
    setCurrentStory(story.content);
    setScreen('story');
    addCompletedConversation(story.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Map className="w-5 h-5" />
        <h2 className="text-xl font-bold">Bridge Control</h2>
      </div>

      {captainStories.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium">Captain's Updates</h3>
          </div>
          <div className="space-y-3">
            {captainStories.map(story => (
              <button
                key={story.id}
                onClick={() => startCaptainStory(story)}
                className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition-colors"
              >
                <h4 className="font-medium text-lg mb-2">{story.title}</h4>
                <p className="text-sm text-gray-400">The captain has important information to share.</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {availableMissions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No missions available at this time</p>
          <p className="text-sm mt-2">Check back after completing current missions</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {availableMissions.map((mission) => {
            const isActive = activeQuests.some(q => q.id === mission.id && q.status === 'active');
            const canStart = canStartMission(mission.requirements) && !isActive;
            const statRecommendation = getStatRecommendation(mission);

            return (
              <div
                key={mission.id}
                className={`bg-gray-800 rounded-lg p-6 ${
                  canStart ? 'cursor-pointer hover:bg-gray-700' : 'opacity-75'
                }`}
                onClick={() => canStart && startMission(mission)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getMissionTypeIcon(mission.type)}
                    <h3 className="text-lg font-medium">{mission.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm
                      ${mission.type === 'technical' ? 'bg-blue-900/50 text-blue-300' :
                        mission.type === 'diplomatic' ? 'bg-green-900/50 text-green-300' :
                        mission.type === 'combat' ? 'bg-red-900/50 text-red-300' :
                        mission.type === 'strategic' ? 'bg-purple-900/50 text-purple-300' :
                        'bg-gray-900/50 text-gray-300'}`}
                    >
                      {mission.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm
                      ${mission.riskLevel === 'high' ? 'bg-red-900/50 text-red-300' :
                        mission.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                        'bg-green-900/50 text-green-300'}`}
                    >
                      {mission.riskLevel} risk
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{mission.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(mission.requirements).map(([key, value]) => (
                        <span
                          key={key}
                          className={`px-2 py-1 rounded text-xs
                            ${resources[key as keyof typeof resources] >= (value || 0)
                              ? 'bg-green-900/50 text-green-300'
                              : 'bg-red-900/50 text-red-300'
                            }`}
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Rewards</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(mission.rewards.resources).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-1 rounded text-xs bg-purple-900/50 text-purple-300"
                        >
                          {key}: +{value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {statRecommendation && (
                  <div className="mt-4 bg-gray-700/50 rounded p-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Character Assessment</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        Key Stat: <span className="font-medium">{statRecommendation.stat}</span> ({statRecommendation.value}/10)
                      </span>
                      <span className={`px-2 py-1 rounded text-xs
                        ${statRecommendation.recommendation === 'Highly Suitable' ? 'bg-green-900/50 text-green-300' :
                          statRecommendation.recommendation === 'Suitable' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-red-900/50 text-red-300'}`}
                      >
                        {statRecommendation.recommendation}
                      </span>
                    </div>
                  </div>
                )}

                {isActive && (
                  <div className="mt-4 px-4 py-2 bg-blue-900/50 text-blue-300 rounded">
                    Mission in progress
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};