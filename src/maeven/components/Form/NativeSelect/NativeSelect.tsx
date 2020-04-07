import React, { FC, Ref, SelectHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { chevronDown } from '../../../common/defaultIcons';

/**
 *With NativeSelect users can select one item from a list of values.
 */
export const NativeSelect: FC<AllNativeSelectProps> = ({
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
}) => (
  <div
    className={clsx(
      'mvn-native-select',
      {
        'mvn-native-select-sm': size === 'sm',
        'mvn-native-select-lg': size === 'lg',
        'mvn-has-icon': !!icon,
        'mvn-native-select-error': hasError
      },
      className
    )}
    style={style}
  >
    <label className="mvn-native-select-label">
      <select ref={forwardedRef} disabled={disabled} {...restProps}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text || option.value}
          </option>
        ))}
      </select>
      {icon && <Icon className="mvn-native-select-icon" icon={icon} />}
      <Icon
        className="mvn-native-select-toggle"
        icon={chevronDownIcon || chevronDown}
      />
    </label>
    {children ? (
      <Text color={hasError ? 'danger' : undefined}>{children}</Text>
    ) : null}
  </div>
);

export const NativeSelectF = forwardRef<
  HTMLSelectElement,
  AllNativeSelectProps
>((props, ref) => <NativeSelect {...props} forwardedRef={ref} />);

export type AllNativeSelectProps = NativeSelectProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

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
