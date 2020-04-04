import React, { FC, HTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';

import { Block } from '../../Block/Block';
import {
  InstrinctElement,
  BackgroundColor,
  ReactComponent
} from '../../../types';

import { hiddenToClassName } from './helpers';

/**
 * Grid column.
 */
export const Col: FC<AllColProps> = ({
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
  ...restProps
}) => {
  return (
    <Block
      {...restProps}
      element={element}
      className={clsx(
        'mvn-grid-col',
        span !== undefined && `mvn-col-${span}`,
        hiddenToClassName(hidden),
        xs && `mvn-col-xs-${xs}`,
        sm && `mvn-col-sm-${sm}`,
        md && `mvn-col-md-${md}`,
        lg && `mvn-col-lg-${lg}`,
        xl && `mvn-col-xl-${xl}`,
        className
      )}
    >
      {children}
    </Block>
  );
};

export const ColF = forwardRef<HTMLElement, AllColProps>((props, ref) => (
  <Col {...props} forwardedRef={ref} />
));

type AllColProps = ColProps & Omit<HTMLAttributes<HTMLElement>, 'hidden'>;

export interface ColProps {
  /** Background color for Col */
  background?: BackgroundColor;

  /** Type of component to render. (overwrites element) */
  component?: ReactComponent;

  /** Type of html element to render. */
  element?: InstrinctElement;

  forwardedRef?: Ref<HTMLElement>;

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
