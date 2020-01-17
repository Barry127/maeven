import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import {
  FormFieldTextArea,
  FormFieldTextAreaForwardRef
} from './FormFieldTextArea';
import { FormFieldTextArea as ExportedFormFieldTextArea } from '..';

describe('FormFieldTextArea', () => {
  it('renders TextArea and label', () => {
    render(<FormFieldTextArea label="Label Text" />);
    const label = document.querySelector('label') as HTMLLabelElement;
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', textarea.id);

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-describedby', label.id);
  });

  describe('forwarding ref', () => {
    it('exports FormFieldTextAreaForwardRef', () => {
      expect(ExportedFormFieldTextArea).toBe(FormFieldTextAreaForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<FormFieldTextAreaForwardRef ref={ref} />);
      const textarea = document.querySelector('textarea');
      expect(ref.current).toBe(textarea);
    });
  });
});
