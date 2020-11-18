import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { RadioButton } from './RadioButton';

describe('RadioButton', () => {
  it('renders an input radio element and sets child text', () => {
    render(<RadioButton>Hello world!</RadioButton>);
    const container = document.querySelector('.mvn--radio-button');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'radio');
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <RadioButton className="radio-button-class">Hello world!</RadioButton>
    );
    const element = document.querySelector('.mvn--radio-button');
    expect(element).toHaveClass('radio-button-class');
  });

  it('passes props', () => {
    render(
      <RadioButton id="RadioButtonId" data-test="radio-button-data">
        Hello world!
      </RadioButton>
    );
    const element = document.querySelector('input');
    expect(element).toHaveAttribute('id', 'RadioButtonId');
    expect(element).toHaveAttribute('data-test', 'radio-button-data');
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<RadioButton />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<RadioButton disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<RadioButton />);
      const container = document.querySelector('.mvn--radio-button');
      expect(container).not.toHaveClass('has-error');
    });

    it('sets error styling', () => {
      render(<RadioButton hasError>Error Text</RadioButton>);
      const container = document.querySelector('.mvn--radio-button');
      expect(container).toHaveClass('has-error');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioButton />);
      const container = document.querySelector('.mvn--radio-button');
      expect(container).toHaveClass('md');
      expect(container).not.toHaveClass('sm');
      expect(container).not.toHaveClass('lg');
    });

    it('sets sm', () => {
      render(<RadioButton size="sm" />);
      const container = document.querySelector('.mvn--radio-button');
      expect(container).toHaveClass('sm');
    });

    it('sets lg', () => {
      render(<RadioButton size="lg" />);
      const container = document.querySelector('.mvn--radio-button');
      expect(container).toHaveClass('lg');
    });
  });

  describe('forwarding ref', () => {
    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioButton ref={ref} />);
      const element = document.querySelector('input');
      expect(ref.current).toBe(element);
    });
  });
});
