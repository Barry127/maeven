import { useRef } from 'react';

let counter = 0;

export function useId(id: Id = {}): string {
  const uid = useRef(`maeven-id-${counter++}`);
  const componentId = typeof id === 'string' ? id : id.id;
  return componentId || uid.current;
}

export type Id = string | { id?: string };
