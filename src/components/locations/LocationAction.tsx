import React from 'react';
import { motion } from "motion/react";
import { MapPin, Users, Search } from 'lucide-react';

interface LocationActionProps {
  action: {
    id: string;
    type: 'explore' | 'talk' | 'investigate';
    title: string;
    description: string;
    narrativeId: string;
  };
  onSelect: () => void;
}

export const LocationAction: React.FC<LocationActionProps> = ({ action, onSelect }) => {
  const getIcon = () => {
    switch (action.type) {
      case 'explore':
        return <MapPin className="w-5 h-5" />;
      case 'talk':
        return <Users className="w-5 h-5" />;
      case 'investigate':
        return <Search className="w-5 h-5" />;
    }
  };

  return (
    <motion.button
      onClick={onSelect}
      className="w-full text-left p-4 promontory rounded-lg hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gray-100">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-black">{action.title}</h4>
          <p className="text-gray-600">{action.description}</p>
        </div>
      </div>
    </motion.button>
  );
};