'use client';
import { useState, useEffect } from 'react';
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
}
