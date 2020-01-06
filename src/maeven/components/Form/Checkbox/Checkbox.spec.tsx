import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { circle } from 'icon-packs/cjs/feather';

import { MaevenDefault, ThemeProvider } from '../../..';

import { Checkbox, CheckboxForwardRef } from './Checkbox';
import { Checkbox as ExportedCheckbox } from '../';

import { classes, themeOverride } from './styles';

describe('Checkbox', () => {
  it('renders an input checkbox and sets child text', () => {
    render(<Checkbox>Hello world!</Checkbox>);
    const container = document.querySelector('label');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<Checkbox className="checkbox-class">Hello world!</Checkbox>);
    const container = document.querySelector('label');
    expect(container).toHaveClass('checkbox-class');
  });

  it('passes props', () => {
    render(
      <Checkbox id="CheckboxId" data-test="checkbox-data">
        Hello world!
      </Checkbox>
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'CheckboxId');
    expect(input?.dataset.test).toBe('checkbox-data');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        Checkbox: {
          color: 'hotpink'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <Checkbox>Hello world!</Checkbox>
      </ThemeProvider>
    );
    const container = document.querySelector('label');
    expect(container).toHaveClass(expectedClassName);
  });

  it('sets Theme icon overrides', () => {
    const Theme = {
      ...MaevenDefault,
      iconOverrides: {
        check: circle
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <Checkbox checked onChange={jest.fn()} />
      </ThemeProvider>
    );

    const circleTag = document.querySelector('circle');
    const polyLine = document.querySelector('polyline');
    expect(polyLine).not.toBeInTheDocument();
    expect(circleTag).toBeInTheDocument();
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<Checkbox />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<Checkbox disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<Checkbox />);
      const container = document.querySelector('label');
      expect(container).not.toHaveClass(classes.hasError);
    });

    it('sets error styling', () => {
      render(<Checkbox hasError />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.hasError);
    });
  });

  describe('indeterminate', () => {
    it('is not indeterminate by default', () => {
      render(<Checkbox checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(false);
      expect(checkbox?.checked).toBe(true);
    });

    it('sets indeterminate', () => {
      render(<Checkbox indeterminate checked={false} onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });

    it('indeterminate overrides checked', () => {
      render(<Checkbox indeterminate checked onChange={jest.fn()} />);
      const checkbox = document.querySelector('input');
      expect(checkbox?.indeterminate).toBe(true);
      expect(checkbox?.checked).toBe(false);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<Checkbox />);
      const container = document.querySelector('label');
      expect(container).not.toHaveClass(classes.sm);
      expect(container).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<Checkbox size="sm" />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<Checkbox size="lg" />);
      const container = document.querySelector('label');
      expect(container).toHaveClass(classes.lg);
    });
  });

  describe('forwarding ref', () => {
    it('exports CheckboxForwardRef', () => {
      expect(ExportedCheckbox).toBe(CheckboxForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CheckboxForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
