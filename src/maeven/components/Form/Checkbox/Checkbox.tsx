import React, {
  FC,
  Ref,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef
} from 'react';
import clsx from 'clsx';

import { MaevenIcon } from '../../../types';
import { mergeRefs } from '../../../common/mergeRefs';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { check, minus } from '../../../common/defaultIcons';

/**
 * With Checkboxes users can select multiple options in a list.
 */
export const Checkbox: FC<FullProps> = ({
  checked,
  checkIcon,
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  indeterminate = false,
  indeterminateIcon,
  size = 'md',
  style,
  ...restProps
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (indeterminate && checkboxRef.current) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
    if (checkboxRef.current?.indeterminate && !indeterminate) {
      checkboxRef.current.indeterminate = false;
    }
  }, [indeterminate, checked]);

  return (
    <label
      className={clsx(
        'mvn-checkbox',
        {
          'mvn-checkbox-sm': size === 'sm',
          'mvn-checkbox-lg': size === 'lg',
          'mvn-checkbox-error': hasError
        },
        className
      )}
      style={style}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        ref={mergeRefs(checkboxRef, forwardedRef)}
        {...restProps}
      />
      <div className="mvn-checkbox-box">
        <Icon
          size=".85em"
          icon={indeterminate ? indeterminateIcon || minus : checkIcon || check}
          fixedWidth
        />
      </div>
      <Text
        color={hasError ? 'danger' : undefined}
        className="mvn-checkbox-text"
      >
        {children}
      </Text>
    </label>
  );
};

export const CheckboxF = forwardRef<HTMLInputElement, FullProps>(
  (props, ref) => <Checkbox {...props} forwardedRef={ref} />
);

export interface CheckboxProps {
  /** Wether the Checkbox is checked */
  checked?: boolean;

  /** Check icon (defaults to Feather icons check) */
  checkIcon?: MaevenIcon;

  /** Wether checkbox is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLInputElement>;

  /** Wether Checkbox contains an error */
  hasError?: boolean;

  /** Wether Checkbox has indeterminate state (overwrites checked) */
  indeterminate?: boolean;

  /** Indeterminate icon (defaults to Feather icons minus) */
  indeterminateIcon?: MaevenIcon;

  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
}

export type FullProps = CheckboxProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
