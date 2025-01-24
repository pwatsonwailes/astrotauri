import React from 'react';
import { AlertTriangle, TrendingUp, Shield, Building2, Zap } from 'lucide-react';
import { EventType } from '../../types/events';

interface EventIconProps {
  type: EventType;
  className?: string;
}

export const EventIcon: React.FC<EventIconProps> = ({ type, className = "w-5 h-5" }) => {
  switch (type) {
    case 'market':
      return <TrendingUp className={className} />;
    case 'reputation':
      return <Shield className={className} />;
    case 'faction':
      return <Building2 className={className} />;
    case 'danger':
      return <AlertTriangle className={className} />;
    case 'success':
      return <Zap className={className} />;
    default:
      return null;
  }
};