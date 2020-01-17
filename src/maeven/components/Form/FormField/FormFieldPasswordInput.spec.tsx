import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldPasswordInput,
  FormFieldPasswordInputForwardRef
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

  describe('forwarding ref', () => {
    it('exports FormFieldPasswordInputForwardRef', () => {
      expect(ExportedFormFieldPasswordInput).toBe(
        FormFieldPasswordInputForwardRef
      );
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<FormFieldPasswordInputForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
