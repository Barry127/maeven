import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { activity } from 'icon-packs/cjs/feather';
import { render, fireEvent } from '@testing-library/react';
import { getStylesForElement, reinit } from '../../../testHelpers';

import { PasswordInput } from './PasswordInput';
import { MaevenTheme } from '../..';
import { ThemeProvider } from '../ThemeProvider';

describe('PasswordInput', () => {
  afterEach(reinit);

  it('renders a password input with a button and sets child text', () => {
    render(<PasswordInput>Hello</PasswordInput>);
    const container = document.querySelector('div div');
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(button).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello');
  });

  it('sets className', () => {
    render(<PasswordInput className="my-password-input" />);
    const container = document.querySelector('div div');
    expect(container).toHaveClass('my-password-input');
  });

  it('passes props to input element', () => {
    render(<PasswordInput id="PasswordInput" data-test="test-attr" readOnly />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'PasswordInput');
    expect(input!.dataset.test).toBe('test-attr');
    expect(input).toHaveAttribute('readOnly');
  });

  it('styles Theme overrides', () => {
    const Theme = {
      ...MaevenTheme,
      overrides: {
        TextInput: {
          color: 'yellow'
        },
        PasswordInput: {
          color: 'blue'
        }
      }
    };

    render(
      <ThemeProvider theme={Theme}>
        <PasswordInput />
      </ThemeProvider>
    );

    const container = document.querySelector('div div');
    const styles = getStylesForElement(container!);
    expect(styles.color).toBe('blue');
  });

  it('sets Theme icon overrides', () => {
    const Theme = {
      ...MaevenTheme,
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
    it('is not disabled by default', () => {
      render(<PasswordInput />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<PasswordInput disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });

    it('renders no button when disabled', () => {
      render(<PasswordInput disabled />);
      const button = document.querySelector('button');

      expect(button).not.toBeInTheDocument();
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<PasswordInput />);
      const button = document.querySelector('button');
      const styles = getStylesForElement(button!);
      expect(styles).toHaveProperty('color', MaevenTheme.colors.types.text);
    });

    it('sets error styling on button', () => {
      render(<PasswordInput hasError />);
      const button = document.querySelector('button');
      const styles = getStylesForElement(button!);
      expect(styles).toHaveProperty(
        'color',
        MaevenTheme.colors.semantic.danger
      );
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
      const styles = getStylesForElement(button!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 8);
    });

    it('sets sm on button', () => {
      render(<PasswordInput size="sm" />);
      const button = document.querySelector('button');
      const styles = getStylesForElement(button!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 6);
    });

    it('sets lg on button', () => {
      render(<PasswordInput size="lg" />);
      const button = document.querySelector('button');
      const styles = getStylesForElement(button!);
      expect(styles).toHaveProperty('minHeight', MaevenTheme.base * 12);
    });
  });
});
