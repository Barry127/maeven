import clsx from 'clsx';
import React, {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  ReactNode
} from 'react';
import { useId } from '../../../hooks';
import { OptionalField } from '../Form';
import classes from './radio-button.module.scss';
import { RadioButton } from './RadioButton';

/**
 * use a RadioGroup when you have a few options a user can choose from
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      className,
      inline = false,
      label,
      name,
      onChange,
      options,
      size = 'md',
      value: currentValue,
      ...props
    },
    ref
  ) => {
    const labelId = useId();

    return (
      <OptionalField htmlFor={name} label={label} labelId={labelId} size={size}>
        <div
          {...props}
          className={clsx(
            'mvn--radio-group',
            classes.container,
            classes[size],
            {
              [classes['has-label']]: !!label,
              [classes.inline]: inline
            },
            className
          )}
          ref={ref}
        >
          {options.map(({ disabled, hasError, label, value }) => (
            <RadioButton
              checked={
                currentValue === undefined ? undefined : currentValue === value
              }
              disabled={disabled}
              hasError={hasError}
              key={value}
              name={name}
              onChange={onChange}
              size={size}
              value={value}
            >
              {label}
            </RadioButton>
          ))}
        </div>
      </OptionalField>
    );
  }
);

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: never;

  /** Wether the radio group is inline */
  inline?: boolean;

  /** Label text */
  label?: ReactNode;

  /** name for the radioButtons */
  name: string;

  /** onChange handler for radioButtons */
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
