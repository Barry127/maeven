import React, { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';

import { cardStyles } from './styles';

/**
 * A Card presents high-level information and can guide the user toward related actions and details.
 */
export const Card: FC<CardProps & HTMLAttributes<HTMLDivElement>> = props => {
  const theme = useTheme();
  const { classes } = cardStyles(theme, props);
  const {
    children,
    className,
    elevation,
    interactive,
    overlay,
    ...restProps
  } = props;

  const tabIndex = interactive ? { tabIndex: -1 } : {};

  return (
    <div className={clsx(classes.card, className)} {...restProps} {...tabIndex}>
      {overlay && <div className={classes.overlay}>{overlay}</div>}
      {children}
    </div>
  );
};

Card.defaultProps = {
  elevation: 0,
  interactive: false
};

export interface CardProps {
  /** Intensity of drop shadow */
  elevation?: number;

  /** Wether card changes styles on mouse over, used in combination with onClick */
  interactive?: boolean;

  /** Overlay on mouseover */
  overlay?: ReactNode;

  /** Callback for when the card is clicked */
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}
