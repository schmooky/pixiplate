import React from 'react';

type ResizeObject = {
  width?: number;
  height?: number;
  isPortrait?: boolean;
};

export const useResize = (): ResizeObject => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
    isPortrait: undefined,
  });
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isPortrait: window.innerHeight > window.innerWidth,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Add orientation change listener
    window.addEventListener('orientationchange', () => setTimeout(() => handleResize(), 50));
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};
