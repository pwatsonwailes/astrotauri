import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { significantChoices, storyNotes, storySets } from '../../../data/storyData';
import { StoryDetails } from '../../../types/story';

export const NotesTab: React.FC = () => {
  const { 
    notes, 
    unlockNote, 
    setCurrentStory, 
    setScreen,
    completedConversations,
    selectedStoryDetails,
    setSelectedStoryDetails
  } = useGameStore();

  const handleNoteClick = (noteId: string, nextNoteId?: string) => {
    // Handle story launch for specific notes
    if (noteId === 'prologue-mission') {
      setCurrentStory(storySets.prologue.stories[1].content);
      setScreen('story');
      return;
    }

    // Handle unlocking next note
    if (nextNoteId) {
      unlockNote(nextNoteId);
    }
  };

  const handleStoryClick = (storyId: string) => {
    // Find the story set containing this story
    for (const setKey in storySets) {
      const set = storySets[setKey];
      const story = set.stories.find(s => s.id === storyId);
      
      if (story) {
        const isCompleted = completedConversations.includes(storyId);
        const details: StoryDetails = {
          title: story.title,
          description: story.description,
          completedOn: isCompleted ? Date.now() : undefined
        };

        // If there's a next story and all requirements are met, include it
        if (story.nextStoryId) {
          const nextStory = set.stories.find(s => s.id === story.nextStoryId);
          if (nextStory) {
            const canAccessNext = nextStory.requiredChoices.every(choice => 
              notes.some(note => note.id === choice && !note.isLocked)
            );

            if (canAccessNext) {
              details.nextStory = {
                id: nextStory.id,
                title: nextStory.title,
                description: nextStory.description
              };
            }
          }
        }

        setSelectedStoryDetails(details);
        
        // If the story isn't completed, launch it
        if (!isCompleted) {
          setCurrentStory(story.content);
          setScreen('story');
        }
        return;
      }
    }
  };

  // Filter notes to only show significant choices and story notes
  const displayNotes = notes.filter(note => 
    significan