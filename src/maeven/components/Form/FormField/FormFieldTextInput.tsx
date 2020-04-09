import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { TextInput, AllTextInputProps } from '../TextInput/TextInput';
import { FormField } from './FormField';

/**
 * A FormField for a TextInput
 */
export const FormFieldTextInput: FC<FormFieldTextInputProps> = ({
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
      <TextInput
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTextInputF = forwardRef<
  HTMLInputElement,
  FormFieldTextInputProps
>((props, ref) => <FormFieldTextInput {...props} forwardedRef={ref} />);

interface FormFieldTextInputProps extends AllTextInputProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
