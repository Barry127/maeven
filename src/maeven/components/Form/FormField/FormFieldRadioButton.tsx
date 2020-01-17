import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { RadioButton, FullProps } from '../RadioButton/RadioButton';
import { FormField } from './FormField';

/**
 * A FormField for a RadioButton
 */
export const FormFieldRadioButton: FC<FormFieldRadioButtonProps> = ({
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
      <RadioButton
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldRadioButtonForwardRef = forwardRef<
  HTMLInputElement,
  FullProps
>((props, ref) => <FormFieldRadioButton {...props} forwardedRef={ref} />);

interface FormFieldRadioButtonProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
