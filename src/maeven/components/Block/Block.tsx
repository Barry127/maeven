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
  component = 'div',
  ...restProps
}) => {
  const theme = useTheme();
  const Component = component;

  return (
    <Component
      className={clsx(classes.block, themeOverride(theme), className)}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export interface BlockProps {
  /** Type of html component to render. */
  component?:
    | 'article'
    | 'aside'
    | 'div'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section'
    | 'span';
}
