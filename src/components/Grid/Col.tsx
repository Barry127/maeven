import React, { FC, HTMLAttributes, useContext } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { colStyles } from './styles';
import { RowContext } from './Row';

/**
 * Grid column.
 */
export const Col: FC<
  ColProps & Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>
> = props => {
  const theme = useTheme();
  const gutter = useContext(RowContext);
  const { classes } = colStyles(theme, props, gutter);
  const {
    children,
    className,
    hidden,
    lg,
    md,
    sm,
    span,
    xl,
    xs,
    ...restProps
  } = props;

  return (
    <div className={clsx(classes.col, className)} {...restProps}>
      {props.children}
    </div>
  );
};

Col.defaultProps = {
  hidden: false
};

export interface ColProps {
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

  /**
   * Column span width (based on 24 column grid)
   */
  span?: number;

  /**
   * Column span width for xs viewport (based on 24 column grid)
   */
  xs?: number;

  /**
   * Column span width for sm viewport (and smaller if not set) (based on 24 column grid)
   */
  sm?: number;

  /**
   * Column span width for md viewport (and smaller if not set) (based on 24 column grid)
   */
  md?: number;

  /**
   * Column span width for lg viewport (and smaller if not set) (based on 24 column grid)
   */
  lg?: number;

  /**
   * Column span width for xl viewport (and smaller if not set) (based on 24 column grid)
   */
  xl?: number;
}

type ColSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
