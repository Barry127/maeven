import clsx from 'clsx';
import React, {
  AllHTMLAttributes,
  ComponentClass,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode
} from 'react';
import { Block } from '../../Block';
import classes from './card.module.scss';

/**
 * A Card presents high-level information and can guide the user toward related actions and details.
 */
export const Card = forwardRef<HTMLElement, CardProps | AnyProps>(
  (
    {
      children,
      className,
      element = 'div',
      elevation = 0,
      interactive = false,
      overlay,
      ...props
    },
    ref
  ) => {
    const tabIndex = interactive ? { tabIndex: 0 } : {};

    return (
      <Block
        {...props}
        background="textBackground"
        className={clsx(
          'mvn--card',
          classes.card,
          elevation && classes[`elevation-${elevation}`],
          {
            [classes.interactive]: interactive,
            [classes['has-overlay']]: overlay
          },
          className
        )}
        element={element}
        ref={ref}
        {...tabIndex}
      >
        {overlay && <Block className={classes.overlay}>{overlay}</Block>}
        {children}
      </Block>
    );
  }
);

export interface CardProps
  extends Omit<AllHTMLAttributes<HTMLElement>, 'color'> {
  /** Type of component to render. (overwrites element) */
  component?: ComponentClass<any> | FunctionComponent<any>;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

  /** Intensity of drop shadow */
  elevation?: 0 | 1 | 2 | 3 | 4;

  /** Wether card changes styles on mouse over, used in combination with onClick */
  interactive?: boolean;

  /** Overlay on mouseover */
  overlay?: ReactNode;

  /** Callback for when the card is clicked */
  onClick?: HTMLAttributes<HTMLElement>['onClick'];
}

interface AnyProps extends CardProps {
  /** In order to work with custom custom components */
  [prop: string]: any;
}
