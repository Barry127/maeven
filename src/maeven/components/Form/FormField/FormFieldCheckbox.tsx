import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { Checkbox, FullProps } from '../Checkbox/Checkbox';
import { FormField } from './FormField';

/**
 * A FormField for a Checkbox
 */
export const FormFieldCheckbox: FC<FormFieldCheckboxProps> = ({
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
      <Checkbox
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldCheckboxForwardRef = forwardRef<
  HTMLInputElement,
  FullProps
>((props, ref) => <FormFieldCheckbox {...props} forwardedRef={ref} />);

interface FormFieldCheckboxProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
