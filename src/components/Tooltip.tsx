import React, { useState } from 'react';

interface TooltipProps {
  isLeft: boolean;
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ isLeft, content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={() => setIsVisible(true)}
      onTouchEnd={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute top-full px-3 py-2 text-base bg-gray-900 text-white rounded-lg whitespace-nowrap z-50 ${isLeft ? 'left-0' : 'right-0'}`}>
          {content}
        </div>
      )}
    </div>
  );
};