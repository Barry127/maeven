import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldTypeAheadInput,
  FormFieldTypeAheadInputF
} from './FormFieldTypeAheadInput';
import { FormFieldTypeAheadInput as ExportedFormFieldTypeAheadInput } from '..';

describe('FormFieldTypeAheadInput', () => {
  it('renders TypeAheadInput and label', () => {
    render(<FormFieldTypeAheadInput label="Label Text" items={[]} />);
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
    render(
      <FormFieldTypeAheadInput
        items={[]}
        containerClassName="formfield-class"
      />
    );
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(
      <FormFieldTypeAheadInput items={[]} id="FieldId" label="Label Text" />
    );
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(<FormFieldTypeAheadInput items={[]} data-test="formfield-data" />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(<FormFieldTypeAheadInput items={[]} hasError label="Label Text" />);
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldTypeAheadInputForwardRef', () => {
      expect(ExportedFormFieldTypeAheadInput).toBe(FormFieldTypeAheadInputF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldTypeAheadInputF items={[]} ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
