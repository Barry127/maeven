import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldRadioButton,
  FormFieldRadioButtonF
} from './FormFieldRadioButton';
import { FormFieldRadioButton as ExportedFormFieldRadioButton } from '..';

describe('FormFieldRadioButton', () => {
  it('renders RadioButton and label', () => {
    render(<FormFieldRadioButton label="Label Text" />);
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('input') as HTMLInputElement;

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', input.id);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toHaveAttribute('aria-describedby', label.id);
  });

  it('sets container className', () => {
    render(<FormFieldRadioButton containerClassName="formfield-class" />);
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(<FormFieldRadioButton id="FieldId" label="Label Text" />);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(<FormFieldRadioButton data-test="formfield-data" />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(<FormFieldRadioButton hasError label="Label Text" />);
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldRadioButtonForwardRef', () => {
      expect(ExportedFormFieldRadioButton).toBe(FormFieldRadioButtonF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldRadioButtonF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
