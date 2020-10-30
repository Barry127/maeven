import { act, renderHook } from '@testing-library/react-hooks';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  it('is false by default', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(false);
  });

  it('toggles darkMode', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('toggles mvn-dark class on body', () => {
    const body = document.querySelector('body');
    const { result } = renderHook(() => useDarkMode());
    expect(body).not.toHaveClass('mvn-dark');

    act(() => {
      result.current[1]();
    });
    expect(body).toHaveClass('mvn-dark');

    act(() => {
      result.current[1]();
    });
    expect(body).not.toHaveClass('mvn-dark');
  });
});
