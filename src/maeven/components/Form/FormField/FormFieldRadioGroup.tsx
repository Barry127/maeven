import React, { FC, ReactNode, CSSProperties } from 'react';

import { RadioGroup, FullProps } from '../RadioGroup/RadioGroup';
import { FormField } from './FormField';

/**
 * A FormField for a RadioGroup
 */
export const FormFieldRadioGroup: FC<FormFieldRadioGroupProps> = ({
  containerClassName,
  containerStyle,
  label,
  ...restProps
}) => {
  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      label={label}
    >
      <RadioGroup {...restProps} />
    </FormField>
  );
};

interface FormFieldRadioGroupProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
