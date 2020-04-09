import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { Select, AllSelectProps } from '../Select/Select';
import { FormField } from './FormField';

/**
 * A FormField for a Select
 */
export const FormFieldSelect: FC<FormFieldSelectProps> = ({
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
      <Select
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldSelectF = forwardRef<
  HTMLInputElement,
  FormFieldSelectProps
>((props, ref) => <FormFieldSelect {...props} forwardedRef={ref} />);

interface FormFieldSelectProps extends AllSelectProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
