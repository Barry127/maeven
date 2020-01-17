import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldCheckbox,
  FormFieldCheckboxForwardRef
} from './FormFieldCheckbox';
import { FormFieldCheckbox as ExportedFormFieldCheckbox } from '..';

describe('FormFieldCheckbox', () => {
  it('renders checkbox and label', () => {
    render(<FormFieldCheckbox label="Label Text" />);
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('input') as HTMLInputElement;

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', input.id);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input).toHaveAttribute('aria-describedby', label.id);
  });

  describe('forwarding ref', () => {
    it('exports FormFieldCheckboxForwardRef', () => {
      expect(ExportedFormFieldCheckbox).toBe(FormFieldCheckboxForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldCheckboxForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
