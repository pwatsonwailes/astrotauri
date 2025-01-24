import React, { useState, useEffect } from 'react';
import { LayoutGrid, MapPin, Library, Target, BarChart2 } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { useEventStore } from '../../stores/useEventStore';
import { useTranslation } from '../../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';

export type ViewType = 'locations' | 'factions' | 'skills' | 'goals' | 'market' | 'story' | 'characterCreation';

interface ViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  const { events } = useEventStore();
  const [updates, setUpdates] = useState<ViewUpdate[]>([]);
  const { t } = useTranslation();

  // Process events to determine which views need indicators
  useEffect(() => {
    const latestEvents = events.slice(-20); // Only check recent events
    const newUpdates: ViewUpdate[] = [];

    latestEvents.forEach(event => {
      const timestamp = Date.now();

      switch (event.type) {
        case 'character-unlock':
        case 'story-progress':
          newUpdates.push({ view: 'locations', timestamp });
          break;
        case 'faction':
        case 'reputation':
          newUpdates.push({ view: 'factions', timestamp });
          break;
        case 'success':
          if (event.message.includes('skill')) {
            newUpdates.push({ view: 'skills', timestamp });
          }
          break;
        case 'info':
          if (event.message.includes('goal') || event.message.includes('opportunities')) {
            newUpdates.push({ view: 'goals', timestamp });
          }
          break;
      }
    });

    if (newUpdates.length > 0) {
      setUpdates(prev => [...prev, ...newUpdates]);
    }
  }, [events]);

  const views = [
    { id: 'locations', label: t.navigation.locations, icon: MapPin },
    { id: 'goals', label: t.navigation.goals, icon: Target },
    { id: 'market', label: t.navigation.market, icon: BarChart2 },
    { id: 'factions', label: t.navigation.factions, icon: LayoutGrid },
    { id: 'skills', label: t.navigation.skills, icon: Library },
  ] as const;

  return (
    <div className="flex gap-2">
      {views.map(view => {
        const hasUpdate = updates.some(u => u.view === view.id);
        const Icon = view.icon;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id as ViewType)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${currentView === view.id
                ? 'convex rowdy text-white'
                : 'text-gray-800 depressed'
              }
            `}
          >
            <Tooltip content={view.label} isLeft={false}>
              <div className="relative">
                <Icon className="w-5 h-5" />
                <AnimatePresence>
                  {hasUpdate && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </div>
            </Tooltip>
          </button>
        );
      })}
    </div>
  );
};