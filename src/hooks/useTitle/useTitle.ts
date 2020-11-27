import { useEffect } from 'react';

/**
 * useTitle sets document title when a title is passed.
 */
export function useTitle(title?: string): void {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
