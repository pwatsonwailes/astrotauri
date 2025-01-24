import React, { useEffect, useState } from 'react';
import { motion } from "motion/react"

interface TutorialHighlightProps {
  selector: string;
}

export const TutorialHighlight: React.FC<TutorialHighlightProps> = ({ selector }) => {
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  
  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      const updateRect = () => {
        setElementRect(element.getBoundingClientRect());
      };
      
      updateRect();
      window.addEventListener('resize', updateRect);
      return () => window.removeEventListener('resize', updateRect);
    }
  }, [selector]);

  if (!elementRect) return null;

  const padding = 8; // Padding around the highlighted element

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute pointer-events-none"
        style={{
          top: elementRect.top - padding,
          left: elementRect.left - padding,
          width: elementRect.width + (padding * 2),
          height: elementRect.height + (padding * 2),
          zIndex: 40
        }}
      >
        {/* Highlight border */}
        <div className="absolute inset-0 rounded-lg border-2 border-amber-500" />
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-amber-500"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.4 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1
          }}
        />

        {/* Connecting line */}
        <svg
          className="absolute"
          style={{
            width: '100px',
            height: '100px',
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            overflow: 'visible'
          }}
        >
          <motion.path
            d={`M 0,0 C 50,0 50,0 100,0`}
            stroke="#f97316"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.div>
    </>
  );
};