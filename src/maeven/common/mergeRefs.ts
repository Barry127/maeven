import { Ref } from 'react';

export function mergeRefs<T = HTMLElement>(
  ...refs: (Ref<T> | undefined | null)[]
): Ref<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        (ref as any).current = value;
      }
    });
  };
}
