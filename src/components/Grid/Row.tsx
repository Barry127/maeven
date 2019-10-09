import React, { FC, HTMLAttributes, createContext } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { rowStyles } from './styles';

export const RowContext = createContext<number>(0);

/**
 * Grid row.
 */
export const Row: FC<RowProps & HTMLAttributes<HTMLDivElement>> = props => {
  const theme = useTheme();
  const { classes } = rowStyles(theme, props);
  const { align, children, className, gutter, wrap, ...restProps } = props;

  return (
    <RowContext.Provider value={gutter!}>
      <div className={clsx(classes.row, className)} {...restProps}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

Row.defaultProps = {
  align: 'normal',
  gutter: 0,
  wrap: true
};

export interface RowProps {
  /**
   * Vertical alignment for row
   */
  align?: 'normal' | 'top' | 'center' | 'bottom' | 'baseline' | 'stretch';

  /**
   * Gutter between children. Number of times the theme's base size.
   */
  gutter?: number;

  /**
   * Wether line breaks after a width overflow
   */
  wrap?: boolean;
}
