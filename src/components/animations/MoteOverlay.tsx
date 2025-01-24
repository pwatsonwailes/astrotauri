import React, { useEffect, useRef, useState } from 'react';
import { MoteConfig } from '../../types/animations';

interface MoteProps {
  config: MoteConfig;
}

export const MoteOverlay: React.FC<MoteProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const [motes, setMotes] = useState<Array<{
    id: string;
    style: React.CSSProperties;
    duration: number;
  }>>([]);

  useEffect(() => {
    const createMote = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.random() * 6 + 2;
      
      const hue = config.baseHue + (Math.random() * 10 - 5);
      const saturation = config.baseSaturation + (Math.random() * 10 - 5);
      const lightness = config.baseLightness + (Math.random() * 10 - 5);
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Random starting position within the container
      const posX = Math.random() * (rect.width - size);
      const posY = Math.random() * (rect.height - size);
      
      // Generate random direction vector
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const speed = Math.random() * 200 + 50; // Random speed between 50-250 pixels
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      
      const floatDuration = Math.random() * 3 + 2;
      
      const newMote = {
        id: Math.random().toString(36).substr(2, 9),
        style: {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          left: `${posX}px`,
          top: `${posY}px`,
          '--dx': `${dx}px`,
          '--dy': `${dy}px`,
        } as React.CSSProperties,
        duration: floatDuration
      };

      setMotes(prev => [...prev, newMote]);
      
      setTimeout(() => {
        setMotes(prev => prev.filter(m => m.id !== newMote.id));
      }, floatDuration * 1000);
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastSpawnRef.current >= 1000 / config.spawnRate) {
        createMote();
        lastSpawnRef.current = timestamp;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {motes.map(mote => (
        <div
          key={mote.id}
          className="ball"
          style={{
            ...mote.style,
            animation: `float ${mote.duration}s linear, blink ${mote.duration}s infinite`
          }}
        />
      ))}
    </div>
  );
};