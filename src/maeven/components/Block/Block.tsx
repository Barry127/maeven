import React, { FC, AllHTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * A Block is a low level component with sensible theme default styling.
 */
export const Block: FC<BlockProps & AllHTMLAttributes<HTMLElement>> = ({
  children,
  className,
  element = 'div',
  padding = false,
  ...restProps
}) => {
  const theme = useTheme();
  const Element = element;

  return (
    <Element
      className={clsx(
        classes.block,
        { [classes.padding]: padding },
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

export interface BlockProps {
  /** Type of html element to render. */
  element?:
    | 'article'
    | 'aside'
    | 'div'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section'
    | 'span';

  /** Wether block contains padding */
  padding?: boolean;
}
