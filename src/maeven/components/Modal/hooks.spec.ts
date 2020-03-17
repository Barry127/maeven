import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';

import { useFocusHandling, useCloseOnEscape } from './hooks';
import { fireEvent } from '@testing-library/react';

describe('useFocusHandling', () => {
  it('handles focusAfterOpen', () => {
    jest.useFakeTimers();

    const focusAfterOpen = {
      current: {
        focus: jest.fn()
      }
    };

    let isOpen = true;

    const { rerender } = renderHook(() =>
      useFocusHandling({ isOpen, focusAfterOpen })
    );

    jest.runAllTimers();

    expect(focusAfterOpen.current.focus.mock.calls).toHaveLength(1);

    isOpen = false;
    rerender();
    jest.runAllTimers();

    expect(focusAfterOpen.current.focus.mock.calls).toHaveLength(1);

    isOpen = true;
    rerender();
    jest.runAllTimers();

    expect(focusAfterOpen.current.focus.mock.calls).toHaveLength(2);
  });

  it('handles focusAfterClose', () => {
    const focusAfterClose = {
      current: {
        focus: jest.fn()
      }
    };

    let isOpen = true;

    const { rerender } = renderHook(() =>
      useFocusHandling({
        isOpen,
        focusAfterOpen: { current: {} },
        focusAfterClose
      })
    );

    expect(focusAfterClose.current.focus.mock.calls).toHaveLength(0);

    isOpen = false;
    rerender();

    expect(focusAfterClose.current.focus.mock.calls).toHaveLength(1);
  });

  it('does not call focusAfterClose when isOpen is false on initial mount', () => {
    const focusAfterClose = {
      current: {
        focus: jest.fn()
      }
    };

    let isOpen = false;

    renderHook(() =>
      useFocusHandling({
        isOpen,
        focusAfterOpen: { current: {} },
        focusAfterClose
      })
    );

    expect(focusAfterClose.current.focus.mock.calls).toHaveLength(0);
  });

  it('focusses document.activeElement after closing when no focusAfterClose', () => {
    //@ts-ignore
    const originalFocus = document.activeElement.focus;
    //@ts-ignore
    document.activeElement.focus = jest.fn();

    let isOpen = true;

    const { rerender } = renderHook(() =>
      useFocusHandling({
        isOpen,
        focusAfterOpen: { current: {} }
      })
    );

    //@ts-ignore
    expect(document.activeElement.focus.mock.calls).toHaveLength(0);

    isOpen = false;
    rerender();

    //@ts-ignore
    expect(document.activeElement.focus.mock.calls).toHaveLength(1);

    //@ts-ignore
    document.activeElement.focus = originalFocus;
  });
});

describe('useCloseOnEscape', () => {
  it('closes on esc keyup', () => {
    const onClose = jest.fn();
    let isOpen = true;

    onClose.mockImplementation(() => {
      isOpen = false;
    });

    const { rerender } = renderHook(() =>
      useCloseOnEscape({ closable: true, isOpen, onClose })
    );

    // does not close on space
    fireEvent.keyUp(document.body, { keyCode: 32 });
    expect(onClose.mock.calls).toHaveLength(0);

    fireEvent.keyUp(document.body, { keyCode: 27 });

    expect(onClose.mock.calls).toHaveLength(1);

    rerender();

    fireEvent.keyUp(document.body, { keyCode: 27 });
    expect(onClose.mock.calls).toHaveLength(1);
  });

  it('does not close on esc keyup when isOpen is false', () => {
    const onClose = jest.fn();

    renderHook(() =>
      useCloseOnEscape({ closable: true, isOpen: false, onClose })
    );

    fireEvent.keyUp(document.body, { keyCode: 27 });
    expect(onClose.mock.calls).toHaveLength(0);
  });

  it('does not close on esc keyup when closable is false', () => {
    const onClose = jest.fn();

    renderHook(() =>
      useCloseOnEscape({ closable: false, isOpen: true, onClose })
    );

    fireEvent.keyUp(document.body, { keyCode: 27 });
    expect(onClose.mock.calls).toHaveLength(0);
  });

  it('does not close on esc keyup when ev.target is a form element', () => {
    const onClose = jest.fn();

    renderHook(() =>
      useCloseOnEscape({ closable: true, isOpen: true, onClose })
    );

    const input = document.createElement('input');

    fireEvent.keyUp(input, { keyCode: 27 });
    expect(onClose.mock.calls).toHaveLength(0);
  });
});
