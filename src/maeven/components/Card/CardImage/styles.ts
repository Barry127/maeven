import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

export const container = style({
  margin: 'var(--maeven-base) calc(var(--maeven-base) * -1)',
  $nest: {
    '&:first-child': {
      marginTop: 'calc(var(--maeven-base) * -1)',
      borderTopLeftRadius: 'var(--maeven-size-border-radius-large)',
      borderTopRightRadius: 'var(--maeven-size-border-radius-large)'
    },
    '&:last-child': {
      marginBottom: 'calc(var(--maeven-base) * -1.375)',
      borderBottomLeftRadius: 'var(--maeven-size-border-radius-large)',
      borderBottomRightRadius: 'var(--maeven-size-border-radius-large)'
    }
  }
});

const image = style({
  maxWidth: '100%',
  borderRadius: 'inherit'
});

export const classes = {
  container: clsx(box, pm0, container),
  image
};

export const themeOverride = themeOverrideFactory('CardImage');
