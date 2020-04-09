import React, { FC, ReactNode, CSSProperties } from 'react';

import { RadioGroup, AllRadioGroupProps } from '../RadioGroup/RadioGroup';
import { FormField } from './FormField';

/**
 * A FormField for a RadioGroup
 */
export const FormFieldRadioGroup: FC<FormFieldRadioGroupProps> = ({
  containerClassName,
  containerStyle,
  size = 'md',
  label,
  ...restProps
}) => {
  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      size={size}
      label={label}
    >
      <RadioGroup size={size} {...restProps} />
    </FormField>
  );
};

interface FormFieldRadioGroupProps extends AllRadioGroupProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
