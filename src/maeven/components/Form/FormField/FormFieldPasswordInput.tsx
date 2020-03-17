import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { PasswordInput, FullProps } from '../PasswordInput/PasswordInput';
import { FormField } from './FormField';

/**
 * A FormField for a PasswordInput
 */
export const FormFieldPasswordInput: FC<FormFieldPasswordInputProps> = ({
  containerClassName,
  containerStyle,
  label,
  ...restProps
}) => {
  const id = useId(restProps);
  const labelId = useId();

  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      label={label}
      labelId={labelId}
      htmlFor={id}
    >
      <PasswordInput
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldPasswordInputForwardRef = forwardRef<
  HTMLInputElement,
  FormFieldPasswordInputProps
>((props, ref) => <FormFieldPasswordInput {...props} forwardedRef={ref} />);

interface FormFieldPasswordInputProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
