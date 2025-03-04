import React, { useState } from 'react';
import { Map, ChevronLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { Quest } from '../types/quest';
import { AVAILABLE_QUESTS } from '../data/quests';

export const BridgeControl: React.FC = () => {
  const { resources, activeQuests, addQuest, setScreen, setCurrentStory, addCompletedConversation, selectedCharacter, completedConversations } = useGameStore();
  const { getCrewStories } = useStorySystem();
  const [selectedMission, setSelectedMission] = useState<typeof AVAILABLE_QUESTS[0] | null>(null);

  // Get available captain stories, excluding the Prologue
  const captainStories = getCrewStories('captain').filter(story => 
    story.id !== 'prologue' && !completedConversations.includes(story.id)
  );

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
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'diplomatic':
        return <Users className="w-5 h-5 text-green-600" />;
      case 'combat':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'strategic':
        return <Zap className="w-5 h-5 text-purple-600" />;
      default:
        return <Navigation className="w-5 h-5 text-blue-600" />;
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
    setSelectedMission(null);
  };

  const startCaptainStory = (story: typeof captainStories[0]) => {
    setCurrentStory(story.content);
    setScreen('story');
    addCompletedConversation(story.id);
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'diplomatic':
        return 'bg-green-100 text-green-800';
      case 'combat':
        return 'bg-red-100 text-red-800';
      case 'strategic':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {captainStories.length > 0 && (
        <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium text-slate-800">Captain's Updates</h3>
          </div>
          <div className="space-y-3">
            {captainStories.map(story => (
              <button
                key={story.id}
                onClick={() => startCaptainStory(story)}
                className="w-full text-left bg-white hover:bg-orange-50 rounded-lg p-4 transition-colors border border-slate-200 hover:border-orange-200"
              >
                <h4 className="font-medium text-lg mb-2 text-slate-800">{story.title}</h4>
                <p className="text-sm text-slate-600">The captain has important information to share.</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedMission ? (
        // Mission details view
        <div className="overflow-hidden">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedMission(null)}
              className="flex items-center text-slate-600 hover:text-orange-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Back to missions</span>
            </button>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(selectedMission.type)}`}>
                {selectedMission.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${getRiskLevelColor(selectedMission.riskLevel)}`}>
                {selectedMission.riskLevel} risk
              </span>
            </div>
          </div>
          
          <div className="py-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedMission.name}</h3>
            <p className="text-slate-600 mb-6">{selectedMission.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedMission.requirements).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-2 py-1 rounded text-xs
                        ${resources[key as keyof typeof resources] >= (value || 0)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Rewards</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedMission.rewards.resources).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800"
                    >
                      {key}: +{value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => startMission(selectedMission)}
                disabled={!canStartMission(selectedMission.requirements)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  canStartMission(selectedMission.requirements)
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {canStartMission(selectedMission.requirements) ? 'Start Mission' : 'Insufficient Resources'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Mission list view
        availableMissions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Map className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
            <p>No missions available at this time</p>
            <p className="text-sm mt-2">Check back after completing current missions</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            {availableMissions.map((mission) => {
              const isActive = activeQuests.some(q => q.id === mission.id && q.status === 'active');
              const canStart = canStartMission(mission.requirements) && !isActive;
              
              return (
                <div
                  key={mission.id}
                  onClick={() => setSelectedMission(mission)}
                  className={`py-4 cursor-pointer mission ${
                    !canStart ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-slate-800">{mission.name}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(mission.type)}`}>
                        {mission.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(mission.riskLevel)}`}>
                        {mission.riskLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-slate-600 line-clamp-1">{mission.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};