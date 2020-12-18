import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { animated, useSpring } from 'react-spring';
import { Color } from '../../../types';
import { Block } from '../../Block';
import { getPercentage } from '../helpers';
import classes from './progress-bar.module.scss';

/**
 * A progress bar is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      active = false,
      children,
      className,
      color = 'primary',
      indeterminate = false,
      max = 100,
      min = 0,
      size = 'md',
      text,
      value,
      ...props
    },
    ref
  ) => {
    const barStyle = useSpring({
      clipPath: `inset(0 0 0 ${getPercentage(min, max, value)}%)`
    });

    return (
      <div
        {...props}
        className={clsx(
          'mvn--progress-bar',
          classes.container,
          {
            [classes.active]: active,
            [classes.indeterminate]: indeterminate
          },
          classes[size],
          className
        )}
        ref={ref}
        role="progressbar"
        aria-valuemax={indeterminate ? undefined : max}
        aria-valuemin={indeterminate ? undefined : min}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={indeterminate && !text ? 'indeterminate' : `${text}`}
      >
        <Block background={color} className={classes.bar}>
          {text}
        </Block>
        <Block
          background="background"
          className={classes.track}
          component={animated.div}
          style={indeterminate ? undefined : barStyle}
        >
          {text}
        </Block>
      </div>
    );
  }
);

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Wether the progress bar is active (animated) */
  active?: boolean;

  children?: never;

  /** Bar color */
  color?: Color;

  /** Wether progress bar is indeterminate (overwrites value) */
  indeterminate?: boolean;

  /** Maximum value */
  max?: number;

  /** Minimum value */
  min?: number;

  /** ProgressBar size */
  size?: 'sm' | 'md' | 'lg';

  /** ProgressBar text */
  text?: ReactNode;

  /** Current value */
  value?: number;
}
