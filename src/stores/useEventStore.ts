import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { GameEvent } from '../types/events';

import { StorageService } from '../services/storage';

interface EventStore {
  events: GameEvent[];
  displayEvents: GameEvent[];
  addEvent: (event: Omit<GameEvent, 'id' | 'timestamp'>) => void;
  resetEvents: () => void;
}

export const useEventStore = create<EventStore>()(
  devtools(
    persist(
      (set, get) => ({
        events: [],
        displayEvents: [],

        initialize: async () => {
          try {
            const savedState = await StorageService.loadGameState();
            if (savedState) {
              set({ ...savedState });
            } else {
              set({ events: [], displayEvents: [] });
            }
          } catch (error) {
            console.error('Failed to load game state:', error);
            set({ ...getInitialState(), isLoading: false });
          }
        },

        addEvent: (event) => {
          const newEvent = {
            ...event,
            id: Math.random().toString(36).substring(2, 9),
            timestamp: Date.now()
          };

          const state = get();

          set({
            // Keep persistent events, filter out old non-persistent ones
            events: [
              ...state.events.filter(e => e.persistent || 
                Date.now() - e.timestamp < 24 * 60 * 60 * 1000), // Keep last 24 hours
              newEvent
            ],
            displayEvents: event.silent 
              ? state.displayEvents 
              : [newEvent, ...state.displayEvents].slice(0, 5)
          });

          if (!event.silent) {
            setTimeout(() => {
              set(state => ({
                displayEvents: state.displayEvents.filter(e => e.id !== newEvent.id)
              }));
            }, event.type === 'market' ? 8000 : 5000);
          }
        },

        resetEvents: () => set({ events: [], displayEvents: [] })
      }),
      {
        name: 'event-storage'
      }
    )
  )
);