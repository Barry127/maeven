import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldNativeSelect,
  FormFieldNativeSelectF
} from './FormFieldNativeSelect';
import { FormFieldNativeSelect as ExportedFormFieldNativeSelect } from '..';

const selectOptions = [
  { value: 'JavaScript' },
  { value: 'Java' },
  { value: 'PHP' },
  { value: 'Perl' },
  { value: 'C' },
  { value: 'Lua' },
  { value: 'C++' },
  { value: 'Rust' }
];

describe('FormFieldNativeSelect', () => {
  it('renders NativeSelect and label', () => {
    render(
      <FormFieldNativeSelect label="Label Text" options={selectOptions} />
    );
    const label = document.querySelector('label') as HTMLLabelElement;
    const select = document.querySelector('select') as HTMLSelectElement;
    const options = document.querySelectorAll('option');

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', select.id);

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('aria-describedby', label.id);

    expect(options).toHaveLength(8);
  });

  it('sets container className', () => {
    render(
      <FormFieldNativeSelect
        options={selectOptions}
        containerClassName="formfield-class"
      />
    );
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(
      <FormFieldNativeSelect
        options={selectOptions}
        id="FieldId"
        label="Label Text"
      />
    );
    const label = document.querySelector('label');
    const input = document.querySelector('select');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(
      <FormFieldNativeSelect
        options={selectOptions}
        data-test="formfield-data"
      />
    );
    const input = document.querySelector('select');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(
      <FormFieldNativeSelect
        options={selectOptions}
        hasError
        label="Label Text"
      />
    );
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldNativeSelectForwardRef', () => {
      expect(ExportedFormFieldNativeSelect).toBe(FormFieldNativeSelectF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLSelectElement>();
      render(<FormFieldNativeSelectF options={selectOptions} ref={ref} />);
      const select = document.querySelector('select');
      expect(ref.current).toBe(select);
    });
  });
});
