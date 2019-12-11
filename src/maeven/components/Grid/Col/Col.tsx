import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { Block } from '../../Block';

import { classes, themeOverride } from './styles';

/**
 * Grid column.
 */
export const Col: FC<ColProps &
  Omit<HTMLAttributes<HTMLElement>, 'hidden'>> = ({
  children,
  className,
  element = 'div',
  hidden = false,
  lg,
  md,
  sm,
  span,
  transparent = false,
  xl,
  xs = 24,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Block
      element={element}
      className={clsx(
        classes.col,
        span !== undefined && classes.span(span),
        classes.responsiveCol(theme, { lg, md, sm, span, xl, xs }),
        typeof hidden !== 'boolean' && classes.responsiveHidden(theme, hidden),
        {
          [classes.hidden]: hidden === true,
          [classes.transparent]: transparent
        },
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {children}
    </Block>
  );
};

export interface ColProps {
  /** Type of html element to render. */
  element?:
    | 'article'
    | 'aside'
    | 'div'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section';

  /**
   * Wether column is hidden
   *
   * **examples**
   *
   * - `true`: Column is visible
   * - `false`: Column is hidden
   * - `'md'`: Column is hidden when viewport is md or smaller (sm, xs)
   * - `['sm', 'xl']`: Column is only hidden when viewport is sm or xl
   */
  hidden?: boolean | ColSize | ColSize[];

  /** Column span width (based on 24 column grid) */
  span?: number;

  /** Wether column background is transparent */
  transparent?: boolean;

  /** Column span width for xs viewport (based on 24 column grid) */
  xs?: number;

  /** Column span width for sm viewport (and smaller if not set) (based on 24 column grid) */
  sm?: number;

  /** Column span width for md viewport (and smaller if not set) (based on 24 column grid) */
  md?: number;

  /** Column span width for lg viewport (and smaller if not set) (based on 24 column grid) */
  lg?: number;

  /** Column span width for xl viewport (and smaller if not set) (based on 24 column grid) */
  xl?: number;
}

export type ColSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
