import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { Color } from '../../../types';
import { Block } from '../../Block';
import { getPercentage } from '../helpers';
import classes from './progress-gauge.module.scss';

const CIRCUMFERENCE = Math.PI * 90;
const BARSIZE = 0.75 * CIRCUMFERENCE;
/**
 * A progress gauge is a linear indicator for providing feedback about an ongoing, user-initiated process.
 */
export const ProgressGauge = forwardRef<HTMLDivElement, ProgressGaugeProps>(
  (
    {
      children,
      className,
      color = 'primary',
      max = 100,
      min = 0,
      size = 128,
      value,
      width,
      ...props
    },
    ref
  ) => {
    const dashSize = (getPercentage(min, max, value) / 100) * BARSIZE;
    const barStyle = useSpring({
      to: {
        strokeDasharray: `${dashSize}px ${CIRCUMFERENCE - dashSize}px`
      },
      config: config.molasses
    });

    return (
      <div
        {...props}
        className={clsx(
          'mvn--progress-gauge',
          classes.container,
          classes[color],
          className
        )}
        ref={ref}
      >
        <svg
          className={classes.gauge}
          style={{
            height: size,
            width: size
          }}
          viewBox="0 0 100 100"
          role="progressbar"
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
        >
          <path
            className={classes.track}
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            style={{
              strokeWidth: width || `calc(${size} / 25)`,
              strokeDasharray: `${BARSIZE}px ${0.25 * CIRCUMFERENCE}px`,
              strokeDashoffset: `${CIRCUMFERENCE * 0.375}`
            }}
          />
          <animated.path
            className={classes.bar}
            d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
            style={{
              opacity: value === 0 ? 0 : 1,
              strokeWidth: width || `calc(${size} / 25)`,
              strokeDashoffset: `${CIRCUMFERENCE * 0.375}`,
              ...barStyle
            }}
          />
        </svg>
        <Block className={classes.content}>{children}</Block>
      </div>
    );
  }
);

export interface ProgressGaugeProps extends HTMLAttributes<HTMLDivElement> {
  /** Gauge color */
  color?: Color;

  /** Maximum value */
  max?: number;

  /** Minimum value */
  min?: number;

  /** Gauge size */
  size?: number | string;

  /** Current value */
  value?: number;

  /** Gauge stroke width */
  width?: number | string;
}
