import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { TextInput, FullProps } from '../TextInput/TextInput';
import { FormField } from './FormField';

/**
 * A FormField for a TextInput
 */
export const FormFieldTextInput: FC<FormFieldTextInputProps> = ({
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
      <TextInput
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTextInputForwardRef = forwardRef<
  HTMLInputElement,
  FormFieldTextInputProps
>((props, ref) => <FormFieldTextInput {...props} forwardedRef={ref} />);

interface FormFieldTextInputProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
