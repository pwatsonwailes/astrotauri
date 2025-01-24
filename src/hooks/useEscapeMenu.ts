import { useState, useEffect, useCallback } from 'react';

export const useEscapeMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    isMenuOpen,
    closeMenu: () => setIsMenuOpen(false)
  };
};