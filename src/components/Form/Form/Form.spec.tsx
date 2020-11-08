import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { Form } from './Form';

describe('Form', () => {
  it('renders form element with given text', () => {
    render(<Form>Hello world!</Form>);
    const element = document.querySelector('.mvn--form');
    expect(element?.tagName).toBe('FORM');
  });

  it('sets className', () => {
    render(<Form className="form-class">Hello world!</Form>);
    const element = document.querySelector('.mvn--form');
    expect(element).toHaveClass('form-class');
  });

  it('passes props', () => {
    render(
      <Form id="FormId" data-test="form-data">
        Hello world!
      </Form>
    );
    const element = document.querySelector('.mvn--form');
    expect(element).toHaveAttribute('id', 'FormId');
    expect(element).toHaveAttribute('data-test', 'form-data');
  });

  describe('layout', () => {
    it('is horizontal by default', () => {
      render(<Form>Hello world!</Form>);
      const element = document.querySelector('.mvn--form');
      expect(element).toHaveClass('horizontal');
    });

    it('sets vertical', () => {
      render(<Form layout="vertical">Hello world!</Form>);
      const element = document.querySelector('.mvn--form');
      expect(element).toHaveClass('vertical');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLFormElement>();
      render(<Form ref={ref} />);
      const element = document.querySelector('.mvn--form');
      expect(ref.current).toBe(element);
    });
  });
});
