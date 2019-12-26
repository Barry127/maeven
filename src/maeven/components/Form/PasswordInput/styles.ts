import { style } from 'typestyle';

import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const toggle = style({
  boxShadow: 'none !important',
  color: 'inherit !important',
  opacity: 0.6,
  $nest: {
    '&:hover': {
      opacity: 0.8
    },
    '&:active': {
      opacity: 1
    }
  }
});

export const classes = {
  toggle
};

export const themeOverride = themeOverrideFactory('PasswordInput');
