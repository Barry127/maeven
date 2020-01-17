import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldNativeSelect,
  FormFieldNativeSelectForwardRef
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

  describe('forwarding ref', () => {
    it('exports FormFieldNativeSelectForwardRef', () => {
      expect(ExportedFormFieldNativeSelect).toBe(
        FormFieldNativeSelectForwardRef
      );
    });

    it('sets ref', () => {
      const ref = createRef<HTMLSelectElement>();
      render(
        <FormFieldNativeSelectForwardRef options={selectOptions} ref={ref} />
      );
      const select = document.querySelector('select');
      expect(ref.current).toBe(select);
    });
  });
});
