import React, {
  FC,
  ComponentClass,
  StatelessComponent,
  AnchorHTMLAttributes
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { useOutline } from '../../hooks/useOutline';
import { ThemeColor } from '../../types';

import { classes, themeOverride } from './styles';

/**
 * Links are accesible elements used for navigation.
 */
export const Link: FC<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  className,
  color,
  component: LinkComponent,
  ...restProps
}) => {
  const theme = useTheme();
  const outline = useOutline();

  const props = {
    className: clsx(
      classes.link,
      !color && classes.default,
      color && classes.color[color],
      color && classes.colorStates,
      outline && classes.focusOutline,
      themeOverride(theme),
      className
    ),
    ...restProps
  };

  return LinkComponent ? (
    <LinkComponent {...props}>{children}</LinkComponent>
  ) : (
    <a {...props}>{children}</a>
  );
};

export interface LinkProps {
  /** Styling color for link, defaults to theme's link color */
  color?: ThemeColor;

  /** Custom component to use instead of html a element */
  component?: ComponentClass<any> | StatelessComponent<any>;

  /** In order to work with custom custom components */
  [prop: string]: any;
}
