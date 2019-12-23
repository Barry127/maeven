import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';

import { MaevenDefault, ThemeProvider } from '../../..';

import { TextInput, TextInputForwardRef } from './TextInput';
import { TextInput as ExportedTextInput } from '../';
import { classes, themeOverride } from './styles';

describe('TextInput', () => {
  it('renders an input and sets child text', () => {
    render(<TextInput>Hello world!</TextInput>);
    const container = document.querySelector('label')?.parentElement;
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextInput className="textinput-class">Hello world!</TextInput>);
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass('textinput-class');
  });

  it('passes props', () => {
    render(
      <TextInput id="TextInputId" data-test="textinput-data" readOnly>
        Hello world!
      </TextInput>
    );
    const input = document.querySelector('input');
    expect(input).toHaveAttribute('id', 'TextInputId');
    expect(input?.dataset.test).toBe('textinput-data');
    expect(input).toHaveAttribute('readOnly');
  });

  it('styles Theme overrides', () => {
    const theme = {
      ...MaevenDefault,
      styleOverrides: {
        TextInput: {
          border: '3px solid red'
        }
      }
    };

    const expectedClassName = themeOverride(theme);

    render(
      <ThemeProvider theme={theme}>
        <TextInput className="TI">Hello world!</TextInput>
      </ThemeProvider>
    );
    const container = document.querySelector('label')?.parentElement;
    expect(container).toHaveClass(expectedClassName);
  });

  describe('disabled', () => {
    it('is not disabled by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('sets disabled', () => {
      render(<TextInput disabled />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('hasError', () => {
    it('has no error styling by default', () => {
      render(<TextInput />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.hasError);
    });

    it('sets error styling', () => {
      render(<TextInput hasError />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.hasError);
    });
  });

  describe('icons', () => {
    it('has no icon by default', () => {
      render(<TextInput />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.hasLeftIcon);
      expect(container).not.toHaveClass(classes.hasRightIcon);

      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<TextInput icon={activity} />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.hasLeftIcon);
      expect(container).not.toHaveClass(classes.hasRightIcon);

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets iconRight', () => {
      render(<TextInput iconRight={activity} />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.hasLeftIcon);
      expect(container).toHaveClass(classes.hasRightIcon);

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });
  });

  describe('rightElement', () => {
    it('has no right element by default', () => {
      render(<TextInput />);
      const rightElementContainer = document.querySelector(
        `.${classes.rightElement}`
      );
      const input = document.querySelector('input');
      expect(rightElementContainer).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute('style');
    });

    it('sets right element', () => {
      render(<TextInput rightElement={<button>Click Me</button>} />);
      const rightElementContainer = document.querySelector(
        `.${classes.rightElement}`
      );
      const button = document.querySelector('button');

      expect(rightElementContainer).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('sets paddingRight style on input', () => {
      render(<TextInput rightElement={<button>Click Me</button>} />);
      const input = document.querySelector('input');
      const button = document.querySelector('button');
      const width = button ? button.getBoundingClientRect().width + 1 : 0;
      expect(input).toHaveAttribute('style', `padding-right: ${width}px;`);
    });
  });

  describe('size', () => {
    it('is md by default', () => {
      render(<TextInput />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).not.toHaveClass(classes.sm);
      expect(container).not.toHaveClass(classes.lg);
    });

    it('sets sm', () => {
      render(<TextInput size="sm" />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.sm);
    });

    it('sets lg', () => {
      render(<TextInput size="lg" />);
      const container = document.querySelector('label')?.parentElement;
      expect(container).toHaveClass(classes.lg);
    });
  });

  describe('type', () => {
    it('is text by default', () => {
      render(<TextInput />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('sets password type', () => {
      render(<TextInput type="password" />);
      const input = document.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('forwarding ref', () => {
    it('exports TextInputForwardRef', () => {
      expect(ExportedTextInput).toBe(TextInputForwardRef);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextInputForwardRef ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
