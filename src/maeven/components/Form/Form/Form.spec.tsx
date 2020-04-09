import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { Form, FormF } from './Form';
import { Form as ExportedForm } from '../';

describe('Form', () => {
  it('renders form element with given text', () => {
    const { getByText } = render(<Form>Hello world!</Form>);
    const element = getByText('Hello world!');
    expect(element.tagName).toBe('FORM');
  });

  it('sets className', () => {
    const { getByText } = render(
      <Form className="form-class">Hello world!</Form>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveClass('form-class');
  });

  it('passes props', () => {
    const { getByText } = render(
      <Form id="FormId" data-test="form-data">
        Hello world!
      </Form>
    );
    const element = getByText('Hello world!');
    expect(element).toHaveAttribute('id', 'FormId');
    expect(element.dataset.test).toBe('form-data');
  });

  describe('layout', () => {
    it('is horizontal by default', () => {
      const { getByText } = render(<Form>Hello world!</Form>);
      const element = getByText('Hello world!');
      expect(element).not.toHaveClass('mvn-form-vertical');
    });

    it('sets vertical', () => {
      const { getByText } = render(<Form layout="vertical">Hello world!</Form>);
      const element = getByText('Hello world!');
      expect(element).toHaveClass('mvn-form-vertical');
    });
  });

  describe('forwarding ref', () => {
    it('exports BlockForwardRef', () => {
      expect(ExportedForm).toBe(FormF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLFormElement>();
      render(<FormF ref={ref} />);
      const element = document.querySelector('.mvn-form');
      expect(ref.current).toBe(element);
    });
  });
});
