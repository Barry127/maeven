import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { TypeAheadInput, FullProps } from '../TypeAheadInput/TypeAheadInput';
import { FormField } from './FormField';

/**
 * A FormField for a TypeAheadInput
 */
export const FormFieldTypeAheadInput: FC<FormFieldTypeAheadInputProps> = ({
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
      <TypeAheadInput
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTypeAheadInputForwardRef = forwardRef<
  HTMLInputElement,
  FullProps
>((props, ref) => <FormFieldTypeAheadInput {...props} forwardedRef={ref} />);

interface FormFieldTypeAheadInputProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
