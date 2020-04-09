import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { FormFieldSelect, FormFieldSelectF } from './FormFieldSelect';
import { FormFieldSelect as ExportedFormFieldSelect } from '..';

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

describe('FormFieldSelect', () => {
  it('renders Select and label', () => {
    render(
      <FormFieldSelect
        label="Label Text"
        options={selectOptions}
        onChange={jest.fn()}
      />
    );
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('input') as HTMLInputElement;
    const items = document.querySelectorAll('li');

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', input.id);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', label.id);

    expect(items).toHaveLength(8);
  });

  it('sets container className', () => {
    render(
      <FormFieldSelect
        options={selectOptions}
        onChange={jest.fn()}
        containerClassName="formfield-class"
      />
    );
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(
      <FormFieldSelect
        options={selectOptions}
        onChange={jest.fn()}
        id="FieldId"
        label="Label Text"
      />
    );
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(
      <FormFieldSelect
        options={selectOptions}
        onChange={jest.fn()}
        data-test="formfield-data"
      />
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(
      <FormFieldSelect
        options={selectOptions}
        onChange={jest.fn()}
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
    it('exports FormFieldSelectForwardRef', () => {
      expect(ExportedFormFieldSelect).toBe(FormFieldSelectF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <FormFieldSelectF
          options={selectOptions}
          ref={ref}
          onChange={jest.fn()}
        />
      );
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
