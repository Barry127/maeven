import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldPasswordInput,
  FormFieldPasswordInputF
} from './FormFieldPasswordInput';
import { FormFieldPasswordInput as ExportedFormFieldPasswordInput } from '..';

describe('FormFieldPasswordInput', () => {
  it('renders PasswordInput and label', () => {
    render(<FormFieldPasswordInput label="Label Text" />);
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('input') as HTMLInputElement;

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', input.id);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('aria-describedby', label.id);
  });

  it('sets container className', () => {
    render(<FormFieldPasswordInput containerClassName="formfield-class" />);
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(<FormFieldPasswordInput id="FieldId" label="Label Text" />);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(<FormFieldPasswordInput data-test="formfield-data" />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(<FormFieldPasswordInput hasError label="Label Text" />);
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldPasswordInputForwardRef', () => {
      expect(ExportedFormFieldPasswordInput).toBe(FormFieldPasswordInputF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldPasswordInputF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
