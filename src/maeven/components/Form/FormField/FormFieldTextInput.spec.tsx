import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldTextInput,
  FormFieldTextInputForwardRef
} from './FormFieldTextInput';
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

  describe('forwarding ref', () => {
    it('exports FormFieldTextInputForwardRef', () => {
      expect(ExportedFormFieldTextInput).toBe(FormFieldTextInputForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldTextInputForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
