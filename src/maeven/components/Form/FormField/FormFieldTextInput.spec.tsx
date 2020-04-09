import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { FormFieldTextInput, FormFieldTextInputF } from './FormFieldTextInput';
import { FormFieldTextInput as ExportedFormFieldTextInput } from '..';

describe('FormFieldTextInput', () => {
  it('renders TextInput and label', () => {
    render(<FormFieldTextInput label="Label Text" />);
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('input') as HTMLInputElement;

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', input.id);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('aria-describedby', label.id);
  });

  it('sets container className', () => {
    render(<FormFieldTextInput containerClassName="formfield-class" />);
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(<FormFieldTextInput id="FieldId" label="Label Text" />);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(<FormFieldTextInput data-test="formfield-data" />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(<FormFieldTextInput hasError label="Label Text" />);
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldTextInputForwardRef', () => {
      expect(ExportedFormFieldTextInput).toBe(FormFieldTextInputF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldTextInputF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
