import React, { FC, HTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Grid row.
 */
export const Row: FC<AllRowProps> = ({
  align = 'normal',
  children,
  className,
  forwardedRef,
  gutter = 0,
  wrap = true,
  ...restProps
}) => (
  <div
    {...restProps}
    className={clsx(
      'mvn-grid-row',
      `mvn-grid-row-align-${align}`,
      {
        [`mvn-grid-gutter-${gutter}`]: !!gutter,
        'mvn-grid-row-no-wrap': !wrap
      },
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </div>
);

export const RowF = forwardRef<HTMLDivElement, AllRowProps>((props, ref) => (
  <Row {...props} forwardedRef={ref} />
));

type AllRowProps = RowProps & HTMLAttributes<HTMLDivElement>;

export interface RowProps {
  /**
   * Vertical alignment for row
   */
  align?: 'normal' | 'top' | 'center' | 'bottom' | 'baseline' | 'stretch';

  forwardedRef?: Ref<HTMLDivElement>;

  /**
   * Gutter between children. Number of times the theme's base size.
   */
  gutter?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * Wether line breaks after a width overflow
   */
  wrap?: boolean;
}
