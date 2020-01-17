import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldTypeAheadInput,
  FormFieldTypeAheadInputForwardRef
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

  describe('forwarding ref', () => {
    it('exports FormFieldTypeAheadInputForwardRef', () => {
      expect(ExportedFormFieldTypeAheadInput).toBe(
        FormFieldTypeAheadInputForwardRef
      );
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldTypeAheadInputForwardRef items={[]} ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
