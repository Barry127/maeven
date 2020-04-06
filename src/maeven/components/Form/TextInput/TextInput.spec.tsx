import '@testing-library/jest-dom/extend-expect';

import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { activity } from 'icon-packs/cjs/feather';

import { TextInput, TextInputF } from './TextInput';
import { TextInput as ExportedTextInput } from '../';

describe('TextInput', () => {
  it('renders an input and sets child text', () => {
    render(<TextInput>Hello world!</TextInput>);
    const container = document.querySelector('.mvn-text-input');
    const input = document.querySelector('input');
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(container).toHaveTextContent('Hello world!');
  });

  it('sets className', () => {
    render(<TextInput className="textinput-class">Hello world!</TextInput>);
    const container = document.querySelector('.mvn-text-input');
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
      const container = document.querySelector('.mvn-text-input');
      expect(container).not.toHaveClass('mvn-text-input-error');
    });

    it('sets error styling', () => {
      render(<TextInput hasError>Error Text</TextInput>);
      const container = document.querySelector('.mvn-text-input');
      expect(container).toHaveClass('mvn-text-input-error');
      const text = document.querySelector('.mvn-block');
      expect(text).toHaveClass('mvn-text-color-danger');
    });
  });

  describe('icons', () => {
    it('has no icon by default', () => {
      render(<TextInput />);
      const container = document.querySelector('.mvn-text-input');
      expect(container).not.toHaveClass('mvn-has-left-icon');
      expect(container).not.toHaveClass('mvn-has-right-icon');

      const svg = document.querySelector('svg');
      const img = document.querySelector('img');
      expect(svg).not.toBeInTheDocument();
      expect(img).not.toBeInTheDocument();
    });

    it('sets icon', () => {
      render(<TextInput icon={activity} />);
      const container = document.querySelector('.mvn-text-input');
      expect(container).toHaveClass('mvn-has-left-icon');
      expect(container).not.toHaveClass('mvn-has-right-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });

    it('sets iconRight', () => {
      render(<TextInput iconRight={activity} />);
      const container = document.querySelector('.mvn-text-input');
      expect(container).not.toHaveClass('mvn-has-left-icon');
      expect(container).toHaveClass('mvn-has-right-icon');

      const svg = document.querySelectorAll('svg');
      expect(svg).toHaveLength(1);
    });
  });

  describe('rightElement', () => {
    it('has no right element by default', () => {
      render(<TextInput />);
      const rightElementContainer = document.querySelector(
        '.mvn-text-input-right-element'
      );
      const input = document.querySelector('input');
      expect(rightElementContainer).not.toBeInTheDocument();
      expect(input).not.toHaveAttribute('style');
    });

    it('sets right element', () => {
      render(<TextInput rightElement={<button>Click Me</button>} />);
      const rightElementContainer = document.querySelector(
        '.mvn-text-input-right-element'
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
      const container = document.querySelector('.mvn-text-input');
      expect(container).not.toHaveClass('mvn-text-input-sm');
      expect(container).not.toHaveClass('mvn-text-input-lg');
    });

    it('sets sm', () => {
      render(<TextInput size="sm" />);
      const container = document.querySelector('.mvn-text-input');
      expect(container).toHaveClass('mvn-text-input-sm');
    });

    it('sets lg', () => {
      render(<TextInput size="lg" />);
      const container = document.querySelector('.mvn-text-input');
      expect(container).toHaveClass('mvn-text-input-lg');
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
      expect(ExportedTextInput).toBe(TextInputF);
    });

    it('sets ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<TextInputF ref={ref} />);
      const input = document.querySelector('input');
      expect(ref.current).toBe(input);
    });
  });
});
