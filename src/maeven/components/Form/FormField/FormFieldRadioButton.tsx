import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { RadioButton, AllRadioButtonProps } from '../RadioButton/RadioButton';
import { FormField } from './FormField';

/**
 * A FormField for a RadioButton
 */
export const FormFieldRadioButton: FC<FormFieldRadioButtonProps> = ({
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
      <RadioButton
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldRadioButtonF = forwardRef<
  HTMLInputElement,
  FormFieldRadioButtonProps
>((props, ref) => <FormFieldRadioButton {...props} forwardedRef={ref} />);

interface FormFieldRadioButtonProps extends AllRadioButtonProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
