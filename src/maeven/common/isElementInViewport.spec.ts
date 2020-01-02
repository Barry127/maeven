import { isElementInViewport } from './isElementInViewport';

describe('isElementInViewport', () => {
  function makeEl(el: El = {}): Element {
    return {
      getBoundingClientRect: () => ({
        top: el.top || 10,
        left: el.left || 10,
        bottom: el.bottom || 20,
        right: el.right || 20
      })
    } as Element;
  }

  it('returns true when element is in viewport', () => {
    expect(isElementInViewport(makeEl())).toBe(true);
  });

  it('returns false when top is less than zero', () => {
    expect(isElementInViewport(makeEl({ top: -1 }))).toBe(false);
  });

  it('returns false when left is smaller than zero', () => {
    expect(
      isElementInViewport(
        makeEl({
          left: -1
        })
      )
    ).toBe(false);
  });

  it('returns false when bottom is greater than window.innerHeight', () => {
    // 768 * 1024
    expect(
      isElementInViewport(
        makeEl({
          bottom: 769
        })
      )
    ).toBe(false);

    const innerHeight = window.innerHeight;
    // @ts-ignore
    window.innerHeight = null;
    expect(
      isElementInViewport(
        makeEl({
          bottom: 769
        })
      )
    ).toBe(false);
    // @ts-ignore
    window.innerHeight = innerHeight;
  });

  it('returns false when right is greater than window.innerWidth', () => {
    // 768 * 1024
    expect(isElementInViewport(makeEl({ right: 1025 }))).toBe(false);

    const innerWidth = window.innerWidth;
    // @ts-ignore
    window.innerWidth = null;
    expect(
      isElementInViewport(
        makeEl({
          right: 1025
        })
      )
    ).toBe(false);
    // @ts-ignore
    window.innerWidth = innerWidth;
  });
});

interface El {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
