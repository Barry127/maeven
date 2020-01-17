import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { FormFieldSelect, FormFieldSelectForwardRef } from './FormFieldSelect';
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

  describe('forwarding ref', () => {
    it('exports FormFieldSelectForwardRef', () => {
      expect(ExportedFormFieldSelect).toBe(FormFieldSelectForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <FormFieldSelectForwardRef
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
