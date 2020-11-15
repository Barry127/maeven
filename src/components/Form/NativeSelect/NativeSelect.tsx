import clsx from 'clsx';
import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';
import { chevronDown } from '../../../common/defaultIcons';
import { useId, useTheme } from '../../../hooks';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { Icon } from '../../Icon';
import { Spinner } from '../../Spinner';
import { OptionalField } from '../Form';
import classes from './native-select.module.scss';

/**
 * With NativeSelect users can select one item from a list of values.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      children,
      chevronDownIcon,
      className,
      disabled = false,
      icon,
      hasError = false,
      label,
      loading,
      options,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId(props);
    const labelId = useId();
    const { iconOverrides } = useTheme();

    return (
      <OptionalField
        hasError={hasError}
        htmlFor={id}
        label={label}
        labelId={labelId}
        size={size}
      >
        <div
          className={clsx(
            'mvn--native-select',
            classes.container,
            classes[size],
            {
              [classes['has-icon']]: !!icon || loading,
              [classes['has-error']]: hasError
            },
            className
          )}
          style={style}
        >
          <label className={classes.label}>
            <select
              {...props}
              className={classes.select}
              disabled={disabled}
              id={id}
              ref={ref}
              aria-describedby={label ? labelId : undefined}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text || option.value}
                </option>
              ))}
            </select>
            {icon && !loading && <Icon className={classes.icon} icon={icon} />}
            {loading && <Spinner size="1em" className={classes.spinner} />}
            <Icon
              className={clsx(classes.icon, classes.chevron)}
              icon={chevronDownIcon || iconOverrides.chevronDown || chevronDown}
            />
          </label>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </div>
      </OptionalField>
    );
  }
);

export interface NativeSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Chevron icon (defaults to Feather icons chevronDown) */
  chevronDownIcon?: MaevenIcon;

  /** Wether select is disabled */
  disabled?: boolean;

  /** Wether select contains an error */
  hasError?: boolean;

  /** Icon for select */
  icon?: MaevenIcon;

  /** Label text */
  label?: ReactNode;

  /** Wether select has loading state */
  loading?: boolean;

  /** Options for select */
  options: { value: any; text?: string }[];

  /** Select size */
  size?: 'sm' | 'md' | 'lg';
}
