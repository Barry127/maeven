import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { style } from 'typestyle';

import { useTheme } from '../../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * Grid row.
 */
export const Row: FC<RowProps & HTMLAttributes<HTMLDivElement>> = ({
  align = 'normal',
  children,
  className,
  gutter = 0,
  wrap = true,
  ...restProps
}) => {
  const theme = useTheme();
  const gutterClass = style({
    //@ts-ignore
    '--maeven-row-gutter': `calc(var(--maeven-base) * ${gutter})`,
    marginLeft: `calc((var(--maeven-base) * -${gutter}) / 2)`,
    marginRight: `calc((var(--maeven-base) * -${gutter}) / 2)`
  });

  return (
    <div
      className={clsx(
        classes.row,
        classes.align[align],
        gutterClass,
        wrap ? classes.wrap : classes.noWrap,
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
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
