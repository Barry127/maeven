import React, { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { Block } from '../Block';

import { classes, themeOverride } from './styles';

/**
 * A Card presents high-level information and can guide the user toward related actions and details.
 */
export const Card: FC<CardProps & HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  element = 'div',
  elevation = 0,
  interactive = false,
  overlay,
  ...restProps
}) => {
  const theme = useTheme();

  const tabIndex = interactive ? { tabIndex: -1 } : {};

  return (
    <Block
      className={clsx(
        classes.card,
        classes.elevation[elevation],
        {
          [classes.interactive]: interactive,
          [classes.overlay]: overlay
        },
        themeOverride(theme),
        className
      )}
      element={element}
      padding
      {...restProps}
      {...tabIndex}
    >
      {overlay && <Block className={classes.overlayElement}>{overlay}</Block>}
      {children}
    </Block>
  );
};

export interface CardProps {
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

  /** Intensity of drop shadow */
  elevation?: number;

  /** Wether card changes styles on mouse over, used in combination with onClick */
  interactive?: boolean;

  /** Overlay on mouseover */
  overlay?: ReactNode;

  /** Callback for when the card is clicked */
  onClick?: HTMLAttributes<HTMLElement>['onClick'];
}
