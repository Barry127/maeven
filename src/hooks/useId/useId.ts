import { useRef } from 'react';

let counter = 0;

/**
 * useId returns the id from its argument or if no id given it returns a unique id.
 */
export function useId(id: Id = {}) {
  const uid = useRef(`mvn-id-${counter++}`);
  const componentId = typeof id === 'string' ? id : id.id;
  return componentId || uid.current;
}

export type Id = string | { id?: string };
