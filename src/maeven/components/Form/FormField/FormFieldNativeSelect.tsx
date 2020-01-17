import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { NativeSelect, FullProps } from '../NativeSelect/NativeSelect';
import { FormField } from './FormField';

/**
 * A FormField for a NativeSelect
 */
export const FormFieldNativeSelect: FC<FormFieldNativeSelectProps> = ({
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
      <NativeSelect
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldNativeSelectForwardRef = forwardRef<
  HTMLSelectElement,
  FullProps
>((props, ref) => <FormFieldNativeSelect {...props} forwardedRef={ref} />);

interface FormFieldNativeSelectProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
