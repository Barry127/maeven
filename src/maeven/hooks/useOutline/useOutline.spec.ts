import { act, renderHook } from '@testing-library/react-hooks';

import { useOutline } from './useOutline';

describe('useTheme', () => {
  it('returns false by default', () => {
    const { result } = renderHook(() => useOutline());
    expect(result.current).toBe(false);
  });

  it('returns true when a key is pressed and false when the mouse went down', () => {
    const { result } = renderHook(() => useOutline());

    act(() => {
      const ev = document.createEvent('KeyboardEvent');
      ev.initEvent('keydown', false, true);
      document.dispatchEvent(ev);
    });

    expect(result.current).toBe(true);

    act(() => {
      const ev = document.createEvent('MouseEvent');
      ev.initEvent('mousedown', false, true);
      document.dispatchEvent(ev);
    });

    expect(result.current).toBe(false);
  });
});
