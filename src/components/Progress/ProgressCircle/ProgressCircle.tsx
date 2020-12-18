import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { Color } from '../../../types';
import { Block } from '../../Block';
import { getPercentage } from '../helpers';
import classes from './progress-circle.module.scss';

const CIRCUMFERENCE = Math.PI * 90;

/**
 * A progress bar is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      children,
      className,
      color = 'primary',
      indeterminate = false,
      max = 100,
      min = 0,
      size = 128,
      style,
      value,
      width,
      ...props
    },
    ref
  ) => {
    const [indeterminateSize, setIndeterminateSize] = useState(0.2);

    const barStyle = useSpring({
      to: {
        strokeDasharray: `${
          indeterminate
            ? indeterminateSize * CIRCUMFERENCE
            : (getPercentage(min, max, value) / 100) * CIRCUMFERENCE
        }px ${CIRCUMFERENCE}px`
      },
      config: indeterminate ? { duration: 5000 } : config.molasses
    });

    useEffect(() => {
      if (indeterminate) {
        const to = setTimeout(() => {
          setIndeterminateSize(indeterminateSize === 0.2 ? 0.8 : 0.2);
        }, 5000);

        return () => {
          clearTimeout(to);
        };
      }
      return;
    }, [indeterminate, indeterminateSize]);

    return (
      <div
        {...props}
        className={clsx(
          'mvn--progress-circle',
          classes.container,
          {
            [classes.indeterminate]: indeterminate
          },
          classes[color],
          className
        )}
        ref={ref}
      >
        <svg
          className={classes.circle}
          style={{
            height: size,
            width: size
          }}
          viewBox="0 0 100 100"
          role="progressbar"
          aria-valuemax={indeterminate ? undefined : max}
          aria-valuemin={indeterminate ? undefined : min}
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuetext={indeterminate ? 'indeterminate' : undefined}
        >
          <path
            className={classes.track}
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            style={{
              strokeWidth: width || `calc(${size} / 25)`
            }}
          />
          <animated.path
            className={classes.bar}
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            style={{
              opacity: value === 0 ? 0 : 1,
              strokeWidth: width || `calc(${size} / 25)`,
              ...barStyle
            }}
          />
        </svg>
        <Block className={classes.content}>{children}</Block>
      </div>
    );
  }
);

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  /** Circle color */
  color?: Color;

  /** Wether progress circle is indeterminate (overwrites value) */
  indeterminate?: boolean;

  /** Maximum value */
  max?: number;

  /** Minimum value */
  min?: number;

  /** Circle size */
  size?: number | string;

  /** Current value */
  value?: number;

  /** Circle stroke width */
  width?: number | string;
}
