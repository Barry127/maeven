import { render } from '@testing-library/react';
import React from 'react';
import { OptionalField } from './OptionalField';

describe('OptionalField', () => {
  it('renders FormField with content with label', () => {
    render(
      <OptionalField label="Label" htmlFor="p" labelId="labelId" size="md">
        <p>Hello World</p>
      </OptionalField>
    );
    const field = document.querySelector('.mvn--form-field');
    const content = document.querySelector('p');
    expect(field).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('renders only content without label', () => {
    render(
      <OptionalField htmlFor="p" labelId="labelId" size="md">
        <p>Hello World</p>
      </OptionalField>
    );
    const field = document.querySelector('.mvn--form-field');
    const content = document.querySelector('p');
    expect(field).not.toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('sets labelId and htmlFor', () => {
    render(
      <OptionalField label="Label" htmlFor="p" labelId="labelId" size="md">
        <p>Hello World</p>
      </OptionalField>
    );
    const label = document.querySelector('label');
    expect(label).toHaveAttribute('id', 'labelId');
    expect(label).toHaveAttribute('for', 'p');
  });

  describe('hasError', () => {
    it('has no error by default', () => {
      render(
        <OptionalField label="Label" htmlFor="p" labelId="labelId" size="md">
          <p>Hello World</p>
        </OptionalField>
      );
      const field = document.querySelector('.mvn--form-field');
      expect(field).not.toHaveClass('has-error');
    });

    it('sets hasError', () => {
      render(
        <OptionalField
          hasError
          label="Label"
          htmlFor="p"
          labelId="labelId"
          size="md"
        >
          <p>Hello World</p>
        </OptionalField>
      );
      const field = document.querySelector('.mvn--form-field');
      expect(field).toHaveClass('has-error');
    });
  });

  describe('size', () => {
    it('sets md', () => {
      render(
        <OptionalField label="Label" htmlFor="p" labelId="labelId" size="md">
          <p>Hello World</p>
        </OptionalField>
      );
      const field = document.querySelector('.mvn--form-field');
      expect(field).toHaveClass('md');
    });

    it('sets sm', () => {
      render(
        <OptionalField label="Label" htmlFor="p" labelId="labelId" size="sm">
          <p>Hello World</p>
        </OptionalField>
      );
      const field = document.querySelector('.mvn--form-field');
      expect(field).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(
        <OptionalField label="Label" htmlFor="p" labelId="labelId" size="lg">
          <p>Hello World</p>
        </OptionalField>
      );
      const field = document.querySelector('.mvn--form-field');
      expect(field).toHaveClass('lg');
    });
  });
});
