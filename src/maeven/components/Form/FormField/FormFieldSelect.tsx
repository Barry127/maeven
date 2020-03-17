import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { Select, FullProps } from '../Select/Select';
import { FormField } from './FormField';

/**
 * A FormField for a Select
 */
export const FormFieldSelect: FC<FormFieldSelectProps> = ({
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
      <Select
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldSelectForwardRef = forwardRef<
  HTMLInputElement,
  FormFieldSelectProps
>((props, ref) => <FormFieldSelect {...props} forwardedRef={ref} />);

interface FormFieldSelectProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
