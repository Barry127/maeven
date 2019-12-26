import { renderHook } from '@testing-library/react-hooks';

import { useTitle } from './useTitle';

describe('useTheme', () => {
  beforeEach(() => {
    document.title = 'initial title';
  });

  it('sets title', () => {
    renderHook(() => useTitle('Hello World'));
    expect(document.title).toBe('Hello World');
  });

  it('does not change title when no title is passed', () => {
    renderHook(() => useTitle());
    expect(document.title).toBe('initial title');
  });

  it('does not change title when empty string is passed', () => {
    renderHook(() => useTitle(''));
    expect(document.title).toBe('initial title');
  });
});
