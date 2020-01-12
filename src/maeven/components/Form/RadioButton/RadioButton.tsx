import React, { FC, InputHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { Text } from '../../Text';

import { classes, themeOverride } from './styles';

/**
 * A RadioButton is one option in a RadioGroup.
 */
export const RadioButton: FC<RadioButtonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> = ({
  checked,
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  size = 'md',
  style,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <label
      className={clsx(
        classes.container,
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
      style={style}
    >
      <input
        type="radio"
        checked={checked}
        className={classes.radioButton}
        disabled={disabled}
        ref={forwardedRef}
        {...restProps}
      />
      <div className={classes.circle} />
      <Text className={classes.text}>{children}</Text>
    </label>
  );
};

export const RadioButtonForwardRef = forwardRef<
  HTMLInputElement,
  RadioButtonProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
>((props, ref) => <RadioButton {...props} forwardedRef={ref} />);

export interface RadioButtonProps {
  /** Wether the RadioButton is checked */
  checked?: boolean;

  /** Wether RadioButton is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLInputElement>;

  /** Wether RadioButton contains an error */
  hasError?: boolean;

  /** RadioButton size */
  size?: 'sm' | 'md' | 'lg';
}
