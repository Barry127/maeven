import { useState, useEffect } from 'react';

export function useOutline() {
  const [outline, setOutline] = useState(false);

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
