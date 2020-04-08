import React, { FC, HTMLAttributes, ReactNode, ChangeEvent } from 'react';
import clsx from 'clsx';

import { RadioButton } from '../RadioButton/RadioButton';

/**
 * use a RadioGroup when you have a few options a user can choose from
 */
export const RadioGroup: FC<AllRadioGroupProps> = ({
  children,
  className,
  inline = false,
  name,
  onChange,
  options,
  size = 'md',
  style,
  value: currentValue,
  ...restProps
}) => (
  <div
    className={clsx(
      'mvn-radio-group',
      { 'mvn-radio-group-inline': inline },
      className
    )}
    style={style}
    {...restProps}
  >
    {options.map(({ disabled, hasError, label, value }) => (
      <RadioButton
        key={value}
        checked={
          currentValue === undefined ? undefined : currentValue === value
        }
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        hasError={hasError}
        size={size}
      >
        {label}
      </RadioButton>
    ))}
  </div>
);

export type AllRadioGroupProps = RadioGroupProps &
  HTMLAttributes<HTMLDivElement>;

export interface RadioGroupProps {
  children?: never;

  /** Wether the radio group is inline */
  inline?: boolean;

  /** name for the radioButtons */
  name: string;

  /** onChange handler for radiobuttons */
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;

  /** options (props for RadioButtons) */
  options: {
    disabled?: boolean;
    hasError?: boolean;
    label?: ReactNode;
    value: string | number;
  }[];

  /** Size for Radio buttons */
  size?: 'sm' | 'md' | 'lg';

  /** Current value */
  value?: string | number;
}
