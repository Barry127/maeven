import { style } from 'typestyle';

import { MaevenTheme } from '../../../../../src';

export const interactiveCard = style({
  width: '6em',
  height: '6em',
  position: 'absolute',
  transition: makeTransitionFor([
    'boxShadow',
    'width',
    'height',
    'top',
    'left'
  ]),
  top: 0,
  left: 0,
  $nest: {
    '& > div': {
      transition: makeTransitionFor(['padding'])
    },
    '& > div > span:first-child': {
      transition: makeTransitionFor(['color', 'font-size'])
    },
    '&:focus': {
      zIndex: 2,
      width: '12em',
      height: '12em',
      top: '-3em',
      left: '-3em',
      background: 'white',
      $nest: {
        '& > div': {
          paddingTop: '1.5em'
        },
        '& > div > span:first-child': {
          fontSize: '5.5em'
        },
        '& > div > div:last-child': {
          marginTop: '.5em'
        }
      }
    }
  }
});

function makeTransitionFor(keys: string[]): string {
  return keys
    .map(
      key =>
        `${key} ${MaevenTheme.animations.defaultTiming} ${MaevenTheme.animations.defaultTimingFunction}`
    )
    .join(',');
}
