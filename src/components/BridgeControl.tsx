import React, { useState } from 'react';
import { Map, ChevronLeft, Cpu, Users, Shield, Zap, Navigation, AlertCircle, Package } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { Quest } from '../types/quest';
import { AVAILABLE_QUESTS } from '../data/quests';

export const BridgeControl: React.FC = () => {
  const { 
    resources, 
    activeQuests, 
    addQuest, 
    setScreen, 
    setCurrentStory, 
    addCompletedConversation, 
    selectedCharacter, 
    completedConversations,
    inventory 
  } = useGameStore();
  const { getCrewStories } = useStorySystem();
  const [selectedMission, setSelectedMission] = useState<typeof AVAILABLE_QUESTS[0] | null>(null);

  // Get available captain stories, excluding the Prologue
  const captainStories = getCrewStories('captain').filter(story => 
    story.id !== 'prologue' && !completedConversations.includes(story.id)
  );

  // Get all missions, including active ones
  const allMissions = [...AVAILABLE_QUESTS].map(mission => {
    const activeQuest = activeQuests.find(q => q.id === mission.id);
    return activeQuest || mission;
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

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const needsAttention = (mission: Quest) => {
    return mission.status === 'active' && 
           mission.turnInteractions[mission.currentTurn] && 
           !mission.turnInteractions[mission.currentTurn].processed;
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Left Column - Mission List */}
      <div className="overflow-auto pr-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Missions</h2>
        </div>

        {captainStories.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <Map className="w-5 h-5 text-blue-600" />
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

        <div className="space-y-4">
          {allMissions.map((mission) => {
            const isActive = mission.status === 'active';
            const requiresAttention = isActive && needsAttention(mission as Quest);
            const canStart = !isActive && canStartMission(mission.requirements);
            
            return (
              <div
                key={mission.id}
                onClick={() => setSelectedMission(mission)}
                className={`bg-white/70 rounded-lg p-4 cursor-pointer transition-all border relative ${
                  selectedMission?.id === mission.id 
                    ? 'border-orange-300 ring-1 ring-orange-300' 
                    : isActive
                    ? getMissionStatusColor(mission.status)
                    : 'border-slate-200 hover:border-orange-200'
                } ${!canStart && !isActive ? 'opacity-75' : ''}`}
              >
                {requiresAttention && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getMissionTypeIcon(mission.type)}
                    <h3 className="font-medium text-slate-800">{mission.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(mission.type)}`}>
                      {mission.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(mission.riskLevel)}`}>
                      {mission.riskLevel} risk
                    </span>
                    {isActive && (
                      <span className={`px-2 py-1 rounded-full text-xs ${getMissionStatusColor(mission.status)}`}>
                        Turn {(mission as Quest).currentTurn}/{mission.duration}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{mission.description}</p>
                {isActive && (mission as Quest).progress > 0 && (
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(mission as Quest).progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {allMissions.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Map className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
              <p>No missions available at this time</p>
              <p className="text-sm mt-2">Check back after completing current missions</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Mission Details */}
      <div className="overflow-auto pl-4 border-l border-slate-200">
        {selectedMission ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedMission(null)}
                className="flex items-center text-slate-600 hover:text-orange-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Close</span>
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
            
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedMission.name}</h2>
              <p className="text-slate-600 mb-6">{selectedMission.description}</p>
              
              {'status' in selectedMission && selectedMission.status === 'active' ? (
                <div className="space-y-6">
                  {needsAttention(selectedMission as Quest) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-red-800 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <h3 className="font-medium">Action Required</h3>
                      </div>
                      <p className="text-red-700 text-sm">
                        This mission requires your attention before advancing to the next turn.
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Mission Progress</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Turn {selectedMission.currentTurn} of {selectedMission.duration}</span>
                        <span className="font-medium text-slate-800">{selectedMission.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedMission.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mission interaction UI would go here */}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedMission.requirements).map(([key, value]) => (
                        <span
                          key={key}
                          className={`px-2 py-1 rounded text-xs ${
                            resources[key as keyof typeof resources] >= (value || 0)
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
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Rewards</h3>
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

                  {selectedCharacter && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 mb-3">Assessment</h3>
                      {(() => {
                        const assessment = getStatRecommendation(selectedMission);
                        if (!assessment) return null;

                        return (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">{assessment.stat}</span>
                              <span className="text-sm font-medium text-slate-800">{assessment.value}/10</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div
                                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(assessment.value / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
              
              {'status' in selectedMission ? null : (
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
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a mission to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};