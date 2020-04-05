import React, { FC, HTMLAttributes, ReactNode, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import { Block } from '../Block/Block';

import { ReactComponent, InstrinctElement } from '../../types';

/**
 * A Card presents high-level information and can guide the user toward related actions and details.
 */
export const Card: FC<AllCardProps> = ({
  children,
  className,
  element = 'div',
  elevation = 0,
  interactive = false,
  overlay,
  ...restProps
}) => {
  const tabIndex = interactive ? { tabIndex: 0 } : {};

  return (
    <Block
      {...restProps}
      className={clsx(
        'mvn-card',
        elevation && `mvn-card-elevation-${elevation}`,
        {
          'mvn-card-interactive': interactive,
          'mvn-card-has-overlay': overlay,
        },
        className
      )}
      element={element}
      background="textBackground"
      padding
      {...tabIndex}
    >
      {overlay && <Block className="mvn-card-overlay">{overlay}</Block>}
      {children}
    </Block>
  );
};

export const CardF = forwardRef<HTMLElement, AllCardProps>((props, ref) => (
  <Card {...props} forwardedRef={ref} />
));

type AllCardProps = CardProps & HTMLAttributes<HTMLElement>;

export interface CardProps {
  /** Type of component to render. (overwrites element) */
  component?: ReactComponent;

  /** Type of html element to render. */
  element?: InstrinctElement;

  /** Intensity of drop shadow */
  elevation?: number;

  forwardedRef?: Ref<HTMLElement>;

  /** Wether card changes styles on mouse over, used in combination with onClick */
  interactive?: boolean;

  /** Overlay on mouseover */
  overlay?: ReactNode;

  /** Callback for when the card is clicked */
  onClick?: HTMLAttributes<HTMLElement>['onClick'];
}
