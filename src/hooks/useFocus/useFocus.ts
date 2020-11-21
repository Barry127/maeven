import { FocusEvent, FocusEventHandler, useCallback, useState } from 'react';

/**
 * useFocus keeps a local state hasFocus based on onFocus and onBlur props for a DOM Element. If given props contain an onFocus or onBlur handler it is wrapped.
 */
export function useFocus<T = Element>(
  props: Partial<FocusEventHandlers<T>> = {}
): [boolean, FocusEventHandlers<T>] {
  const { onBlur: propsOnBlur, onFocus: propsOnFocus } = props;
  const [hasFocus, setFocus] = useState(false);

  const onBlur = useCallback(
    (ev: FocusEvent<T>) => {
      if (typeof propsOnBlur === 'function') {
        propsOnBlur(ev);
      }
      if (!ev.defaultPrevented) {
        setFocus(false);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [propsOnBlur]
  );

  const onFocus = useCallback(
    (ev: FocusEvent<T>) => {
      if (typeof propsOnFocus === 'function') {
        propsOnFocus(ev);
      }
      if (!ev.defaultPrevented) {
        setFocus(true);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [propsOnFocus]
  );

  return [hasFocus, { onBlur, onFocus }];
}

export interface FocusEventHandlers<T = Element> {
  onBlur: FocusEventHandler<T>;
  onFocus: FocusEventHandler<T>;
}
