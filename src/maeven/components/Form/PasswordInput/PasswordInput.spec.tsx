import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';

import { MaevenDefault, ThemeProvider } from '../../..';
import { classes as buttonClasses } from '../../Button/styles';

import { PasswordInput, PasswordInputForwardRef } from './PasswordInput';
import { PasswordInput as ExportedPasswordInput } from '../';
import { themeOverride } from './styles';

describe('PasswordInput', () => {
  it('renders a password input with a button and sets child text', () => {
    render(<PasswordInput>Hello world!</PasswordInput>);
    const container = document.querySelector('label')?.parentElement;
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(
      <PasswordInput className="passwordinput-class">
        Hello world!
      </PasswordInput>
    );
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass('passwordinput-class');
  });

  it('passes props', () => {
    const onBlur = jest.fn();
    render(
      <PasswordInput
        onBlur={onBlur}
        id="PasswordInputId"
        data-test="passwordinput-data"
      >
        Hello world!
      </PasswordInput>
    );
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    expect(input).toHaveAttribute('id', 'PasswordInputId');
    expect(input?.dataset.test).toBe('passwordinput-data');

    expect(onBlur.mock.calls.length).toBe(0);

    const ev = { relatedTarget: button };
    fireEvent(input!, new FocusEvent('blur', ev));

    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        PasswordInput: {
          border: '2px dotted green'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <PasswordInput>Hello world!</PasswordInput>
      </ThemeProvider>
    );
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass(expectedClassName);
  });

  it('sets Theme icon overrides', () => {
    const Theme = {
      ...MaevenDefault,
      iconOverrides: {
        showPassword: activity,
        hidePassword: activity
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <PasswordInput />
      </ThemeProvider>
    );

    const circle = document.querySelector('circle');
    const polyLine = document.querySelector('polyline');
    expect(polyLine).toBeInTheDocument();
    expect(circle).not.toBeInTheDocument();
  });

  it('toggles between password and text', () => {
    render(<PasswordInput>Hello</PasswordInput>);
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(button!);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(button!);
    expect(input).toHaveAttribute('type', 'password');
  });

  describe('disabled', () => {
    it('renders no toggle button when disabled', () => {
      render(<PasswordInput disabled />);
      const button = document.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('hide and showIcon', () => {
    it('defaults to eye and eyeOff', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eye
      expect(circle).toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //eyeOff
      expect(circle).not.toBeInTheDocument();
      expect(path).toBeInTheDocument();
      expect(line).toBeInTheDocument();
      expect(polyLine).not.toBeInTheDocument();
    });

    it('sets button icons', () => {
      render(<PasswordInput showIcon={activity} hideIcon={activity} />);
      const button = document.querySelector('button');
      let circle, path, line, polyLine;

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();

      fireEvent.click(button!);

      circle = document.querySelector('circle');
      path = document.querySelector('path');
      line = document.querySelector('line');
      polyLine = document.querySelector('polyline');

      //activity
      expect(circle).not.toBeInTheDocument();
      expect(path).not.toBeInTheDocument();
      expect(line).not.toBeInTheDocument();
      expect(polyLine).toBeInTheDocument();
    });
  });

  describe('showToggle', () => {
    it('has a toggle button by default', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('hides toggle button', () => {
      render(<PasswordInput showToggle={false} />);
      const button = document.querySelector('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      expect(button).not.toHaveClass(buttonClasses.sm);
      expect(button).not.toHaveClass(buttonClasses.lg);
    });

    it('sets sm on toggle button', () => {
      render(<PasswordInput size="sm" />);
      const button = document.querySelector('button');
      expect(button).toHaveClass(buttonClasses.sm);
    });

    it('sets lg on toggle button', () => {
      render(<PasswordInput size="lg" />);
      const button = document.querySelector('button');
      expect(button).toHaveClass(buttonClasses.lg);
    });
  });

  describe('forwarding ref', () => {
    it('exports PasswordInputForwardRef', () => {
      expect(ExportedPasswordInput).toBe(PasswordInputForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<PasswordInputForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
