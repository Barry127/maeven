import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { RadioButton, RadioButtonF } from './RadioButton';
import { RadioButton as ExportedRadioButton } from '../';

describe('RadioButton', () => {
  it('renders an input radio and sets child text', () => {
    render(<RadioButton>Hello world!</RadioButton>);
    const container = document.querySelector('.mvn-radio-button');
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
    const container = document.querySelector('.mvn-radio-button');
    expect(container).toHaveClass('radio-button-class');
  });

  it('passes props', () => {
    render(
      <RadioButton id="RadioButtonId" data-test="radio-button-data">
        Hello world!
      </RadioButton>
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'RadioButtonId');
    expect(input?.dataset.test).toBe('radio-button-data');
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
      const container = document.querySelector('.mvn-radio-button');
      expect(container).not.toHaveClass('mvn-radio-button-error');
    });

    it('sets error styling', () => {
      render(<RadioButton hasError>Error Text</RadioButton>);
      const container = document.querySelector('.mvn-radio-button');
      expect(container).toHaveClass('mvn-radio-button-error');
      const text = document.querySelector('.mvn-radio-button > .mvn-block');
      expect(text).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioButton />);
      const container = document.querySelector('.mvn-radio-button');
      expect(container).not.toHaveClass('mvn-radio-button-sm');
      expect(container).not.toHaveClass('mvn-radio-button-lg');
    });

    it('sets sm', () => {
      render(<RadioButton size="sm" />);
      const container = document.querySelector('.mvn-radio-button');
      expect(container).toHaveClass('mvn-radio-button-sm');
    });

    it('sets lg', () => {
      render(<RadioButton size="lg" />);
      const container = document.querySelector('.mvn-radio-button');
      expect(container).toHaveClass('mvn-radio-button-lg');
    });
  });

  describe('forwarding ref', () => {
    it('exports RadioButtonForwardRef', () => {
      expect(ExportedRadioButton).toBe(RadioButtonF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioButtonF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
