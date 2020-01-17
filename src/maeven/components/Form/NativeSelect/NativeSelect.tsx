import React, { FC, Ref, SelectHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { chevronDown } from '../../../common/defaultIcons';

import { classes, themeOverride } from './styles';

/**
 *With NativeSelect users can select one item from a list of values.
 */
export const NativeSelect: FC<FullProps> = ({
  children,
  chevronDownIcon,
  className,
  disabled = false,
  forwardedRef,
  icon,
  hasError = false,
  options,
  size = 'md',
  style,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(
        classes.container,
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasIcon]: !!icon,
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
      style={style}
    >
      <label className={classes.label}>
        <select
          ref={forwardedRef}
          className={classes.select}
          disabled={disabled}
          {...restProps}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text || option.value}
            </option>
          ))}
        </select>
        {icon && <Icon className={classes.icon} icon={icon} />}
        <Icon
          className={classes.toggle}
          icon={
            chevronDownIcon || theme.iconOverrides?.chevronDown || chevronDown
          }
        />
      </label>
      {children ? <Text>{children}</Text> : null}
    </div>
  );
};

export const NativeSelectForwardRef = forwardRef<HTMLSelectElement, FullProps>(
  (props, ref) => <NativeSelect {...props} forwardedRef={ref} />
);

export interface NativeSelectProps {
  /** Chevron icon (defaults to Feather icons chevronDown) */
  chevronDownIcon?: MaevenIcon;

  /** Wether select is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLSelectElement>;

  /** Wether select contains an error */
  hasError?: boolean;

  /** Icon for select */
  icon?: MaevenIcon;

  /** Options for select */
  options: { value: any; text?: string }[];

  /** Select size */
  size?: 'sm' | 'md' | 'lg';
}

export type FullProps = NativeSelectProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
