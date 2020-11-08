import { render } from '@testing-library/react';
import React from 'react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders div element with given text and label', () => {
    render(
      <FormField label="Label Text" htmlFor="labelFor">
        Hello world!
      </FormField>
    );
    const field = document.querySelector('.mvn--form-field');
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(label).toHaveTextContent('Label Text');
    expect(label).toHaveAttribute('for', 'labelFor');
    expect(field?.tagName).toBe('DIV');
  });

  it('sets className', () => {
    render(<FormField className="form-field-class">Hello world!</FormField>);
    const element = document.querySelector('.mvn--form-field');
    expect(element).toHaveClass('form-field-class');
  });

  it('passes props', () => {
    render(
      <FormField id="FormFieldId" data-test="form-field-data">
        Hello world!
      </FormField>
    );
    const element = document.querySelector('.mvn--form-field');
    expect(element).toHaveAttribute('id', 'FormFieldId');
    expect(element).toHaveAttribute('data-test', 'form-field-data');
  });

  it('renders a label tag is provided', () => {
    render(<FormField label="Label">Hello world!</FormField>);
    const label = document.querySelector('.label');
    expect(label?.tagName).toBe('LABEL');
  });

  it('does not render a label tag when no label is provided', () => {
    render(<FormField>Hello world!</FormField>);
    const label = document.querySelector('.label');
    expect(label?.tagName).toBe('DIV');
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
      const element = document.querySelector('.mvn--form-field');
      expect(element).not.toHaveClass('has-error');
    });

    it('sets hasError', () => {
      render(<FormField label="Label Text" hasError />);
      const element = document.querySelector('.mvn--form-field');
      expect(element).toHaveClass('has-error');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<FormField />);
      const element = document.querySelector('.mvn--form-field');
      expect(element).toHaveClass('md');
      expect(element).not.toHaveClass('sm');
      expect(element).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<FormField size="sm" />);
      const element = document.querySelector('.mvn--form-field');
      expect(element).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<FormField size="lg" />);
      const element = document.querySelector('.mvn--form-field');
      expect(element).toHaveClass('lg');
    });
  });
});
