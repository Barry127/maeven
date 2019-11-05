import { useState, useCallback, FocusEventHandler, FocusEvent } from 'react';

export function useFocus(props: UseFocusProps = {}): UseFocus {
  const { onBlur: propsOnBlur, onFocus: propsOnFocus } = props;
  const [hasFocus, setFocus] = useState(false);

  const onBlur = useCallback(
    (ev: FocusEvent<Element>) => {
      setFocus(false);
      if (typeof propsOnBlur === 'function') {
        propsOnBlur(ev);
      }
    },
    [propsOnBlur, setFocus]
  );

  const onFocus = useCallback(
    (ev: FocusEvent<Element>) => {
      setFocus(true);
      if (typeof propsOnFocus === 'function') {
        propsOnFocus(ev);
      }
    },
    [propsOnFocus, setFocus]
  );

  return [hasFocus, { onBlur, onFocus }];
}

export interface UseFocusProps {
  onBlur?: FocusEventHandler<Element>;
  onFocus?: FocusEventHandler<Element>;
}

export type UseFocus = [
  boolean,
  {
    onBlur: FocusEventHandler<Element>;
    onFocus: FocusEventHandler<Element>;
  }
];
