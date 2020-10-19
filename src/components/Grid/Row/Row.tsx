import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import classes from './row.module.scss';

/**
 * Grid row.
 */
export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      align = 'normal',
      children,
      className,
      gutter = 0,
      style,
      wrap = true,
      ...props
    },
    ref
  ) => (
    <div
      {...props}
      className={clsx(
        classes.row,
        classes[align],
        { [classes['no-wrap']]: !wrap },
        className
      )}
      style={{
        ...style,
        //@ts-ignore
        '--mvn-grid-gutter': `${gutter}rem`
      }}
      ref={ref}
    >
      {children}
    </div>
  )
);

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
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
