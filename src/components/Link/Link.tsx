import React, { FC, AnchorHTMLAttributes } from 'react';
import clsx from 'clsx';

import { Theme } from '../../themes/types';
import { useTheme } from '../../hooks/useTheme';

import { linkStyles } from './styles';

/**
 * Links are accesible elements used for navigation.
 */
export const Link: FC<
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
> = props => {
  const theme = useTheme();
  const { classes } = linkStyles(theme, props);
  const { children, className, color, ...restProps } = props;

  return (
    <a className={clsx(classes.link, className)} {...restProps}>
      {children}
    </a>
  );
};

export interface LinkProps {
  /** Styling color for link, defaults to theme's link color */
  color?: keyof Theme['colors']['name'] | keyof Theme['colors']['semantic'];
}
