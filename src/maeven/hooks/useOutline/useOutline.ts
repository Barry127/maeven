import { useState, useEffect } from 'react';

export function useOutline(initialState: boolean = false) {
  const [outline, setOutline] = useState(initialState);

  useEffect(() => {
    const mouseDown = () => {
      setOutline(false);
    };

    const keyDown = () => {
      setOutline(true);
    };

    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('keydown', keyDown);

    return () => {
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('keydown', keyDown);
    };
  });

  return outline;
}
