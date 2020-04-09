import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';

import { FormField } from './FormField';

describe('FormField', () => {
  it('renders div element with given text and label', () => {
    render(
      <FormField label="Label Text" htmlFor="labelFor">
        Hello world!
      </FormField>
    );
    const field = document.querySelector('.mvn-form-field-field');
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', 'labelFor');
    expect(field).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<FormField className="formfield-class">Hello world!</FormField>);
    const container = document.querySelector('.mvn-form-field');
    expect(container).toHaveClass('formfield-class');
  });

  it('passes props', () => {
    render(
      <FormField id="FormFieldId" data-test="formfield-data">
        Hello world!
      </FormField>
    );
    const container = document.querySelector(
      '.mvn-form-field'
    ) as HTMLDivElement;
    expect(container).toHaveAttribute('id', 'FormFieldId');
    expect(container.dataset.test).toBe('formfield-data');
  });

  it('does not render a label when no label is provided', () => {
    render(<FormField>Hello world!</FormField>);
    const label = document.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  it('sets labelId', () => {
    render(
      <FormField label="Hello" labelId="LabelId">
        Hello world!
      </FormField>
    );
    const label = document.querySelector('label');
    expect(label).toHaveAttribute('id', 'LabelId');
  });

  describe('hasError', () => {
    it('has no error by default', () => {
      render(<FormField label="Label Text" />);
      const labelText = document.querySelector('label .mvn-block');
      expect(labelText).not.toHaveClass('mvn-text-color-danger');
    });

    it('sets hasError', () => {
      render(<FormField label="Label Text" hasError />);
      const labelText = document.querySelector('label .mvn-block');
      expect(labelText).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<FormField />);
      const container = document.querySelector('.mvn-form-field');
      expect(container).not.toHaveClass('mvn-form-field-sm');
      expect(container).not.toHaveClass('mvn-form-field-lg');
    });

    it('sets sm', () => {
      render(<FormField size="sm" />);
      const container = document.querySelector('.mvn-form-field');
      expect(container).toHaveClass('mvn-form-field-sm');
    });

    it('sets lg', () => {
      render(<FormField size="lg" />);
      const container = document.querySelector('.mvn-form-field');
      expect(container).toHaveClass('mvn-form-field-lg');
    });
  });
});
