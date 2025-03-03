import React, { useRef, useEffect } from 'react';

interface StoryContentProps {
  paragraphs: string[];
}

export const StoryContent: React.FC<StoryContentProps> = ({ paragraphs }) => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (textContainerRef.current && paragraphs.length > 0) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [paragraphs]);

  return (
    <div 
      ref={textContainerRef}
      className="flex-grow overflow-y-auto mb-6 p-4 custom-scrollbar textPanel"
    >
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p 
            key={`paragraph-${index}`}
            className="text-lg transition-opacity duration-500 ease-in-out opacity-100"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};