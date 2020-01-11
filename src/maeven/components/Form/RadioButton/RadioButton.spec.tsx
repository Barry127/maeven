import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';

import { MaevenDefault, ThemeProvider } from '../../..';

import { RadioButton, RadioButtonForwardRef } from './RadioButton';
import { RadioButton as ExportedRadioButton } from '../';
import { classes, themeOverride } from './styles';

describe('RadioButton', () => {
  it('renders an input radio and sets child text', () => {
    render(<RadioButton>Hello world!</RadioButton>);
    const container = document.querySelector('label');
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
    const container = document.querySelector('label');
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

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        RadioButton: {
          border: '1px solid green'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <RadioButton>Hello world!</RadioButton>
      </ThemeProvider>
    );
    const container = document.querySelector('label');
    expect(container).toHaveClass(expectedClassName);
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
      const container = document.querySelector('label');
      expect(container).not.toHaveClass(classes.hasError);
    });

    it('sets error styling', () => {
      render(<RadioButton hasError />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.hasError);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<RadioButton />);
      const container = document.querySelector('label');
      expect(container).not.toHaveClass(classes.sm);
      expect(container).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<RadioButton size="sm" />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<RadioButton size="lg" />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.lg);
    });
  });

  describe('forwarding ref', () => {
    it('exports RadioButtonForwardRef', () => {
      expect(ExportedRadioButton).toBe(RadioButtonForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioButtonForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
