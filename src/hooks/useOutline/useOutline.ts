import { useEffect, useState } from 'react';

/**
 * useOutline returns true when an element should have a focus outline on focus (when user is navigating page using keyboard) and false when not (when user uses mouse).
 */
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
