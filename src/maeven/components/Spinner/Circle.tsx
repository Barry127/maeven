import React, { FC } from 'react';

import { classes } from './styles';

/**
 * Circle Spinner
 */
export const Circle: FC<CircleProps> = () => (
  <svg
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    className={classes.circleContainer}
  >
    <circle className={classes.circle} cx="20" cy="20" r="18" />
  </svg>
);

export interface CircleProps {
  children?: never;
}
