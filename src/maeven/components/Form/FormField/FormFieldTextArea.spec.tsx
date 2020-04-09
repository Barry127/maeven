import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { FormFieldTextArea, FormFieldTextAreaF } from './FormFieldTextArea';
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

  it('sets container className', () => {
    render(<FormFieldTextArea containerClassName="formfield-class" />);
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('sets id', () => {
    render(<FormFieldTextArea id="FieldId" label="Label Text" />);
    const label = document.querySelector('label');
    const input = document.querySelector('textarea');
    expect(label).toHaveAttribute('for', 'FieldId');
    expect(input).toHaveAttribute('id', 'FieldId');
  });

  it('passes props', () => {
    render(<FormFieldTextArea data-test="formfield-data" />);
    const input = document.querySelector('textarea');
    expect(input).toHaveAttribute('data-test', 'formfield-data');
  });

  it('passes hasError', () => {
    render(<FormFieldTextArea hasError label="Label Text" />);
    const labelText = document.querySelector('label > .mvn-block');
    const element = document.querySelector('.mvn-form-field-field > *');
    expect(labelText).toHaveClass('mvn-text-color-danger');
    expect(element?.className).toContain('-error');
  });

  describe('forwarding ref', () => {
    it('exports FormFieldTextAreaForwardRef', () => {
      expect(ExportedFormFieldTextArea).toBe(FormFieldTextAreaF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<FormFieldTextAreaF ref={ref} />);
      const textarea = document.querySelector('textarea');
      expect(ref.current).toBe(textarea);
    });
  });
});
