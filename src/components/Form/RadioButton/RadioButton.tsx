import clsx from 'clsx';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Block } from '../../Block';
import classes from './radio-button.module.scss';

/**
 * A RadioButton is one option in a RadioGroup.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      checked,
      children,
      className,
      disabled = false,
      hasError = false,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => (
    <label
      className={clsx(
        'mvn--radio-button',
        classes.label,
        classes[size],
        {
          [classes['has-children']]: !!children,
          [classes['has-error']]: hasError
        },
        className
      )}
      style={style}
    >
      <input
        {...props}
        className={classes.input}
        checked={checked}
        disabled={disabled}
        ref={ref}
        type="radio"
      />
      <div className={classes.circle} />
      {children ? <Block className={classes.text}>{children}</Block> : null}
    </label>
  )
);

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Wether the RadioButton is checked */
  checked?: boolean;

  /** Wether RadioButton is disabled */
  disabled?: boolean;

  /** Wether RadioButton contains an error */
  hasError?: boolean;

  /** RadioButton size */
  size?: 'sm' | 'md' | 'lg';
}
