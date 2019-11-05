import { useRef } from 'react';

let counter = 0;

export function useId(props: UseIdProps = {}): string {
  const uid = useRef(`maeven-id-${counter++}`);

  let id = typeof props === 'string' ? props : props.id;

  return id ? id : uid.current;
}

export type UseIdProps =
  | string
  | {
      id?: string;
    };
