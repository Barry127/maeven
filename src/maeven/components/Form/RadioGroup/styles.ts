import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const container = style({
  display: 'flex',
  flexDirection: 'column'
});

const inline = style({
  display: 'inline-flex',
  flexDirection: 'row',
  $nest: {
    '& > *:not(:last-child)': {
      marginRight: 'var(--maeven-base)'
    }
  }
});

export const classes = {
  container: clsx(box, pm0, container),
  inline
};

export const themeOverride = themeOverrideFactory('RadioGroup');
