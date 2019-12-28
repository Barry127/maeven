import { style } from 'typestyle';

import { MaevenIcon } from '../types';
import { spinKeyframes } from './styles';

/**
 * Default Icons used for components. eye and eyeOff icons are licensed under the MIT License by Feather Icons: https://feathericons.com
 */

export const eye: MaevenIcon = {
  tag: 'svg',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
  children: [
    {
      tag: 'path',
      attrs: { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }
    },
    { tag: 'circle', attrs: { cx: '12', cy: '12', r: '3' } }
  ]
};

export const eyeOff: MaevenIcon = {
  tag: 'svg',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
  children: [
    {
      tag: 'path',
      attrs: {
        d:
          'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
      }
    },
    { tag: 'line', attrs: { x1: '1', y1: '1', x2: '23', y2: '23' } }
  ]
};

export const inlineLoading: MaevenIcon = {
  tag: 'svg',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24'
  },
  children: [
    {
      tag: 'path',
      attrs: {
        className: style({
          animationName: spinKeyframes,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          transformOrigin: 'center center'
        }),
        d: 'M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z'
      }
    }
  ]
};
