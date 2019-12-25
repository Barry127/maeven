import { renderHook } from '@testing-library/react-hooks';

import { useId } from './useId';

describe('useTheme', () => {
  it('returns an id', () => {
    const { result } = renderHook(() => useId());
    expect(result.current.startsWith('maeven-id')).toBe(true);
  });

  it('does not return the same id', () => {
    const a = renderHook(() => useId());
    const b = renderHook(() => useId());
    expect(a.result.current).not.toBe(b.result.current);
  });

  it('returns user defined id from string', () => {
    const { result } = renderHook(() => useId('user-id'));
    expect(result.current).toBe('user-id');
  });

  it('returns user defined id from property', () => {
    const { result } = renderHook(() => useId({ id: 'my-user-id' }));
    expect(result.current).toBe('my-user-id');
  });
});
