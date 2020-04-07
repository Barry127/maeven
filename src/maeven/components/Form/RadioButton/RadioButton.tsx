import React, { FC, InputHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import { Text } from '../../Text';

/**
 * A RadioButton is one option in a RadioGroup.
 */
export const RadioButton: FC<AllRadioButtonProps> = ({
  checked,
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  size = 'md',
  style,
  ...restProps
}) => (
  <label
    className={clsx(
      'mvn-radio-button',
      {
        'mvn-radio-button-sm': size === 'sm',
        'mvn-radio-button-lg': size === 'lg',
        'mvn-radio-button-error': hasError
      },
      className
    )}
    style={style}
  >
    <input
      type="radio"
      checked={checked}
      disabled={disabled}
      ref={forwardedRef}
      {...restProps}
    />
    <div className="mvn-radio-button-circle" />
    <Text
      color={hasError ? 'danger' : undefined}
      className="mvn-radio-button-text"
    >
      {children}
    </Text>
  </label>
);

export const RadioButtonF = forwardRef<HTMLInputElement, AllRadioButtonProps>(
  (props, ref) => <RadioButton {...props} forwardedRef={ref} />
);

export type AllRadioButtonProps = RadioButtonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

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
