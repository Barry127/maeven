import { style } from 'typestyle';
import clsx from 'clsx';

import { Theme } from '../../types';
import { truncate, textColor } from '../../common/styles';
import {
  classes as htmlClasses,
  themeOverride as htmlThemeOverride
} from '../Html/styles';

import { HeadingLevel } from './Heading';

export const classes = {
  h1: htmlClasses.h1,
  h2: htmlClasses.h2,
  h3: htmlClasses.h3,
  h4: htmlClasses.h4,
  h5: htmlClasses.h5,
  h6: htmlClasses.h6,
  color: textColor,
  truncate
};

export const themeOverride = (theme: Theme, component: HeadingLevel) =>
  clsx(
    htmlThemeOverride(theme, component),
    style(theme.styleOverrides?.Heading)
  );
