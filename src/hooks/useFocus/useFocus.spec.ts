import { renderHook, act } from '@testing-library/react-hooks';

import { useFocus } from './useFocus';
import { FocusEvent } from 'react';

describe('useFocus', () => {
  it('Returns hasFocus boolean and onBlur and onFocus methods', () => {
    const { result } = renderHook(() => useFocus());

    const [hasFocus, { onBlur, onFocus }] = result.current;
    expect(hasFocus).toBe(false);
    expect(typeof onBlur).toBe('function');
    expect(typeof onFocus).toBe('function');
  });

  it('Toggles hasFocus on onBlur and onFocus', () => {
    const { result } = renderHook(() => useFocus());
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].onFocus({} as FocusEvent);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].onBlur({} as FocusEvent);
    });

    expect(result.current[0]).toBe(false);
  });

  it('Calls user defined onBlur and onFocus methods', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const focusEvent = {} as FocusEvent;
    const blurEvent = {} as FocusEvent;

    const { result } = renderHook(() => useFocus({ onBlur, onFocus }));
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].onFocus(focusEvent);
    });

    expect(result.current[0]).toBe(true);
    expect(onFocus.mock.calls.length).toBe(1);
    expect(onFocus.mock.calls[0][0]).toBe(focusEvent);

    act(() => {
      result.current[1].onBlur(blurEvent);
    });

    expect(result.current[0]).toBe(false);
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls[0][0]).toBe(blurEvent);
  });
});
