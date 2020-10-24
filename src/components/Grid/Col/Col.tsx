import clsx from 'clsx';
import React, {
  ComponentClass,
  forwardRef,
  FunctionComponent,
  HTMLAttributes
} from 'react';
import { BackgroundColor } from '../../../types';
import { Block } from '../../Block';
import classes from './col.module.scss';
import { hiddenToClassName } from './helpers';

/**
 * Grid column.
 */
export const Col = forwardRef<HTMLElement, ColProps>(
  (
    {
      children,
      className,
      element = 'div',
      hidden = false,
      lg,
      md,
      sm,
      span,
      xl,
      xs,
      ...props
    },
    ref
  ) => (
    <Block
      {...props}
      element={element}
      className={clsx(
        classes.col,
        span !== undefined && classes[`col-${span}`],
        hiddenToClassName(hidden),
        xs && classes[`xs-${xs}`],
        sm && classes[`sm-${sm}`],
        md && classes[`md-${md}`],
        lg && classes[`lg-${lg}`],
        xl && classes[`xl-${xl}`],
        className
      )}
      ref={ref}
    >
      {children}
    </Block>
  )
);

export type ColSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpanSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export interface ColProps
  extends Omit<HTMLAttributes<HTMLElement>, 'hidden' | 'color'> {
  /** Background color for Col */
  background?: BackgroundColor;

  /** Type of component to render. (overwrites element) */
  component?: ComponentClass<any> | FunctionComponent<any>;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

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
  span?: SpanSize;

  /** Column span width for xs viewport (based on 24 column grid) */
  xs?: SpanSize;

  /** Column span width for sm viewport (and smaller if not set) (based on 24 column grid) */
  sm?: SpanSize;

  /** Column span width for md viewport (and smaller if not set) (based on 24 column grid) */
  md?: SpanSize;

  /** Column span width for lg viewport (and smaller if not set) (based on 24 column grid) */
  lg?: SpanSize;

  /** Column span width for xl viewport (and smaller if not set) (based on 24 column grid) */
  xl?: SpanSize;
}
