import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import {
  PasswordInput,
  AllPasswordProps
} from '../PasswordInput/PasswordInput';
import { FormField } from './FormField';

/**
 * A FormField for a PasswordInput
 */
export const FormFieldPasswordInput: FC<FormFieldPasswordInputProps> = ({
  containerClassName,
  containerStyle,
  hasError = false,
  size = 'md',
  label,
  ...restProps
}) => {
  const id = useId(restProps);
  const labelId = useId();

  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      size={size}
      label={label}
      labelId={labelId}
      htmlFor={id}
      hasError={hasError}
    >
      <PasswordInput
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldPasswordInputF = forwardRef<
  HTMLInputElement,
  FormFieldPasswordInputProps
>((props, ref) => <FormFieldPasswordInput {...props} forwardedRef={ref} />);

interface FormFieldPasswordInputProps extends AllPasswordProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
