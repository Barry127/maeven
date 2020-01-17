import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldRadioButton,
  FormFieldRadioButtonForwardRef
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

  describe('forwarding ref', () => {
    it('exports FormFieldRadioButtonForwardRef', () => {
      expect(ExportedFormFieldRadioButton).toBe(FormFieldRadioButtonForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldRadioButtonForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
